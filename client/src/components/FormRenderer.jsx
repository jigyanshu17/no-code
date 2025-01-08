import React, { useState, useEffect } from "react";
import axios from "axios";

const FormRenderer = ({ match }) => {
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/forms/${match.params.id}`
        );
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, [match.params.id]);

  const handleChange = (e, fieldId) => {
    setResponses((prev) => ({
      ...prev,
      [fieldId]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/responses", {
        formId: form._id,
        responses,
      });
      alert("Your response has been submitted!");
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">{form.title}</h2>
      <div className="space-y-4">
        {form.fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block">{field.label}</label>
            <input
              type={field.type === "text" ? "text" : "text"}
              value={responses[field.id] || ""}
              onChange={(e) => handleChange(e, field.id)}
              className="block p-2 border border-gray-300 rounded w-full"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit Response
      </button>
    </div>
  );
};

export default FormRenderer;
