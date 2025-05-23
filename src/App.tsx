import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import NavBar from './NavBar';
import shapeStore from './ShapeStore';
import CircleList from './CircleList';
import { observer } from 'mobx-react';
import LineList from './LineList';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';

const App:React.FC = observer(() => {
  
  const handleClick = (e: any) => {
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    if (pointer) {
      shapeStore.addCircle(pointer.x, pointer.y);
    }

    if (shapeStore.fillMode) {
      const clickedShape = e.target;

      // Check if the clicked shape is the stage itself
      if (clickedShape && clickedShape.id() === 'stage') {
        stage.container().style.backgroundColor = shapeStore.fillSettings.fill; //TODO do not access directly.
        return;
      }
      if (clickedShape) {
        const id = clickedShape.attrs.id;
        shapeStore.fillShape(id); // Example fill color
      }
    }
  }

  const isDrawing = useRef(false);

  const handleMouseDown = (e: any) => {
    const pos = e.target.getStage().getPointerPosition();
    if (!pos) return;

    if (shapeStore.drawMode && !isDrawing.current) {
      shapeStore.startLine(pos.x, pos.y);
      isDrawing.current = true;
    }
  };

  const handleMouseMove = (e: any) => {
    if (!shapeStore.drawMode || !isDrawing.current) return; 

    const pos = e.target.getStage().getPointerPosition();
    if (!pos) return;

    shapeStore.extendLine(pos.x, pos.y);
  };

  const handleMouseUp = () => {

    if (shapeStore.drawMode && shapeStore.lines.length > 0) {
      const line = shapeStore.lines[shapeStore.lines.length - 1];
      
      // Close the line if necessary
      if (!line.closed) {
        const firstPoint = line.points[0];
        const lastPoint = line.points[line.points.length - 2]; // x, y of last point
        const distance = Math.sqrt(
          Math.pow(lastPoint - firstPoint, 2) + Math.pow(line.points[line.points.length - 1] - line.points[1], 2)
        );
        
        if (distance < 10) {
          line.closed = true; // Close the shape if close enough
        }
      }
      isDrawing.current = false; 
    }
  };
  return (
    <div>
      <NavBar />
      <div className="flex flex-row h-screen w-full w-max-screen overflow-x-hidden">

        <div className="w-1/4 shrink-0 bg-gray-200 p-4">
          <LeftSideBar />
        </div>

        <div className="w-1/2 flex-grow z-10">
          <Stage
            id='stage' 
            width={window.innerWidth} 
            height={window.innerHeight}
            onClick={handleClick}
            style={{ cursor: shapeStore.tooltipEnabled ? 'crosshair' : 'default' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            >
            <Layer>
              <CircleList />
              <LineList />
            </Layer>
          </Stage>
        </div>

        <div className="w-1/4 shrink-0 bg-gray-200 p-4 ">
          <RightSideBar />
        </div>
      </div>
    </div>
    );
});

export default App;
