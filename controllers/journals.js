import journal from "../models/journal.js";
import entry from "../models/entry.js";

export const getNewJournalForm = (req, res) => {
  res.render("journals/new", { user: req.session.user });
};

export const postNewJournal = async (req, res) => {
  try {
    await journal.create({
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
    const journals = await journal.find({ userId: req.session.user._id });
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
    const journalId = req.params.id;

    const journal = await journalModel.findOne({
      _id: journalId,
      userId: req.session.user._id,
    });

    const entries = await entry.find({
      journalId,
      userId: req.session.user._id,
    });

    res.render("journals/show", { journal, entries, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.send("Could not load journal.");
  }
};
