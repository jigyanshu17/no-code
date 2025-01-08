import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Optional if you want routing

const AdminDashboard = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/forms");
      setForms(response.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const deleteForm = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${id}`);
      fetchForms(); // Re-fetch forms after deleting
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="space-y-4">
        {forms.length === 0 ? (
          <p>No forms available.</p>
        ) : (
          forms.map((form) => (
            <div
              key={form._id}
              className="flex justify-between items-center p-4 bg-white shadow-md rounded"
            >
              <h3 className="text-lg">{form.title}</h3>
              <div>
                <button
                  onClick={() => deleteForm(form._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded mr-2"
                >
                  Delete
                </button>
                <Link
                  to={`/edit-form/${form._id}`} // This will be for editing if needed
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
