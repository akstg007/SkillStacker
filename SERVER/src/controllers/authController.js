import User from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
// SIGNUP
export const signup = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    // CHECK USER

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message:
          "User already exists"
      });
    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER

    const user =
    
      await User.create({

        name,

        email,

        password:
          hashedPassword
      });

    // CREATE TOKEN

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );

    res.status(201).json({

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};


// LOGIN

export const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    // FIND USER

    const user =
    
      await User.findOne({ email });

    if (!user) {
  console.log("USER NOT FOUND");
      return res.status(400).json({
        message:
          "Invalid credentials"
      });
    }

    // VERIFY PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
console.log("PASSWORD WRONG");
      return res.status(400).json({
        message:
          "Invalid credentials"
      });
    }

    // TOKEN

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        profile: user.profile,

        goal: user.goal,

        level: user.level,

        interest: user.interest
      }
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};