import React from "react";

const FieldEditor = ({ field, updateField }) => {
  const handleLabelChange = (e) => {
    updateField(field.id, { label: e.target.value });
  };

  const handleOptionsChange = (index, value) => {
    const updatedOptions = [...field.options];
    updatedOptions[index] = value;
    updateField(field.id, { options: updatedOptions });
  };

  const addOption = () => {
    updateField(field.id, { options: [...(field.options || []), ""] });
  };

  return (
    <div className="field-editor">
      <input
        type="text"
        value={field.label}
        onChange={handleLabelChange}
        placeholder="Field Label"
      />
      {field.type === "dropdown" ||
      field.type === "checkbox" ||
      field.type === "radio" ? (
        <div>
          <h4>Options:</h4>
          {field.options?.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionsChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
          ))}
          <button onClick={addOption}>Add Option</button>
        </div>
      ) : null}
    </div>
  );
};

export default FieldEditor;
