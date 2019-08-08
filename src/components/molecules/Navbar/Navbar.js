import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import './Navbar.css'

const Navbar = React.forwardRef(({ showNewModal, setShowNewModal }, canvasRef) => {
  const downloadLink = useRef()
  const { filename, size } = useSelector(state => state.canvas)
  const saveAsImage = () => {
    if (size.width > 0 && size.height > 0) {
      downloadLink.current.download = `${filename}.png`
      downloadLink.current.href = canvasRef.current.toDataURL('image/png')
      downloadLink.current.click()
    }
  }
  return (
    <nav className="Navbar">
      <li className="Navbar__Item" onClick={() => setShowNewModal(!showNewModal)}>New</li>
      <li onClick={saveAsImage} className="Navbar__Item">Save</li>
      {/* Invisible link for triggering save image */}
      <a ref={downloadLink} />
    </nav>
  )
})

export default Navbar