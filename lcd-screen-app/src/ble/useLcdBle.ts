import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BRIGHTNESS_CHAR_UUID,
  CONTRAST_CHAR_UUID,
  type DisplayMode,
  bleDisconnect,
  bleFindDevice,
  bleInitialize,
  bleReadMode,
  bleReadPercent,
  bleReadPower,
  bleReadText,
  bleWriteMode,
  bleWritePercent,
  bleWritePower,
  bleWriteText,
  bleWriteTime,
} from './lcd-ble';

export type BleStatus = 'disconnected' | 'connecting' | 'connected';

type Job = (deviceId: string) => Promise<void>;

const errorMessage = (e: unknown) => (e instanceof Error ? e.message : String(e));

export function useLcdBle() {
  const [status, setStatus] = useState<BleStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const deviceIdRef = useRef<string | null>(null);

  // Pending writes, one per key. Setting a key again replaces its pending value,
  // so dragging a slider only sends the latest value instead of flooding the queue.
  const jobsRef = useRef(new Map<string, Job>());
  const drainingRef = useRef(false);

  const handleDisconnect = useCallback(() => {
    deviceIdRef.current = null;
    jobsRef.current.clear();
    setStatus('disconnected');
  }, []);

  // Runs one write at a time; Web Bluetooth rejects concurrent GATT operations.
  const drain = useCallback(async () => {
    if (drainingRef.current) return;
    drainingRef.current = true;
    const jobs = jobsRef.current;
    while (jobs.size > 0) {
      const [key, job] = jobs.entries().next().value!;
      jobs.delete(key);
      const deviceId = deviceIdRef.current;
      if (!deviceId) break;
      try {
        await job(deviceId);
      } catch (e) {
        setError(errorMessage(e));
      }
    }
    drainingRef.current = false;
  }, []);

  const enqueue = useCallback(
    (key: string, job: Job) => {
      if (!deviceIdRef.current) return;
      jobsRef.current.set(key, job);
      void drain();
    },
    [drain],
  );

  /** Must be called from a click handler (Web Bluetooth requires a user gesture). */
  const connect = useCallback(async () => {
    setError(null);
    setStatus('connecting');
    try {
      await bleInitialize();
      const deviceId = await bleFindDevice(handleDisconnect);
      deviceIdRef.current = deviceId;
      const brightness = await bleReadPercent(deviceId, BRIGHTNESS_CHAR_UUID);
      const contrast = await bleReadPercent(deviceId, CONTRAST_CHAR_UUID);
      const powered = await bleReadPower(deviceId);
      const mode = await bleReadMode(deviceId);
      const text = await bleReadText(deviceId);
      await bleWriteTime(deviceId);

      setStatus('connected');
      return { brightness, contrast, powered, mode, text };
    } catch (e) {
      const message = errorMessage(e);
      // Closing the device picker isn't an error worth showing
      if (!/cancel/i.test(message)) setError(message);
      if (deviceIdRef.current) await bleDisconnect(deviceIdRef.current).catch(() => {});
      handleDisconnect();
      return null;
    }
  }, [handleDisconnect]);

  const disconnect = useCallback(async () => {
    const deviceId = deviceIdRef.current;
    if (!deviceId) return;
    try {
      await bleDisconnect(deviceId);
    } finally {
      handleDisconnect();
    }
  }, [handleDisconnect]);

  const setBrightness = useCallback(
    (value: number) => enqueue('brightness', (id) => bleWritePercent(id, BRIGHTNESS_CHAR_UUID, value)),
    [enqueue],
  );

  const setContrast = useCallback(
    (value: number) => enqueue('contrast', (id) => bleWritePercent(id, CONTRAST_CHAR_UUID, value)),
    [enqueue],
  );

  const sendText = useCallback(
    (text: string) => enqueue('text', (id) => bleWriteText(id, text)),
    [enqueue],
  );

  const setPower = useCallback(
    (on: boolean) => enqueue('power', (id) => bleWritePower(id, on)),
    [enqueue],
  );

  const setMode = useCallback(
    (mode: DisplayMode) => enqueue('mode', (id) => bleWriteMode(id, mode)),
    [enqueue],
  );

  useEffect(
    () => () => {
      if (deviceIdRef.current) void bleDisconnect(deviceIdRef.current).catch(() => {});
    },
    [],
  );

  return {
    status,
    error,
    connect,
    disconnect,
    setBrightness,
    setContrast,
    sendText,
    setPower,
    setMode,
  };
}
