const router = require("express").Router();
const pool = require("../database");
const CryptoJS = require("crypto-js");
// const nodemailer = require("../maildaemon");
const sendConfirmationEmailOutlook = require("../outlookmailer")
const jwt = require("jsonwebtoken");
const {verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyUser} = require("../middleware");

// This method computes the Financial Close for every user by using the mandate-letter, credit-committee and Fee-Letter values
// - it will be a global formula and its values can only be set/modified by the admin: 2022-01-21
const funcFinancialClose = (mandateLetter, creditCommittee, feeLetter) => {
  if(mandateLetter > 0 | creditCommittee > 0 | feeLetter > 0){

    return parseInt((mandateLetter + creditCommittee + feeLetter) - 100);
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
      amberTransaction, mandateLetter, creditCommiteeApproval, feeLetter, status, isadmin,
      isOriginator, isTransactor, isTransactionLegalLead, office_type} = req.body;

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
      new_user.email, 
      CryptoJS.AES.encrypt(one_time_password, process.env.PASSWORD_SECRET_PASSPHRASE ).toString(),
      new_user.firstName, 
      new_user.lastName, 
      new_user.level, 
      new_user.hasOriginationTarget, 
      new_user.originationAmount,
      new_user.guaranteePipeline, 
      new_user.greenTransaction, 
      new_user.amberTransaction, 
      new_user.mandateLetter,
      new_user.creditCommiteeApproval, 
      new_user.feeLetter, 
      funcFinancialClose(new_user.mandateLetter,  new_user.creditCommiteeApproval, new_user.feeLetter), 
      req.user.Email, 
      new_user.status, 
      new_user.isadmin, 
      activationToken,
      new_user.isOriginator, 
      new_user.isTransactor, 
      new_user.isTransactionLegalLead,
      new_user.office_type
    ]

    await client.query('BEGIN')
    const write_to_db = 
      `INSERT INTO TB_TRS_USERS(
        email, password, firstName, lastName, level, hasOriginationTarget, originationAmount, guaranteePipeline,
        greenTransaction, amberTransaction, mandateLetter, creditCommiteeApproval, feeLetter, financialClose, record_entry, status, isadmin, 
        activationCode, isOriginator, isTransactor, isTransactionLegalLead, office_type, userID
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, nextval('trms.user_id_seq') ) RETURNING *`

    const res_ = await client.query(write_to_db, user_data)              
    
    await client.query('COMMIT')
    
    const encryptedEmail = CryptoJS.AES.encrypt(new_user.email, process.env.PASSWORD_SECRET_PASSPHRASE ).toString()
    const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, process.env.PASSWORD_SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);
    const oneTimePassword = CryptoJS.AES.decrypt(res_.rows[0].password, process.env.PASSWORD_SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);


    const userEmail = res_.rows[0].email;
    const actvToken = res_.rows[0].activationcode
    const user = res_.rows[0].firstname + ' ' + res_.rows[0].lastname 

    await sendConfirmationEmailOutlook.sendConfirmationEmailOutlook(userEmail, actvToken, oneTimePassword, user).catch(console.error);

    // sendConfirmationEmailOutlook().catch(console.error);

    res.json({
      status: (res.statusCode = 200),
      message: "User Created Successfully",
      user: res_.rows[0],      
    });

  } catch (e) {
    await client.query('ROLLBACK')
    res.status(403).json({ Error: e.message });

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
    amberTransaction, mandateLetter, creditCommiteeApproval, feeLetter, isadmin, status, isOriginator, isTransactor, isTransactionLegalLead, office_type} = req.body;

  const user_data = [
                user_rec.firstName, user_rec.lastName, user_rec.level, user_rec.hasOriginationTarget, user_rec.originationAmount,
                user_rec.guaranteePipeline, user_rec.greenTransaction, user_rec.amberTransaction , user_rec.mandateLetter,
                user_rec.creditCommiteeApproval, user_rec.feeLetter, 
        funcFinancialClose(user_rec.mandateLetter, user_rec.creditCommiteeApproval, user_rec.feeLetter), user_rec.isadmin, req.params.user_email, user_rec.status,user_rec.isOriginator, user_rec.isTransactor, user_rec.isTransactionLegalLead, user_rec.office_type
              ]
      
      await client.query('BEGIN')
      const update_db = 
      `UPDATE TB_TRS_USERS
       SET  	firstName = coalesce($1,firstName), lastName = coalesce($2,lastName), level = coalesce($3,level), hasOriginationTarget = coalesce($4,hasOriginationTarget), originationAmount = coalesce($5, originationAmount),
              guaranteePipeline = coalesce($6,guaranteePipeline), greenTransaction = coalesce($7,greenTransaction), amberTransaction = coalesce($8,amberTransaction),
              mandateLetter = coalesce($9,mandateLetter), creditCommiteeApproval = coalesce($10,creditCommiteeApproval), feeLetter = coalesce($11,feeLetter), financialClose = coalesce($12,financialClose), isadmin = coalesce($13,isadmin), status = coalesce($15,status),
              isOriginator = coalesce($16,isOriginator), isTransactor = coalesce($17,isTransactor), isTransactionLegalLead = coalesce($18,isTransactionLegalLead), office_type = coalesce($19,office_type)
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
          SET  
              mandateLetter = coalesce($9,mandateLetter), creditCommiteeApproval = coalesce($10,creditCommiteeApproval), 
              feeLetter = coalesce($11,feeLetter), financialClose = coalesce($12,financialClose)
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
            
            res.setHeader("Password-Reset-Email", user_rec.email);
            res.setHeader("Activation-Status", (res.statusCode = 200));
            
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



// // // // User Registration Endpoint[This registration should be done by a user with admin right, new user will reset password on first login]
// router.post("/first_onboard", async (req, res) => {
//   const client = await pool.connect()
//   try {
    
//     // Destrucuring the request body to grab required fields
//     const new_user = { email, password, firstName, lastName, level, hasOriginationTarget, originationAmount, guaranteePipeline, greenTransaction,
//       amberTransaction, mandateLetter, creditCommiteeApproval, feeLetter, status, isadmin} = req.body;

//     const user_data = [ email, CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_PASSPHRASE ).toString(),
//       firstName, lastName, level, hasOriginationTarget, originationAmount,
//       guaranteePipeline, greenTransaction, amberTransaction, mandateLetter,
//       creditCommiteeApproval, feeLetter, funcFinancialClose(0,  0, 0,0), 'trms@infracredit.ng', status, isadmin
//     ]

//     await client.query('BEGIN')
//     const write_to_db = 
//       `INSERT INTO TB_TRS_USERS(
//                   email, password, firstName, lastName,
//                   level, hasOriginationTarget, originationAmount, guaranteePipeline,
//                   greenTransaction, amberTransaction, mandateLetter, creditCommiteeApproval,
//                   feeLetter, financialClose, record_entry, status, isadmin, userID
//                   ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, nextval('user_id_seq')) RETURNING *`

//     const res_ = await client.query(write_to_db, user_data)              
    
//     await client.query('COMMIT')
    
//     res.json({
//       status: (res.statusCode = 200),
//       message: "User Created Successfully",
//       user: res_.rows[0],

//     });

    

//   } catch (e) {
//     await client.query('ROLLBACK')
//     res.status(403).json({ Error: e.stack });
//     // throw e
//   }finally{
//     client.release()
//   }
// });

// Forgot Password
router.post('/forgotPassword', async (req, res) => {

  const client = await pool.connect();
  try {

      const user_rec = { newPassword, newPasswordConfirm, email} = req.body;
      const user_data = [CryptoJS.AES.encrypt(user_rec.newPassword, process.env.PASSWORD_SECRET_PASSPHRASE ).toString(), user_rec.email]

      const user = await client.query("SELECT * FROM TB_TRS_USERS WHERE email = $1", [req.body.email] );
        
        if (user) {
           
          // Confirm that the main and confirmation passwords match
          if (user_rec.newPassword === newPasswordConfirm) {

            await client.query('BEGIN')
              const update_db = 
              `UPDATE TB_TRS_USERS
              SET  	password = $1
              WHERE email = $2
              RETURNING *`
              const res_ = await client.query(update_db, user_data)                   
            await client.query('COMMIT')
            
            res.setHeader("Password-Reset-Email", user_rec.email);
            res.setHeader("Activation-Status", (res.statusCode = 200));
            
            res.json({
                status: (res_.statusCode = 200),
                message: "Password Reset Successfully",
              });
          }else{
            res.json({
              status: (res.statusCode = 403),
              message: "The Two Password Values Must Match",
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

/*Fetch all Staffs(Priviledged Users only) */
router.get('/all_staff', verifyTokenAndAuthorization, async (req, res) => {
  const client = await pool.connect();
  const userID = req.user.ID


  try {
      // const all_staff = await client.query(
      //     `SELECT * FROM TB_TRS_USERS
      //     `);

      const all_staff = await client.query(
        `WITH all_users AS (
          SELECT *
          FROM TB_TRS_USERS
          
      )
      SELECT 
          *
      FROM all_users
      WHERE status =
          CASE
              WHEN (SELECT office_type FROM TB_TRS_USERS WHERE userid = $1) = 'Back Office' 
                  THEN status
              WHEN (SELECT office_type FROM TB_TRS_USERS WHERE userid = $1) = 'Front Office'
                  THEN 'Active'
          END`,
          [userID]
      )

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
router.get('/:user_email',verifyTokenAndAuthorization, async (req, res) => {
  const client = await pool.connect();

  try {
      const staff_email = req.params.user_email;
      const staff = await client.query(
          "SELECT * FROM TB_TRS_USERS WHERE email = $1", [staff_email]);
      if (staff) { 

          res.status(200).send({
              status: (res.statusCode = 200),
              staffInfo: staff.rows
          })
      }
      
  } catch (e) {
      res.status(403).json({ Error: e.stack });
  }finally{
      client.release()
    }

    
});


/*Fetch Origination and Structuring Staff(Priviledged Users only) */
router.get('/origination_structuring_users/all', verifyTokenAndAdmin, async (req, res) => {
  const client = await pool.connect();
  const userID = req.user.ID

  try {
      // const OandSTeam = await client.query(
      //     `
      //     SELECT * 
      //     FROM TB_TRS_USERS 
      //     WHERE CONCAT(firstname,' ',lastname) IN (
      //                         -- check if it's a back office user
      //                         SELECT originator 
      //                         FROM TB_INFRCR_TRANSACTION 
      //                         UNION 
      //                         SELECT transactor 
      //                         FROM TB_INFRCR_TRANSACTION
      //                         )
      //     `);

      const OandSTeam = await client.query(
        `
            WITH all_users AS (
              SELECT *
              FROM TB_TRS_USERS
              WHERE CONCAT(firstname, ' ', lastname) IN (
                  SELECT originator FROM TB_INFRCR_TRANSACTION
                  UNION 
                  SELECT transactor FROM TB_INFRCR_TRANSACTION
              )
          )
          SELECT 
              *
          FROM all_users
          WHERE status =
              CASE
                  WHEN (SELECT office_type FROM TB_TRS_USERS WHERE userid = $1) = 'Back Office' 
                      THEN status
                  WHEN (SELECT office_type FROM TB_TRS_USERS WHERE userid = $1) = 'Front Office'
                      THEN 'Active'
              END
        `,
        [userID]
      )
            
      if (OandSTeam) { 
         
          res.status(200).send({
              status: (res.statusCode = 200),
              staff: OandSTeam.rows
          })
      }
      
  } catch (e) {
      res.status(403).json({ Error: e.stack });
  }finally{
      client.release()
    }

});

module.exports = router;