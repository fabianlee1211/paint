import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Color from '../../atoms/Color/Color'
import { darkerColors, normalColors } from '../../../constants/defaultColors'
import { setColor } from '../../../store/options/actions'
import './ColorSwatch.css'

const ColorSwatch = () => {
  const colors = [ ...darkerColors, ...normalColors ]
  const activeTool = useSelector(state => state.options.activeTool)
  const dispatch = useDispatch()

  return (
    <div className='ColorSwatch Shadow'>
      {colors.map(color => (
        <Color
          key={color}
          color={color}
          onClick={() => {
            activeTool !== 'eraser'
            ? dispatch(setColor({ foreground: color }))
            : dispatch(setColor({ background: color }))
          }}
        />
      ))}
    </div>
  )
}

export default ColorSwatch
