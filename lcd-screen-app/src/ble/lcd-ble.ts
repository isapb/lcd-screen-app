import { BleClient, dataViewToText, numbersToDataView, textToDataView } from "@capacitor-community/bluetooth-le";

export const DEVICE_NAME          = 'LCD Screen';
export const SERVICE_UUID         = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
export const CONTRAST_CHAR_UUID   = 'd834cffd-6c79-448e-9470-26bce13438df';
export const BRIGHTNESS_CHAR_UUID = 'fdf2aa16-f443-49f8-81c6-16544ba1b90e';
export const TEXT_CHAR_UUID       = '8a3f1c2e-5b7d-4e9a-9c61-2f4d8b0e7a13';
export const CLOCK_CHAR_UUID      = 'b6a5a292-f70c-49c9-9ca9-fa284a7d527c';
export const ONOFF_CHAR_UUID      = 'dd14a059-b5e1-4637-ad42-a4bd7ca39df2';
export const MODE_CHAR_UUID       = '0b336a4b-864e-487f-89a5-3142e535b5a5';

/** 16x2 LCD */
export const MAX_TEXT_LENGTH = 32;

/** Values of the mode characteristic, as the firmware's loop() switch expects them */
export const DISPLAY_MODES = ['text', 'clock', 'stats'] as const;
export type DisplayMode = (typeof DISPLAY_MODES)[number];

let initialized = false;

export async function bleInitialize() {
  if (initialized) return;
  await BleClient.initialize({ androidNeverForLocation: true });
  initialized = true;
}

/**
 * Opens the device picker and connects to the ESP32.
 * Filters by name because the firmware doesn't advertise the service UUID.
 */
export async function bleFindDevice(onDisconnect: (deviceId: string) => void) {
  const device = await BleClient.requestDevice({
    name: DEVICE_NAME,
    optionalServices: [SERVICE_UUID],
  });
  await BleClient.connect(device.deviceId, (id) => onDisconnect(id));
  return device.deviceId;
}

export async function bleDisconnect(deviceId: string) {
  await BleClient.disconnect(deviceId);
}

/** Reads a 0–100 value (contrast / brightness) */
export async function bleReadPercent(deviceId: string, characteristic: string) {
  const view = await BleClient.read(deviceId, SERVICE_UUID, characteristic);
  return view.getUint8(0);
}

/** Writes a 0–100 value as a single byte */
export async function bleWritePercent(deviceId: string, characteristic: string, value: number) {
  const byte = Math.max(0, Math.min(100, Math.round(value)));
  await BleClient.write(deviceId, SERVICE_UUID, characteristic, numbersToDataView([byte]));
}

export async function bleReadPower(deviceId: string) {
  const view = await BleClient.read(deviceId, SERVICE_UUID, ONOFF_CHAR_UUID);
  return view.getUint8(0) > 0;
}

export async function bleWritePower(deviceId: string, on: boolean) {
  await BleClient.write(deviceId, SERVICE_UUID, ONOFF_CHAR_UUID, numbersToDataView([on ? 1 : 0]));
}

/** Falls back to 'text' if the device reports a value the app doesn't know */
export async function bleReadMode(deviceId: string): Promise<DisplayMode> {
  const view = await BleClient.read(deviceId, SERVICE_UUID, MODE_CHAR_UUID);
  return DISPLAY_MODES[view.getUint8(0)] ?? 'text';
}

export async function bleWriteMode(deviceId: string, mode: DisplayMode) {
  const value = DISPLAY_MODES.indexOf(mode);
  await BleClient.write(deviceId, SERVICE_UUID, MODE_CHAR_UUID, numbersToDataView([value]));
}

/** Returns the last text written to the characteristic (or its initial value) */
export async function bleReadText(deviceId: string) {
  const view = await BleClient.read(deviceId, SERVICE_UUID, TEXT_CHAR_UUID);
  return dataViewToText(view);
}

export async function bleWriteText(deviceId: string, text: string) {
  await BleClient.write(
    deviceId,
    SERVICE_UUID,
    TEXT_CHAR_UUID,
    textToDataView(text.slice(0, MAX_TEXT_LENGTH)),
  );
}

export async function bleWriteTime(deviceId: string) {
  const now = new Date();
  const localEpoch = Math.floor(now.getTime() / 1000) - now.getTimezoneOffset() * 60;

  const view = new DataView(new ArrayBuffer(4));
  view.setUint32(0, localEpoch, true);   // true = little-endian, matches the firmware
  await BleClient.write(deviceId, SERVICE_UUID, CLOCK_CHAR_UUID, view);
}
