// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({

//   profile: {
//     type: String
//   },

//   goal: {
//     type: String
//   },

//   level: {
//     type: String
//   },

//   interest: {
//     type: String
//   },

//   aiRoadmap: {
//     type: String
//   }

// });

// const User = mongoose.model(
//   "User",
//   userSchema
// );

// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  // AUTH

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // ONBOARDING

  profile: {
    type: String,
    default: ""
  },

  goal: {
    type: String,
    default: ""
  },

  level: {
    type: String,
    default: ""
  },

  interest: {
    type: String,
    default: ""
  },

  // AI ROADMAP

  aiRoadmap: {
    type: String,
    default: ""
  }

}, {
  timestamps: true
});

const User = mongoose.model(
  "User",
  userSchema
);

export default User;