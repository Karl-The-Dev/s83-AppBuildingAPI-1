const User = require("../models/User");
const bcrypt = require("bcrypt"); // <<
const auth = require("../auth");

const {errorHandler } = require("../auth");


module.exports.registerUser = async (req, res) => {
 
    try {

        const newUser = new User({            
            email: req.body.email,                               
            password: bcrypt.hashSync(req.body.password, 10) 
            
        });
        
        const savedUser = await newUser.save();
        
        return res.status(201).send({
            success: true,
            message: "Registered Successfully",
            SavedUser: savedUser
        });

    } catch (error) {
        
        return res.send ({ error: err.message });
    }
};


module.exports.loginUser = async (req, res) => {
    
    if (req.body.email.includes("@")){

            try {
            const result = await User.findOne({ email: req.body.email });

            if (!result) {
                            
                return res.status(404).send(false); 

            }
            // bcrypt.compareSync - used to compare non-hashed password to hashed password
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

            if(isPasswordCorrect){
                // invoke the auth file
                return res.send ({ access: auth.createAccessToken(result) });
            }
            else{
                        
                return res.status(401).send (false); 
            }

            } catch (err) {
                return res.send ({ error: err.message });
                }
    }
    else {
                    
        return res.status(400).send(false); 
        
    }

    
};


module.exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
                    // s47 status code status(404)
            return res.status(404).send ({ error: "User not found" });
        }
                    // s47 add status(200) for success
        return res.status(200).send ({
            success: true,
            user: user
        });

    } catch (err) {
        return res.send ({ error: err.message });
    }
};

