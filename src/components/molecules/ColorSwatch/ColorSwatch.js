import React from 'react'
import Color from '../../atoms/Color/Color'
import './ColorSwatch.css'

const ColorSwatch = ({ options, setOptions }) => {
  const colors = ['#000000', '#FFFFFF', '#767676']

  return (
    <div className='ColorSwatch Shadow'>
      {colors.map(color => (
        <Color
          key={color}
          color={color}
          onClick={() =>
            setOptions({
              ...options,
              [`${
                options.activeTool !== 'eraser'
                  ? 'foregroundColor'
                  : 'backgroundColor'
              }`]: color,
            })
          }
        />
      ))}
    </div>
  )
}

export default ColorSwatch
