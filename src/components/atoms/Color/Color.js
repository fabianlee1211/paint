import React from 'react'
import './Color.css'

const Color = ({ color, onClick }) => {
  const style = {
    background: color,
  }

  return (
    <div style={style} className="Color" onClick={onClick} />
  )
}

export default Color