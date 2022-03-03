const router = require("express").Router();
const pool = require("../database");
const CryptoJS = require("crypto-js");

router.put("/", async(req, res) => {
    const client = await pool.connect()
    
    try {
        const user = await client.query(
            "SELECT * FROM TB_TRS_USERS WHERE email = $1", [req.body.email]
        );
           
        if (user && user.rows[0]["status"]) {
            const hashedPassword = CryptoJS.AES.decrypt(
                user.rows[0]["password"],
                process.env.PASSWORD_SECRET_PASSPHRASE
            );
            const OneTimePassword = hashedPassword.toString(CryptoJS.enc.Utf8);
                
            // Confirm that the client and database passwords match
            if (req.body.password === OneTimePassword && req.body.newPassword !== req.body.password) {
                // update the password with the new user password
				hashedNewPassword = CryptoJS.AES.encrypt(req.body.newPassword, process.env.PASSWORD_SECRET_PASSPHRASE ).toString()
				const user_data = [hashedNewPassword, req.body.email]
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
					  message: "Password Reset Successfully"
					});		
            } else {
                res.status(403).json({ Error: "New Password must be different from OTP" });
            }
        } else {
            return res.status(401).send({ message: "Please Verify your Email" });
        }
    } catch (err) {
		await client.query('ROLLBACK')
        res.status(404).json({ Error: "Password Reset Failed", ErrorDetail: err.stack });
    } finally {
        client.release()
    }
});

module.exports = router;