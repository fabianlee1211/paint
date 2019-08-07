import React from 'react'
import './Navbar.css'

const Navbar = ({ showNewModal, setShowNewModal }) => (
  <nav className="Navbar">
    <li className="Navbar__Item" onClick={() => setShowNewModal(!showNewModal)}>New</li>
    <li className="Navbar__Item">Save</li>
  </nav>
)

export default Navbar