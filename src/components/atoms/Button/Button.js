import React from 'react'
import './Button.css'

const Button = ({ children, onClick, ...props }) => {
  return (
    <button className="Button" onClick={onClick} {...props}>{children}</button>
  )
}

export default Button