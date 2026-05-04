// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,

//   skillsHave: {
//     type: [String],
//     default: []
//   },
//   skillsWant: {
//     type: [String],
//     default: []
//   }
// });
// //put


// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  skillName: {
    type: String,
    required: true
  },
  level: {
    type: String, // Beginner / Intermediate / Expert
    default: "Beginner"
  }
}, { timestamps: true });

module.exports = mongoose.model("Skill", skillSchema);