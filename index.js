const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();

const userRoute = require("./routes/UserRoute")
const workoutRoute = require("./routes/WorkoutRoute")


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

//MongoDB database
mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));


app.use("/workouts", workoutRoute);
app.use("/users", userRoute);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}


module.exports = {app,mongoose};


