import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import throttle from 'lodash.throttle'
import Header from './components/organisms/Header/Header'
import ToolsSection from './components/organisms/ToolsSection/ToolsSection'
import ColorSection from './components/organisms/ColorSection/ColorSection'
import usePaintTool from './hooks/usePaintTool'
import useRectTool from './hooks/useRectTool'
import useEllipseTool from './hooks/useEllipseTool'
import './App.css'

const App = () => {
  const canvas = React.useRef()
  const previewCanvas = React.useRef()
  const { width, height } = useSelector(state => state.canvas.size)
  const activeTool = useSelector(state => state.options.activeTool)

  const [
    paintToolMouseUp,
    paintToolMouseDown,
    paintToolMouseLeave,
    paintToolMouseMove,
  ] = usePaintTool(canvas, previewCanvas)

  const [
    rectToolMouseUp,
    rectToolMouseDown,
    rectToolMouseLeave,
    rectToolMouseMove,
  ] = useRectTool(canvas, previewCanvas)

  const [
    ellipseToolMouseUp,
    ellipseToolMouseDown,
    ellipseToolMouseLeave,
    ellipseToolMouseMove,
  ] = useEllipseTool(canvas, previewCanvas)

  const mouseEvents = () => {
    switch (activeTool) {
      case 'pencil':
      case 'paint':
      case 'eraser':
        return {
          onMouseUp: paintToolMouseUp,
          onMouseDown: paintToolMouseDown,
          onMouseLeave: paintToolMouseLeave,
          onMouseMove: paintToolMouseMove,
        }
      case 'rect':
        return {
          onMouseUp: rectToolMouseUp,
          onMouseDown: rectToolMouseDown,
          onMouseLeave: rectToolMouseLeave,
          onMouseMove: throttle(rectToolMouseMove, 500),
        };
      case 'circle':
        return {
          onMouseUp: ellipseToolMouseUp,
          onMouseDown: ellipseToolMouseDown,
          onMouseLeave: ellipseToolMouseLeave,
          onMouseMove: throttle(ellipseToolMouseMove, 500),
        }
      default:
    }
  }

  return (
    <main className='App'>
      <Header />
      <ToolsSection />
      <section className='CanvasSection'>
        <canvas
          width={width * 2}
          height={height * 2}
          ref={previewCanvas}
          className='previewCanvas'
          {...mouseEvents()}
        />
        <canvas width={width} height={height} ref={canvas} {...mouseEvents()} />
      </section>
      <ColorSection />
    </main>
  )
}

export default App
