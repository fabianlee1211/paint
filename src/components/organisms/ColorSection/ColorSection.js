import React from 'react'
import ColorSwatch from '../../molecules/ColorSwatch/ColorSwatch'
import ActiveColor from '../../molecules/ActiveColors/ActiveColors'
import './ColorSection.css'

const ColorSection = (props) => {
  const { options } = props
  return (
    <section className='ColorSection'>
      <ActiveColor
        foregroundColor={options.foregroundColor}
        backgroundColor={options.backgroundColor}
      />
      <ColorSwatch {...props} />
    </section>
  )
}

export default ColorSection
