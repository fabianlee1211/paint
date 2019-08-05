import { store } from '../../index'

export const clamp = (positionX, positionY) => {
  const { width, height } = store.getState().canvas.size
  let positions = {
    x: positionX,
    y: positionY
  }
  let checking = true
  if (positionX > width && checking) {
    positions.x = width
  }
  if (positionY > height && checking) {
    positions.y = height
    checking = false
  }
  if (positionX < 0 && checking) {
    positions.x = 0
  }
  if (positionY < 0 && checking) {
    positions.y = 0
  }
  return positions
}