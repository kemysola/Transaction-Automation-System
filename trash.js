
// One-Time-Password Reset [Note: the email field should be auto populated by decrypting the /*_*" + encryptedEmail + "*_*/ in the URL ]
// One-Time-Password Reset [Note: the email field should be auto populated by decrypting the /*_*" + encryptedEmail + "*_*/ in the URL ]
router.put('/oneTimePasswordReset/', async (req, res) => {
    const client = await pool.connect();
    try {
  
        // const link = "http://" + req.headers.host + "/api/v1/auth/oneTimePasswordReset/*_*" + encryptedEmail + "*_*/" + res_.rows[0].password;
        // ResolvedURLEmail = link.split('*_*')[1]
        // console.log('ResolvedURLEmail: ' + ResolvedURLEmail)
  
        const user_rec = { oldPassword, newPassword, email} = req.body;
        const user_data = [CryptoJS.AES.encrypt(user_rec.newPassword, process.env.PASSWORD_SECRET_PASSPHRASE ).toString(), user_rec.email]
        
        await client.query('BEGIN')
        const update_db = 
        `UPDATE TB_TRS_USERS
         SET  	password = $1
         WHERE email = $2
        RETURNING *`
        const res_ = await client.query(update_db, user_data)                   
        await client.query('COMMIT')
  
        res.json({
            status: (res.statusCode = 200),
            message: "Password Reset Successfully",
            defaultEmai: getUserEmail()
          });
         
    } catch (e) {
        await client.query('ROLLBACK')
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
  
  });

  
  router.get('/oneTimePasswordReset/', async (req, res) => {
    const client = await pool.connect()
    try {
        const user = await client.query(
        "SELECT * FROM TB_TRS_USERS WHERE email = $1", getUserEmail(req.url)
        // [req.body.email]
        );

        if (user) {
            console.log("we're on Track")
        //   call the view for password reset
        }
    } catch (err) {
        console.error(err.stack);
        res.status(404).json({ Error: "Invalid Email Address" });
    }finally{
        client.release()
  }

});