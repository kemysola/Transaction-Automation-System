const router = require("express").Router();
const pool = require("../database");
const CryptoJS = require("crypto-js");
const {verifyTokenAndAdmin, verifyTokenAndAuthorization} = require("../middleware");

// This method computes the Financial Close for every user by using the mandate-letter, credit-committee and Fee-Letter values
// - it will be a global formula and its values can only be set/modified by the admin: 2022-01-21
const funcFinancialClose = (originator, mandateLetter, creditCommittee, feeLetter) => {
  if(originator > 0 | mandateLetter > 0 | creditCommittee > 0 | feeLetter > 0){

    return parseInt((mandateLetter + creditCommittee + feeLetter + originator) - 100);
  }else{
    return parseInt(0)
  }
  
};


// User Registration Endpoint[This registration should be done by a user with admin right, new user will reset password on first login]
router.post("/onboard", verifyTokenAndAdmin, async (req, res) => {
  const client = await pool.connect()
  try {
    
    // Destrucuring the request body to grab required fields
    const new_user = { email, password, firstName, lastName, level, hasOriginationTarget, originationAmount, guaranteePipeline, greenTransaction,
      amberTransaction, originator, mandateLetter, creditCommiteeApproval, feeLetter, status, isadmin} = req.body;

    const user_data = [ 
      new_user.email, CryptoJS.AES.encrypt(new_user.password, process.env.PASSWORD_SECRET_PASSPHRASE ).toString(),
      new_user.firstName, new_user.lastName, new_user.level, new_user.hasOriginationTarget, new_user.originationAmount,
      new_user.guaranteePipeline, new_user.greenTransaction, new_user.amberTransaction, new_user.originator, new_user.mandateLetter,
      new_user.creditCommiteeApproval, new_user.feeLetter, 
      funcFinancialClose(new_user.originator, new_user.mandateLetter,  new_user.creditCommiteeApproval, new_user.feeLetter), 
      req.user.Email, new_user.status, new_user.isadmin
    ]

    await client.query('BEGIN')
    const write_to_db = 
      `INSERT INTO TB_TRS_USERS(email, password, firstName, lastName, level, hasOriginationTarget, originationAmount, guaranteePipeline,
        greenTransaction, amberTransaction, originator, mandateLetter, creditCommiteeApproval, feeLetter, financialClose, record_entry, status, isadmin
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`

    const res_ = await client.query(write_to_db, user_data)              
    
    await client.query('COMMIT')
    
    res.json({
      status: (res.statusCode = 200),
      message: "User Created Successfully",
      user: res_.rows[0],

    });

  } catch (e) {
    await client.query('ROLLBACK')
    res.status(403).json({ Error: e.stack });
    // throw e
  }finally{
    client.release()
  }
});

// update user records
router.put('/update/:user_email', verifyTokenAndAuthorization,async (req, res) => {
  const client = await pool.connect();
  try {

      const user_rec = { firstName, lastName, level, hasOriginationTarget, originationAmount, guaranteePipeline, greenTransaction,
    amberTransaction,originator, mandateLetter, creditCommiteeApproval, feeLetter} = req.body;

  const user_data = [
                user_rec.firstName, user_rec.lastName, user_rec.level, user_rec.hasOriginationTarget, user_rec.originationAmount,
                user_rec.guaranteePipeline, user_rec.greenTransaction, user_rec.amberTransaction,user_rec.originator , user_rec.mandateLetter,
                user_rec.creditCommiteeApproval, user_rec.feeLetter, 
        funcFinancialClose(user_rec.originator, user_rec.mandateLetter, user_rec.creditCommiteeApproval, user_rec.feeLetter), req.params.user_email
              ]
      
      await client.query('BEGIN')
      const update_db = 
      `UPDATE TB_TRS_USERS
       SET  	firstName = $1, lastName = $2, level = $3, hasOriginationTarget = $4, originationAmount = $5, 
      guaranteePipeline = $6, greenTransaction =$7, amberTransaction = $8, originator = $9, 
      mandateLetter = $10, creditCommiteeApproval = $11, feeLetter = $12, financialClose = $13
          WHERE email = $14
      RETURNING *`
      const res_ = await client.query(update_db, user_data)                   
      await client.query('COMMIT')

      res.json({
          status: (res.statusCode = 200),
          message: "User Record UPDATED Successfully",
          dealInfo: res_.rows[0],
    
        });
      // Update the values for originator, mandateLetter, creditCommiteeApproval, feeLetter for performance pay globally if an admin modifies them
      // These values are set by an admin and effected globally 
        if(req.user.isadmin){
          // do update for entire database
        }

  } catch (e) {
      await client.query('ROLLBACK')
      res.status(403).json({ Error: e.stack });
  }finally{
      client.release()
    }

});


// User Registration Endpoint[This registration should be done by a user with admin right, new user will reset password on first login]
router.post("/first_onboard", async (req, res) => {
  const client = await pool.connect()
  try {
    
    // Destrucuring the request body to grab required fields
    const new_user = { email, password, firstName, lastName, level, hasOriginationTarget, originationAmount, guaranteePipeline, greenTransaction,
      amberTransaction, mandateLetter, creditCommiteeApproval, feeLetter, status, isadmin} = req.body;

    const user_data = [ email, CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_PASSPHRASE ).toString(),
      firstName, lastName, level, hasOriginationTarget, originationAmount,
      guaranteePipeline, greenTransaction, amberTransaction, mandateLetter,
      creditCommiteeApproval, feeLetter, funcFinancialClose(0,  0, 0,0), 'superadmin@trmsapp.com', status, isadmin
    ]

    await client.query('BEGIN')
    const write_to_db = 
      `INSERT INTO TB_TRS_USERS(
                  email, password, firstName, lastName,
                  level, hasOriginationTarget, originationAmount, guaranteePipeline,
                  greenTransaction, amberTransaction, mandateLetter, creditCommiteeApproval,
                  feeLetter, financialClose, record_entry, status, isadmin
                  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`

    const res_ = await client.query(write_to_db, user_data)              
    
    await client.query('COMMIT')
    
    res.json({
      status: (res.statusCode = 200),
      message: "User Created Successfully",
      user: res_.rows[0],

    });

  } catch (e) {
    await client.query('ROLLBACK')
    res.status(403).json({ Error: e.stack });
    // throw e
  }finally{
    client.release()
  }
});

module.exports = router;
