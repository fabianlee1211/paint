import {
  SET_SIZE,
  SET_FILE_NAME,
  SET_IMAGE_URL,
} from './actionTypes'

export const setFileName = name => ({
  type: SET_FILE_NAME,
  payload: name,
})

export const setCanvasSize = size => ({
  type: SET_SIZE,
  payload: size,
})

export const setCanvasImageUrl = url => ({
  type: SET_IMAGE_URL,
  payload: url,
})