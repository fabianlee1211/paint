import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from './components/organisms/Header/Header'
import ToolsSection from './components/organisms/ToolsSection/ToolsSection'
import ColorSection from './components/organisms/ColorSection/ColorSection'
import usePaintTool from './hooks/usePaintTool'
import useRectTool from './hooks/useShapeTool'
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
    shapeToolMouseUp,
    shapeToolMouseDown,
    shapeToolMouseLeave,
    shapeToolMouseMove,
  ] = useRectTool(canvas, previewCanvas);

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
          onMouseUp: shapeToolMouseUp,
          onMouseDown: shapeToolMouseDown,
          onMouseLeave: shapeToolMouseLeave,
          onMouseMove: shapeToolMouseMove
        };
      default:
    }
  }

  return (
    <main className='App'>
      <Header />
      <ToolsSection />
      <section className='CanvasSection'>
        <canvas
          width={width * 1.5}
          height={height * 1.5}
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
