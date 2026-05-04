const express = require("express");
const router = express.Router();

// accept controller (we will define next)
//const { acceptRequest } = require("../controllers/requestController");

 //route
router.put("/accept/:id", async(req,res)=>{
     res.json({message:"Accept  API working"});
 });
//
// const Request = require("../models/Request");

// router.put("/accept/:id", async (req, res) => {
//   try {
//     const requestId = req.params.id;

//     const request = await Request.findByIdAndUpdate(
//       requestId,
//       { status: "accepted" },
//       { new: true }
//     )
//       .populate("fromUser", "name email")
//       .populate("toUser", "name email");

//     if (!request) {
//       return res.status(404).json({
//         message: "Request not found"
//       });
//     }

//     res.json(request);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


module.exports = router;
