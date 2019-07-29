import React, { useState } from 'react'
import Header from './components/organisms/Header/Header'
import ToolsSection from './components/organisms/ToolsSection/ToolsSection'
import ColorSection from './components/organisms/ColorSection/ColorSection'
import usePaintTool from './hooks/usePaintTool'
import useRectTool from './hooks/useShapeTool'
import './App.css'

const App = () => {
  const canvas = React.useRef()
  const previewCanvas = React.useRef()
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 })
  const [options, setOptions] = useState({
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    activeTool: 'pencil',
    lineWidth: 1,
  })
  const [
    paintToolMouseUp,
    paintToolMouseDown,
    paintToolMouseLeave,
    paintToolMouseMove,
  ] = usePaintTool(canvas, previewCanvas, options)

  const [
    shapeToolMouseUp,
    shapeToolMouseDown,
    shapeToolMouseLeave,
    shapeToolMouseMove,
  ] = useRectTool(canvas, previewCanvas, options);

  const mouseEvents = () => {
    switch (options.activeTool) {
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
      <ToolsSection options={options} setOptions={setOptions} />
      <section className='CanvasSection'>
        <canvas
          width={canvasSize.width * 1.5}
          height={canvasSize.height * 1.5}
          ref={previewCanvas}
          className='previewCanvas'
          {...mouseEvents()}
        />
        <canvas width={canvasSize.width} height={canvasSize.height} ref={canvas} {...mouseEvents()} />
      </section>
      <ColorSection options={options} setOptions={setOptions} />
    </main>
  )
}

export default App
