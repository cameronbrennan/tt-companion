const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    race: String,
    class: String,
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
    charBio: String,
    photoUrl: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Character', characterSchema);