import {
  SET_WIDTH,
  SET_HEIGHT,
  SET_IMAGE_URL,
} from './actionTypes'

const initialState = () => ({
  size: {
    width: 500,
    height: 500,
  },
  imageUrl: '',
})

const canvasReducer = (state = initialState(), { type, payload }) => {
  switch (type) {
    case SET_WIDTH:
      return {
        ...state,
        size: {
          ...state.size,
          width: payload,
        }
      }
    case SET_HEIGHT:
      return {
        ...state,
        size: {
          ...state.size,
          height: payload,
        }
      }
    case SET_IMAGE_URL:
      return {
        ...state,
        imageUrl: payload,
      }
    default:
      return state
  }
}

export default canvasReducer