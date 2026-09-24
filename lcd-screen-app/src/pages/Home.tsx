import { useState } from 'react';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { moonOutline, sendOutline, sunnyOutline } from 'ionicons/icons';
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

const MODES = [
  { value: 'text', label: 'Text' },
  { value: 'clock', label: 'Clock' },
  { value: 'stats', label: 'Stats' },
];

const BACKLIGHT_PRESETS = ['#6c7ef8', '#5ecba1', '#f9c74f', '#f87c6c', '#e0e4fa'];

const Home: React.FC = () => {
  const { isDark, toggleTheme } = useNeuTheme();
  const [powered, setPowered] = useState(true);
  const [brightness, setBrightness] = useState(72);
  const [contrast, setContrast] = useState(50);
  const [mode, setMode] = useState('text');
  const [backlight, setBacklight] = useState(BACKLIGHT_PRESETS[0]);
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState('Hello, world!');

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const lcdText =
    mode === 'clock' ? now : mode === 'stats' ? `BRT ${brightness}%  CON ${contrast}%` : message;

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessage(draft.trim());
    setMode('text');
    setDraft('');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="lcd-home">
          <header className="lcd-home__header">
            <div>
              <h1 className="lcd-home__title">LCD Screen</h1>
              <Badge variant={powered ? 'success' : 'default'} dot>
                {powered ? 'Online' : 'Off'}
              </Badge>
            </div>
            <Button variant="icon" aria-label="Toggle theme" onClick={toggleTheme}>
              <IonIcon icon={isDark ? sunnyOutline : moonOutline} />
            </Button>
          </header>

          <Card variant="inset" padding="lg">
            <div
              className="lcd-home__screen"
              data-on={powered}
              style={{
                color: backlight,
                opacity: powered ? 0.35 + (brightness / 100) * 0.65 : 0,
                filter: `contrast(${50 + contrast}%)`,
              }}
            >
              {lcdText}
            </div>
          </Card>

          <Card padding='sm'>
            <LCDScreen text={lcdText} color={backlight} brightness={brightness} contrast={contrast} />
          </Card>

          <Card>
            <Switch
              label="Power"
              description="Turn the display on or off"
              checked={powered}
              onCheckedChange={setPowered}
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
              onValueChange={([v]) => setBrightness(v)}
              min={0}
              max={100}
              disabled={!powered}
            />
            <Slider
              label="Contrast"
              showValue
              value={[contrast]}
              onValueChange={([v]) => setContrast(v)}
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
              onChange={setMode}
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
