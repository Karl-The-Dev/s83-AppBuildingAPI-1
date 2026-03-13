/* ACTIVITY SOLUTION START */
const Workout = require("../models/Workout");

// s46 error handling
const {errorHandler } = require("../auth");


module.exports.addWorkout = (req, res) => {
    
    Workout.findOne({name : req.body.name})
    .then(existingWorkout => {
        if(existingWorkout){
              
            return res.status(409).send({ message: "Workout already exist"});
        }
        else {
            
            let newWorkout = new Workout({
                userId: req.user.id,
                name : req.body.name,
                duration : req.body.duration                
            });

            // Saves the created object to our database
            return newWorkout.save()
                            // sends the result tot he database
            .then( result => res.status(201).send({
                // s49 RESTful Response
                success: true,
                message: "Workout added succesfully",
                result: result
            }) )            
            .catch(err => res.send ({ error: err.message })) 
        }

    })
    .catch(err => res.send ({ error: err.message }));

    
    
}; 


module.exports.getMyWorkouts = (req, res) => {

    const userId = req.user.id;

    return Workout.find( { userId } )
    .then(workout => {
        if (!workout) {
            return res.status(404).send({ error: "Workout not found"});
        }

        return res.status(200).send ({ workouts: workout });
    })

    .catch(err => res.send ({ error: err.message }));
}

