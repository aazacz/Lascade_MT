
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
      

const checkAuth = (req,res)=>{
              res.status(200).json("You are authenticated to access this part of the Web")
}
  





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

    /*_Validate input---Checks For validation errors in Email, Password and Name which entered_*/
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
                    password: passwordbcrypt,
                    authenticated:true
                })
             
                const newData = await newUser.save();
                console.log(newData);

                newData.authenticated?
                res.status(200).json({ status: "success", Authorisation:true,message: "User registered successfully, This user is authorised to do the CSV uploading" })
                :
                res.status(200).json({ status: "success", Authorisation:false,message: "User registered successfully, This user is Not Authorised for CSV uploading" })

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