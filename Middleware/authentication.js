const express = require("express")
const jwt = require('jsonwebtoken')
const userDb = require("../Model/userDb")


// Middleware function for authentication
const auth = (role) => (req, res, next) => {

    const token = req.headers.authorization.split("Bearer ").join("")  // Extract JWT token from request headers

    if (!token) {   // Check if token exists
        return res.json({ message: "Not Authorised" })
    }
    else {
        // Verify the JWT token
        jwt.verify(token, process.env.jwtsecretUser, (err, decoded) => {
            if (err) {
                console.log(err + "Not Authorised");

                // Check if token expired
                if (err.name === 'TokenExpiredError') {
                    console.log("Token has expired");
                    return res.json({ message: "TimedOut" });
                }
                res.json('not Authenticated')
            }
            else {
                const email = decoded._id

                //FIND THE USER IN THE DB
                const authUser = userDb.find({ email: email, authenticated: true })

                authUser.then((data) => {

                    //CHECKING IF THERE IS ANY USER IN DB, AND CHECK IF THE USER IS AUTHENTICATED 
                    //ALSO CHECKS WHETHER THE USER IN THE JWT AND THAT OF THE REQUEST BODY ARE SAME
                    // OR CHECK WHETHER THE EMAIL IN JWT AND THE EMAIL IN DATABASE ARE SAME                              
                    if (data && data.length > 0 && data[0].authenticated === true && (decoded._id === req.body.email || decoded._id === data[0].email)) {
                        req.authUser = data[0];
                        console.log(data[0]);
                        req.userId = decoded._id
                        req.role = decoded.role

                        next()   //IF AUTHENTICATED USER THEN GO TO NEXT MIDDLEWARE
                    }
                    else {
                        return res.status(401).send({ message: "This User is not authencticated to access this page" });
                    }
                })
                    .catch((error) => {
                        console.log(error.message);
                        return res.status(401).send({ message: "User Doesnot exists" });
                    }
                    )
            }
        })

    }
}

module.exports = auth