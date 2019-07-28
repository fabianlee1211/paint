import React from 'react'
import './Tool.css'

const Tool = ({ active, children, onClick }) => {
  let classes = ['Tool', 'Shadow']
  if (active) {
    classes.push('Tool--active')
  }

  return (
    <button className={classes.join(' ')} onClick={onClick}>{children}</button>
  )
}

export default Tool