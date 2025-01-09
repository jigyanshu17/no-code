import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FormList() {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("/api/forms");
        console.log("Response data:", response.data); // Log the response to inspect

        if (Array.isArray(response.data)) {
          setForms(response.data); // Only set if it's an array
        } else {
          setError("Error: The response data is not an array.");
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
        setError("Error fetching forms.");
      }
    };

    fetchForms();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Available Forms</h2>
      {forms.length === 0 ? (
        <p>No forms available.</p>
      ) : (
        <ul>
          {forms.map((form) => (
            <li key={form._id} className="mb-2">
              <Link
                to={`/form/${form._id}`}
                className="text-blue-500 hover:underline"
              >
                {form.title} {/* Assuming `title` is a field in the form */}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FormList;
