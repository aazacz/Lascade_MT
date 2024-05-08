
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Model/userDb')
const validateInput = require("../Helper/validation")
const { jwtsecretUser, EXPIRES_IN } = process.env;


/*#########################    FUNCTION FOR PASSWORD HASHING  ############################### */ 
const passwordHash = async (password) => {
            try {
                const passwordHash = await bcrypt.hash(password, 5);
                return passwordHash;
                } catch (error) {
                console.log(error.message);
                }
            };
      
            
 const verifyToken = (token) => {
                const userVer = jwt.verify(token, "lascadeUser")
            }

  

const checkAuth = async (req, res) => {
                try {
                console.log("debug 6");
                if (req.role === "User") {
                    console.log("debug 7");
                    res.status(200).json({ message: "Authorised" });
                } else {
                    res.status(403).json({ message: "Access Denied" });
                }
                } catch (error) {
                console.error("Error in checkAuth:", error);
                res.status(500).json({ message: "Internal Server Error" });
                }
            };



/*#######################################    USER LOGIN   ######################################### */                                             
const login = async (req, res) => {

                try { 
            
                const useremail = req.body.email
                const user = await User.findOne({ email: req.body.email });
                
            
// if user not found in DataBase            
                if (!user) {  
                    return res.json({ message: "Email doesnt match" })
                }
// comparing the input password and Database password             
                const passwordmatch = await bcrypt.compare(req.body.password, user.password)
            
                if (passwordmatch) {
            
                    const secure = {
                    _id: useremail,
                    role: "User"
                    }
                        
                    const token = jwt.sign(secure, jwtsecretUser, { expiresIn: EXPIRES_IN })
                    console.log(token);
            
                    const userVer = jwt.verify(token, jwtsecretUser)
                    console.log(userVer);
                
                        
                    res.json({status: "success",
                    name: user.name,
                    token,
                    login: true,
                    email: useremail
                    })
                }
                
//if password didnt match throw error
                else {   
                    return res.json({status: "failed", message: "Password is incorrect"})
                 }
            
            
                }
                catch (error) {
                    console.log(error);
                    res.status(500).json({ status: "error", error: "Server error" });
                    }
            
            }


/*#######################################    USER REGISTRATION   ######################################### */ 
const register = async (req, res) => {
                try {
                const { email, name, password } = req.body;
                
                const passwordbcrypt = await passwordHash(password);
                console.log(email, name, password);

    /*_Validate input_*/
                const validationError = validateInput(email, name, password);
                if (validationError) {
                 return res.status(400).json({ error: validationError });
                    }

    /*_Check if the user already exists_*/

                const finduser = await User.findOne({ email: email })
                if (finduser) { //IF case -- checking if user already registered
                    console.log("User Already Registered")
                    return res.status(400).json({ error: "User Already Registered" });
                }

    /*_Proceed with USER REGISTRATION_*/
         
                const newUser = new User({
                    email: email,
                    name: name,
                    password: passwordbcrypt
                })
             
                const newData = await newUser.save();
                console.log(newData);
                res.status(200).json({ status: "success", message: "User registered successfully" });
                } catch (error) {
               
                    console.error("Error during user registration:", error.message);
                    res.status(500).json({ status: "error", message: error.message });
                }
            }; 

  

  module.exports = {

    login,
    register,
    checkAuth,
    
  }