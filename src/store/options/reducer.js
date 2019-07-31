import {
  SET_COLOR,
  SET_ACTIVE_TOOL,
  SET_TOOL_STYLES,
} from './actionTypes'

const initialState = () => ({
  color: {
    foreground: '#000000',
    background: '#FFFFFF',
  },
  activeTool: 'pencil',
  toolStyles: {
    lineWidth: 1,
    lineDash: 'straight',
  }
})

const optionsReducer = (state = initialState(), { type, payload }) => {
  switch (type) {
    case SET_COLOR:
      return {
        ...state,
        color: {
          ...state.color,
          ...payload
        }
      }
    case SET_ACTIVE_TOOL:
      return {
        ...state,
        activeTool: payload,
      }
    case SET_TOOL_STYLES:
      return {
        ...state,
        toolStyles: {
          ...state.toolStyles,
          ...payload,
        }
      }
    default:
      return state
  }
}

export default optionsReducer
