import React, { useState, useEffect } from "react";
import { Image, Stage, Layer, Rect, Transformer, Group } from "react-konva";
import useImage from "use-image";
import { v4 as uuidv4 } from "uuid";
import ClassSelector from "./ClassSelector";
import Labels from "../assets/labels.json";
import Box from "@mui/material/Box";

interface ImageElementProps {
  imageElement: string;
  labelClasses: {
    [key: string]: string;
  };
  projectId: string;
  imageId: string;
}

const Label: React.FC<ImageElementProps> = ({
  imageElement,
  labelClasses,
  projectId,
  imageId,
}) => {
  const [image] = useImage(imageElement);
  const [rects, setRects] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [labelClass, setLabelClass] = useState(Object.keys(labelClasses)[0]);
  const [color, setColor] = useState(
    labelClasses[Object.keys(labelClasses)[0]]
  );
  const minWidth = 10;
  const minHeight = 10;

  // Define your function here
  const yourFunction = () => {
    console.log("Image index changed!");
  };

  useEffect(() => {
    // Call your function
    yourFunction();
    setLabelClass(Object.keys(labelClasses)[0]);
    setColor(labelClasses[Object.keys(labelClasses)[0]]);
  }, [imageId, labelClasses]);
  const handleMouseDown = (event: any) => {
    const stage = event.target.getStage();
    const pos = stage.getPointerPosition();
    if (image && labelClass !== "") {
      const stageWidth = image.width;
      const stageHeight = image.height;
      if (pos.x > 0 && pos.x < stageWidth && pos.y > 0 && pos.y < stageHeight) {
        setDrawing(true);
        const newRect = {
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
          id: uuidv4(),
          labelClass: labelClass,
          color: color,
          startX: pos.x,
          startY: pos.y,
        };
        setRects((oldRects) => [...oldRects, newRect]);
        setSelectedId(newRect.id);
      }
    }
  };
  const handleMouseMove = (event: any) => {
    if (!drawing) {
      return;
    }
    const stage = event.target.getStage();
    const pos = stage.getPointerPosition();
    if (image) {
      const stageWidth = image.width;
      const stageHeight = image.height;
      if (pos.x > 0 && pos.x < stageWidth && pos.y > 0 && pos.y < stageHeight) {
        setRects((oldRects) =>
          oldRects.map((rect) => {
            if (rect.id === selectedId) {
              const width = Math.abs(pos.x - rect.startX);
              const height = Math.abs(pos.y - rect.startY);
              if (width >= minWidth && height >= minHeight) {
                return {
                  ...rect,
                  x: Math.min(rect.startX, pos.x),
                  y: Math.min(rect.startY, pos.y),
                  width: width,
                  height: height,
                };
              } else {
                return rect;
              }
            } else {
              return rect;
            }
          })
        );
      }
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
    setRects((oldRects) =>
      oldRects.filter(
        (rect) =>
          rect.id !== selectedId ||
          (rect.width >= minWidth && rect.height >= minHeight)
      )
    );
    setSelectedId(null);
  };

  const handleDblClick = (id: string) => {
    setRects((oldRects) => oldRects.filter((rect) => rect.id !== id));
    setSelectedId(null);
  };

  const dragBoundFunc = (pos: any, rect: any, image: any) => {
    let newX = pos.x;
    let newY = pos.y;
    if (image && rect) {
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + rect.width > image.width) newX = image.width - rect.width;
      if (newY + rect.height > image.height) newY = image.height - rect.height;
    }
    return { x: newX, y: newY };
  };

  const handleDragEnd = (event: any) => {
    setRects((oldRects) =>
      oldRects.map((rect) =>
        rect.id === event.target.attrs.id
          ? { ...rect, x: event.target.x(), y: event.target.y() }
          : rect
      )
    );
  };

  return (
    <>
      <ClassSelector
        onChange={(item: any) => {
          setLabelClass(item.name);
          setColor(item.color);
        }}
        value={{ name: labelClass, color: color }}
        colors={Object.entries(labelClasses).map(([name, color]) => ({
          name,
          color,
        }))}
      />

      <button
        onClick={() =>
          console.log(
            JSON.stringify(rects.filter((r) => r.width > 0 && r.height > 0))
          )
        }
      >
        Export
      </button>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stage
          width={image?.width}
          height={image?.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            <Image image={image} />
            {rects.map((rect, i) => (
              <Group
                key={i}
                id={rect.id}
                x={rect.x}
                y={rect.y}
                draggable
                dragBoundFunc={(pos) => dragBoundFunc(pos, rect, image)}
                onDragEnd={handleDragEnd}
              >
                <Rect
                  width={rect.width}
                  height={rect.height}
                  fill="transparent"
                  stroke={rect.color}
                  strokeWidth={2}
                  onDblClick={() => handleDblClick(rect.id)}
                />
                {selectedId === rect.id && <Transformer />}
              </Group>
            ))}
          </Layer>
        </Stage>
      </Box>
    </>
  );
};

export default Label;
