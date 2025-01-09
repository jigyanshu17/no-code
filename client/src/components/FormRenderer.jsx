import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FormRenderer() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`/api/forms/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (fieldId, value) => {
    setResponses((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/responses", { formId: id, responses });
      alert("Response submitted successfully!");
    } catch (error) {
      console.error("Error submitting response:", error);
      alert("Error submitting response.");
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{form.title}</h2>
      <form onSubmit={handleSubmit}>
        {form.fields.map((field) => (
          <div key={field._id} className="mb-4">
            <label className="block font-semibold mb-1">{field.label}</label>
            <input
              type={field.type}
              className="border p-2 rounded w-full"
              onChange={(e) => handleChange(field._id, e.target.value)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormRenderer;
