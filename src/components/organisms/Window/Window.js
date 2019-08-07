import React from 'react'
import Button from '../../atoms/Button/Button'
import './Window.css'

const Window = ({ closeOnly, children, title, onClick, ...props }) => (
  <header {...props}>
    <div className="Window__Header">
      <p className="Window__Title">{title}</p>
      <div className="Window__Buttons">
        {!closeOnly && <Button>_</Button>}
        {!closeOnly && <Button>◻</Button>}
        <Button onClick={onClick}>X</Button>
      </div>
    </div>
    {children}
  </header>
)

export default Window