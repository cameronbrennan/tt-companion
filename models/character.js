const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    race: { type: mongoose.Schema.Types.ObjectId, ref: "Race" },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
    charBio: { type: String, required: true },
    photoUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Character", characterSchema);
