const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
    title: { type: String },
    imageUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;
