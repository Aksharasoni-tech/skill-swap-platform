const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userRoutes=require("./routes/user");
const { default: App } = require("../../client/src/App");

app.use("/api",userRoutes);

// ✅ ADD USER
router.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE FUNCTION
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE FUNCTION
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ROUTES
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser);
//put
router.put("/update-skills", authMiddleware, async (req, res) => {
  try {
    const { skillsHave, skillsWant } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { skillsHave, skillsWant },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating skills" });
  }
});

module.exports = router;