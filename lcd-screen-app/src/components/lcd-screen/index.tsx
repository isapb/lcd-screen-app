import { LCDCell } from './lcd-cell';
import './lcd-screen.css'

export function LCDScreen({
  width = 16,
  height = 2,
  text = '',
  color,
  brightness = 100,
  contrast,
}: { width?: number, height?: number, text: string, color?: string, brightness?: number, contrast?: number }
) {
  const resolveLetter = (col: number, row: number) => {
    const position = col + row * width;

    if (text.length <= position) {
      return "";
    }

    return text.at(position) as string;
  }

  return (
    <div className='plate'>
      <div
        className='backlight'  
        style={{
          '--lcd-backlight': color,
          '--lcd-brightness': brightness / 100,
        } as React.CSSProperties}
      >

        <div className='row'>
          {
            [...Array(width).keys()].map((num) => (
              <LCDCell
                key={`cell-${num}-0`}
                letter={resolveLetter(num, 0)}
                color={color}
                contrast={contrast}
              />
            ))
          }
        </div>
        <div className='row'>
          {
            [...Array(width).keys()].map((num) => (
              <LCDCell
                key={`cell-${num}-1`}
                letter={resolveLetter(num, 1)}
                color={color}
                contrast={contrast}
              />
            ))
          }
          {/* {
            [...Array(width).keys()].map((num) => (
              <div className='lcd-cell' key={`cell-${num + 1}-2`}>
                {
                  resolveLetter(num, 1)
                }
              </div>
            ))
          } */}
        </div>

      </div>
    </div>
  )
}