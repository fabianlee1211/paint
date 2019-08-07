import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { clamp } from '../utils/canvas/clamp'

const getEllipseCenterAndRadius = previewPoints => {
  let centerX, centerY
  const radiusX = Math.abs(previewPoints[previewPoints.length - 1].x - previewPoints[0].x) / 2
  const radiusY = Math.abs(previewPoints[previewPoints.length - 1].y - previewPoints[0].y) / 2
  if (previewPoints[previewPoints.length - 1].x > previewPoints[0].x) {
    centerX = previewPoints[0].x + radiusX
  }
  if (previewPoints[previewPoints.length - 1].x < previewPoints[0].x) {
    centerX = previewPoints[0].x - radiusX
  }
  if (previewPoints[previewPoints.length - 1].y > previewPoints[0].y) {
    centerY = previewPoints[0].y + radiusY
  }
  if (previewPoints[previewPoints.length - 1].y < previewPoints[0].y) {
    centerY = previewPoints[0].y - radiusY
  }
  return { centerX, centerY, radiusX, radiusY }
}

const useEllipseTool = (canvas, previewCanvas) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [previewPoints, setPreviewPoints] = useState([])
  const [points, setPoints] = useState([]);
  const { color, size } = useSelector(state => ({
    color: state.options.color,
    size: state.canvas.size
  }))

  useEffect(() => {
    const drawShape = () => {
      const previewContext = previewCanvas.current.getContext("2d")
      const context = canvas.current.getContext("2d")
      const { foreground } = color
      const { width, height } = size
      context.fillStyle = foreground
      previewContext.fillStyle = foreground
      // Draw preview rectangle on preview canvas
      if (previewPoints.length > 0) {
        previewContext.clearRect(0, 0, width, height);
        const { centerX, centerY, radiusX, radiusY } = getEllipseCenterAndRadius(previewPoints)
        previewContext.beginPath()
        previewContext.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
        previewContext.fill()
      }
      // Clear preview canvas
      if (previewPoints.length <= 0) {
        previewContext.clearRect(0, 0, width, height);
      }
      // Draw actual rectangle on canvas
      if (points.length && !isDrawing) {
        const { centerX, centerY, radiusX, radiusY } = points[points.length - 1]
        context.beginPath()
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
        context.fill()
      }
    };
    drawShape();
  }, [points, previewPoints, isDrawing]);

  const ellipseToolMouseDown = e => {
    const { offsetLeft, offsetTop } = canvas.current;
    setIsDrawing(true);
    setPreviewPoints([
      {
        ...clamp(e.pageX - offsetLeft, e.pageY - offsetTop),
        isDragging: false
      }
    ]);
  };

  const ellipseToolMouseUp = () => {
    setIsDrawing(false);
    if (previewPoints.length > 0) {
      setPoints([
        ...points,
        { ...getEllipseCenterAndRadius(previewPoints) }
      ]);
    }
    setPreviewPoints([]);
  };

  const ellipseToolMouseMove = e => {
    const { offsetLeft, offsetTop } = canvas.current;
    if (isDrawing) {
      setPreviewPoints([
        ...previewPoints,
        {
          ...clamp(e.pageX - offsetLeft, e.pageY - offsetTop),
          isDragging: true
        }
      ]);
    }
  };

  const ellipseToolMouseLeave = () => {
    // setIsDrawing(false);
  };

  return [
    ellipseToolMouseUp,
    ellipseToolMouseDown,
    ellipseToolMouseLeave,
    ellipseToolMouseMove
  ];
}

export default useEllipseTool