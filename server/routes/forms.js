import express from "express";
import {
  getAllForms,
  deleteForm,
  updateForm,
  getFormById,
  createForm,
} from "../controllers/forms.js";

const router = express.Router();


// Get all forms
router.get("/", getAllForms);

router.post("/", createForm);

// Delete form
router.delete("/:id", deleteForm);

// Route to update a form by ID
router.put("/forms/:id", updateForm);

// Get form by ID (for users to fill it out)
router.get("/:id", getFormById);




export default router;
