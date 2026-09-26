# neumorui 1.0.0 — component prop reference

Generated from the package's `dist/**/*.d.ts`. All components are named exports of `neumorui`. Most also accept `className`, `style` and rest props. If this file disagrees with `node_modules/neumorui/dist`, trust node_modules.

## Accordion

```ts
interface AccordionItem {
    value: string;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}
interface AccordionProps {
    /** Array of accordion items to render */
    items: AccordionItem[];
    /** Allow single or multiple open panels */
    type?: "single" | "multiple";
    /** Initially open panel value(s) */
    defaultValue?: string | string[];
    /** Allow collapsing all panels in single mode */
    collapsible?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Accordion: React.FC<AccordionProps>;
```

## ActivityFeed

```ts
interface ActivityItem {
    user: string;
    action: string;
    time: string;
    color?: string;
}
interface ActivityFeedProps {
    /** Activity entries to display */
    items: ActivityItem[];
    /** Callback to load more items */
    onLoadMore?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const ActivityFeed: React.FC<ActivityFeedProps>;
```

## Alert

```ts
type AlertVariant = "info" | "success" | "warning" | "danger";
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Semantic color variant of the alert */
    variant?: AlertVariant;
    /** Bold title text at the top */
    title?: string;
    /** Custom icon overriding the default emoji */
    icon?: React.ReactNode;
    /** Callback to show close button and handle dismiss */
    onClose?: () => void;
}
export declare const Alert: React.FC<AlertProps>;
```

## AlertDialog

```ts
type AlertDialogVariant = "default" | "success" | "danger" | "warning" | "info";
interface AlertDialogProps {
    /** Whether the dialog is visible */
    open?: boolean;
    /** Called when dialog closes */
    onClose?: () => void;
    /** Dialog title text */
    title?: string;
    /** Dialog message content */
    message: React.ReactNode;
    /** Color variant */
    variant?: AlertDialogVariant;
    /** Icon shown above the title */
    icon?: React.ReactNode;
    /** OK button label text */
    okText?: string;
    /** Cancel button label (shows cancel button if set) */
    cancelText?: string;
    /** Called when OK is clicked */
    onOk?: () => void;
    /** Called when Cancel is clicked */
    onCancel?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const AlertDialog: React.FC<AlertDialogProps>;
interface AlertOptions {
    title?: string;
    message: React.ReactNode;
    variant?: AlertDialogVariant;
    icon?: React.ReactNode;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
}
interface AlertDialogContextValue {
    alert: (opts: AlertOptions) => void;
    confirm: (opts: AlertOptions) => void;
}
export declare const useAlertDialog: () => AlertDialogContextValue;
export declare const AlertDialogProvider: React.FC<{
    children: React.ReactNode;
}>;
```

## AnnouncementBar

```ts
interface AnnouncementBarProps {
    children: React.ReactNode;
    /** Visual style: gradient or clay */
    variant?: "gradient" | "clay";
    /** Icon displayed before the content */
    icon?: React.ReactNode;
    /** Whether the bar can be dismissed */
    dismissible?: boolean;
    /** Callback when bar is dismissed */
    onDismiss?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const AnnouncementBar: React.FC<AnnouncementBarProps>;
```

## AreaChart

```ts
export interface AreaChartDataItem {
    label: string;
    value: number;
}
interface AreaChartProps {
    /** Data points for the chart */
    data: AreaChartDataItem[];
    /** Chart height in pixels */
    height?: number;
    /** Line and fill color */
    color?: string;
    /** Opacity of the gradient fill */
    gradientOpacity?: number;
    /** Show data point dots */
    showDots?: boolean;
    /** Show horizontal grid lines */
    showGrid?: boolean;
    /** Show x-axis labels */
    showLabels?: boolean;
    /** Show values above data points */
    showValues?: boolean;
    /** Enable entrance animation */
    animate?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const AreaChart: React.FC<AreaChartProps>;
```

## AspectRatio

```ts
interface AspectRatioProps {
    /** Width-to-height ratio (e.g. 16/9) */
    ratio?: number;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const AspectRatio: React.FC<AspectRatioProps>;
```

## AudioPlayer

```ts
interface AudioPlayerProps {
    /** Audio file source URL */
    src: string;
    /** Track title display text */
    title?: string;
    /** Artist name display text */
    artist?: string;
    /** Cover art image URL */
    coverArt?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const AudioPlayer: React.FC<AudioPlayerProps>;
```

## Avatar

```ts
type AvatarSize = "sm" | "md" | "lg" | "xl";
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Image URL for the avatar */
    src?: string;
    /** Alt text for the avatar image */
    alt?: string;
    /** Fallback initials when no image provided */
    initials?: string;
    /** Size preset of the avatar */
    size?: AvatarSize;
    /** Presence status indicator dot */
    status?: "online" | "offline" | "busy" | "away";
}
export declare const Avatar: React.FC<AvatarProps>;
```

## AvatarGroup

```ts
export interface AvatarGroupItem {
    src?: string;
    name: string;
}
interface AvatarGroupProps {
    /** Array of avatar items to display */
    avatars: AvatarGroupItem[];
    /** Max visible avatars before +N */
    max?: number;
    /** Avatar diameter in pixels */
    size?: number;
    /** Overlap offset in pixels */
    overlap?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const AvatarGroup: React.FC<AvatarGroupProps>;
```

## BackToTop

```ts
interface BackToTopProps {
    /** Scroll distance to show the button */
    threshold?: number;
    /** Use smooth scroll animation */
    smooth?: boolean;
    /** Custom icon element */
    icon?: React.ReactNode;
    /** Button position on screen */
    position?: "bottom-right" | "bottom-left" | "bottom-center";
    /** Button size */
    size?: "sm" | "md" | "lg";
    className?: string;
    style?: React.CSSProperties;
}
export declare const BackToTop: React.FC<BackToTopProps>;
```

## Badge

```ts
type BadgeVariant = "default" | "primary" | "success" | "danger" | "warning" | "info";
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Color variant of the badge */
    variant?: BadgeVariant;
    /** Show a small dot indicator before text */
    dot?: boolean;
}
export declare const Badge: React.FC<BadgeProps>;
```

## Banner

```ts
type BannerVariant = "default" | "info" | "success" | "warning" | "danger";
type BannerPosition = "top" | "bottom";
interface BannerProps {
    children: React.ReactNode;
    /** Color variant of the banner */
    variant?: BannerVariant;
    /** Display at top or bottom */
    position?: BannerPosition;
    /** Icon shown before content */
    icon?: React.ReactNode;
    /** Action element on the right */
    action?: React.ReactNode;
    /** Allow user to dismiss the banner */
    dismissible?: boolean;
    /** Called when banner is dismissed */
    onDismiss?: () => void;
    /** Stick to top or bottom edge */
    sticky?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Banner: React.FC<BannerProps>;
```

## BarChart

```ts
export interface BarChartDataItem {
    label: string;
    value: number;
    color?: string;
}
interface BarChartProps {
    /** Array of data items for each bar */
    data: BarChartDataItem[];
    /** Chart height in pixels */
    height?: number;
    /** Title displayed above the chart */
    title?: string;
    /** Trend indicator element */
    trend?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const BarChart: React.FC<BarChartProps>;
```

## BottomNav

```ts
interface BottomNavItem {
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    onClick?: () => void;
    isCreate?: boolean;
}
interface BottomNavProps {
    /** Navigation items to display */
    items: BottomNavItem[];
    /** Index of the currently active item */
    activeIndex?: number;
    /** Callback when active item changes */
    onActiveChange?: (index: number) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const BottomNav: React.FC<BottomNavProps>;
```

## Breadcrumb

```ts
interface BreadcrumbItem {
    label: React.ReactNode;
    href?: string;
    onClick?: () => void;
}
interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    /** Array of breadcrumb navigation items */
    items: BreadcrumbItem[];
    /** Custom separator element between items */
    separator?: React.ReactNode;
}
export declare const Breadcrumb: React.FC<BreadcrumbProps>;
```

## BrowserTabs

```ts
interface BrowserTab {
    id: string;
    label: string;
    icon?: React.ReactNode;
    badge?: number;
    closable?: boolean;
}
interface BrowserTabsProps {
    /** Array of tab definitions */
    tabs: BrowserTab[];
    /** ID of the currently active tab */
    activeTab?: string;
    /** Callback when a tab is selected */
    onTabChange?: (id: string) => void;
    /** Callback when a tab is closed */
    onTabClose?: (id: string) => void;
    /** Callback when the add button is clicked */
    onTabAdd?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const BrowserTabs: React.FC<BrowserTabsProps>;
```

## Button

```ts
type ButtonVariant = "raised" | "flat" | "inset" | "pill" | "icon" | "primary" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant of the button */
    variant?: ButtonVariant;
    /** Size preset — affects padding, font-size, radius */
    size?: ButtonSize;
    /** Show loading spinner and disable the button */
    loading?: boolean;
    /** Icon element displayed before the label */
    leftIcon?: React.ReactNode;
    /** Icon element displayed after the label */
    rightIcon?: React.ReactNode;
    /** Enable ripple effect on click */
    ripple?: boolean;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
```

## Calendar

```ts
export type CalendarProps = DayPickerProps & {
    className?: string;
};
export declare const Calendar: React.FC<CalendarProps>;
```

## Card

```ts
type CardVariant = "raised" | "inset" | "flat";
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Visual style variant of the card */
    variant?: CardVariant;
    /** Inner padding preset */
    padding?: "sm" | "md" | "lg";
}
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
```

## Carousel

```ts
export interface CarouselSlide {
    content: React.ReactNode;
    background?: string;
}
interface CarouselProps {
    /** Array of slides to display */
    slides: CarouselSlide[];
    /** Enable automatic slide advancement */
    autoPlay?: boolean;
    /** Auto-play interval in milliseconds */
    interval?: number;
    /** Pause auto-play on hover */
    pauseOnHover?: boolean;
    /** Enable infinite looping */
    loop?: boolean;
    /** Show previous/next navigation arrows */
    showArrows?: boolean;
    /** Show dot indicators below slides */
    showDots?: boolean;
    /** Show auto-play progress bar */
    showProgress?: boolean;
    /** Height of each slide */
    slideHeight?: number | string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Carousel: React.FC<CarouselProps>;
```

## ChatBubble

```ts
type ChatBubbleVariant = "sent" | "received";
interface ChatBubbleProps {
    /** Message text content */
    message: string;
    /** Sent or received bubble style */
    variant?: ChatBubbleVariant;
    /** Sender avatar image URL */
    avatar?: string;
    /** Sender display name */
    name?: string;
    /** Timestamp display string */
    time?: string;
    /** Message delivery status indicator */
    status?: "sent" | "delivered" | "read";
    className?: string;
    style?: React.CSSProperties;
}
export declare const ChatBubble: React.FC<ChatBubbleProps>;
```

## ChatInput

```ts
interface ChatInputProps {
    /** Controlled input value */
    value?: string;
    /** Called on text change */
    onChange?: (value: string) => void;
    /** Called when user sends a message */
    onSend?: (message: string) => void;
    /** Called when files are attached */
    onAttach?: (files: FileList) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Disable the input */
    disabled?: boolean;
    /** Show loading spinner on send button */
    loading?: boolean;
    /** Max character limit */
    maxLength?: number;
    /** Show attachment button */
    showAttachment?: boolean;
    /** Max rows before scrolling */
    maxRows?: number;
    /** Auto-focus on mount */
    autoFocus?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const ChatInput: React.ForwardRefExoticComponent<ChatInputProps & React.RefAttributes<HTMLTextAreaElement>>;
```

## Checkbox

```ts
interface CheckboxProps {
    /** Controlled checked state or indeterminate */
    checked?: boolean | "indeterminate";
    /** Callback fired when checked state changes */
    onCheckedChange?: (checked: boolean | "indeterminate") => void;
    /** Label text beside the checkbox */
    label?: string;
    /** Disable interaction and dim the checkbox */
    disabled?: boolean;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLDivElement>>;
```

## Chip

```ts
interface ChipProps {
    children: React.ReactNode;
    /** Visual style variant */
    variant?: "raised" | "outlined" | "filled";
    /** Color theme of the chip */
    color?: "default" | "primary" | "success" | "danger" | "warning";
    /** Size of the chip */
    size?: "sm" | "md" | "lg";
    /** Icon displayed before the label */
    icon?: React.ReactNode;
    /** Show a remove button */
    removable?: boolean;
    /** Called when remove button is clicked */
    onRemove?: () => void;
    /** Whether the chip is selected */
    selected?: boolean;
    /** Click handler for interactive chips */
    onClick?: () => void;
    /** Disable interaction */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Chip: React.FC<ChipProps>;
```

## CodeBlock

```ts
interface CodeBlockProps {
    /** Source code string to display */
    code: string;
    /** Programming language label */
    language?: string;
    /** Title shown in the header */
    title?: string;
    /** Display line numbers */
    showLineNumbers?: boolean;
    /** Show copy-to-clipboard button */
    showCopyButton?: boolean;
    /** Max scrollable height in pixels */
    maxHeight?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const CodeBlock: React.FC<CodeBlockProps>;
```

## ColorPicker

```ts
interface ColorPickerProps {
    /** Controlled hex color value */
    value?: string;
    /** Initial color when uncontrolled */
    defaultValue?: string;
    /** Called when color changes */
    onChange?: (color: string) => void;
    /** Array of preset hex color swatches */
    presets?: string[];
    /** Label text above the picker */
    label?: string;
    /** Show hex input and preview */
    showInput?: boolean;
    /** Disable the picker */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const ColorPicker: React.ForwardRefExoticComponent<ColorPickerProps & React.RefAttributes<HTMLDivElement>>;
```

## Combobox

```ts
export interface ComboboxOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}
interface ComboboxProps {
    /** Available options to select from */
    options: ComboboxOption[];
    /** Currently selected option value */
    value?: string;
    /** Callback when selected value changes */
    onValueChange?: (value: string) => void;
    /** Label text above the combobox */
    label?: string;
    /** Placeholder when no option is selected */
    placeholder?: string;
    /** Placeholder for the search input */
    searchPlaceholder?: string;
    /** Message shown when no options match */
    emptyMessage?: string;
    /** Whether the combobox is disabled */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Combobox: React.FC<ComboboxProps>;
```

## Command

```ts
export interface CommandItem {
    value: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    shortcut?: string;
    keywords?: string[];
    onSelect?: () => void;
    group?: string;
}
interface CommandProps {
    /** Controlled open state of the palette */
    open?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Command items to display */
    items: CommandItem[];
    /** Placeholder text for the search input */
    placeholder?: string;
    /** Message shown when no results match */
    emptyMessage?: string;
    /** Accessible title for the dialog */
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Command: React.FC<CommandProps>;
```

## CommandMenu

```ts
export interface CommandMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    group?: string;
    onSelect?: () => void;
    disabled?: boolean;
}
interface CommandMenuProps {
    /** Available command items */
    items: CommandMenuItem[];
    /** Controlled open state */
    open?: boolean;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Search input placeholder text */
    placeholder?: string;
    /** Message when no results match */
    emptyMessage?: string;
    /** Keyboard shortcut key (with Cmd/Ctrl) */
    trigger?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const CommandMenu: React.FC<CommandMenuProps>;
```

## ComparisonTable

```ts
interface ComparisonPlan {
    name: string;
    highlight?: boolean;
    values: (string | boolean)[];
}
interface ComparisonTableProps {
    /** List of feature names for rows */
    features: string[];
    /** Plans to compare across columns */
    plans: ComparisonPlan[];
    className?: string;
    style?: React.CSSProperties;
}
export declare const ComparisonTable: React.FC<ComparisonTableProps>;
```

## ConfirmDialog

```ts
interface ConfirmDialogInput {
    placeholder?: string;
    matchValue?: string;
}
interface ConfirmDialogProps {
    /** Whether the dialog is visible */
    open: boolean;
    /** Callback when visibility changes */
    onOpenChange: (open: boolean) => void;
    /** Dialog heading text */
    title: string;
    /** Explanatory text below the title */
    description?: string;
    /** Icon displayed before the title */
    icon?: string;
    /** Visual style: default or danger */
    variant?: "default" | "danger";
    /** Text for the confirm button */
    confirmLabel?: string;
    /** Text for the cancel button */
    cancelLabel?: string;
    /** Callback when user confirms */
    onConfirm: () => void;
    /** Callback when user cancels */
    onCancel?: () => void;
    /** Optional confirmation text input config */
    input?: ConfirmDialogInput;
    className?: string;
    style?: React.CSSProperties;
}
export declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
```

## Container

```ts
type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
interface ContainerProps {
    /** Max-width breakpoint preset */
    size?: ContainerSize;
    /** Center horizontally with auto margins */
    centered?: boolean;
    /** Apply horizontal padding */
    padding?: boolean;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Container: React.FC<ContainerProps>;
```

## ContextMenu

```ts
interface ContextMenuItem {
    label?: string;
    icon?: React.ReactNode;
    danger?: boolean;
    separator?: boolean;
    onSelect?: () => void;
}
interface ContextMenuProps {
    /** Element that activates the context menu */
    trigger: React.ReactNode;
    /** Menu items to display on right-click */
    items: ContextMenuItem[];
    className?: string;
    style?: React.CSSProperties;
}
export declare const ContextMenu: React.FC<ContextMenuProps>;
```

## CookieConsent

```ts
export interface CookieOption {
    label: string;
    required?: boolean;
    defaultChecked?: boolean;
}
interface CookieConsentProps {
    /** Heading text for the banner */
    title?: string;
    /** Explanatory text about cookies */
    description?: string;
    /** URL to the privacy policy page */
    privacyLink?: string;
    /** Cookie category toggle options */
    options?: CookieOption[];
    /** Callback when user accepts all cookies */
    onAccept?: (selected: string[]) => void;
    /** Callback when user customizes preferences */
    onCustomize?: (selected: string[]) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const CookieConsent: React.FC<CookieConsentProps>;
```

## CopyButton

```ts
interface CopyButtonProps {
    /** Text to copy to clipboard */
    text: string;
    /** Button label before copying */
    label?: string;
    /** Label shown after copying */
    copiedLabel?: string;
    /** Visual style variant */
    variant?: "raised" | "flat" | "icon";
    /** Button size */
    size?: "sm" | "md";
    className?: string;
    style?: React.CSSProperties;
}
export declare const CopyButton: React.FC<CopyButtonProps>;
```

## Countdown

```ts
interface CountdownProps {
    /** Target date to count down to */
    targetDate: Date | string | number;
    /** Called when countdown reaches zero */
    onComplete?: () => void;
    /** Show the days unit */
    showDays?: boolean;
    /** Show the hours unit */
    showHours?: boolean;
    /** Show the minutes unit */
    showMinutes?: boolean;
    /** Show the seconds unit */
    showSeconds?: boolean;
    /** Custom labels for each time unit */
    labels?: {
        days?: string;
        hours?: string;
        minutes?: string;
        seconds?: string;
    };
    /** Size of the countdown boxes */
    size?: "sm" | "md" | "lg";
    /** Visual style variant */
    variant?: "raised" | "inset";
    className?: string;
    style?: React.CSSProperties;
}
export declare const Countdown: React.FC<CountdownProps>;
```

## DataTable

```ts
interface DataTableProps<TData> {
    /** Column definitions for the table */
    columns: ColumnDef<TData, unknown>[];
    /** Array of row data to display */
    data: TData[];
    /** Show loading spinner overlay */
    loading?: boolean;
    /** Content shown when data is empty */
    empty?: React.ReactNode;
    /** Number of rows per page */
    pageSize?: number;
    /** Show pagination controls below table */
    showPagination?: boolean;
    /** Callback when a row is clicked */
    onRowClick?: (row: TData) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare function DataTable<TData>({ columns, data, loading, empty, pageSize, showPagination, onRowClick, className, style, ...rest }: DataTableProps<TData> & React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export declare namespace DataTable {
    var displayName: string;
}
```

## DatePicker

```ts
interface DatePickerProps {
    /** Currently selected date */
    value?: Date;
    /** Callback fired when date selection changes */
    onChange?: (date: Date | undefined) => void;
    /** Label text displayed above the picker */
    label?: string;
    /** Text shown when no date is selected */
    placeholder?: string;
    /** Disable the date picker */
    disabled?: boolean;
    /** Date-fns format string for display */
    dateFormat?: string;
    /** Earliest selectable date */
    minDate?: Date;
    /** Latest selectable date */
    maxDate?: Date;
    className?: string;
    style?: React.CSSProperties;
}
export declare const DatePicker: React.FC<DatePickerProps>;
```

## DateRangePicker

```ts
interface DateRangePickerProps {
    /** Label text above the input */
    label?: string;
    /** Initial start date (YYYY-MM-DD) */
    startDate?: string;
    /** Initial end date (YYYY-MM-DD) */
    endDate?: string;
    /** Called with selected start and end dates */
    onChange?: (start: string, end: string) => void;
    /** Placeholder text when empty */
    placeholder?: string;
    /** Disable the picker */
    disabled?: boolean;
    /** Error message below the input */
    error?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const DateRangePicker: React.ForwardRefExoticComponent<DateRangePickerProps & React.RefAttributes<HTMLDivElement>>;
```

## Divider

```ts
interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Layout direction of the divider */
    orientation?: "horizontal" | "vertical";
    /** Text label displayed in the center */
    label?: string;
    /** Visual style variant */
    variant?: "solid" | "inset";
}
export declare const Divider: React.FC<DividerProps>;
```

## Dock

```ts
export interface DockItem {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    badge?: number;
}
interface DockProps {
    /** Dock items with icons and actions */
    items: DockItem[];
    /** Dock placement on screen */
    position?: "bottom" | "top";
    /** Max scale factor on hover */
    magnification?: number;
    /** Base icon size in pixels */
    baseSize?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Dock: React.FC<DockProps>;
```

## DonutChart

```ts
export interface DonutSegment {
    label: string;
    value: number;
    color: string;
}
interface DonutChartProps {
    /** Data segments for the donut chart */
    segments: DonutSegment[];
    /** Diameter of the donut in pixels */
    size?: number;
    /** Thickness of the donut ring */
    strokeWidth?: number;
    /** Small label in the donut center */
    centerLabel?: string;
    /** Large value in the donut center */
    centerValue?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const DonutChart: React.FC<DonutChartProps>;
```

## Drawer

```ts
interface DrawerProps {
    /** Whether the drawer is visible */
    open: boolean;
    /** Callback fired when open state changes */
    onOpenChange: (open: boolean) => void;
    /** Edge of the screen the drawer slides from */
    side?: "left" | "right" | "bottom";
    /** Heading text in the drawer header */
    title?: string;
    /** Accessible name when no visible title is provided */
    ariaLabel?: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Drawer: React.FC<DrawerProps>;
```

## DropdownMenu

```ts
export interface DropdownItem {
    type?: "item";
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    onSelect?: () => void;
    disabled?: boolean;
    danger?: boolean;
}
export interface DropdownSeparator {
    type: "separator";
}
export interface DropdownLabel {
    type: "label";
    label: string;
}
export type DropdownEntry = DropdownItem | DropdownSeparator | DropdownLabel;
interface DropdownMenuProps {
    /** Element that opens the dropdown */
    trigger: React.ReactNode;
    /** Menu entries to render */
    items: DropdownEntry[];
    /** Horizontal alignment of the menu */
    align?: "start" | "center" | "end";
    /** Preferred side to display the menu */
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
    style?: React.CSSProperties;
}
export declare const DropdownMenu: React.FC<DropdownMenuProps>;
```

## EmptyState

```ts
interface EmptyStateProps {
    /** Custom icon element */
    icon?: React.ReactNode;
    /** Heading text for the empty state */
    title: string;
    /** Supporting description text */
    description?: string;
    /** Action button or element */
    action?: React.ReactNode;
    /** Size of the empty state layout */
    size?: "sm" | "md" | "lg";
    className?: string;
    style?: React.CSSProperties;
}
export declare const EmptyState: React.FC<EmptyStateProps>;
```

## FileUpload

```ts
export interface UploadedFile {
    id: string;
    file: File;
    preview?: string;
    progress?: number;
    error?: string;
}
interface FileUploadProps {
    /** Controlled uploaded files array */
    value?: UploadedFile[];
    /** Called when files change */
    onChange?: (files: UploadedFile[]) => void;
    /** Allow selecting multiple files */
    multiple?: boolean;
    /** Accepted file types (e.g. "image/*") */
    accept?: string;
    /** Maximum file size in bytes */
    maxSize?: number;
    /** Maximum number of files allowed */
    maxFiles?: number;
    /** Drop zone label text */
    label?: string;
    /** Hint text below the label */
    hint?: string;
    /** Disable the upload area */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const FileUpload: React.ForwardRefExoticComponent<FileUploadProps & React.RefAttributes<HTMLDivElement>>;
```

## FormField

```ts
interface FormFieldProps {
    /** Field label text */
    label?: string;
    /** Linked input id for the label */
    htmlFor?: string;
    /** Helper text below the field */
    helperText?: string;
    /** Error message below the field */
    error?: string;
    /** Show required asterisk on label */
    required?: boolean;
    children: React.ReactNode;
    /** Use horizontal label-input layout */
    horizontal?: boolean;
    className?: string;
}
export declare const FormField: React.ForwardRefExoticComponent<FormFieldProps & React.RefAttributes<HTMLDivElement>>;
```

## GaugeChart

```ts
interface GaugeChartProps {
    /** Current gauge value */
    value: number;
    /** Maximum value for the gauge */
    max?: number;
    /** Pixel width and height of the SVG */
    size?: number;
    /** Thickness of the gauge arc stroke */
    strokeWidth?: number;
    /** Custom color for the gauge fill arc */
    color?: string;
    /** Text label below the center value */
    label?: string;
    /** Display the numeric value in center */
    showValue?: boolean;
    /** Unit suffix appended to the value */
    suffix?: string;
    /** Enable arc fill animation on mount */
    animate?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const GaugeChart: React.FC<GaugeChartProps>;
```

## Grid

```ts
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Number of grid columns */
    cols?: number;
    /** Number of grid rows */
    rows?: number;
    /** Spacing between grid items */
    gap?: number | string;
    /** Vertical spacing between rows */
    rowGap?: number | string;
    /** Horizontal spacing between columns */
    colGap?: number | string;
    /** Minimum child width for auto-fit */
    minChildWidth?: string;
    /** Vertical alignment of grid items */
    alignItems?: React.CSSProperties["alignItems"];
    /** Horizontal alignment of grid items */
    justifyItems?: React.CSSProperties["justifyItems"];
    /** Alignment of the grid content vertically */
    alignContent?: React.CSSProperties["alignContent"];
    /** Alignment of the grid content horizontally */
    justifyContent?: React.CSSProperties["justifyContent"];
    /** Grid auto-flow direction */
    flow?: "row" | "column" | "dense" | "row dense" | "column dense";
    /** Custom grid-template-columns value */
    templateColumns?: string;
    /** Custom grid-template-rows value */
    templateRows?: string;
    /** Named grid template areas */
    areas?: string;
    /** Use inline-grid display */
    inline?: boolean;
    /** Size of implicitly created rows */
    autoRows?: string;
    /** Size of implicitly created columns */
    autoCols?: string;
}
interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Number of columns to span */
    span?: number;
    /** Column start position */
    start?: number;
    /** Column end position */
    end?: number;
    /** Number of rows to span */
    rowSpan?: number;
    /** Row start position */
    rowStart?: number;
    /** Row end position */
    rowEnd?: number;
    /** Visual order of the item */
    order?: number;
    /** Named grid area to place item */
    area?: string;
    /** Vertical self-alignment */
    alignSelf?: React.CSSProperties["alignSelf"];
    /** Horizontal self-alignment */
    justifySelf?: React.CSSProperties["justifySelf"];
}
export declare const Grid: React.FC<GridProps>;
export declare const Col: React.FC<ColProps>;
```

## Heatmap

```ts
interface HeatmapProps {
    /** Grid values as flat or 2D array */
    data: number[][] | number[];
    /** Number of columns in the grid */
    cols?: number;
    /** Number of rows in the grid */
    rows?: number;
    /** RGB color string for cell fills */
    colors?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Heatmap: React.FC<HeatmapProps>;
```

## Hero

```ts
interface HeroProps {
    /** Small text displayed above the title */
    eyebrow?: string;
    /** Main heading content */
    title: React.ReactNode;
    /** Supporting text below the title */
    subtitle?: string;
    /** CTA buttons or action elements */
    actions?: React.ReactNode;
    /** CSS gradient for the background */
    backgroundGradient?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Hero: React.FC<HeroProps>;
```

## ImageGallery

```ts
export interface GalleryImage {
    src: string;
    alt?: string;
    caption?: string;
}
interface ImageGalleryProps {
    /** Array of images to display */
    images: GalleryImage[];
    /** Number of grid columns */
    columns?: number;
    /** Gap between images in pixels */
    gap?: number;
    /** Border radius for thumbnails */
    rounded?: number;
    /** Enable lightbox on click */
    lightbox?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const ImageGallery: React.FC<ImageGalleryProps>;
```

## InfiniteScroll

```ts
interface InfiniteScrollProps {
    children: React.ReactNode;
    /** Called when scroll reaches threshold */
    onLoadMore: () => void;
    /** Whether more items are available */
    hasMore: boolean;
    /** Currently loading more items */
    loading?: boolean;
    /** Custom loading indicator element */
    loader?: React.ReactNode;
    /** Shown when no more items remain */
    endMessage?: React.ReactNode;
    /** Trigger distance from bottom in pixels */
    threshold?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const InfiniteScroll: React.FC<InfiniteScrollProps>;
```

## InlineMessage

```ts
type InlineMessageVariant = "info" | "success" | "warning" | "danger";
interface InlineMessageProps {
    /** Message type and color */
    variant?: InlineMessageVariant;
    /** Custom icon overriding default */
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const InlineMessage: React.FC<InlineMessageProps>;
```

## Input

```ts
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Label text displayed above the input */
    label?: string;
    /** Hint text shown below the input */
    helperText?: string;
    /** Error message replaces helper text */
    error?: string;
    /** Icon element displayed before the input */
    leftIcon?: React.ReactNode;
    /** Icon element displayed after the input */
    rightIcon?: React.ReactNode;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
```

## InputGroup

```ts
interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Label text above the input */
    label?: string;
    /** Helper text below the input */
    helperText?: string;
    /** Error message below the input */
    error?: string;
    /** Addon element on the left side */
    leftAddon?: React.ReactNode;
    /** Addon element on the right side */
    rightAddon?: React.ReactNode;
    /** Inline icon on the left */
    leftElement?: React.ReactNode;
    /** Inline icon on the right */
    rightElement?: React.ReactNode;
}
export declare const InputGroup: React.ForwardRefExoticComponent<InputGroupProps & React.RefAttributes<HTMLInputElement>>;
```

## KanbanBoard

```ts
interface KanbanTag {
    label: string;
    variant?: "green" | "coral" | "blue" | "yellow";
}
interface KanbanItem {
    id: string;
    title: string;
    tag?: KanbanTag;
    assignee?: string;
    progress?: number;
}
interface KanbanColumn {
    id: string;
    title: string;
    count?: number;
    countColor?: string;
    items: KanbanItem[];
}
interface KanbanBoardProps {
    /** Array of kanban columns with items */
    columns: KanbanColumn[];
    className?: string;
    style?: React.CSSProperties;
}
export declare const KanbanBoard: React.FC<KanbanBoardProps>;
```

## Kbd

```ts
interface KbdProps {
    children: React.ReactNode;
    /** Size of the keyboard key badge */
    size?: "sm" | "md" | "lg";
    className?: string;
    style?: React.CSSProperties;
}
export declare const Kbd: React.FC<KbdProps>;
```

## LineChart

```ts
export interface LineChartDataItem {
    label: string;
    value: number;
}
interface LineChartProps {
    /** Array of data points for the line */
    data: LineChartDataItem[];
    /** Chart height in pixels */
    height?: number;
    /** Line and fill color */
    color?: string;
    /** Show dots at each data point */
    showDots?: boolean;
    /** Show gradient fill under the line */
    showFill?: boolean;
    /** Enable draw-in animation */
    animate?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const LineChart: React.FC<LineChartProps>;
```

## LinkPreview

```ts
interface LinkPreviewProps {
    /** URL the link points to */
    href: string;
    /** Preview card title text */
    title: string;
    /** Short description for the preview */
    description?: string;
    /** Preview image URL */
    image?: string;
    /** Site favicon URL */
    favicon?: string;
    children: React.ReactNode;
    /** Tooltip position relative to link */
    side?: "top" | "bottom";
    className?: string;
    style?: React.CSSProperties;
}
export declare const LinkPreview: React.FC<LinkPreviewProps>;
```

## LoadingOverlay

```ts
interface LoadingOverlayProps {
    /** Whether the loading overlay is visible */
    loading: boolean;
    /** Text displayed below the spinner */
    message?: string;
    /** Accessible label announced by screen readers when loading starts */
    loadingLabel?: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const LoadingOverlay: React.FC<LoadingOverlayProps>;
```

## MarkdownEditor

```ts
interface MarkdownEditorProps {
    /** Markdown content value */
    value?: string;
    /** Called with updated markdown text */
    onChange?: (markdown: string) => void;
    /** Placeholder text when empty */
    placeholder?: string;
    /** Label text above the editor */
    label?: string;
    /** Minimum editor height in pixels */
    minHeight?: number;
    /** Disable editing */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const MarkdownEditor: React.ForwardRefExoticComponent<MarkdownEditorProps & React.RefAttributes<HTMLDivElement>>;
```

## Marquee

```ts
interface MarqueeProps {
    children: React.ReactNode;
    /** Animation duration in seconds */
    speed?: number;
    /** Scroll direction of the marquee */
    direction?: "left" | "right";
    /** Pause scrolling when hovered */
    pauseOnHover?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Marquee: React.FC<MarqueeProps>;
/** Pre-styled item for use inside Marquee */
export declare const MarqueeItem: React.FC<{
    children: React.ReactNode;
}>;
```

## Masonry

```ts
interface MasonryProps {
    /** Number of masonry columns */
    columns?: number;
    /** Gap between items in pixels */
    gap?: number;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Masonry: React.FC<MasonryProps>;
```

## MegaMenu

```ts
export interface MegaMenuItem {
    label: string;
    panel: React.ReactNode;
}
interface MegaMenuProps {
    /** Menu items with expandable panels */
    items: MegaMenuItem[];
    className?: string;
    style?: React.CSSProperties;
}
export declare const MegaMenu: React.FC<MegaMenuProps>;
```

## MessageList

```ts
export interface ChatMessage {
    /** Unique message ID */
    id: string;
    /** Message sender role */
    role: "user" | "assistant" | "system";
    /** Message content (string or JSX) */
    content: React.ReactNode;
    /** Message timestamp */
    timestamp?: Date;
    /** Avatar image URL */
    avatar?: string;
    /** Sender display name */
    name?: string;
}
interface MessageListProps {
    /** Array of chat messages */
    messages: ChatMessage[];
    /** Custom message renderer */
    renderMessage?: (message: ChatMessage) => React.ReactNode;
    /** Show loading indicator at top */
    loading?: boolean;
    /** Custom empty state content */
    emptyState?: React.ReactNode;
    /** Show date separators between days */
    showDaySeparators?: boolean;
    /** Called when scrolled to top (pagination) */
    onScrollTop?: () => void;
    /** Auto-scroll to bottom on new messages */
    autoScroll?: boolean;
    /** Maximum height of the message list */
    maxHeight?: string | number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const MessageList: React.FC<MessageListProps>;
```

## Modal

```ts
interface ModalProps {
    /** Controlled open state of the modal */
    open?: boolean;
    /** Callback fired when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Element that opens the modal on click */
    trigger?: React.ReactNode;
    /** Heading text in the modal header */
    title?: string;
    /** Subtext below the title */
    description?: string;
    children: React.ReactNode;
    /** Width preset of the modal dialog */
    size?: "sm" | "md" | "lg";
    className?: string;
    style?: React.CSSProperties;
}
export declare const Modal: React.FC<ModalProps>;
```

## MultiSelect

```ts
export interface MultiSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface MultiSelectProps {
    /** Array of selectable options */
    options: MultiSelectOption[];
    /** Controlled array of selected values */
    value?: string[];
    /** Callback fired when selection changes */
    onChange?: (selected: string[]) => void;
    /** Label text displayed above the select */
    label?: string;
    /** Text shown when nothing is selected */
    placeholder?: string;
    /** Maximum number of selectable items */
    maxSelected?: number;
    /** Enable search filtering in the dropdown */
    searchable?: boolean;
    /** Disable the multi-select */
    disabled?: boolean;
    /** Error message shown below the trigger */
    error?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const MultiSelect: React.ForwardRefExoticComponent<MultiSelectProps & React.RefAttributes<HTMLDivElement>>;
```

## MusicPlayerCard

```ts
interface MusicPlayerCardProps {
    /** Song title */
    title: string;
    /** Artist name */
    artist: string;
    /** Album name */
    album?: string;
    /** Cover art image URL */
    coverArt?: string;
    /** Total track duration string */
    duration?: string;
    /** Current playback time string */
    currentTime?: string;
    /** Playback progress percentage (0-100) */
    progress?: number;
    /** Whether the track is playing */
    playing?: boolean;
    /** Called when play is pressed */
    onPlay?: () => void;
    /** Called when pause is pressed */
    onPause?: () => void;
    /** Called when next track is pressed */
    onNext?: () => void;
    /** Called when previous track is pressed */
    onPrev?: () => void;
    /** Called when shuffle is toggled */
    onShuffle?: () => void;
    /** Called when repeat is toggled */
    onRepeat?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const MusicPlayerCard: React.FC<MusicPlayerCardProps>;
```

## Navbar

```ts
interface NavLink {
    label: string;
    href: string;
    active?: boolean;
}
interface NavbarProps {
    /** Custom logo element */
    logo?: React.ReactNode;
    /** Brand name text */
    brand?: string;
    /** Navigation link items */
    links: NavLink[];
    /** Action buttons on the right */
    actions?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Navbar: React.FC<NavbarProps>;
```

## NotificationCard

```ts
export type NotificationVariant = "default" | "success" | "warning" | "danger" | "info";
export interface NotificationCardProps {
    /** Icon displayed beside the title */
    icon?: React.ReactNode;
    /** Notification heading text */
    title: string;
    /** Supporting detail text */
    description?: string;
    /** Timestamp display string */
    time?: string;
    /** Color variant for the notification */
    variant?: NotificationVariant;
    /** Show unread indicator */
    unread?: boolean;
    /** Action element below description */
    action?: React.ReactNode;
    /** Called when dismiss button is clicked */
    onDismiss?: () => void;
    /** Card click handler */
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const NotificationCard: React.FC<NotificationCardProps>;
```

## NotificationCenter

```ts
export interface NotificationItem {
    id: string;
    icon?: React.ReactNode;
    title: string;
    description?: string;
    time: string;
    read?: boolean;
    group?: string;
}
interface NotificationCenterProps {
    /** List of notification items */
    notifications: NotificationItem[];
    /** Called when a notification is read */
    onRead?: (id: string) => void;
    /** Mark all notifications as read */
    onReadAll?: () => void;
    /** Remove a notification by id */
    onClear?: (id: string) => void;
    /** Custom trigger button element */
    trigger?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const NotificationCenter: React.FC<NotificationCenterProps>;
```

## NumberInput

```ts
interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> {
    /** Label text displayed above the input */
    label?: string;
    /** Hint text shown below the input */
    helperText?: string;
    /** Error message replaces helper text */
    error?: string;
    /** Controlled numeric value */
    value?: number;
    /** Initial value when uncontrolled */
    defaultValue?: number;
    /** Callback fired when value changes */
    onChange?: (value: number) => void;
    /** Minimum allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Step increment for stepper buttons */
    step?: number;
}
export declare const NumberInput: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<HTMLInputElement>>;
```

## Onboarding

```ts
export interface OnboardingStep {
    target: string;
    title: string;
    description: string;
    position?: "top" | "bottom" | "left" | "right";
}
interface OnboardingProps {
    /** Guided tour steps with targets */
    steps: OnboardingStep[];
    /** Whether the onboarding is active */
    active?: boolean;
    /** Called when all steps are completed */
    onComplete?: () => void;
    /** Called when user skips the tour */
    onSkip?: () => void;
    className?: string;
}
export declare const Onboarding: React.FC<OnboardingProps>;
```

## OTPInput

```ts
interface OTPInputProps {
    /** Number of OTP digits */
    length?: number;
    /** Current OTP string value */
    value?: string;
    /** Called on each digit change */
    onChange?: (value: string) => void;
    /** Called when all digits are filled */
    onComplete?: (value: string) => void;
    /** Disable the input */
    disabled?: boolean;
    /** Show error state styling */
    error?: boolean;
    /** Hide digits with mask character */
    masked?: boolean;
    /** Focus the input on mount */
    autoFocus?: boolean;
    /** Label text above the input */
    label?: string;
    /** Size of each digit cell */
    size?: "sm" | "md" | "lg";
    className?: string;
    style?: React.CSSProperties;
}
export declare const OTPInput: React.ForwardRefExoticComponent<OTPInputProps & React.RefAttributes<HTMLDivElement>>;
```

## Pagination

```ts
interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    /** Current active page number */
    page: number;
    /** Total number of pages */
    total: number;
    /** Callback fired when page changes */
    onChange: (page: number) => void;
    /** Number of sibling pages around current */
    siblings?: number;
    /** Size preset of pagination buttons */
    size?: "sm" | "md" | "lg";
}
export declare const Pagination: React.FC<PaginationProps>;
```

## PasswordInput

```ts
interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    /** Label text displayed above the input */
    label?: string;
    /** Hint text shown below the input */
    helperText?: string;
    /** Error message replaces helper text */
    error?: string;
    /** Show a password strength meter below input */
    showStrength?: boolean;
}
export declare const PasswordInput: React.ForwardRefExoticComponent<PasswordInputProps & React.RefAttributes<HTMLInputElement>>;
```

## PhoneInput

```ts
export interface CountryCode {
    code: string;
    dial: string;
    flag: string;
    name: string;
}
interface PhoneInputProps {
    /** Label text above the input */
    label?: string;
    /** Helper text below the input */
    helperText?: string;
    /** Error message below the input */
    error?: string;
    /** Phone number value */
    value?: string;
    /** Called with full number, dial code, phone */
    onChange?: (fullNumber: string, dialCode: string, phone: string) => void;
    /** Default country ISO code */
    defaultCountry?: string;
    /** Available countries for selection */
    countries?: CountryCode[];
    /** Input placeholder text */
    placeholder?: string;
    /** Disable the input */
    disabled?: boolean;
    /** HTML id attribute */
    id?: string;
    className?: string;
}
export declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<HTMLDivElement>>;
```

## PinInput

```ts
interface PinInputProps {
    /** Number of pin digits */
    length?: number;
    /** Label text above the input */
    label?: string;
    /** Helper text below the input */
    helperText?: string;
    /** Error message below the input */
    error?: string;
    /** Mask digits like a password */
    mask?: boolean;
    /** Called on each digit change */
    onChange?: (value: string) => void;
    /** Called when all digits are filled */
    onComplete?: (value: string) => void;
    /** Disable the input */
    disabled?: boolean;
    /** Size of each pin cell */
    size?: "sm" | "md" | "lg";
    /** HTML id attribute */
    id?: string;
    className?: string;
}
export declare const PinInput: React.ForwardRefExoticComponent<PinInputProps & React.RefAttributes<HTMLDivElement>>;
```

## Popover

```ts
interface PopoverProps {
    /** Element that triggers the popover */
    trigger: React.ReactNode;
    children: React.ReactNode;
    /** Preferred side to display the popover */
    side?: "top" | "right" | "bottom" | "left";
    /** Alignment relative to the trigger */
    align?: "start" | "center" | "end";
    /** Controlled open state */
    open?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Popover: React.FC<PopoverProps>;
```

## PricingCard

```ts
interface PricingFeature {
    label: string;
    included: boolean;
}
interface PricingPlan {
    name: string;
    price: string;
    period?: string;
    features: PricingFeature[];
    highlighted?: boolean;
    cta: {
        label: string;
        variant?: "primary" | "clay";
    };
    badge?: string;
}
interface PricingCardProps {
    /** Array of pricing plans to display */
    plans: PricingPlan[];
    /** Callback when a plan CTA is clicked */
    onCtaClick?: (planName: string) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const PricingCard: React.FC<PricingCardProps>;
```

## Progress

```ts
type ProgressVariant = "default" | "success" | "danger" | "warning";
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Current progress value */
    value: number;
    /** Maximum value for the progress bar */
    max?: number;
    /** Color variant of the progress fill */
    variant?: ProgressVariant;
    /** Display the percentage text */
    showLabel?: boolean;
    /** Label text displayed above the bar */
    label?: string;
    /** Height preset of the progress track */
    size?: "sm" | "md" | "lg";
    /** Enable fill animation on mount */
    animate?: boolean;
}
export declare const Progress: React.FC<ProgressProps>;
```

## PromptCard

```ts
interface PromptCardProps {
    /** Icon displayed at the top */
    icon?: React.ReactNode;
    /** Card title text */
    title: string;
    /** Short description below the title */
    description?: string;
    /** Category badge text */
    category?: string;
    /** The prompt text sent on click */
    prompt: string;
    /** Called with the prompt text on click */
    onClick?: (prompt: string) => void;
    /** Disable interaction */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const PromptCard: React.FC<PromptCardProps>;
interface PromptGridProps {
    /** Array of prompt card data */
    prompts: Omit<PromptCardProps, "onClick">[];
    /** Called when a prompt card is selected */
    onSelect: (prompt: string) => void;
    /** Number of grid columns */
    columns?: 1 | 2 | 3 | 4;
    className?: string;
    style?: React.CSSProperties;
}
export declare const PromptGrid: React.FC<PromptGridProps>;
```

## QRCode

```ts
interface QRCodeProps {
    /** Data string encoded in the QR code */
    value: string;
    /** Width and height in pixels */
    size?: number;
    /** Foreground module color */
    fgColor?: string;
    /** Background color */
    bgColor?: string;
    /** Use rounded QR modules */
    rounded?: boolean;
    /** Caption text below the code */
    label?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const QRCode: React.FC<QRCodeProps>;
```

## RadarChart

```ts
export interface RadarChartDataItem {
    label: string;
    value: number;
}
interface RadarChartProps {
    /** Data points for each axis */
    data: RadarChartDataItem[];
    /** Width and height in pixels */
    size?: number;
    /** Fill and stroke color */
    color?: string;
    /** Maximum scale value for axes */
    maxValue?: number;
    /** Show axis labels */
    showLabels?: boolean;
    /** Show values near data points */
    showValues?: boolean;
    /** Number of concentric guide rings */
    rings?: number;
    /** Enable entrance animation */
    animate?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RadarChart: React.FC<RadarChartProps>;
```

## RadioGroup

```ts
interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}
interface RadioGroupProps {
    /** Array of radio options to render */
    options: RadioOption[];
    /** Controlled selected value */
    value?: string;
    /** Initial selected value when uncontrolled */
    defaultValue?: string;
    /** Callback fired when selection changes */
    onValueChange?: (value: string) => void;
    /** Group label displayed above the options */
    label?: string;
    /** Layout direction of radio items */
    orientation?: "horizontal" | "vertical";
    /** Disable all radio items in the group */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
```

## Rating

```ts
interface RatingProps {
    /** Controlled rating value */
    value?: number;
    /** Initial value when uncontrolled */
    defaultValue?: number;
    /** Callback fired when rating changes */
    onChange?: (value: number) => void;
    /** Total number of rating icons */
    max?: number;
    /** Size preset of the rating icons */
    size?: "sm" | "md" | "lg";
    /** Shape of the rating icon */
    icon?: "star" | "heart";
    /** Prevent user interaction, display only */
    readOnly?: boolean;
    /** Disable and dim the rating */
    disabled?: boolean;
    /** Allow half-step rating values */
    allowHalf?: boolean;
    /** Label text displayed above the rating */
    label?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Rating: React.ForwardRefExoticComponent<RatingProps & React.RefAttributes<HTMLDivElement>>;
```

## ResizablePanels

```ts
interface ResizablePanelsProps {
    /** Split direction of the panels */
    direction?: "horizontal" | "vertical";
    /** Initial size of the first panel (%) */
    defaultSize?: number;
    /** Minimum panel size percentage */
    minSize?: number;
    /** Maximum panel size percentage */
    maxSize?: number;
    children: [React.ReactNode, React.ReactNode];
    className?: string;
    style?: React.CSSProperties;
}
export declare const ResizablePanels: React.FC<ResizablePanelsProps>;
```

## Reveal

```ts
interface RevealProps {
    children: React.ReactNode;
    /** Animation delay in milliseconds */
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Reveal: React.FC<RevealProps>;
```

## RichTextEditor

```ts
interface RichTextEditorProps {
    /** HTML content value */
    value?: string;
    /** Called with updated HTML content */
    onChange?: (html: string) => void;
    /** Placeholder text when empty */
    placeholder?: string;
    /** Label text above the editor */
    label?: string;
    /** Minimum editor height in pixels */
    minHeight?: number;
    /** Disable editing */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RichTextEditor: React.ForwardRefExoticComponent<RichTextEditorProps & React.RefAttributes<HTMLDivElement>>;
```

## ScrollArea

```ts
interface ScrollAreaProps {
    children: React.ReactNode;
    /** Maximum height before scrolling */
    maxHeight?: number | string;
    /** Hide the custom scrollbar */
    hideScrollbar?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const ScrollArea: React.FC<ScrollAreaProps>;
```

## SegmentedControl

```ts
interface SegmentOption {
    value: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
}
interface SegmentedControlProps {
    /** Segment options to render */
    options: SegmentOption[];
    /** Controlled selected value */
    value?: string;
    /** Initial value when uncontrolled */
    defaultValue?: string;
    /** Called when selection changes */
    onChange?: (value: string) => void;
    /** Size of the control */
    size?: "sm" | "md" | "lg";
    /** Stretch to fill container width */
    fullWidth?: boolean;
    /** Disable all segments */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const SegmentedControl: React.ForwardRefExoticComponent<SegmentedControlProps & React.RefAttributes<HTMLDivElement>>;
```

## Select

```ts
interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface SelectProps {
    /** Array of selectable options */
    options: SelectOption[];
    /** Controlled selected value */
    value?: string;
    /** Callback fired when selection changes */
    onValueChange?: (value: string) => void;
    /** Text shown when no option is selected */
    placeholder?: string;
    /** Label text displayed above the select */
    label?: string;
    /** Disable the select dropdown */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>>;
```

## Sheet

```ts
interface SheetProps {
    /** Whether the sheet is visible */
    open: boolean;
    /** Called when open state changes */
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
    /** Edge the sheet slides from */
    side?: "bottom" | "top" | "left" | "right";
    /** Sheet header title */
    title?: string;
    /** Sheet header description */
    description?: string;
    /** Show drag handle indicator */
    showHandle?: boolean;
    /** Snap point heights for dragging */
    snapPoints?: number[];
    className?: string;
    style?: React.CSSProperties;
}
export declare const Sheet: React.FC<SheetProps>;
```

## Sidebar

```ts
interface SidebarItem {
    label: string;
    icon?: React.ReactNode;
    badge?: string | number;
    active?: boolean;
    group?: string;
}
interface SidebarProps {
    /** Navigation items to display */
    items: SidebarItem[];
    /** Custom logo element */
    logo?: React.ReactNode;
    /** Brand name text */
    brand?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Sidebar: React.FC<SidebarProps>;
```

## Skeleton

```ts
type SkeletonVariant = "text" | "avatar" | "card" | "rect";
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Shape variant of the skeleton placeholder */
    variant?: SkeletonVariant;
    /** Custom width of the skeleton element */
    width?: string | number;
    /** Custom height of the skeleton element */
    height?: string | number;
    /** Number of lines for text variant */
    lines?: number;
}
export declare const Skeleton: React.FC<SkeletonProps>;
```

## Slider

```ts
interface SliderProps {
    /** Controlled slider value as array */
    value?: number[];
    /** Initial value when uncontrolled */
    defaultValue?: number[];
    /** Callback fired when value changes */
    onValueChange?: (value: number[]) => void;
    /** Minimum allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Step increment between values */
    step?: number;
    /** Label text displayed above the slider */
    label?: string;
    /** Display the current numeric value */
    showValue?: boolean;
    /** Disable interaction with the slider */
    disabled?: boolean;
    /** Accessible name for screen readers when no visible label is set */
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLDivElement>>;
```

## Snackbar

```ts
type SnackbarVariant = "default" | "success" | "danger" | "warning" | "info";
interface SnackbarItem {
    id: string;
    message: string;
    variant?: SnackbarVariant;
    action?: {
        label: string;
        onClick: () => void;
    };
    duration?: number;
}
interface SnackbarContextValue {
    snackbar: (opts: Omit<SnackbarItem, "id">) => void;
}
export declare const useSnackbar: () => SnackbarContextValue;
export declare const SnackbarProvider: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
```

## Sparkline

```ts
interface SparklineProps {
    /** Numeric data points to plot */
    data: number[];
    /** SVG width in pixels */
    width?: number;
    /** SVG height in pixels */
    height?: number;
    /** Line and fill color */
    color?: string;
    /** Show gradient fill below line */
    showFill?: boolean;
    /** Thickness of the line stroke */
    strokeWidth?: number;
    /** Enable draw animation */
    animate?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Sparkline: React.FC<SparklineProps>;
```

## SpeedDial

```ts
export interface SpeedDialAction {
    label: string;
    icon: React.ReactNode;
    color?: string;
    onClick?: () => void;
}
interface SpeedDialProps {
    /** Action items revealed on toggle */
    actions: SpeedDialAction[];
    /** Custom icon for the main FAB */
    icon?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const SpeedDial: React.FC<SpeedDialProps>;
```

## Spinner

```ts
type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerVariant = "default" | "primary" | "success" | "danger";
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Size preset of the spinner */
    size?: SpinnerSize;
    /** Color variant of the spinner arc */
    variant?: SpinnerVariant;
    /** Text displayed below the spinner */
    label?: string;
}
export declare const Spinner: React.FC<SpinnerProps>;
```

## StatsCard

```ts
interface StatsCardProps {
    /** Metric label displayed above the value */
    label: string;
    /** Numeric or formatted stat value */
    value: string | number;
    /** Trend indicator with direction */
    trend?: {
        value: string;
        direction: "up" | "down";
    };
    /** Accent color for the value text */
    color?: string;
    /** Additional description below the value */
    description?: string;
    /** Enable count-up animation on reveal */
    animate?: boolean;
    /** Animation duration in milliseconds */
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare function StatsCard({ label, value, trend, color, description, animate, duration, className, style, ...rest }: StatsCardProps): import("react/jsx-runtime").JSX.Element;
export declare namespace StatsCard {
    var displayName: string;
}
```

## Stepper

```ts
type StepStatus = "done" | "active" | "pending";
interface Step {
    label: string;
    description?: string;
    status: StepStatus;
}
interface StepperProps {
    /** Array of step definitions to render */
    steps: Step[];
    /** Layout direction of the stepper */
    orientation?: "vertical" | "horizontal";
    className?: string;
    style?: React.CSSProperties;
}
export declare const Stepper: React.FC<StepperProps>;
```

## Steps

```ts
export interface StepItem {
    title: string;
    description?: string;
    icon?: React.ReactNode;
}
interface StepsProps {
    /** Array of step items to render */
    steps: StepItem[];
    /** Zero-based index of the active step */
    current: number;
    /** Layout direction of the steps */
    direction?: "horizontal" | "vertical";
    /** Size preset of step circles and text */
    size?: "sm" | "md" | "lg";
    /** Callback fired when a step is clicked */
    onChange?: (step: number) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Steps: React.FC<StepsProps>;
```

## StreamingText

```ts
interface StreamingTextProps {
    /** Full text to stream character by character */
    text: string;
    /** Characters per second */
    speed?: number;
    /** Delay before starting (ms) */
    startDelay?: number;
    /** Show blinking cursor at end */
    showCursor?: boolean;
    /** Cursor character */
    cursorChar?: string;
    /** Called when streaming completes */
    onComplete?: () => void;
    /** Called on each character reveal */
    onCharacter?: (char: string, index: number) => void;
    /** Click to skip to end */
    skipOnClick?: boolean;
    /** Pause streaming */
    paused?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export interface StreamingTextHandle {
    skip: () => void;
    restart: () => void;
    pause: () => void;
    resume: () => void;
}
export declare const StreamingText: React.ForwardRefExoticComponent<StreamingTextProps & React.RefAttributes<StreamingTextHandle>>;
```

## Switch

```ts
interface SwitchProps {
    /** Controlled toggle state */
    checked?: boolean;
    /** Callback fired when toggle state changes */
    onCheckedChange?: (checked: boolean) => void;
    /** Label text beside the switch */
    label?: string;
    /** Secondary text shown below the label */
    description?: string;
    /** Disable interaction and dim the switch */
    disabled?: boolean;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLDivElement>>;
```

## TableOfContents

```ts
export interface TOCItem {
    id: string;
    text: string;
    level: number;
}
interface TableOfContentsProps {
    /** Heading items to list */
    items: TOCItem[];
    /** Controlled active section id */
    activeId?: string;
    /** Called when an item is clicked */
    onItemClick?: (id: string) => void;
    /** Navigation heading text */
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const TableOfContents: React.FC<TableOfContentsProps>;
```

## Tabs

```ts
interface Tab {
    value: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
}
interface TabsProps {
    /** Array of tab items to render */
    tabs: Tab[];
    /** Initially active tab value */
    defaultValue?: string;
    /** Visual style of the tab indicators */
    variant?: "pill" | "underline";
    className?: string;
    style?: React.CSSProperties;
}
export declare const Tabs: React.FC<TabsProps>;
```

## TagInput

```ts
interface TagInputProps {
    /** Controlled array of tag strings */
    value?: string[];
    /** Initial tags when uncontrolled */
    defaultValue?: string[];
    /** Called when tags change */
    onChange?: (tags: string[]) => void;
    /** Label text above the input */
    label?: string;
    /** Input placeholder text */
    placeholder?: string;
    /** Maximum number of allowed tags */
    maxTags?: number;
    /** Disable the input */
    disabled?: boolean;
    /** Show error state styling */
    error?: boolean;
    /** Helper text below the input */
    helperText?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const TagInput: React.ForwardRefExoticComponent<TagInputProps & React.RefAttributes<HTMLDivElement>>;
```

## TestimonialCard

```ts
interface TestimonialCardProps {
    /** Testimonial quote text */
    quote: string;
    /** Name of the person quoted */
    author: string;
    /** Author's role or title */
    role?: string;
    /** Author avatar image URL */
    avatar?: string;
    /** Star rating value */
    rating?: number;
    /** Maximum possible star rating */
    maxRating?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const TestimonialCard: React.FC<TestimonialCardProps>;
```

## Textarea

```ts
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Label text displayed above the textarea */
    label?: string;
    /** Hint text shown below the textarea */
    helperText?: string;
    /** Error message replaces helper text */
    error?: string;
    /** CSS resize behavior for the textarea */
    resize?: "none" | "both" | "horizontal" | "vertical";
}
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
```

## ThemeCustomizer

```ts
interface ThemeCustomizerProps {
    /** Called with updated CSS variable map */
    onThemeChange?: (vars: Record<string, string>) => void;
    /** Controlled open state */
    open?: boolean;
    /** Called when panel open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Fixed overlay or inline panel */
    position?: "fixed" | "inline";
    className?: string;
    style?: React.CSSProperties;
}
export declare const ThemeCustomizer: React.FC<ThemeCustomizerProps>;
```

## ThinkingIndicator

```ts
type ThinkingVariant = "dots" | "wave" | "pulse" | "typing";
type ThinkingSize = "sm" | "md" | "lg";
interface ThinkingIndicatorProps {
    /** Label text next to the animation */
    label?: string;
    /** Avatar image URL */
    avatar?: string;
    /** Animation style variant */
    variant?: ThinkingVariant;
    /** Size preset */
    size?: ThinkingSize;
    /** Custom accent color override */
    accentColor?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const ThinkingIndicator: React.FC<ThinkingIndicatorProps>;
```

## Timeline

```ts
export interface TimelineItem {
    title: string;
    description?: string;
    date?: string;
    icon?: React.ReactNode;
    color?: string;
}
interface TimelineProps {
    /** Timeline entries to render */
    items: TimelineItem[];
    /** Layout direction of the timeline */
    orientation?: "vertical" | "horizontal";
    /** Alternate items left and right */
    alternating?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Timeline: React.FC<TimelineProps>;
```

## TimePicker

```ts
interface TimePickerProps {
    /** Label text above the input */
    label?: string;
    /** Current time value (HH:MM) */
    value?: string;
    /** Called when time changes */
    onChange?: (time: string) => void;
    /** Use 24-hour format */
    use24Hour?: boolean;
    /** Minute increment step */
    minuteStep?: number;
    /** Placeholder text when empty */
    placeholder?: string;
    /** Disable the picker */
    disabled?: boolean;
    /** Error message below the input */
    error?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const TimePicker: React.ForwardRefExoticComponent<TimePickerProps & React.RefAttributes<HTMLDivElement>>;
```

## Toast

```ts
type ToastVariant = "default" | "success" | "danger" | "warning";
interface ToastItem {
    /** Unique identifier for the toast */
    id: string;
    /** Primary toast message text */
    message: string;
    /** Secondary description text */
    description?: string;
    /** Color variant for the toast */
    variant?: ToastVariant;
    /** Auto-dismiss duration in milliseconds */
    duration?: number;
}
interface ToastContextValue {
    toast: (opts: Omit<ToastItem, "id">) => void;
}
export declare const useToast: () => ToastContextValue;
export declare const ToastProvider: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
```

## ToggleGroup

```ts
interface ToggleOption {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}
interface ToggleGroupSingleProps {
    type: "single";
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}
interface ToggleGroupMultipleProps {
    type: "multiple";
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
}
type ToggleGroupProps = (ToggleGroupSingleProps | ToggleGroupMultipleProps) & {
    /** Toggle button options */
    options: ToggleOption[];
    /** Disable all toggle buttons */
    disabled?: boolean;
    /** Size of the toggle buttons */
    size?: "sm" | "md" | "lg";
    className?: string;
    style?: React.CSSProperties;
};
export declare const ToggleGroup: React.ForwardRefExoticComponent<ToggleGroupProps & React.RefAttributes<HTMLDivElement>>;
```

## Tooltip

```ts
interface TooltipProps {
    /** Content displayed inside the tooltip */
    content: React.ReactNode;
    children: React.ReactNode;
    /** Preferred side relative to the trigger */
    side?: "top" | "right" | "bottom" | "left";
    /** Delay in ms before tooltip appears */
    delayDuration?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Tooltip: React.FC<TooltipProps>;
```

## TreeView

```ts
export interface TreeNode {
    label: string;
    icon?: React.ReactNode;
    children?: TreeNode[];
}
interface TreeViewProps {
    /** Hierarchical tree nodes to display */
    nodes: TreeNode[];
    className?: string;
    style?: React.CSSProperties;
}
export declare const TreeView: React.FC<TreeViewProps>;
```

## UserCard

```ts
interface SocialLink {
    icon: React.ReactNode;
    href: string;
    label?: string;
}
interface UserCardProps {
    /** User display name */
    name: string;
    /** Job title or role text */
    role?: string;
    /** Avatar image URL */
    avatar?: string;
    /** Fallback initials when no avatar */
    initials?: string;
    /** Short biography text */
    bio?: string;
    /** Social media link buttons */
    socialLinks?: SocialLink[];
    /** Background color of the cover area */
    coverColor?: string;
    /** Card click handler */
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const UserCard: React.FC<UserCardProps>;
```

## VideoPlayer

```ts
interface VideoPlayerProps {
    /** Video file source URL */
    src: string;
    /** Poster image shown before playback */
    poster?: string;
    /** Border radius in pixels */
    rounded?: number;
    /** Start playing automatically */
    autoPlay?: boolean;
    /** Mute audio by default */
    muted?: boolean;
    /** Loop playback continuously */
    loop?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const VideoPlayer: React.FC<VideoPlayerProps>;
```

## WeatherCard

```ts
export interface ForecastDay {
    day: string;
    icon: string;
    high: number;
    low: number;
}
interface WeatherCardProps {
    /** City or location name */
    location: string;
    /** Current temperature value */
    temperature: number;
    /** Temperature unit */
    unit?: "C" | "F";
    /** Weather condition text */
    condition: string;
    /** Weather icon emoji or string */
    icon?: string;
    /** Humidity percentage */
    humidity?: number;
    /** Wind speed description */
    wind?: string;
    /** Feels-like temperature value */
    feelsLike?: number;
    /** Multi-day forecast data */
    forecast?: ForecastDay[];
    className?: string;
    style?: React.CSSProperties;
}
export declare const WeatherCard: React.FC<WeatherCardProps>;
```

