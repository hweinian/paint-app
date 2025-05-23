import React from 'react';
import shapeStore from './ShapeStore';
import { observer } from 'mobx-react';

const RightSideBar: React.FC = observer(() => {
  const handleDelete = (id: string) => {
    shapeStore.deleteLayer(id);
  };

  return (
    <div className="text-sm">
      <h2 className="font-bold mb-2">Layers</h2>
        <ul className="space-y-1 max-h-[100px] overflow-y-auto">
          {shapeStore.layers.map((layer: any) => (
            <li
              key={layer.id}
              className="p-2 bg-white rounded shadow text-gray-800 justify-between flex items-center"
            >
            <span className="font-semibold">{layer.id}</span>
            <button
              onClick={() => handleDelete(layer.id)}
              className="text-red-500 hover:text-red-700 z-10"
              title="Delete layer"
            >
              🗑️
            </button>
            </li>
          ))}
        </ul>
    </div>
  );
});

export default RightSideBar;
