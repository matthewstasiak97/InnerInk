import Journal from "../models/journal.js";
import Entry from "../models/entry.js";

export const getNewEntryForm = async (req, res) => {
  const journals = await Journal.find({ userId: req.session.user._id });
  res.render("entries/new", { user: req.session.user, journals });
};

export const showEntry = async (req, res) => {
  try {
    const entry = await Entry.findOne({
      _id: req.params.id,
      userId: req.session.user._id,
    });

    if (!entry) return res.send("Entry not found");
    res.render("entries/show", { entry, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.send("Error loading entry");
  }
};

export const getEditEntryForm = async (req, res) => {
  const entry = await Entry.findOne({
    _id: req.params.id,
    userId: req.session.user._id,
  });
  res.render("entries/edit", { entry, user: req.session.user });
};

export const postNewEntry = async (req, res) => {
  try {
    await Entry.create({
      title: req.body.title,
      content: req.body.content,
      mood: req.body.mood,
      userId: req.session.user._id,
      journalId: req.body.journalId,
    });
    res.redirect(`/journals/${req.body.journalId}`);
  } catch (err) {
    console.error(err);
    res.send("Error creating entry");
  }
};

export const updateEntry = async (req, res) => {
  await Entry.findOneAndUpdate(
    { _id: req.params.id, userId: req.session.user._id },
    {
      title: req.body.title,
      content: req.body.content,
      mood: req.body.mood,
    }
  );
  res.redirect(`/entries/${req.params.id}`);
};

export const deleteEntry = async (req, res) => {
  const entry = await Entry.findOne({
    _id: req.params.id,
    userId: req.session.user._id,
  });

  if (entry) {
    await Entry.deleteOne({ _id: entry._id });
    res.redirect(`/journals/${entry.journalId}`);
  } else {
    res.send("Entry not found");
  }
};
