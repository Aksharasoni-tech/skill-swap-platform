const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/match", async (req, res) => {
  try {
    const users = await User.find();

    let matches = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {

        let userA = users[i];
        let userB = users[j];

        let condition1 = userA.skillsHave.some(skill =>
          userB.skillsWant.includes(skill)
        );

        let condition2 = userB.skillsHave.some(skill =>
          userA.skillsWant.includes(skill)
        );

        if (condition1 && condition2) {
          matches.push({
            user1: userA.name,
            user2: userB.name
          });
        }
      }
    }

    res.json(matches);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;