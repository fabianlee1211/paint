import {
  SET_SIZE,
  SET_FILE_NAME,
  SET_IMAGE_URL,
} from './actionTypes'

const initialState = () => ({
  filename: '',
  size: {
    width: 0,
    height: 0,
  },
  imageUrl: '',
})

const canvasReducer = (state = initialState(), { type, payload }) => {
  switch (type) {
    case SET_SIZE:
      return {
        ...state,
        size: {
          ...payload,
        }
      }
    case SET_FILE_NAME:
      return {
        ...state,
        filename: payload,
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