import {
  SET_SIZE,
  SET_IMAGE_URL,
} from './actionTypes'

export const setCanvasSize = size => ({
  type: SET_SIZE,
  payload: size,
})


export const setCanvasImageUrl = url => ({
  type: SET_IMAGE_URL,
  payload: url,
})