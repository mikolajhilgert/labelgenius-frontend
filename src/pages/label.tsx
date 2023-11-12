import React, { useState } from "react";
import { Image, Stage, Layer, Rect, Transformer, Group } from "react-konva";
import useImage from "use-image";
import Picture from "../assets/animals.jpg";
import { v4 as uuidv4 } from "uuid";
import ClassSelector from "../components/ClassSelector";
import Labels from "../assets/labels.json";

const Canvas: React.FC = () => {
  const [image] = useImage(Picture);
  const [rects, setRects] = useState<any[]>(Labels || []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [labelClass, setLabelClass] = useState("Dog");
  const [color, setColor] = useState("#FF0000");

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
          oldRects.map((rect) =>
            rect.id === selectedId
              ? { ...rect, width: pos.x - rect.x, height: pos.y - rect.y }
              : rect
          )
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
          (Math.abs(rect.width) >= 50 && Math.abs(rect.height) >= 50)
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
        colors={[
          { name: "Dog", color: "#FF0000" },
          { name: "Horse", color: "#0000FF" },
        ]}
      />

      <button
        onClick={() =>
          console.log(
            JSON.stringify(
              rects.filter(
                (r) => Math.abs(r.width) > 0 && Math.abs(r.height) > 0
              )
            )
          )
        }
      >
        Export
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
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
    </>
  );
};

export default Canvas;
