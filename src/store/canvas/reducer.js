import {
  SET_SIZE,
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
    case SET_SIZE:
      return {
        ...state,
        size: {
          ...payload,
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