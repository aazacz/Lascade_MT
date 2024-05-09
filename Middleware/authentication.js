const express = require("express")
const jwt = require('jsonwebtoken')
const userDb = require("../Model/userDb")

const auth = (role) => (req, res, next) => {

    console.log("debug 1");
    console.log("role   " + role)

    if (role === "User") {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split("Bearer ").join("")
       
        if (!token) {
            // console.log("3");
            // console.log("not JWT recceived");
            return res.json({ message: "Not Authorised" })
        }
        else {
            // console.log("4");
            // console.log("authorised");
            jwt.verify(token, process.env.jwtsecretUser, (err, decoded) => {
                if (err) {
                    console.log(err + "  not authorised agaiun");

                    if (err.name === 'TokenExpiredError') { //if token expired
                        console.log("Token has expired");
                        return res.json({ message: "TimedOut" });
                    }
                    res.json('not Authenticated')
                }
                else {
                    console.log("debug 5");
                    const email = decoded._id
                    const authUser = userDb.find({email:email,authenticated:true})
                    authUser.then((data)=> {
                            // console.log(data);
                            if (data && data[0].authenticated == true) {
                                    req.authUser = data[0];
                                    // console.log("user is authenticated to upload");
                                                                             }
                                        else{
                                            return res.status(401).send({message:"This User is not authencticated to access this page"});
                                                }
                                                }
                                            )   
                    if (decoded.role === role) {
                        req.userId = decoded._id
                        req.role = decoded.role
                        next()
                    }
                }
            })
        }
    }
}

module.exports = auth