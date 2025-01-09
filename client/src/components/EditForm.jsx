import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditForm = () => {
  const { id } = useParams(); // Get form ID from URL params
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
      const formData = response.data;
      setForm(formData);
      setFormTitle(formData.title);
      setFormFields(formData.fields);
    } catch (error) {
      console.error("Error fetching form:", error);
    }
  };

  const handleFieldChange = (index, field) => {
    const updatedFields = [...formFields];
    updatedFields[index] = field;
    setFormFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...formFields];
    const updatedOptions = [...updatedFields[fieldIndex].options];
    updatedOptions[optionIndex] = value;
    updatedFields[fieldIndex].options = updatedOptions;
    setFormFields(updatedFields);
  };

  const handleAddOption = (fieldIndex) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options = [
      ...(updatedFields[fieldIndex].options || []),
      "",
    ];
    setFormFields(updatedFields);
  };

  const handleRemoveOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...formFields];
    const updatedOptions = [...updatedFields[fieldIndex].options];
    updatedOptions.splice(optionIndex, 1);
    updatedFields[fieldIndex].options = updatedOptions;
    setFormFields(updatedFields);
  };

  const handleSaveForm = async () => {
    if (!formTitle || formFields.length === 0) {
      alert("Please provide a title and at least one field.");
      return;
    }

    try {
      const updatedForm = { title: formTitle, fields: formFields };
      await axios.put(`http://localhost:5000/api/forms/${id}`, updatedForm);
      alert("Form updated successfully!");
      navigate("/admin-dashboard"); // Redirect back to the dashboard
    } catch (error) {
      if (error.response?.status === 404) {
        alert("Form not found. It may have been deleted.");
      } else {
        console.error("Error updating form:", error);
        alert("Failed to update the form. Please try again.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Edit Form</h2>
      {form ? (
        <div>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Enter Form Title"
            className="block mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
          />

          {/* Render the form fields here */}
          <div className="space-y-4 mb-4">
            {formFields.map((field, index) => (
              <div key={field.id} className="p-4 bg-white shadow-md rounded">
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    handleFieldChange(index, {
                      ...field,
                      label: e.target.value,
                    })
                  }
                  className="block mb-2 p-2 border border-gray-300 rounded w-full"
                  placeholder="Field Label"
                />

                {/* Options for the field */}
                {field.options && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Options:</h4>
                    {field.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, optIndex, e.target.value)
                          }
                          className="p-2 border border-gray-300 rounded w-full"
                          placeholder={`Option ${optIndex + 1}`}
                        />
                        <button
                          onClick={() => handleRemoveOption(index, optIndex)}
                          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddOption(index)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2"
                    >
                      Add Option
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveForm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Form
          </button>
        </div>
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
};

export default EditForm;
