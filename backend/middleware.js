const jwt = require("jsonwebtoken");
const pool = require("./database");
const CryptoJS = require("crypto-js");

// Token Verification: verifies that a valid token is sent from client
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
      if (err) res.status(403).json({ Error: "Token is not valid!" });
      req.user = user; //assigns a user object to request - this can be accessed the same way req.body and req.params can be accessed
      next(); //This commands the process to jump out of this function and return to the calling-route to continue other actions
    });
  } else {
    return res.status(401).json({ Error: "You're not authroized" });
  }
};

//ensures the user(using user id) is authorized to access the target resource
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.Status === "Active" || req.user.Admin) {
      next();
    } else {
      // res.status(403).json("You're not authroized to do that!!")
      res.status(403).json({ Error: "You're not authroized to do that!!" });
    }
  });
};

//verifies that there is token and the user is admin(for all admin-only resources)
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.Admin) {
      next();
    } else {
      res.status(403).json({ Error: "You're not authroized to do that!" });
    }
  });
};

// This method verifies there is a user with the sent activationCode in the database
const verifyUser = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const user = await client.query(
      "SELECT * FROM TB_TRS_USERS WHERE activationcode = $1",
      [req.params.confirmationCode]
    );
    if (user) {
      // console.log('user from VerifyUser', req.params.confirmationCode)
      const user_data = [req.params.confirmationCode];

      await client.query("BEGIN");
      const update_db = `UPDATE TB_TRS_USERS
           SET  status = 'Active'
           WHERE activationcode = $1
          RETURNING *`;
      const res_ = await client.query(update_db, user_data);
      await client.query("COMMIT");

      res.setHeader("Activated-Email", res_.rows[0]["email"]);
      res.setHeader("Activation-Status", (res.statusCode = 200));
      res.setHeader("Activation-Message", "Your Account is now Active");

      //  res.redirect('http://localhost:3000/login');
      res.json({
        status: (res.statusCode = 200),
        message: "Your Account is now Active",
        userEmail: res_.rows[0]["email"],
      });
    }
  } catch (err) {
    res
      .status(404)
      .json({ Error: "Invalid Email Address", ErrorDetail: err.stack });
  } finally {
    client.release();
  }
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyUser,
};
