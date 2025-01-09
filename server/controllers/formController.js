import Response from "../models/response.js";
import mongoose from "mongoose";

// Submit form response
export const submitFormResponse = async (req, res) => {
  try {
    const { formId, responses } = req.body;

    // Check if the formId is valid
    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({ message: "Invalid form ID." });
    }

    // Save the response to the database
    const newResponse = new Response({
      formId,
      responses,
    });

    await newResponse.save();
    res.status(201).json({ message: "Response submitted successfully." });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Error saving response." });
  }
};
