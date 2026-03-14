const mongoose = require('mongoose');

const matrimonialProfileSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    fullName: { type: String, required: true },
    age: { type: Number, required: true, min: 18 },
    height: { type: String },
    education: { type: String },
    profession: { type: String },
    city: { type: String },
    familyBackground: { type: String },
    contactDetails: { type: String },
    kundliUrl: { type: String },
    photoUrl: { type: String },
    isApproved: { type: Boolean, default: false },
}, { timestamps: true });

const MatrimonialProfile = mongoose.model('MatrimonialProfile', matrimonialProfileSchema);
module.exports = MatrimonialProfile;
