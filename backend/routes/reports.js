const router = require("express").Router();
const pool = require("../database");
const {verifyTokenAndAuthorization} = require("../middleware");


// This endpoint will retrieve views for various reporting
// It takes in view name - view names to be gotten from the data dictionary for this application
router.get('/:name',verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        const report_name = req.params.name;
        const reportQuery = await client.query(
            "SELECT * FROM $1", [report_name]);
        if (reportQuery) { 
            res.report_value = reportQuery

            res.status(200).send({
                status: (res.statusCode = 200),
                report_rows: reportQuery.rows
            })
        }
        
    } catch (e) {
        console.log(e)
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});



























module.exports = router;