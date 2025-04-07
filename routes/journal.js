import express from "express";
import {
  getNewJournalForm,
  postNewJournal,
  getUserJournals,
  getJournalEntries,
  getEditJournalForm,
  updateJournal,
  deleteJournal,
} from "../controllers/journals.js";

const router = express.Router();

router.get("/new", getNewJournalForm);
router.post("/", postNewJournal);
router.get("/", getUserJournals);
router.get("/:id", getJournalEntries);
router.get("/:id/edit", getEditJournalForm);
router.put("/:id", updateJournal);
router.delete("/:id", deleteJournal);

export default router;
