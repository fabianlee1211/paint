import {
  SET_WIDTH,
  SET_HEIGHT,
  SET_IMAGE_URL,
} from './actionTypes'

export const setCanvasWidth = width => ({
  type: SET_WIDTH,
  payload: width,
})

export const setCanvasHeight = height => ({
  type: SET_HEIGHT,
  payload: height,
})

export const setCanvasImageUrl = url => ({
  type: SET_IMAGE_URL,
  payload: url,
})