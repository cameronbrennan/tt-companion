const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    race: {
      type: String,
      enum: [
        "dragonborn",
        "dwarf",
        "elf",
        "gnome",
        "half-elf",
        "half-orc",
        "halfling",
        "human",
        "tiefling",
      ],
      required: true,
    },
    class: {
      type: String,
      enum: [
        "barbarian",
        "bard",
        "cleric",
        "druid",
        "fighter",
        "monk",
        "paladin",
        "ranger",
        "rogue",
        "sorcerer",
        "warlock",
        "wizard",
      ],
      required: true,
    },
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