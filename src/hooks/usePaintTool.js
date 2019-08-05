import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { clamp } from '../utils/canvas/clamp'

const usePaintTool = (canvas, previewCanvas) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState([])
  const { activeTool, color, toolStyles } = useSelector(state => state.options)

  useEffect(() => {
    const drawPaint = () => {
      const context = canvas.current.getContext('2d')
      const { foreground, background } = color
      const { lineWidth } = toolStyles

      context.strokeStyle =
        activeTool !== 'eraser' ? foreground : background
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
    const { offsetLeft, offsetTop } = canvas.current
    setIsDrawing(true)
    setPoints([
      ...points,
      {
        ...clamp(e.pageX - offsetLeft, e.pageY - offsetTop),
        isDragging: false,
      },
    ])
  }

  const paintToolMouseUp = () => {
    setIsDrawing(false)
    setPoints([])
  }

  const paintToolMouseMove = e => {
    const { offsetLeft, offsetTop } = canvas.current
    if (isDrawing) {
      setPoints([
        ...points,
        {
          ...clamp(e.pageX - offsetLeft, e.pageY - offsetTop),
          isDragging: true,
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
