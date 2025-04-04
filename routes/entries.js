import {
  getNewEntryForm,
  postNewEntry,
  showEntry,
  getEditEntryForm,
  updateEntry,
  deleteEntry,
} from "../controllers/entries.js";
import router from "./users.js";

router.get("/new", getNewEntryForm);
router.post("/", postNewEntry);

router.get("/:id", showEntry);
router.get("/:id/edit", getEditEntryForm);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);
