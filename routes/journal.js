import express from "express";
import {
  getNewJournalForm,
  postNewJournal,
  getUserJournals,
  getJournalEntries,
} from "../controllers/journals.js";

const router = express.Router();

router.get("/new", getNewJournalForm);
router.post("/", postNewJournal);
router.get("/", getUserJournals);
router.get("/:id", getJournalEntries);

export default router;
