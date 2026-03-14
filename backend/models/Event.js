const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    location: { type: String },
    eventType: { type: String, enum: ['Meeting', 'Charity', 'Temple', 'Wedding', 'Other'] },
    imageUrl: { type: String },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
