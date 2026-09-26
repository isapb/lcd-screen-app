#include <LiquidCrystal.h>
#include <BLEDevice.h>
#include <BLE2901.h>
#include <BLE2902.h>
#include <BLE2904.h>
#include <sys/time.h>
#include <time.h>

#define CONTRAST_PIN 18
#define BRIGHTNESS_PIN 19

#define INITIAL_TEXT "Hello world!"

LiquidCrystal lcd(14, 27, 26, 25, 33, 32);
uint8_t contrast = 50;
uint8_t brightness = 255;
volatile uint8_t mode = 0;               // written by the BLE callback, read by loop()
char lcdText[33] = INITIAL_TEXT;  // 32 chars + '\0'
bool systemOn = true;
long currentTime = 0;
volatile bool lcdTextChanged = true;   // draw INITIAL_TEXT on the first loop()
portMUX_TYPE textMux = portMUX_INITIALIZER_UNLOCKED;

volatile bool clearLcd = false;
volatile bool timeSynced = false;

#define DEVICE_NAME "LCD Screen"
BLEServer* pServer = NULL;
BLECharacteristic* pContrastCharacteristic = NULL;
BLECharacteristic* pBrightnessCharacteristic = NULL;
BLECharacteristic* pTextCharacteristic = NULL;

bool deviceConnected = false;
bool oldDeviceConnected = false;

#define SERVICE_UUID          "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CONTRAST_CHAR_UUID    "d834cffd-6c79-448e-9470-26bce13438df"
#define BRIGHTNESS_CHAR_UUID  "fdf2aa16-f443-49f8-81c6-16544ba1b90e"
#define TEXT_CHAR_UUID        "8a3f1c2e-5b7d-4e9a-9c61-2f4d8b0e7a13"
#define ONOFF_CHAR_UUID       "dd14a059-b5e1-4637-ad42-a4bd7ca39df2"
#define CLOCK_CHAR_UUID       "b6a5a292-f70c-49c9-9ca9-fa284a7d527c"
#define MODE_CHAR_UUID        "0b336a4b-864e-487f-89a5-3142e535b5a5"


class MyServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
    digitalWrite(2, HIGH);
  };

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    digitalWrite(2, LOW);
    pServer->startAdvertising();
  }
};

class AnalogWriteCharacteristicController: public BLECharacteristicCallbacks {
  public:
  uint8_t pin;
  uint8_t* value;
  uint8_t min = 0;
  uint8_t max = 255;
  uint8_t targetMin = 0;
  uint8_t targetMax = 100;

  AnalogWriteCharacteristicController(uint8_t pin, uint8_t* value): BLECharacteristicCallbacks() {
    this->pin = pin;
    this->value = value;
  }

  void onRead(BLECharacteristic *pCharacteristic) {
    pCharacteristic->setValue((uint8_t)map(*value, min, max, targetMin, targetMax));
  }

  void onWrite(BLECharacteristic *pCharacteristic) {
    if (pCharacteristic->getLength() < 1) return;

    uint8_t* received_data = pCharacteristic->getData();
    Serial.println(*received_data,HEX);

    if (*received_data < targetMin || *received_data > targetMax) {
      return;
    }
    *value = (uint8_t)map(*received_data, targetMin, targetMax, min, max);
    analogWrite(pin, *value);
  }
};

class TextCharacteristicController: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    String value = pCharacteristic->getValue();
    portENTER_CRITICAL(&textMux);
    strncpy(lcdText, value.c_str(), 32);
    lcdText[32] = '\0';
    lcdTextChanged = true;
    portEXIT_CRITICAL(&textMux);
  }
};

class SystemOnCharacteristicCallback: public BLECharacteristicCallbacks {
  // void onRead(BLECharacteristic *pCharacteristic) {
  //   pCharacteristic->setValue()
  // }

  void onWrite(BLECharacteristic *pCharacteristic) {
    if (pCharacteristic->getLength() < 1) return;

    uint8_t* received_data = pCharacteristic->getData();
    
    systemOn = *received_data > 0;
    if (systemOn) {
      analogWrite(CONTRAST_PIN, contrast);
      analogWrite(BRIGHTNESS_PIN, brightness);
    } else {
      analogWrite(CONTRAST_PIN, 255);
      analogWrite(BRIGHTNESS_PIN, 0);
    }
  }
};

class ClockCharacteristicCallback: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    if (pCharacteristic->getLength() != 4) return;
    uint8_t* d = pCharacteristic->getData();
    // little-endian uint32
    uint32_t localEpoch = d[0] | (d[1] << 8) | (d[2] << 16) | ((uint32_t)d[3] << 24);

    struct timeval tv = { .tv_sec = (time_t)localEpoch, .tv_usec = 0 };
    settimeofday(&tv, NULL);
    timeSynced = true;
  }
};

class ModeCharacteristicCallback: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    if (pCharacteristic->getLength() < 1) return;

    uint8_t* data = pCharacteristic->getData();
    mode = *data;
    Serial.printf("Mode -> %u\n", mode);
  }
};


void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  pinMode(CONTRAST_PIN, OUTPUT);
  pinMode(BRIGHTNESS_PIN, OUTPUT);

  lcd.begin(16, 2);
  lcd.clear();

  lcd.setCursor(0, 0);
  // lcd.print("Hey");

  analogWrite(BRIGHTNESS_PIN, brightness);
  analogWrite(CONTRAST_PIN, contrast);

  Serial.println("Initializing ESP32 BLE Server...");
  BLEDevice::init(DEVICE_NAME);
  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(BLEUUID(SERVICE_UUID), 30);

  /** Characteristics **/
  pContrastCharacteristic = pService->createCharacteristic(
    CONTRAST_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pContrastCharacteristic->setCallbacks(new AnalogWriteCharacteristicController(CONTRAST_PIN, &contrast));
  pContrastCharacteristic->setValue((uint8_t)map(contrast, 0, 255, 0, 100));
  // pContrastCharacteristic->setCallbacks(new ContrastCharacteristicCallback());

  pBrightnessCharacteristic = pService->createCharacteristic(
    BRIGHTNESS_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pBrightnessCharacteristic->setCallbacks(new AnalogWriteCharacteristicController(BRIGHTNESS_PIN, &brightness));
  pBrightnessCharacteristic->setValue((uint8_t)map(brightness, 0, 255, 0, 100));
  // pBrightnessCharacteristic->setCallbacks(new BrightnessCharacteristicCallback());

  pTextCharacteristic = pService->createCharacteristic(
    TEXT_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pTextCharacteristic->setCallbacks(new TextCharacteristicController());
  pTextCharacteristic->setValue(INITIAL_TEXT);   // initial value, returned on read

  BLE2901 *pTextDescriptor_2901 = new BLE2901();
  pTextDescriptor_2901->setDescription("text");
  pTextCharacteristic->addDescriptor(pTextDescriptor_2901);

  /**  On/Off   **/

  BLECharacteristic* pSystemOnCharacteristic = pService->createCharacteristic(
    ONOFF_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pSystemOnCharacteristic->setCallbacks(new SystemOnCharacteristicCallback());
  pSystemOnCharacteristic->setValue(1);

  /**  Clock   **/

  BLECharacteristic* pClockCharacteristic = pService->createCharacteristic(
    CLOCK_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pClockCharacteristic->setCallbacks(new ClockCharacteristicCallback());
  pClockCharacteristic->setValue(1);

  /**  Mode   **/

  BLECharacteristic* pModeCharacteristic = pService->createCharacteristic(
    MODE_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pModeCharacteristic->setCallbacks(new ModeCharacteristicCallback());
  pModeCharacteristic->setValue(mode);

  /** Descriptors **/
  BLE2901 *pContrastDescriptor_2901 = new BLE2901();
  pContrastDescriptor_2901->setDescription("contrast");
  pContrastCharacteristic->addDescriptor(pContrastDescriptor_2901);

  // BLE2904 *pContrastDescriptor_2904 = new BLE2904();
  // // pContrastDescriptor_2904->setDescription("contrast");
  // pContrastDescriptor_2904->setFormat(BLE2904::FORMAT_UINT8);
  // pContrastDescriptor_2904->setExponent(-1);
  // pContrastCharacteristic->addDescriptor(pContrastDescriptor_2904);

  BLE2901 *pBrightnessDescriptor_2901 = new BLE2901();
  pBrightnessDescriptor_2901->setDescription("brightness");
  pBrightnessCharacteristic->addDescriptor(pBrightnessDescriptor_2901);

  pService->start();
  BLEDevice::startAdvertising();
  Serial.println("ESP32 BLE Server initialized!");
}

void loop() {
  // Detect mode changes here instead of with a flag set by the BLE callback:
  // the callback runs on the other core, so a flag could be consumed by the old mode's case.
  static uint8_t lastMode = 255;
  uint8_t currentMode = mode;
  bool modeEntered = currentMode != lastMode;
  lastMode = currentMode;

  switch (currentMode) {
    case 0: {
      if (modeEntered) {
        portENTER_CRITICAL(&textMux);
        lcdTextChanged = true;   // the branch below clears and redraws lcdText
        portEXIT_CRITICAL(&textMux);
      }

      if (lcdTextChanged) {

        char text[33];
        portENTER_CRITICAL(&textMux);
        strcpy(text, lcdText);
        lcdTextChanged = false;
        portEXIT_CRITICAL(&textMux);

        lcd.clear();
        lcd.setCursor(0, 0);
        for (int i = 0; i < 16 && text[i]; i++) lcd.write(text[i]);
        if (strlen(text) > 16) {
          lcd.setCursor(0, 1);
          lcd.print(text + 16);
        }
      } else if (clearLcd) {
        clearLcd = false;
        lcd.clear();
      }
      break;
    }
    case 2: {
      if (modeEntered) {
        lcd.clear();
      }

      lcd.setCursor(0, 0);
      lcd.print("BRT ");
      uint8_t c = map(brightness, 0, 255, 0, 100);
      lcd.print(c);
      lcd.print("%  ");

      lcd.setCursor(0, 1);
      lcd.print("CON ");
      uint8_t b = map(contrast, 0, 255, 0, 100);
      lcd.print(b);
      lcd.print("%  ");
      break;
    }
      
    default:
    case 1: {
      static time_t lastShown = 0;
      time_t now = time(nullptr);

      if (modeEntered) {
        lcd.clear();
        lastShown = 0;                        // draw the time right away, not on the next second
      }

      if (timeSynced && now != lastShown) {
        lastShown = now;
        struct tm t;
        gmtime_r(&now, &t);                   // gmtime: the offset was already applied by the phone

        char line[17];
        strftime(line, sizeof line, "    %H:%M:%S    ", &t);   // fixed 16 chars
        lcd.setCursor(0, 0);
        lcd.print(line);
      }
      break;
    }
  }


}

// void loop() {

//   lcd.setCursor(0, 0);
//   lcd.print("Hello, how are u?");


//     // notify changed value
//     if (deviceConnected) {
//       // pCharacteristic->setValue(value);
//       // pCharacteristic->notify();
//       // value++;
//       // delay(1000);
//     }
//     // disconnecting
//     if (!deviceConnected && oldDeviceConnected) {
//         delay(500); // give the bluetooth stack the chance to get things ready
//         pServer->startAdvertising(); // restart advertising
//         Serial.println("start advertising");
//         oldDeviceConnected = deviceConnected;
//     }
//     // connecting
//     if (deviceConnected && !oldDeviceConnected) {
//         // do stuff here on connecting
//         oldDeviceConnected = deviceConnected;
//     }
  
//   // for (int value = 0; value < 255; value++) {
//   //   analogWrite(18, value);
//   //   delay(50);
//   // }
  
//   // for (int value = 0; value < 255; value++) {
//   //   analogWrite(19, value);
//   //   delay(50);
//   // }
// }