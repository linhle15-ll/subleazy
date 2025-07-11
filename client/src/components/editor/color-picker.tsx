import React from 'react'

import { highlightColors } from './highlight-colors'

export const ColorPicker = ({ value, onChange } : { value: any, onChange: any}) => {
  return (
    <div className="color-picker">
      {highlightColors.map(color => (
        <button
          type="button"
          key={color.color}
          title={color.name}
          className={`color-option${value === color.color ? ' selected' : ''}`}
          style={{
            '--color-picker-color': color.color,
            '--color-picker-background-color': color.backgroundColor,
          } as React.CSSProperties & Record<string, string>}
          onClick={() => onChange(color.color)}
        />
      ))}
    </div>
  )
}