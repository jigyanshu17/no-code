import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fields: [
      {
        label: { type: String, required: true },
        type: { type: String, required: true }, // e.g., "text", "dropdown"
        options: [String], // For dropdowns, checkboxes, etc.
        required: { type: Boolean, default: false },
      },
    ],
    responses: [
      {
        submittedAt: { type: Date, default: Date.now },
        data: { type: Map, of: String }, // Flexible response storage
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Form", FormSchema);
