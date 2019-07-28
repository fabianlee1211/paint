import React from 'react'
import Tool from '../../atoms/Tool/Tool'
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter'
import './Tools.css'

const Tools = ({ options, setOptions }) => {
  const tools = [
    { toolName: 'pencil' },
    { toolName: 'eraser' },
    { toolName: 'paint' },
    { toolName: 'rect' }
  ]

  const getToolSettings = ({ toolName }) => {
    switch (toolName) {
      case 'pencil':
        return { activeTool: toolName, lineWidth: 1 };
      case 'paint':
        return { activeTool: toolName, lineWidth: 5 };
      case 'eraser':
        return { activeTool: toolName, lineWidth: 5 };
      default:
    }
  }

  return (
    <div className="Tools">
      {tools.map(tool => (
        <Tool
          key={tool.toolName}
          active={options.activeTool === tool.toolName} 
          onClick={() => setOptions({ ...options, ...getToolSettings(tool) })}
        >
          {capitalizeFirstLetter(tool.toolName)}
        </Tool>
      ))}
    </div>
  )
}

export default Tools