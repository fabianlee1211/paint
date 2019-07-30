import React from 'react'
import Color from '../../atoms/Color/Color'
import './ActiveColors.css'

const ActiveColors = ({ foregroundColor, backgroundColor }) => {
  return (
    <div className="ActiveColors Shadow">
      <Color outward color={foregroundColor} />
      <Color outward color={backgroundColor} />
    </div>
  )
}

export default ActiveColors