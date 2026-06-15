import express from "express";
import User from "../models/User.js";

const router = express.Router();
router.put(
  "/onboarding/:id",

  async (req, res) => {

    try {
console.log(req.body);
      const updatedUser =
        await User.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true
          }
        );

      res.status(200).json(
        updatedUser
      );

    } catch (error) {
console.log(error);
      res.status(500).json({
        error: error.message
      });
    }
  }
);

router.post("/save", async (req, res) => {

  try {

    const user = new User(req.body);

    await user.save();

    res.status(201).json({
      message: "User saved successfully"
    });

  } catch (error) {
console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;