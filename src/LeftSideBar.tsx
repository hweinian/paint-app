import { observer } from 'mobx-react';
import React, { useState } from 'react'
import shapeStore from './ShapeStore';

const LeftSideBar = observer(() => {
  const { activeTool } = shapeStore;

return (
    <div className="p-4 text-sm space-y-4 bg-gray-200 h-full w-[250px]">
      <h2 className="font-bold text-lg">Tool Settings</h2>
    
      {activeTool === 'circle' && (
        <div>
          <h3 className="font-bold mb-2">Circle Settings</h3>
          <label className="block mb-1">
            Radius:
            <input
              type="number"
              value={shapeStore.circleSettings.radius}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > 0) {
                  shapeStore.updateCircleSettings(value, shapeStore.circleSettings.fill);
                }
              }}
              className="ml-2 border rounded p-1"
              min={1}
            />
          </label>
        </div>
      )}

      {activeTool === 'brush' && (
        <div>
          <h3 className="font-semibold mb-2">Brush Settings</h3>
          <label className="block mb-1">Size: {shapeStore.brushSettings.strokeWidth}px</label>
          <input
            type="range"
            min="1"
            max="50"
            value={shapeStore.brushSettings.strokeWidth}
            onChange={(e) =>
              shapeStore.updateBrushSettings(Number(e.target.value), shapeStore.brushSettings.stroke)
            }
            className="w-full"
          />

          <label className="block mt-3 mb-1">Color</label>
          <input
            type="color"
            value={shapeStore.brushSettings.stroke}
            onChange={(e) =>
              shapeStore.updateBrushSettings(shapeStore.brushSettings.strokeWidth, e.target.value)
            }
          />
        </div>
      )}

      {activeTool === 'fill' && (
        <div>
          <h3 className="font-semibold mb-2">Fill Tool</h3>
          <label className="block mb-1">Fill Color</label>
          <input
            type="color"
            value={shapeStore.fillSettings.fill}
            onChange={(e) => shapeStore.updateFillSettings(e.target.value)}
          />
        </div>
      )}
    </div>
    )
})

export default LeftSideBar
