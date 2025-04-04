import journal from "../models/journal";
import entry from "../models/entry.js";

export const getNewEntryForm = async (req, res) => {
  const journals = await journal.find({ userId: req.session.user._id });
  res.render("entries/new", { user: req.session.user, journals });
};

export const showEntry = async (req, res) => {
  try {
    const entry = await entry.findOne({
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
