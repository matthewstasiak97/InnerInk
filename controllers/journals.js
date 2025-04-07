import Journal from "../models/journal.js";
import Entry from "../models/entry.js";

export const getNewJournalForm = (req, res) => {
  res.render("journals/new", { user: req.session.user });
};

export const postNewJournal = async (req, res) => {
  try {
    await Journal.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.session.user._id,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error creating journal");
  }
};

export const getUserJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.session.user._id });
    res.render("journals/index", {
      user: req.session.user,
      journals,
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading journals");
  }
};

export const getJournalEntries = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.session.user._id,
    });

    if (!journal) {
      return res.send("Journal not found or access denied.");
    }

    const entries = await Entry.find({
      journalId: journal._id,
      userId: req.session.user._id,
    });

    res.render("journals/show", { journal, entries, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.send("Could not load journal.");
  }
};

export const getEditJournalForm = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.session.user._id,
    });

    if (!journal) {
      return res.send("Journal not found");
    }

    res.render("journals/edit", { journal, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.send("Error loading edit form");
  }
};

export const updateJournal = async (req, res) => {
  try {
    await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.user._id },
      {
        title: req.body.title,
        description: req.body.description,
      }
    );
    res.redirect(`/journals/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.send("Error updating journal.");
  }
};

export const deleteJournal = async (req, res) => {
  try {
    await Journal.deleteOne({
      _id: req.params.id,
      userId: req.session.user._id,
    });
    res.redirect("/journals");
  } catch (err) {
    console.error(err);
    res.send("Error deleting journal.");
  }
};
