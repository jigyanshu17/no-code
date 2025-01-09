import Form from "../models/form.js";
import mongoose from "mongoose";
// Get all forms
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms." });
  }
};

// Create a new form
export const createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;
    const newForm = new Form({ title, fields });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: "Error saving form." });
  }
};

// Delete form
export const deleteForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }
    res.json({ message: "Form deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form." });
  }
};

export const updateForm = async (req, res) => {
  console.log("Update Form route hit");
  try {
    const { id } = req.params;
    console.log("Attempting to update form with ID:", id);

    // Ensure the ID is valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format:", id);
      return res.status(400).json({ message: "Invalid form ID format." });
    }

    // Query the form
    const form = await Form.findById(id);
    if (!form) {
      console.log(`Form not found with ID: ${id}`);
      return res.status(404).json({ message: "Form not found" });
    }

    // Proceed to update the form
    const updatedForm = await Form.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log("Form updated successfully:", updatedForm);
    res.json(updatedForm);
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ message: "Error updating form." });
  }
};



// Get form by ID
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form." });
  }
};
