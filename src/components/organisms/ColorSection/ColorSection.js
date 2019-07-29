import React from 'react'
import ColorSwatch from '../../molecules/ColorSwatch/ColorSwatch'
import ActiveColors from '../../molecules/ActiveColors/ActiveColors'
import './ColorSection.css'

const ColorSection = (props) => {
  const { options } = props
  return (
    <section className='ColorSection'>
      <ActiveColors
        foregroundColor={options.foregroundColor}
        backgroundColor={options.backgroundColor}
      />
      <ColorSwatch {...props} />
    </section>
  )
}

export default ColorSection
