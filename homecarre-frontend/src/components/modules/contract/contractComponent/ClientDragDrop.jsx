import React, { useState, useEffect } from "react";
import { Input, Button, Card, AutoComplete, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Card ที่ลากได้
function SortableItem({ id, name, phone, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    marginBottom: 8,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      size="small"
      extra={
        <Button danger size="small" onClick={() => onRemove(id)}>
          ลบ
        </Button>
      }
    >
      <div>{name}</div>
      <div>{phone}</div>
    </Card>
  );
}

export default function ClientDragDrop({
  field,
  fields,
  onAdd,
  onRemove,
  data,
  setData,
  placeholderName = "Name",
  placeholderPhone = "Phone",
  title = "Items",
  searchOptions = [],
  onSearchCreate, 
  disabled = false,
}) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [searchValue, setSearchValue] = useState("");
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  useEffect(() => {
    if (searchValue.length < 2) {
      setAutoCompleteOptions([]);
      return;
    }
    const filtered = searchOptions
      .filter((opt) =>
        opt.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((opt) => ({ value: opt.name }));
    setAutoCompleteOptions(filtered);
  }, [searchValue, searchOptions]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = data.findIndex((i) => i.id === active.id);
      const newIndex = data.findIndex((i) => i.id === over?.id);
      const newData = arrayMove(data, oldIndex, newIndex);
      setData(newData);
    }
  }

  function handleAddFromSearch(value) {
    const found = searchOptions.find((o) => o.name === value);
    if (found) {
      if (data.some((d) => d.id === found.id)) return;
      onAdd(found);
      setSearchValue("");
    }
  }

  function handleCreateNew() {
    if (!searchValue.trim()) return;
    if (data.some((d) => d.name === searchValue.trim())) return;
    const newItem = {
      id: `new-${Date.now()}`,
      name: searchValue.trim(),
      phone: "",
      isNew: true,
    };
    onAdd(newItem);
    setSearchValue("");
    if (onSearchCreate) onSearchCreate(newItem);
  }

  return (
    <div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <Space.Compact className="mb-4" style={{ width: "100%" }}>
        <AutoComplete
          options={autoCompleteOptions}
          style={{ width: "100%" }}
          value={searchValue}
          onChange={setSearchValue}
          onSelect={handleAddFromSearch}
          disabled={disabled}
          placeholder={`ค้นหา ${title}`}
          allowClear
          filterOption={false}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={handleCreateNew}
          disabled={disabled || !searchValue.trim()}
        >
          เพิ่มใหม่
        </Button>
      </Space.Compact>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={data.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {data.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              name={item.name}
              phone={item.phone}
              onRemove={onRemove}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
