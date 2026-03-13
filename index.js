const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const port = 4000;

const app = express();

const userRoute = require("./routes/UserRoute")
const workoutRoute = require("./routes/WorkoutRoute")


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

//MongoDB database
mongoose.connect("mongodb+srv://admin:admin@cluster0.bqcrmbd.mongodb.net/fitness-tracker-API?appName=Cluster0");
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));


app.use("/workouts", workoutRoute);
app.use("/users", userRoute);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}


module.exports = {app,mongoose};


