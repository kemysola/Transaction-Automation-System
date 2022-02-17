const router = require("express").Router();
const pool = require("../database");
const {verifyTokenAndAuthorization} = require("../middleware");


// This resource expects three parameters[start_date: the begining period of the report, end_date:the last period of the report, deal_id if there is a specific deal of interest]
router.get('/:start_date/:end_date/:client_name', verifyTokenAndAuthorization, async (req, res) => {
    console.log('Confused')
    const client = await pool.connect();

    const reporting_params = {start_date, end_date, client_name } = req.params
    console.log(reporting_params)

    try {
        // if a client name is specified
        if (client_name){
                        
            const report_query = await client.query(
                `
                WITH REPORTING AS(
                    SELECT 
                         MAX(DATE(STAMP)) OVER(PARTITION BY DATE(STAMP) ORDER BY DATE(STAMP) DESC) AS CREATE_DT 
                        ,OPERATION,STAMP,ORIGINATOR,TRANSACTOR,TRANSACTIONLEGALLEAD,INDUSTRY,PRODUCT,REGION,DEALSIZE,COUPON,TENOR,MORATORIUM
                        ,REPAYMENTFREQUENCY,AMORTIZATIONSTYLE,MANDATELETTER,CREDITAPPROVAL,FEELETTER
                        ,EXPECTEDCLOSE,ACTUALCLOSE,STRUCTURINGFEEAMOUNT,STRUCTURINGFEEFINAL,GUARANTEEFEE
                        ,MONITORINGFEE,REIMBURSIBLE,DEAL_CATEGORY,NOTES,CLOSED
                    FROM TB_INFRCR_TRANSACTION_AUDIT
                )
                SELECT * 
                FROM REPORTING
                WHERE DATE(CREATE_DT) BETWEEN COALESCE($1,CURRENT_DATE) AND COALESCE($2,CURRENT_DATE)
                AND CLIENTNAME = $3
                `,[start_date, end_date, client_name]
                );

            if (report_query.rows) { 
    
                res.status(200).send({
                    status: (res.statusCode = 200),
                    records: report_query.rows
                })
            }
        }else{
            // if no deal id is specified
            const report_query = await client.query(
                `
                WITH REPORTING AS(
                    SELECT 
                         MAX(DATE(STAMP)) OVER(PARTITION BY DATE(STAMP) ORDER BY DATE(STAMP) DESC) AS CREATE_DT 
                        ,OPERATION,STAMP,ORIGINATOR,TRANSACTOR,TRANSACTIONLEGALLEAD,INDUSTRY,PRODUCT,REGION,DEALSIZE,COUPON,TENOR,MORATORIUM
                        ,REPAYMENTFREQUENCY,AMORTIZATIONSTYLE,MANDATELETTER,CREDITAPPROVAL,FEELETTER
                        ,EXPECTEDCLOSE,ACTUALCLOSE,STRUCTURINGFEEAMOUNT,STRUCTURINGFEEFINAL,GUARANTEEFEE
                        ,MONITORINGFEE,REIMBURSIBLE,DEAL_CATEGORY,NOTES,CLOSED
                    FROM TB_INFRCR_TRANSACTION_AUDIT
                )
                SELECT * 
                FROM REPORTING
                WHERE DATE(CREATE_DT) BETWEEN COALESCE($1,CURRENT_DATE) AND COALESCE($2,CURRENT_DATE)
                `,[start_date, end_date]
                );
            
            if (report_query.rows) { 
    
                res.status(200).send({
                    status: (res.statusCode = 200),
                    records: report_query.rows
                })
            }
        }
        
    } catch (e) {
        console.log(e)
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});



// // This endpoint will retrieve views for various reporting
// // It takes in view name - view names to be gotten from the data dictionary for this application
// router.get('/:name',verifyTokenAndAuthorization, async (req, res) => {
//     const client = await pool.connect();

//     try {
//         const report_name = req.params.name;
//         const reportQuery = await client.query(
//             "SELECT * FROM $1", [report_name]);
//         if (reportQuery) { 
//             res.report_value = reportQuery

//             res.status(200).send({
//                 status: (res.statusCode = 200),
//                 report_rows: reportQuery.rows
//             })
//         }
        
//     } catch (e) {
//         console.log(e)
//         res.status(403).json({ Error: e.stack });
//     }finally{
//         client.release()
//       }

// });




module.exports = router;