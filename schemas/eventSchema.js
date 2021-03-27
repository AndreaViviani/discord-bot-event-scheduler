const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({
    name: String,
})

const eventSchema = new Schema({
  date:  {type: Number, required: true}, 
  location: {type: String, required: true},
  lat: String,
  long: String,
  participants: [participantSchema],
  reminded: Boolean,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = {Event: Event};