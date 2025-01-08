import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // Import from the new package
import FieldEditor from "./FieldEditor";
import fieldTypes from "./FieldTypes"; // Assuming you have this already defined
import axios from "axios";

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [formTitle, setFormTitle] = useState("");

  // Drag and Drop Handler
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, return early
    if (!destination) return;

    // Dragging from Available Fields to Form Layout
    if (
      source.droppableId === "fieldTypes" &&
      destination.droppableId === "formFields"
    ) {
      const draggedField = fieldTypes[source.index];
      setFormFields([
        ...formFields,
        { ...draggedField, id: `${draggedField.type}-${Date.now()}` },
      ]);
    } else if (
      source.droppableId === "formFields" &&
      destination.droppableId === "formFields"
    ) {
      // Reordering form fields
      const reorderedFields = Array.from(formFields);
      const [movedField] = reorderedFields.splice(source.index, 1);
      reorderedFields.splice(destination.index, 0, movedField);
      setFormFields(reorderedFields);
    }
  };

  // Update Field Editor
  const updateField = (id, updatedField) => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      )
    );
  };

  // Save Form to Database
  const handleSaveForm = async () => {
    if (!formTitle || formFields.length === 0) {
      alert("Please provide a title and at least one field.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/forms", {
        title: formTitle,
        fields: formFields.map(({ id, ...rest }) => rest),
      });
      alert("Form saved successfully!");
      setFormTitle("");
      setFormFields([]);
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save the form. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        Drag-and-Drop Form Builder
      </h2>
      <input
        type="text"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        placeholder="Enter Form Title"
        className="block mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />
      <div className="flex gap-6">
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Available Field Types */}
          <Droppable droppableId="fieldTypes" isDropDisabled={true}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 p-4 bg-white rounded shadow"
              >
                <h3 className="text-lg font-medium mb-4">Available Fields</h3>
                {fieldTypes.map((field, index) => (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 bg-gray-100 border border-gray-200 rounded cursor-grab"
                      >
                        {field.label}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Form Fields */}
          <Droppable droppableId="formFields">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-2/3 p-4 bg-white rounded shadow"
              >
                <h3 className="text-lg font-medium mb-4">Form Layout</h3>
                {formFields.map((field, index) => (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 bg-gray-100 border border-gray-200 rounded"
                      >
                        <FieldEditor field={field} updateField={updateField} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <button
        onClick={handleSaveForm}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Form
      </button>
    </div>
  );
};

export default FormBuilder;
