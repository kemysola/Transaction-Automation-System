const router = require("express").Router();
const pool = require("../database");
const CryptoJS = require("crypto-js");
const nodemailer = require("../maildaemon");
const jwt = require("jsonwebtoken");
const {verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyUser} = require("../middleware");

// This method computes the Financial Close for every user by using the mandate-letter, credit-committee and Fee-Letter values
// - it will be a global formula and its values can only be set/modified by the admin: 2022-01-21
const funcFinancialClose = (originator, mandateLetter, creditCommittee, feeLetter) => {
  if(originator > 0 | mandateLetter > 0 | creditCommittee > 0 | feeLetter > 0){

    return parseInt((mandateLetter + creditCommittee + feeLetter + originator) - 100);
  }else{
    return parseInt(0)
  }
  
};

/* Function to generate One-Time-Password*/
function generateP() {
  var pass = '';
  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
          'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    
  for (i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random()
                  * str.length + 1);
        
      pass += str.charAt(char)
  }
    
  return pass;
}

// User Registration Endpoint[This registration should be done by a user with admin right, new user will reset password on first login]
router.post("/onboard", verifyTokenAndAdmin, async (req, res) => {
  const client = await pool.connect()
  try {
    
    // Destrucuring the request body to grab required fields
    const new_user = { email, firstName, lastName, level, hasOriginationTarget, originationAmount, guaranteePipeline, greenTransaction,
      amberTransaction, originator, mandateLetter, creditCommiteeApproval, feeLetter, status, isadmin} = req.body;

    // create confirmation token for account activation: 2022-Feb-15th
    const activationToken = jwt.sign(
      {
        Email: new_user.email
      },
      process.env.JWT_SEC_KEY,
      { expiresIn: "1d" }
    );

    // 
    const one_time_password = generateP()

    const user_data = [ 
      new_user.email, CryptoJS.AES.encrypt(one_time_password, process.env.PASSWORD_SECRET_PASSPHRASE ).toString(),
      new_user.firstName, new_user.lastName, new_user.level, new_user.hasOriginationTarget, new_user.originationAmount,
      new_user.guaranteePipeline, new_user.greenTransaction, new_user.amberTransaction, new_user.originator, new_user.mandateLetter,
      new_user.creditCommiteeApproval, new_user.feeLetter, 
      funcFinancialClose(new_user.originator, new_user.mandateLetter,  new_user.creditCommiteeApproval, new_user.feeLetter), 
      req.user.Email, new_user.status, new_user.isadmin, activationToken
    ]

    await client.query('BEGIN')
    const write_to_db = 
      `INSERT INTO TB_TRS_USERS(email, password, firstName, lastName, level, hasOriginationTarget, originationAmount, guaranteePipeline,
        greenTransaction, amberTransaction, originator, mandateLetter, creditCommiteeApproval, feeLetter, financialClose, record_entry, status, isadmin, activationCode
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`

    const res_ = await client.query(write_to_db, user_data)              
    
    await client.query('COMMIT')
    
    const encryptedEmail = CryptoJS.AES.encrypt(new_user.email, process.env.PASSWORD_SECRET_PASSPHRASE ).toString()
    const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, process.env.PASSWORD_SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);
    const oneTimePassword = CryptoJS.AES.decrypt(res_.rows[0].password, process.env.PASSWORD_SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);


    const userEmail = res_.rows[0].email;
    const actvToken = res_.rows[0].activationcode
    const user = res_.rows[0].firstname + ' ' + res_.rows[0].lastname 
  
    nodemailer.sendConfirmationEmail(
      'InfraCredit',
      userEmail,
      actvToken,
      oneTimePassword,
      user
    );

    res.json({
      status: (res.statusCode = 200),
      message: "User Created Successfully",
      user: res_.rows[0],      
    });

  } catch (e) {
    await client.query('ROLLBACK')
    res.status(403).json({ Error: e.stack });

  }finally{
    client.release()
  }
});


// Account Activation and One-Time-Password Reset 
router.get("/confirm/:confirmationCode", verifyUser)


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

      // Update the management approved values for originator, mandateLetter, creditCommiteeApproval, feeLetter under performance pay section - globally if an admin modifies them
      // These values are set by an admin and effected globally 
        if(req.user.isadmin){
          // do update for entire database
          await client.query('BEGIN')
          const update_db = 
          `UPDATE TB_TRS_USERS
          SET  	originator = $9, 
          mandateLetter = $10, creditCommiteeApproval = $11, feeLetter = $12, financialClose = $13
          RETURNING *`
          const res_ = await client.query(update_db, user_data)                   
          await client.query('COMMIT')

        }

  } catch (e) {
      await client.query('ROLLBACK')
      res.status(403).json({ Error: e.stack });
  }finally{
      client.release()
    }

});

// One-Time-Password Reset
router.put('/oneTimePasswordReset/', async (req, res) => {
  const client = await pool.connect();
  try {

      const user_rec = { oldPassword, newPassword, email} = req.body;
      const user_data = [CryptoJS.AES.encrypt(user_rec.newPassword, process.env.PASSWORD_SECRET_PASSPHRASE ).toString(), user_rec.email]
      
      const user = await client.query("SELECT * FROM TB_TRS_USERS WHERE email = $1", [req.body.email] );
        
        if (user) {
            const hashedPassword = CryptoJS.AES.decrypt(user.rows[0]["password"], process.env.PASSWORD_SECRET_PASSPHRASE);
            const password = hashedPassword.toString(CryptoJS.enc.Utf8);

          // Confirm that the client and database passwords match
          if (oldPassword === password) {

            await client.query('BEGIN')
              const update_db = 
              `UPDATE TB_TRS_USERS
              SET  	password = $1
              WHERE email = $2
              RETURNING *`
              const res_ = await client.query(update_db, user_data)                   
            await client.query('COMMIT')

            res.json({
                status: (res_.statusCode = 200),
                message: "Password Reset Successfully",
              });
          }else{
            res.json({
              status: (res.statusCode = 403),
              message: "Invalid One-Time-Password, Please check your email and try again!",
            });
          }
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

/*Fetch all Staffs(Priviledged Users only) */
router.get('/all_staff', verifyTokenAndAdmin, async (req, res) => {
  const client = await pool.connect();

  try {
      const all_staff = await client.query(
          `SELECT * FROM TB_TRS_USERS
          `);

      if (all_staff) { 
         
          res.status(200).send({
              status: (res.statusCode = 200),
              staff: all_staff.rows
          })
      }
      
  } catch (e) {
      res.status(403).json({ Error: e.stack });
  }finally{
      client.release()
    }

});


/*Fetch Staff by mail - priviledged users*/
router.get('/:user_email',verifyTokenAndAdmin, async (req, res) => {
  const client = await pool.connect();

  try {
      const staff_email = req.params.user_email;
      const staff = await client.query(
          "SELECT * FROM TB_TRS_USERS WHERE email = $1", [staff_email]);
      if (staff) { 
          // res.staff_info = staff
          
          // // convert notes field to list
          // myArray = staff.rows
          // myNotes = myArray.forEach(convertNotesFiledsToList)

          res.status(200).send({
              status: (res.statusCode = 200),
              staffInfo: staff.rows
          })
      }
      
  } catch (e) {
    console.log("#", e)
      res.status(403).json({ Error: e.stack });
  }finally{
      client.release()
    }

});

module.exports = router;



