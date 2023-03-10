/*
This module is responsible for authorizing users on the application and authenticating users agains Azure Active Directory
*/

const router = require("express").Router();
const pool = require("../database");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const msal = require("@azure/msal-node");
const querystring = require("querystring");
router.post("/app/login", async (req, res) => {
  const client = await pool.connect();
  try {
    const user = await client.query(
      "SELECT * FROM TB_TRS_USERS WHERE email = $1",
      [req.body.email]
    );
    // if (user && user.status !== 'Active') { //Retired 2022-02-March
    if (user && user.rows[0]["status"] === "Active") {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.rows[0]["password"],
        process.env.PASSWORD_SECRET_PASSPHRASE
      );
      const password = hashedPassword.toString(CryptoJS.enc.Utf8);

      // Confirm that the client and database passwords match
      if (req.body.password === password) {
        // create access token for authorization across all resources
        const accessToken = jwt.sign(
          {
            ID: user.rows[0]["userid"],
            Email: user.rows[0]["email"],
            Status: user.rows[0]["status"],
            Admin: user.rows[0]["isadmin"],
          },
          process.env.JWT_SEC_KEY,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          ID: user.rows[0]["userid"],
          Email: user.rows[0]["email"],
          Admin: user.rows[0]["isadmin"],
          Status: user.rows[0]["status"],
          token: accessToken,
        });
      } else {
        res.status(403).json({ Error: "Wrong Password" });
      }
    } else {
      return res.status(401).send({ message: "Please Verify your Email" });
    }
  } catch (err) {
    res
      .status(404)
      .json({ Error: "Invalid Email Address", ErrorDetail: err.stack });
  } finally {
    client.release();
  }
});

// Destroys the session to log out the user.
router.get("/app/logout", function (req, res) {
  req.session.destroy(() => {
    req.logout();
    res.redirect("/app/login"); //Inside a callback… bulletproof!
  });
});

// User Authentication with Azure Active Directory
const AADParameters = {
  tenant: process.env.tenant,
  authorityHostUrl: "https://login.windows.net",
  clientId: process.env.clientID,
  // redirectUri: "http://localhost:5001/api/v1/auath/app/login",
  redirectUri: "https://trms01-server.azurewebsites.net/api/v1/auth/app/login",
  clientSecret: process.env.value,
};

const config = {
  auth: {
    clientId: AADParameters.clientId,
    authority: AADParameters.authorityHostUrl + "/" + AADParameters.tenant,
    clientSecret: AADParameters.clientSecret,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {},
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
  },
};

// Create msal application object
const cca = new msal.ConfidentialClientApplication(config);

router.get("/", (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: AADParameters.redirectUri,
  };
  // get url to sign user in and consent to scopes needed for application
  cca
    .getAuthCodeUrl(authCodeUrlParameters)
    .then((response) => {
      res.redirect(response);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
    });
});

router.get("/app/login", (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read"],
    redirectUri: AADParameters.redirectUri,
  };
  cca
    .acquireTokenByCode(tokenRequest)
    .then((response) => {
      const paramsString = {
        user: response.account.username,
        token: response.accessToken,
      };
      let searchParams = new URLSearchParams(paramsString);

      // res.redirect("http://localhost:3000/login?" + searchParams);
      res.redirect("https://trms01-server.azurewebsites.net/login?" + searchParams);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
