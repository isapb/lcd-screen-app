import { useEffect, useState } from 'react';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { bluetoothOutline, moonOutline, sendOutline, sunnyOutline } from 'ionicons/icons';
import {
  Badge,
  Button,
  Card,
  ColorPicker,
  GaugeChart,
  Input,
  SegmentedControl,
  Slider,
  Switch,
  useNeuTheme,
} from 'neumorui';
import './Home.css';
import { LCDScreen } from '../components/lcd-screen';
import { useLcdBle } from '../ble/useLcdBle';
import type { DisplayMode } from '../ble/lcd-ble';

const BLE_BADGE = {
  connected: { variant: 'success', label: 'Connected' },
  connecting: { variant: 'warning', label: 'Connecting…' },
  disconnected: { variant: 'default', label: 'Disconnected' },
} as const;

const MODES: { value: DisplayMode; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'clock', label: 'Clock' },
  { value: 'stats', label: 'Stats' },
];

/** Same format the firmware prints: HH:MM:SS */
const formatClock = (date: Date) =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

const BACKLIGHT_PRESETS = ['#6c7ef8', '#5ecba1', '#f9c74f', '#f87c6c', '#e0e4fa'];

const Home: React.FC = () => {
  const { isDark, toggleTheme } = useNeuTheme();
  const [powered, setPowered] = useState(true);
  const [brightness, setBrightness] = useState(72);
  const [contrast, setContrast] = useState(50);
  const [mode, setMode] = useState<DisplayMode>('text');
  const [backlight, setBacklight] = useState(BACKLIGHT_PRESETS[0]);
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState('Hello, world!');
  const ble = useLcdBle();
  const connected = ble.status === 'connected';

  const [now, setNow] = useState(() => formatClock(new Date()));

  // Tick the clock preview only while it's visible
  useEffect(() => {
    if (mode !== 'clock') return;
    setNow(formatClock(new Date()));
    const interval = setInterval(() => setNow(formatClock(new Date())), 1000);
    return () => clearInterval(interval);
  }, [mode]);

  const lcdText = () => {
    switch (mode) {
      case 'clock':
        return now;
      case 'stats':
        return `BRT ${brightness < 10 ? `${brightness}%          ` : brightness < 100 ? `${brightness}%         ` : `${brightness}%        `}CON ${contrast}%`
        break;
      default:
      case 'text':
        return message;
        break;
    }

    return message;
  };

  const changeMode = (value: DisplayMode) => {
    setMode(value);
    if (connected) ble.setMode(value);
  };

  const changePower = (on: boolean) => {
    setPowered(on);
    if (connected) ble.setPower(on);
  };

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessage(draft.trim());
    setDraft('');
    if (connected) ble.sendText(draft.trim());
    changeMode('text');
  };

  const toggleConnection = async () => {
    if (ble.status !== 'disconnected') {
      await ble.disconnect();
      return;
    }
    const values = await ble.connect();
    if (values) {
      setBrightness(values.brightness);
      setContrast(values.contrast);
      setPowered(values.powered);
      setMode(values.mode);
      setMessage(values.text);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="lcd-home">
          <header className="lcd-home__header">
            <div>
              <h1 className="lcd-home__title">LCD Screen</h1>
              <Badge variant={BLE_BADGE[ble.status].variant} dot>
                {BLE_BADGE[ble.status].label}
              </Badge>
            </div>
            <div className="lcd-home__actions">
              <Button
                variant="icon"
                aria-label={connected ? 'Disconnect from screen' : 'Connect to screen'}
                onClick={toggleConnection}
                disabled={ble.status === 'connecting'}
              >
                <IonIcon icon={bluetoothOutline} />
              </Button>
              <Button variant="icon" aria-label="Toggle theme" onClick={toggleTheme}>
                <IonIcon icon={isDark ? sunnyOutline : moonOutline} />
              </Button>
            </div>
          </header>

          {ble.error && <p className="lcd-home__error">{ble.error}</p>}

          {/* <Card variant="inset" padding="lg">
            <div
              className="lcd-home__screen"
              data-on={powered}
              style={{
                color: backlight,
                opacity: powered ? 0.35 + (brightness / 100) * 0.65 : 0,
                filter: `contrast(${150 - contrast}%)`,
              }}
            >
              {lcdText}
            </div>
          </Card> */}

          <Card padding='sm'>
            <LCDScreen text={lcdText()} color={backlight} brightness={brightness} contrast={contrast} />
          </Card>

          <Card>
            <Switch
              label="Power"
              description="Turn the display on or off"
              checked={powered}
              onCheckedChange={changePower}
            />
          </Card>

          <Card padding="lg" className="lcd-home__brightness">
            <GaugeChart
              value={brightness}
              max={100}
              size={160}
              suffix="%"
              label="Brightness"
              color={backlight}
              animate
            />
            <Slider
              label="Brightness"
              showValue
              value={[brightness]}
              onValueChange={([v]) => {
                setBrightness(v);
                if (connected) ble.setBrightness(v);
              }}
              min={0}
              max={100}
              disabled={!powered}
            />
            <Slider
              label="Contrast"
              showValue
              value={[contrast]}
              onValueChange={([v]) => {
                setContrast(v);
                if (connected) ble.setContrast(v);
              }}
              min={0}
              max={100}
              disabled={!powered}
            />
          </Card>

          <Card>
            <p className="lcd-home__label">Display mode</p>
            <SegmentedControl
              options={MODES}
              value={mode}
              onChange={(value) => changeMode(value as DisplayMode)}
              fullWidth
              disabled={!powered}
            />
          </Card>

          <Card>
            <form
              className="lcd-home__message"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <Input
                label="Message"
                placeholder="Text to show on the screen"
                value={draft}
                maxLength={32}
                onChange={(e) => setDraft(e.target.value)}
                disabled={!powered}
              />
              <Button
                type="submit"
                variant="primary"
                leftIcon={<IonIcon icon={sendOutline} />}
                disabled={!powered || !draft.trim()}
              >
                Send to screen
              </Button>
            </form>
          </Card>

          <Card className="lcd-home__backlight">
            <ColorPicker
              label="Backlight"
              value={backlight}
              onChange={setBacklight}
              presets={BACKLIGHT_PRESETS}
              disabled={!powered}
            />
          </Card>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
