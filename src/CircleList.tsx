import { observer } from 'mobx-react';
import shapeStore from './ShapeStore'
import { Circle } from 'react-konva'

const CircleList: React.FC = observer(() => {
  return (
    <>
        {
            shapeStore.circles.map((circle) => (
                <Circle
                id = {String(circle.id)}
                key = {circle.id}
                x={circle.x}
                y={circle.y}
                radius={circle.radius}
                fill={circle.fill}
                draggable
                />
        ))}
    </>
  );
});

export default CircleList;