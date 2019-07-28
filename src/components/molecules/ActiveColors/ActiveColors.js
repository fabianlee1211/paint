import React from 'react'
import Color from '../../atoms/Color/Color'

const ActiveColor = ({ foregroundColor, backgroundColor }) => {
  return (
    <div className="ActiveColor Shadow">
      <Color color={foregroundColor} />
      <Color color={backgroundColor} />
    </div>
  )
}

export default ActiveColor