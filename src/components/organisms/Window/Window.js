import React from 'react'
import Button from '../../atoms/Button/Button'
import paintLogo from '../../../assets/Win95PaintLogo.png'
import './Window.css'

const Window = ({ closeOnly, children, title, onClick, showLogo, ...props }) => (
  <header {...props}>
    <div className="Window__Header">
      <div className="Window__TitleWrapper">
        {showLogo && <img className="Window__Logo" src={paintLogo} />}
        <p className="Window__Title">{title}</p>
      </div>
      <div className="Window__Buttons">
        {!closeOnly && <Button>_</Button>}
        {!closeOnly && <Button>◻</Button>}
        <Button onClick={onClick}>X</Button>
      </div>
    </div>
    {children}
  </header>
)

Window.defaultProps = {
  showLogo: false,
}

export default Window