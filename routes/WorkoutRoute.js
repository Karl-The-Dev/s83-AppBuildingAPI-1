const express = require("express");
const router = express.Router();
const WorkoutController = require("../controllers/WorkoutController");
                            
const { verify } = require("../auth")


router.post("/addWorkout", verify, WorkoutController.addWorkout);

router.get("/getMyWorkouts",  verify, WorkoutController.getMyWorkouts);


module.exports = router;