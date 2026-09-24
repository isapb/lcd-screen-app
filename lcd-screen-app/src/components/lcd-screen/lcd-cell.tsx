import { memo, useMemo } from 'react'
import './lcd-cell.css'
import { LCDGlyph, resolveLetter } from './lcd-font';

// Space between pixels, in pixel units (1 = one pixel wide)
const GAP = 0.2

const isLight = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.55
};

function lcdColors(color: string, contrast: number) {
  const k = contrast / 100
  const inkStrength = Math.min(1, k * 2) * 100             // characters fade below 50
  const ghost = 8 + Math.max(0, k - 0.5) * 2 * 60          // off pixels show as boxes above 50 (8% → 68%)
  const ink = isLight(color) ? '#1b1f3a' : '#f4f6ff'

  return {
    '--lcd-pixel-on': `color-mix(in srgb, ${ink} ${inkStrength}%, ${color})`,
    '--lcd-pixel-off': `color-mix(in srgb, ${ink} ${ghost}%, ${color})`,
  } as React.CSSProperties
}

// Every pixel becomes a 1x1 square in one of two paths, so a cell is 3 elements instead of 49
function glyphPaths(glyph: LCDGlyph) {
  let on = ''
  let off = ''

  glyph.forEach((row, y) =>
    row.forEach((pixel, x) => {
      const square = `M${x * (1 + GAP)} ${y * (1 + GAP)}h1v1h-1z`
      if (pixel) on += square
      else off += square
    })
  )

  return { on, off }
}

export const LCDCell = memo(function LCDCell({
  width = 5,
  height = 8,
  letter = '',
  color = '#6c7ef8',
  contrast = 50,
}: {
  width?: number,
  height?: number,
  letter?: string,
  color?: string,
  contrast?: number,
}) {
  const { on, off } = useMemo(() => glyphPaths(resolveLetter(letter)), [letter]);
  const colors = useMemo(() => lcdColors(color, contrast), [color, contrast]);

  const viewWidth = width + (width - 1) * GAP
  const viewHeight = height + (height - 1) * GAP

  return (
    <svg
      className='lcd-cell'
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      shapeRendering='crispEdges'
      style={{ ...colors, aspectRatio: `${viewWidth} / ${viewHeight}` }}
      aria-hidden
    >
      <path className='lcd-cell-off' d={off} />
      <path className='lcd-cell-on' d={on} />
    </svg>
  )
})
