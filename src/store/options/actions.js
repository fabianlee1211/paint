import {
  SET_COLOR,
  SET_ACTIVE_TOOL,
  SET_TOOL_STYLES,
} from './actionTypes'

export const setColor = color => ({
  type: SET_COLOR,
  payload: color,
})

export const setActiveTool = tool => ({
  type: SET_ACTIVE_TOOL,
  payload: tool,
})

export const setToolStyles = styles => ({
  type: SET_TOOL_STYLES,
  payload: styles,
})
