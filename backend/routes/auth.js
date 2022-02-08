const router = require("express").Router();
const pool = require("../database");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const msal = require('@azure/msal-node');

// User Login Endpoint - This module is responsible for authenticating users on the application
// This endpoint should be called after user is authenticated on Azure Active Directory (Handled below)
router.post("/app/login", async (req, res) => {
  const client = await pool.connect()
  try {
    const user = await client.query(
      "SELECT * FROM TB_TRS_USERS WHERE email = $1",
      [req.body.email]
    );

      if (user) {
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
    }
  } catch (err) {
    console.error(err.stack);
    res.status(404).json({ Error: "Invalid Email Address" });
  }finally{
    client.release()
  }
});



// User Authentication with Azure Active Directory
AADParameters = {
  tenant : process.env.tenant,
  authorityHostUrl : 'https://login.windows.net',
  clientId : process.env.clientID,
  redirectUri: 'http://localhost:5000/api/v1/auth/app/login', //This url must be registerd during application registration in Azure (Reference in resources.md file)
  clientSecret: process.env.value
};

const {tenant, authorityHostUrl, clientId, clientSecret, redirectUri} = AADParameters

const config = {
  auth: {
      clientId,
      authority: authorityHostUrl + '/' + tenant,
      clientSecret
  },
  system: {
      loggerOptions: {
          loggerCallback(loglevel, message, containsPii) {
              console.log(message);
          },
          piiLoggingEnabled: false,
          logLevel: msal.LogLevel.Verbose,
      },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
  }
};

// Create msal application object
const cca = new msal.ConfidentialClientApplication(config);

router.get('/', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:5000/api/v1/auth/app/login",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => {
      console.log(JSON.stringify(error))
    });
});

router.get('/app/login', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri,
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
    });
});

module.exports = router;
