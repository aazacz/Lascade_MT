const express = require("express")
const jwt = require('jsonwebtoken')


const auth = (role) => (req, res, next) => {

    console.log("debug 1");
    console.log("role   " + role)

    if (role === "User") {
        // console.log("req   "+JSON.stringify(req.headers, null, 2));
        // console.log(req.headers.authorization);
        console.log("debug 2");
        const token = req.headers.authorization
        // console.log("token in the auth section " + token);
       
        if (!token) {
            console.log("debug 3");
            console.log("not authorised NJS");
            return res.json({ message: "Not Authorised" })
        }
        else {
            console.log("debug 4");
            console.log("authorised");
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
                    console.log("authorised again");

                    console.log(decoded.role);
                    console.log(decoded._id);
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