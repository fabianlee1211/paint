import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { clamp } from '../utils/clamp';

const useShapeTool = (canvas, previewCanvas, options) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [previewPoints, setPreviewPoints] = useState([]);
  const [points, setPoints] = useState([]);
  const { color } = useSelector(state => state.options)

  useEffect(() => {
    const drawShape = () => {
      const context = canvas.current.getContext("2d");
      const previewContext = previewCanvas.current.getContext("2d");
      const { foreground } = color
      context.fillStyle = foreground
      previewContext.fillStyle = foreground
      // Draw preview rectangle on preview canvas
      if (previewPoints.length > 0) {
        for (let i = 1; i < previewPoints.length - 1; i++) {
          if (i) {
            previewContext.clearRect(
              previewPoints[0].x,
              previewPoints[0].y,
              previewPoints[i].x - previewPoints[0].x,
              previewPoints[i].y - previewPoints[0].y
            );
          }
        }

        previewContext.fillRect(
          previewPoints[0].x,
          previewPoints[0].y,
          previewPoints[previewPoints.length - 1].x - previewPoints[0].x,
          previewPoints[previewPoints.length - 1].y - previewPoints[0].y
        );
      }
      // Clear preview canvas
      if (previewPoints.length <= 0) {
        previewContext.clearRect(0, 0, 500, 500);
      }
      // Draw actual rectangle on canvas
      if (points.length && !isDrawing) {
        context.fillRect(
          points[points.length - 1].x,
          points[points.length - 1].y,
          points[points.length - 1].width,
          points[points.length - 1].height
        );
      }
    };
    drawShape();
  }, [points, previewPoints, isDrawing]);

  const shapeToolMouseDown = e => {
    const { offsetLeft, offsetTop } = previewCanvas.current;
    setIsDrawing(true);
    setPreviewPoints([
      // ...points,
      {
        x: clamp(e.pageX - offsetLeft),
        y: clamp(e.pageY - offsetTop),
        isDragging: false
      }
    ]);
  };

  const shapeToolMouseUp = () => {
    setIsDrawing(false);
    if (previewPoints.length > 0) {
      setPoints([
        ...points,
        {
          x: previewPoints[0].x,
          y: previewPoints[0].y,
          width: previewPoints[previewPoints.length - 1].x - previewPoints[0].x,
          height: previewPoints[previewPoints.length - 1].y - previewPoints[0].y
        }
      ]);
    }
    setPreviewPoints([]);
  };

  const shapeToolMouseMove = e => {
    const { offsetLeft, offsetTop } = previewCanvas.current;
    if (isDrawing) {
      setPreviewPoints([
        ...previewPoints,
        {
          x: clamp(e.pageX - offsetLeft),
          y: clamp(e.pageY - offsetTop),
          isDragging: true
        }
      ]);
    }
  };

  const shapeToolMouseLeave = () => {
    // setIsDrawing(false);
  };

  return [
    shapeToolMouseUp,
    shapeToolMouseDown,
    shapeToolMouseLeave,
    shapeToolMouseMove
  ];
}

export default useShapeTool