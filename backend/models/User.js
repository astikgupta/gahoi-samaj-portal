const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    profession: { type: String, required: false },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    password: { type: String, required: true },
    profilePhoto: { type: String, required: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isApproved: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
