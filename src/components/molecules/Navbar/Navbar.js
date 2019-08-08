import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import './Navbar.css'

const Navbar = React.forwardRef(({ showNewModal, setShowNewModal }, canvasRef) => {
  const downloadLink = useRef()
  const { filename, size: { width, height } } = useSelector(state => state.canvas)

  const saveAsImage = () => {
    if (width > 0 && height > 0) {
      downloadLink.current.download = `${filename}.png`
      downloadLink.current.href = canvasRef.current.toDataURL('image/png')
      downloadLink.current.click()
    }
  }
  
  const clearCanvas = () => {
    const context = canvasRef.current.getContext('2d')
    context.clearRect(0, 0, width, height)
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)
  }

  return (
    <nav className="Navbar">
      <li className="Navbar__Item" onClick={() => setShowNewModal(!showNewModal)}>New</li>
      <li onClick={saveAsImage} className="Navbar__Item">Save</li>
      <li onClick={clearCanvas} className="Navbar__Item">Clear All</li>
      {/* Invisible link for triggering save image */}
      <a ref={downloadLink} />
    </nav>
  )
})

export default Navbar