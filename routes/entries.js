import express from "express";
const router = express.Router();

import {
  getNewEntryForm,
  postNewEntry,
  showEntry,
  getEditEntryForm,
  updateEntry,
  deleteEntry,
} from "../controllers/entries.js";

router.get("/new", getNewEntryForm);
router.post("/", postNewEntry);

router.get("/:id", showEntry);
router.get("/:id/edit", getEditEntryForm);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
