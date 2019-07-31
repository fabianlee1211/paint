import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Tool from '../../atoms/Tool/Tool'
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter'
import './Tools.css'
import { setActiveTool, setToolStyles } from '../../../store/options/actions';

const Tools = () => {
  const tools = [
    { toolName: 'pencil' },
    { toolName: 'paint' },
    { toolName: 'eraser' },
    { toolName: 'rect' },
    { toolName: 'circle' },
    { toolName: 'line' },
  ]

  const activeTool = useSelector(state => state.options.activeTool)
  const dispatch = useDispatch()

  const getToolStyles = ({ toolName }) => {
    switch (toolName) {
      case 'pencil':
        return { lineWidth: 1 };
      case 'paint':
        return { lineWidth: 5 };
      case 'eraser':
        return { lineWidth: 5 };
      case 'circle':
      case 'line':
      case 'rect':
      default:
    }
  }

  return (
    <div className="Tools">
      {tools.map(tool => (
        <Tool
          key={tool.toolName}
          active={activeTool === tool.toolName} 
          onClick={() => {
            dispatch(setActiveTool(tool.toolName))
            dispatch(setToolStyles({ ...getToolStyles(tool) }))
          }}
        >
          {capitalizeFirstLetter(tool.toolName)}
        </Tool>
      ))}
    </div>
  )
}

export default Tools