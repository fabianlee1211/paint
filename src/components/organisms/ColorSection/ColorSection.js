import React from 'react'
import { useSelector } from 'react-redux'
import ColorSwatch from '../../molecules/ColorSwatch/ColorSwatch'
import ActiveColors from '../../molecules/ActiveColors/ActiveColors'
import './ColorSection.css'

const ColorSection = () => {
  const { foreground, background } = useSelector(state => state.options.color)
  return (
    <section className='ColorSection'>
      <ActiveColors
        foregroundColor={foreground}
        backgroundColor={background}
      />
      <ColorSwatch />
    </section>
  )
}

export default ColorSection
