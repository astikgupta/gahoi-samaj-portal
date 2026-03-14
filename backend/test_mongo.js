const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gahoi_samaj_connect').then(async () => {
  const User = mongoose.model('User', new mongoose.Schema({},{strict:false}));
  const MatrimonialProfile = mongoose.model('MatrimonialProfile', new mongoose.Schema({},{strict:false}));
  const usersCount = await User.countDocuments({ age: { $gte: 18 } });
  const profiles = await MatrimonialProfile.find();
  console.log("18+ Users:", usersCount);
  console.log("Total Matrimonial Profiles:", profiles.length);
  console.log("Profiles:");
  profiles.forEach(p => console.log("-", p.fullName, ", Approved:", p.isApproved));
  process.exit(0);
}).catch(console.error);
