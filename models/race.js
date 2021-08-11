const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
    index: {type: String, required: true, lowercase: true, unique: true},
    name: {type: String, required: true},
  });

module.exports = mongoose.model('Race', raceSchema)