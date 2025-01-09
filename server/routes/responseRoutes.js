import express from "express";
import { submitFormResponse } from "../controllers/formController.js";

const router = express.Router();

// Route to submit a form response
router.post("/responses", submitFormResponse);

export default router;
