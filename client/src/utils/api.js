import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch forms
export const fetchForms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forms`); // Full URL
    return response.data;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
};

// Submit form
export const submitForm = async (formId, formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/forms/${formId}/submit`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};
