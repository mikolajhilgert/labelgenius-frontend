import React, { useState } from "react";
import { Image, Stage, Layer, Rect, Transformer, Group } from "react-konva";
import useImage from "use-image";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Picture from "../assets/animals.jpg";
import { v4 as uuidv4 } from "uuid";

const Canvas: React.FC = () => {
  const [image] = useImage(Picture);
  const [rects, setRects] = useState<
    {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      id: string;
      color: string;
    }[]
  >([]);
  const [selectedId, selectShape] = useState<string | null>(null);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [currentRect, setCurrentRect] = useState<string | null>(null);
  const [color, setColor] = useState("red");

  const MIN_WIDTH = 5; // replace with your desired minimum width
  const MIN_HEIGHT = 5; // replace with your desired minimum height

  const handleStageMouseDown = (event: any) => {
    const { x, y } = event.currentTarget.getPointerPosition();

    // Check if a rectangle already exists at the clicked position
    const existingRect = rects.find(
      (rect) => x >= rect.x1 && x <= rect.x2 && y >= rect.y1 && y <= rect.y2
    );

    if (existingRect) {
      // If a rectangle exists, select it and set it as the current rectangle
      selectShape(existingRect.id);
      setCurrentRect(existingRect.id);
    } else {
      // If no rectangle exists, create a new one
      const id = uuidv4();
      setRects([...rects, { x1: x, y1: y, x2: x, y2: y, id, color }]);
      selectShape(id);
      setStartPoint({ x, y });
      setCurrentRect(id);
    }
  };

  const handleStageMouseMove = (event: any) => {
    // Check if the mouse button is currently pressed
    if (startPoint && currentRect) {
      const { x, y } = event.currentTarget.getPointerPosition();
      const width = x - startPoint.x;
      const height = y - startPoint.y;

      // Check if the width and height are less than the minimum dimensions
      if (Math.abs(width) < MIN_WIDTH || Math.abs(height) < MIN_HEIGHT) {
        return;
      }

      // Update the current rectangle
      const index = rects.findIndex((r) => r.id === currentRect);
      const updatedRects = [...rects];
      updatedRects[index] = {
        ...updatedRects[index],
        x2: updatedRects[index].x1 + width,
        y2: updatedRects[index].y1 + height,
      };
      setRects(updatedRects);
    }
  };

  const handleStageMouseUp = () => {
    setStartPoint(null);
    setCurrentRect(null);
  };

  return (
    <>
      <Select value={color} onChange={(e) => setColor(e.target.value)}>
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
        <MenuItem value="green">Green</MenuItem>
      </Select>
      <button onClick={() => console.log(JSON.stringify(rects))}>Export</button>
      <Stage
        width={image ? image.width : window.innerWidth}
        height={image ? image.height : window.innerHeight}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
      >
        <Layer>
          <Image image={image} />
          {rects.map((rect, i) => (
            <Group
              key={i}
              id={rect.id}
              x={rect.x1}
              y={rect.y1}
              draggable
              dragBoundFunc={(pos) => {
                if (image) {
                  // Calculate the width and height of the rectangle
                  const width = rect.x2 - rect.x1;
                  const height = rect.y2 - rect.y1;

                  let newX = pos.x;
                  let newY = pos.y;

                  // Check if the rectangle is outside the image boundaries
                  if (newX < 0) newX = 0;
                  if (newY < 0) newY = 0;
                  if (newX + width > image.width) newX = image.width - width;
                  if (newY + height > image.height)
                    newY = image.height - height;

                  return {
                    x: newX,
                    y: newY,
                  };
                }
                return pos;
              }}
              onDragEnd={(e) => {
                if (image) {
                  const index = rects.findIndex((r) => r.id === rect.id);
                  const updatedRects = [...rects];
                  let newX = e.target.x();
                  let newY = e.target.y();

                  // Calculate the width and height of the rectangle
                  const width = updatedRects[index].x2 - updatedRects[index].x1;
                  const height =
                    updatedRects[index].y2 - updatedRects[index].y1;

                  // Check if the rectangle is outside the image boundaries
                  if (newX < 0) newX = 0;
                  if (newY < 0) newY = 0;
                  if (newX + width > image.width) newX = image.width - width;
                  if (newY + height > image.height)
                    newY = image.height - height;

                  updatedRects[index] = {
                    ...updatedRects[index],
                    x1: newX,
                    y1: newY,
                    x2: newX + width,
                    y2: newY + height,
                  };
                  setRects(updatedRects);
                }
              }}
            >
              <Rect
                width={rect.x2 - rect.x1}
                height={rect.y2 - rect.y1}
                fill="transparent"
                stroke={rect.color}
                strokeWidth={2}
                onMouseOver={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) container.style.cursor = "pointer";
                  selectShape(rect.id);
                }}
                onMouseOut={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) container.style.cursor = "default";
                  selectShape(null);
                }}
                onDblClick={(e) => {
                  if (e.target.parent) {
                    const id = e.target.parent.attrs.id;
                    setRects(rects.filter((r) => r.id !== id));
                    selectShape(null);
                  }
                }}
              />
              {selectedId === rect.id && (
                <Transformer
                  boundBoxFunc={(oldBox, newBox) => {
                    if (newBox.width < 20 || newBox.height < 20) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                />
              )}
            </Group>
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default Canvas;
