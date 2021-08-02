const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    index: {type: String, required: true, lowercase: true, unique: true},
    name: {type: String, required: true},
  });

module.exports = mongoose.model('classes', classSchema)