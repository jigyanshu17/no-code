import Form from "../models/form.js";

// Get all forms
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms." });
  }
};

// Create a new form (for handling POST requests)
export const createForm = async (req, res) => {
  try {
    const { title, fields } = req.body; // Extract title and fields from the request body
    const newForm = new Form({ title, fields }); // Create a new form instance
    await newForm.save(); // Save the new form to the database
    res.status(201).json(newForm); // Respond with the newly created form
  } catch (error) {
    res.status(500).json({ message: "Error saving form." }); // Error response in case of failure
  }
};

// Delete form
export const deleteForm = async (req, res) => {
  try {
    await Form.findByIdAndDelete(req.params.id);
    res.json({ message: "Form deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form." });
  }
};

// Update form (optional for editing)
export const updateForm = async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ message: "Error updating form." });
  }
};

// Get form by ID (for users to fill it out)
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form." });
  }
};
