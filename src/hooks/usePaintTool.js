import { useState, useEffect } from 'react'
import { clamp } from '../utils/clamp'

const usePaintTool = (canvas, previewCanvas, options) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState([])

  useEffect(() => {
    const drawPaint = () => {
      const context = canvas.current.getContext('2d')
      const {
        foregroundColor,
        backgroundColor,
        lineWidth,
        activeTool,
      } = options

      context.strokeStyle =
        activeTool !== 'eraser' ? foregroundColor : backgroundColor
      context.lineJoin = 'round'
      context.lineWidth = lineWidth

      if (points.length > 0) {
        for (let i = 0; i < points.length; i++) {
          context.beginPath()
          if (points[i].isDragging && i) {
            context.moveTo(points[i - 1].x, points[i - 1].y)
          } else {
            context.moveTo(points[i].x, points[i].y)
          }
          context.lineTo(points[i].x, points[i].y)
          context.closePath()
          context.stroke()
        }
      }
    }
    drawPaint()
  })

  const paintToolMouseDown = e => {
    const { offsetLeft, offsetTop } = previewCanvas.current
    setIsDrawing(true)
    setPoints([
      ...points,
      {
        x: clamp(e.pageX - offsetLeft),
        y: clamp(e.pageY - offsetTop),
        isDragging: false,
      },
    ])
  }

  const paintToolMouseUp = () => {
    setIsDrawing(false)
    setPoints([])
  }

  const paintToolMouseMove = e => {
    const { offsetLeft, offsetTop } = previewCanvas.current
    const { color, lineWidth } = options
    if (isDrawing) {
      setPoints([
        ...points,
        {
          x: clamp(e.pageX - offsetLeft),
          y: clamp(e.pageY - offsetTop),
          isDragging: true,
          color,
          lineWidth,
        },
      ])
    }
  }

  const paintToolMouseLeave = () => {
    setIsDrawing(false)
  }

  return [
    paintToolMouseUp,
    paintToolMouseDown,
    paintToolMouseLeave,
    paintToolMouseMove,
  ]
}

export default usePaintTool
