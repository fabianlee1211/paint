import React from 'react'
import './Color.css'

const Color = ({ color, inward, outward, onClick }) => {

  const style = {
    background: color,
    ...outward && { 
      borderColor: '#eeeeee #b7b7b7 #aaaaaa #eeeeee',
      borderWidth: '2px',
      borderStyle: 'solid',
      boxShadow: 'none',
      width: '18px',
      height: '18px',
    }
  }

  return (
    <div style={style} className="Color" onClick={onClick} />
  )
}

export default Color