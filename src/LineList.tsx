import React from 'react'
import { Line } from 'react-konva'
import shapeStore from './ShapeStore'
import { observer } from 'mobx-react'

const LineList = observer(() => {
  return (
    <>
        {shapeStore.lines.map((line) => (
        <Line
          key={line.id}
          points={line.points}
          stroke={line.stroke}
          strokeWidth={line.strokeWidth}
          tension={line.tension}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation="source-over"
        />
      ))}
    </>
  )
})

export default LineList
