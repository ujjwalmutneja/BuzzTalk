const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if authorization header is present and starts with "Bearer token"
    //if thsese two conditions satisfy means have token
    if (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extract token from the header remove bearer
            token = req.headers.authorization.split(" ")[1];

            // Verify token that  this token matching with authorize vala token which generated during login that means valid user
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request object
            //find user and return it without password
            req.user = await User.findById(decoded.id).select("-password");

            // Proceed to next middleware or route handler
            next();
        } catch (error) {
            // Handle token verification errors
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        // Handle missing token
        res.status(401).json({ message: "Not authorized, no token" });
    }
});

module.exports = protect
