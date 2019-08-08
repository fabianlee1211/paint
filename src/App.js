import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import throttle from 'lodash.throttle'
import Navbar from './components/molecules/Navbar/Navbar'
import NewModal from './components/molecules/NewModal/NewModal'
import Window from './components/organisms/Window/Window'
import ToolsSection from './components/organisms/ToolsSection/ToolsSection'
import ColorSection from './components/organisms/ColorSection/ColorSection'
import usePaintTool from './hooks/usePaintTool'
import useRectTool from './hooks/useRectTool'
import useEllipseTool from './hooks/useEllipseTool'
import './App.css'

const App = () => {
  const canvas = React.useRef()
  const previewCanvas = React.useRef()
  const [showNewModal, setShowNewModal] = useState(false)
  const { width, height } = useSelector(state => state.canvas.size)
  const { activeTool, filename } = useSelector(state => ({
    activeTool: state.options.activeTool,
    filename: state.canvas.filename,
  }))

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
        }
      case 'ellipse':
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
    <main className="App">
      <Window showLogo className="App__Window Shadow" title={`${filename} - Paint`}>
        <Navbar showNewModal={showNewModal} setShowNewModal={setShowNewModal} />
      </Window>
      <ToolsSection />
      <section className="CanvasSection">
        <canvas
          width={width * 2}
          height={height * 2}
          ref={previewCanvas}
          className="previewCanvas"
          {...mouseEvents()}
        />
        <canvas width={width} height={height} ref={canvas} {...mouseEvents()} />
      </section>
      <ColorSection />
      <NewModal show={showNewModal} setShowNewModal={setShowNewModal} />
    </main>
  )
}

export default App
