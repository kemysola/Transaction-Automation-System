const jwt = require("jsonwebtoken")

// Token Verification: verifies that a valid token is sent from client
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
            if (err) res.status(403).json({ Error: "Token is not valid!" })
            req.user = user; //assigns a user object to request - this can be accessed the same way req.body and req.params can be accessed
            next(); //This commands the process to jump out of this function and return to the calling-route to continue other actions
            
            // console.log(req.user);
        })
    } else {
        return res.status(401).json({ Error: "You're not authroized"})
        
    }
};


//ensures the user(using user id) is authorized to access the target resource
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {

            if (req.user.Status === 'Active' || req.user.Admin) {
                next();
            } else {
                // res.status(403).json("You're not authroized to do that!!")
                res.status(403).json({ Error: "You're not authroized to do that!!"});
            }

        })
}

//verifies that there is token and the user is admin(for all admin-only resources)
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.Admin) {
            next();
        } else {
            res.status(403).json({ Error: "You're not authroized to do that!"})
        }
    })
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }

