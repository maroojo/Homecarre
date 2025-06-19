"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import DndDropZone from "./DndDropZone";
import SortableCard from "./SortableCard";

export default function DndContainer() {
  const [createItems, setCreateItems] = useState([]);
  const [zone1Items, setZone1Items] = useState([]);
  const [zone2Items, setZone2Items] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const sensors = useSensors(useSensor(PointerSensor));

  const getZoneByItemId = (id) => {
    if (createItems.find((i) => i.id === id)) return "create";
    if (zone1Items.find((i) => i.id === id)) return "zone1";
    if (zone2Items.find((i) => i.id === id)) return "zone2";
    return null;
  };

  const handleCreateCard = () => {
    const newItem = { id: `item-${idCounter}`, label: `Card ${idCounter}` };
    setIdCounter((prev) => prev + 1);
    setCreateItems((prev) => [...prev, newItem]);
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const fromZone = getZoneByItemId(active.id);

    const overContainer = document
      .getElementById(over.id)
      ?.closest("[data-zone-id]");
    if (!overContainer) return;

    const toZone = overContainer.dataset.zoneId;

    if (fromZone === toZone || !fromZone || !toZone) return;

    let item;
    if (fromZone === "create") {
      item = createItems.find((i) => i.id === active.id);
      setCreateItems((prev) => prev.filter((i) => i.id !== item.id));
    } else if (fromZone === "zone1") {
      item = zone1Items.find((i) => i.id === active.id);
      setZone1Items((prev) => prev.filter((i) => i.id !== item.id));
    } else if (fromZone === "zone2") {
      item = zone2Items.find((i) => i.id === active.id);
      setZone2Items((prev) => prev.filter((i) => i.id !== item.id));
    }

    if (toZone === "create") setCreateItems((prev) => [...prev, item]);
    if (toZone === "zone1") setZone1Items((prev) => [...prev, item]);
    if (toZone === "zone2") setZone2Items((prev) => [...prev, item]);
  };

  return (
    <div className="space-y-6">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleCreateCard}
      >
        Create Card
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-3 gap-4">
          <SortableContext
            items={createItems.map((i) => i.id)}
            strategy={rectSortingStrategy}
          >
            <DndDropZone id="create">
              {createItems.map((item) => (
                <SortableCard key={item.id} id={item.id} label={item.label} />
              ))}
            </DndDropZone>
          </SortableContext>

          <SortableContext
            items={zone1Items.map((i) => i.id)}
            strategy={rectSortingStrategy}
          >
            <DndDropZone id="zone1">
              {zone1Items.map((item) => (
                <SortableCard key={item.id} id={item.id} label={item.label} />
              ))}
            </DndDropZone>
          </SortableContext>

          <SortableContext
            items={zone2Items.map((i) => i.id)}
            strategy={rectSortingStrategy}
          >
            <DndDropZone id="zone2">
              {zone2Items.map((item) => (
                <SortableCard key={item.id} id={item.id} label={item.label} />
              ))}
            </DndDropZone>
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
