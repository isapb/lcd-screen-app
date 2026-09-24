---
name: neumorphic-design
description: Apply the neumorphic (soft-UI / clay) design style to this Ionic React app using the `neumorui` component library. Use whenever building or restyling screens, pages, components, themes, dark mode, or any UI work in lcd-screen-app — including requests like "make it neumorphic", "soft UI", "clay style", "use neumorui", or adding buttons/cards/inputs/sliders/gauges/toggles/nav.
---

# Neumorphic design with neumorui (Ionic React app)

This app is **Ionic React 9 + React 19 + Vite + Capacitor**. The neumorphic look comes from
[`neumorui`](https://neumorui.vercel.app) (v1.0.0, MIT, Radix-based, inline styles + CSS variables).
Ionic stays as the **app shell** (routing, `IonPage`, `IonContent`, safe areas, native transitions);
neumorui provides the **visual components inside pages**.

Full prop reference for all 124 components: `references/components.md` (generated from the
package's `.d.ts`). Grep it for the component you need instead of guessing props.
If the package version in `node_modules/neumorui` changes, trust its `dist/**/*.d.ts` over the reference.

## 1. Setup (do once — check first whether it's already done)

```bash
npm install neumorui
```

In `src/App.tsx`:

1. `import "neumorui/styles";` **after** the Ionic CSS imports and **before** `./theme/variables.css`
   (so our overrides win).
2. Replace `import '@ionic/react/css/palettes/dark.system.css';` with
   `import '@ionic/react/css/palettes/dark.class.css';` — neumorui owns the theme, Ionic follows it (see §3).
3. Wrap the app:

```tsx
import { NeuProvider } from "neumorui";

const App: React.FC = () => (
  <NeuProvider followSystemTheme defaultAccent="violet">
    <IonicThemeSync />
    <IonApp>
      <IonReactRouter>{/* routes */}</IonReactRouter>
    </IonApp>
  </NeuProvider>
);
```

Toast / snackbar / alert-dialog hooks need their providers too, only if used:
`ToastProvider` (`useToast`), `SnackbarProvider` (`useSnackbar`), `AlertDialogProvider` (`useAlertDialog`).
Put them inside `NeuProvider`, around `IonApp`.

## 2. Bridge Ionic to the neumorphic tokens

Neumorphism only works when **every surface shares one background color** — shadows create the
depth, not borders or contrasting fills. Ionic's default white/gray surfaces break the illusion,
so map Ionic's variables to neumorui's in `src/theme/variables.css`:

```css
:root {
  --ion-background-color: var(--neu-bg);
  --ion-background-color-rgb: 240, 244, 255;
  --ion-text-color: var(--neu-text-primary);
  --ion-text-color-rgb: 42, 45, 74;
  --ion-toolbar-background: var(--neu-bg);
  --ion-item-background: var(--neu-bg);
  --ion-card-background: var(--neu-bg);
  --ion-tab-bar-background: var(--neu-bg);
  --ion-border-color: transparent;
  --ion-color-primary: var(--neu-accent);
  --ion-font-family: var(--neu-font-family);
}
:root.ion-palette-dark {
  --ion-background-color-rgb: 26, 30, 50;
  --ion-text-color-rgb: 224, 228, 250;
}
/* Flat, borderless toolbars — neumorphic headers are raised or blend in, never hairlines */
ion-toolbar { --border-width: 0; }
ion-header::after, .header-md { box-shadow: none; }
```

`--ion-*-rgb` vars must be literal numbers (Ionic uses them in `rgba()`); keep them in sync with
`--neu-bg` / `--neu-text-primary` if you change those.

## 3. Dark mode: one source of truth

neumorui's `NeuProvider` sets `data-theme="light|dark"` on `<html>` and persists it in
`localStorage` (`neu-theme`). Ionic's `dark.class.css` keys off the `ion-palette-dark` class.
Keep them in sync with a tiny component (e.g. `src/theme/IonicThemeSync.tsx`):

```tsx
import { useEffect } from "react";
import { useNeuTheme } from "neumorui";

export const IonicThemeSync: React.FC = () => {
  const { isDark } = useNeuTheme();
  useEffect(() => {
    document.documentElement.classList.toggle("ion-palette-dark", isDark);
  }, [isDark]);
  return null;
};
```

Toggle theme anywhere with `const { toggleTheme, setTheme, isDark } = useNeuTheme();`.
Gotcha: once `neu-theme` is saved in localStorage it wins over `followSystemTheme` on next launch
(the live OS-change listener still works). Clear that key if you want pure system-following.

Optionally set the status bar to match via `@capacitor/status-bar` (`Style.Dark` / `Style.Light`)
in the same effect.

## 4. How to build screens

**Page skeleton** — keep Ionic's structure, put neumorui inside `IonContent`:

```tsx
import { IonContent, IonPage } from "@ionic/react";
import { Card, Button, Slider, Switch, GaugeChart, Grid, Col } from "neumorui";

const Home: React.FC = () => (
  <IonPage>
    <IonContent className="ion-padding">
      <Grid cols={2} gap={20}>
        <Col span={2}>
          <Card padding="lg">
            <GaugeChart value={72} max={100} suffix="%" label="Brightness" animate />
          </Card>
        </Col>
        <Card><Switch label="Backlight" checked={on} onCheckedChange={setOn} /></Card>
        <Card><Slider label="Contrast" showValue value={[c]} onValueChange={([v]) => setC(v)} /></Card>
        <Col span={2}><Button variant="primary" style={{ width: "100%" }}>Apply</Button></Col>
      </Grid>
    </IonContent>
  </IonPage>
);
```

**Prefer neumorui over Ionic for visual controls.** Mapping:

| Instead of (Ionic)            | Use (neumorui)                                  |
|-------------------------------|-------------------------------------------------|
| `IonButton`                   | `Button` (`raised` default, `primary`, `icon`, `pill`, `inset`…) |
| `IonCard`                     | `Card` (`raised` / `inset` / `flat`)            |
| `IonInput`, `IonTextarea`     | `Input`, `Textarea`, `PasswordInput`, `NumberInput` |
| `IonToggle`                   | `Switch`                                        |
| `IonRange`                    | `Slider` (value is an **array**: `[n]`)         |
| `IonSelect`                   | `Select` (`options=[{value,label}]`, `onValueChange`) |
| `IonSegment`                  | `SegmentedControl`                              |
| `IonCheckbox`, `IonRadioGroup`| `Checkbox`, `RadioGroup`                        |
| `IonProgressBar`, `IonSpinner`| `Progress`, `Spinner`                           |
| `IonBadge`, `IonChip`         | `Badge`, `Chip`                                 |
| `IonModal`, `IonAlert`        | `Modal`, `Sheet`, `Drawer`, `AlertDialog`, `ConfirmDialog` |
| `IonToast`                    | `useToast()` / `useSnackbar()`                  |
| `IonTabBar` (visual)          | `BottomNav` (drive routing from `onActiveChange` with `useNavigate`) |

**Keep Ionic for**: `IonApp`, `IonReactRouter`, `IonRouterOutlet`, `IonPage`, `IonContent`
(scrolling, safe-area, pull-to-refresh), `IonHeader`/`IonToolbar` if you want native headers
(already themed by §2). Don't wrap neumorui components in `IonItem`/`IonList` — use `Card` + `Grid`.

Good fits for an LCD/device-control app: `GaugeChart`, `StatsCard`, `Slider`, `Switch`,
`SegmentedControl`, `ColorPicker`, `Progress`, `Sparkline`/`LineChart`, `Countdown`, `BottomNav`,
`Button variant="icon"`. Look up exact props in `references/components.md`.

## 5. Neumorphic style rules (for custom elements)

When neumorui has no component and you write your own, use the tokens — never hardcode colors or
shadows:

- Background: always `var(--neu-bg)` — the element and its parent must match.
- Raised (default, clickable): `box-shadow: var(--neu-shadow-raised)` (`-sm` / `-lg` variants).
- Pressed / active / input wells: `box-shadow: var(--neu-shadow-inset)` (`-inset-sm`).
- Interaction: raised → inset on `:active` or selected; `transition: var(--neu-transition)`.
- Radius: `var(--neu-radius-sm|md|lg|xl|full)`; generous, 14px+ for cards.
- Text: `--neu-text-primary`, `--neu-text-secondary`, `--neu-text-muted`.
- Accent sparingly (primary action, active state, value arcs): `--neu-accent`, `--neu-gradient-primary`,
  glow `0 4px 14px var(--neu-accent-glow)`. Status: `--neu-success|danger|warning|info` and
  `--neu-tint-*` for soft backgrounds.
- No borders, no hard dividers, no drop shadows from a single direction, no pure white/black
  surfaces. Leave ≥ 16–20px between raised elements so shadows don't collide.
- Contrast: neumorphism is low-contrast by nature — keep text on `--neu-text-primary`, and give
  state (on/off, selected) an accent color or icon, not just a shadow change.

```css
.lcd-tile {
  background: var(--neu-bg);
  border-radius: var(--neu-radius-lg);
  box-shadow: var(--neu-shadow-raised);
  transition: var(--neu-transition);
}
.lcd-tile:active, .lcd-tile[aria-pressed="true"] { box-shadow: var(--neu-shadow-inset); }
```

## 6. Theming / brand customization

Prefer the provider over editing CSS:

```tsx
<NeuProvider
  followSystemTheme
  defaultAccent="teal"            // "violet" | "blue" | "teal" | "rose" | "amber"
  theme={{ accent: "#4fd1c5", radius: { md: "16px" }, fontFamily: "Inter, sans-serif" }}
  cssVars={{ "--neu-shadow-raised": "8px 8px 20px var(--neu-shadow-dark), -6px -6px 16px var(--neu-shadow-light)" }}
  defaultAnimation="reduced"      // "full" | "reduced" | "none"
/>
```

Or override variables in `variables.css` under `:root` and `[data-theme="dark"]`. Full token list:
`--neu-bg(-dark|-light)`, `--neu-shadow-(dark|light|raised|raised-sm|raised-lg|inset|inset-sm)`,
`--neu-accent(-light|-dark|-glow)`, `--neu-(success|danger|warning|info)(-light|-dark|-glow)`,
`--neu-gradient-(primary|success|danger|warning)`, `--neu-text-(primary|secondary|muted)`,
`--neu-tint-(primary|success|danger|warning|info)(-border|-text)`, `--neu-border`,
`--neu-radius-(sm|md|lg|xl|full)`, `--neu-transition`, `--neu-font-family`.
If you change `--neu-bg`, update the `--ion-background-color-rgb` numbers too (§2).

## 7. Known gotchas

- `neumorui/styles` ships some un-prefixed Tailwind utilities (`.container`, `.hidden`, `.flex`,
  `.grid`, `.truncate`, `.collapse`, …). Avoid using those class names for your own meanings;
  use Ionic's `ion-*` utilities or CSS modules for layout.
- Radix overlays (Modal, Popover, Select, Tooltip) portal to `document.body`, outside `IonApp`.
  They still get the tokens (vars live on `:root`) but not `--ion-*` scoped styles; that's expected.
  If one appears behind an Ionic overlay, raise its `z-index` via `style`/`className`.
- **Slider touch drag**: neumorui's `Slider` doesn't set `touch-action: none`, so on touch devices
  (phones, browser mobile view) the browser claims the drag as a scroll and the thumb stops after one
  step. The fix lives globally in `src/theme/variables.css`
  (`[data-orientation]:has(> * > [role='slider']), [role='slider'] { touch-action: none; }`) — keep it.
  Other drag-based components (ColorPicker, ResizablePanels, Carousel) may need the same treatment.
- In `npm run dev`, React StrictMode double-runs `NeuProvider`'s effects, so a saved theme resets
  to light on reload. Production builds persist it correctly — don't "fix" this in app code.
- `ColorPicker`'s hex input has an intrinsic min-width and overflows narrow cards; give its container
  `div, input { min-width: 0; }`.
- `Slider` value is `number[]`; `Switch` uses `checked` + `onCheckedChange`; `Select` and
  `SegmentedControl` use `onValueChange` / `onChange` with string values.
- Library was built against React 18 types; it runs on React 19. If a TS error comes from its
  types, check `references/components.md` before casting.
- Test in both themes and on a device/emulator (`npx cap run android`) — shadows look different on
  OLED and at low brightness.

## 8. Checklist before finishing UI work

- [ ] Every surface uses `var(--neu-bg)`; no white cards on gray, no borders.
- [ ] Visual controls are neumorui; Ionic only for shell/navigation/scroll.
- [ ] Looks correct in light **and** dark (`toggleTheme()`), Ionic chrome matches.
- [ ] Custom CSS uses only `--neu-*` tokens.
- [ ] `npm run build` and `npm run lint` pass.
