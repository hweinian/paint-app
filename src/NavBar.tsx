import React from 'react'
import "./Navbar.css"
import shapeStore from './ShapeStore'
import { observer } from 'mobx-react'

const NavBar: React.FC = observer(() => {
  return (
    <div className="flex flex-row gap-4 pt-2 pb-2 pl-2 border-b-2 border-black items-center">
      <button 
        className={`px-4 py-2 border-2 rounded-md ${shapeStore.tooltipEnabled ? 'bg-blue-200 text-black' : 'bg-white'}`} 
        onClick={() => shapeStore.toggleTooltip()}
        >Circle</button>
      <button 
        className={`px-4 py-2 border-2 rounded-md ${shapeStore.drawMode ? 'bg-blue-200 text-black' : 'bg-white'}`} 
        onClick={() => shapeStore.toggleDrawMode()}
        >Brush</button>
      <button 
        className={`px-4 py-2 border-2 rounded-md ${shapeStore.fillMode ? 'bg-blue-200 text-black' : 'bg-white'}`} 
        onClick={() => shapeStore.toggleFillMode()}
        >Fill</button>
    </div>
  )
})

export default NavBar
