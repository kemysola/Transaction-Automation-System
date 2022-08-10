const router = require("express").Router();
const pool = require("../database");
const {verifyTokenAndAuthorization} = require("../middleware");


// This resource expects three parameters[start_date: the begining period of the report, end_date:the last period of the report, deal_id if there is a specific deal of interest]
// INSTRUCTION: all parameters must be specified or null for dates and empty string for client_name if client_name is not available(in the case of spooling all deals using dates) - if "Null" date is specified
// the current date is passed at the database layer.
router.get('/:start_date/:end_date/:client_name', verifyTokenAndAuthorization, async (req, res) => {

    const client = await pool.connect();

    const reporting_params = {start_date, end_date, client_name } = req.params


    try {
        // if a client name is specified
        if ( client_name !== "''"){
                        
            const report_query = await client.query(
                `
                WITH REPORTING AS(
                    SELECT
                        ROW_NUMBER() OVER(PARTITION BY TRANSID, DATE(STAMP) ORDER BY STAMP DESC) AS POS,CLIENTNAME, CREATEDATE AS CREATE_DT
                        ,MAX(DATE(STAMP)) OVER(PARTITION BY TRANSID, DATE(STAMP) ORDER BY STAMP DESC) AS LAST_UPDATE
                        ,OPERATION,STAMP,ORIGINATOR,TRANSACTOR,TRANSACTIONLEGALLEAD,INDUSTRY,PRODUCT,REGION,DEALSIZE,COUPON,TENOR,MORATORIUM
                        ,REPAYMENTFREQUENCY,AMORTIZATIONSTYLE,MANDATELETTER,CREDITAPPROVAL,FEELETTER
                        ,EXPECTEDCLOSE,ACTUALCLOSE,STRUCTURINGFEEAMOUNT,STRUCTURINGFEEFINAL,GUARANTEEFEE
                        ,MONITORINGFEE,REIMBURSIBLE,DEAL_CATEGORY,NOTES,CLOSED
                    FROM TB_INFRCR_TRANSACTION_AUDIT
                )
                SELECT 
                    CLIENTNAME,CREATE_DT, LAST_UPDATE,OPERATION,ORIGINATOR,TRANSACTOR,TRANSACTIONLEGALLEAD,INDUSTRY,
                    PRODUCT,REGION,DEALSIZE,COUPON,TENOR,MORATORIUM,REPAYMENTFREQUENCY,AMORTIZATIONSTYLE,
                    MANDATELETTER,CREDITAPPROVAL,FEELETTER,EXPECTEDCLOSE,ACTUALCLOSE,STRUCTURINGFEEAMOUNT,
                    STRUCTURINGFEEFINAL,GUARANTEEFEE,MONITORINGFEE,REIMBURSIBLE,DEAL_CATEGORY,NOTES,CLOSED 
                FROM REPORTING
                WHERE DATE(LAST_UPDATE) BETWEEN COALESCE($1,CURRENT_DATE) AND COALESCE($2,CURRENT_DATE)
                AND CLIENTNAME = $3
                AND POS = 1;
                `,[start_date, end_date, client_name]
                );
    
            if (report_query.rows.length > 0) { 
    
                res.status(200).send({
                    status: (res.statusCode = 200),
                    records: report_query.rows
                })
            }else{
                const report_query = await client.query(
                    `
                    SELECT
                            CLIENTNAME, CREATEDATE AS CREATE_DT
                            ,ORIGINATOR,TRANSACTOR,TRANSACTIONLEGALLEAD,INDUSTRY,PRODUCT,REGION,DEALSIZE,COUPON,TENOR,MORATORIUM
                            ,REPAYMENTFREQUENCY,AMORTIZATIONSTYLE,MANDATELETTER,CREDITAPPROVAL,FEELETTER
                            ,EXPECTEDCLOSE,ACTUALCLOSE,STRUCTURINGFEEAMOUNT,STRUCTURINGFEEFINAL,GUARANTEEFEE
                            ,MONITORINGFEE,REIMBURSIBLE,DEAL_CATEGORY,NOTES,CLOSED
                        FROM TB_INFRCR_TRANSACTION
                        WHERE CLIENTNAME = $1
                        `,[client_name]
                );
                if (report_query.rows) { 
    
                    res.status(200).send({
                        status: (res.statusCode = 200),
                        records: report_query.rows
                    })
                }
            }
        }else{
            // if no customer/client name is specified
            const report_query = await client.query(
                `
                WITH REPORTING AS(
                    SELECT
                        ROW_NUMBER() OVER(PARTITION BY TRANSID, DATE(STAMP) ORDER BY STAMP DESC) AS POS,CLIENTNAME, CREATEDATE AS CREATE_DT
                        ,MAX(DATE(STAMP)) OVER(PARTITION BY TRANSID, DATE(STAMP) ORDER BY STAMP DESC) AS LAST_UPDATE
                        ,OPERATION,STAMP,ORIGINATOR,TRANSACTOR,TRANSACTIONLEGALLEAD,INDUSTRY,PRODUCT,REGION,DEALSIZE,COUPON,TENOR,MORATORIUM
                        ,REPAYMENTFREQUENCY,AMORTIZATIONSTYLE,MANDATELETTER,CREDITAPPROVAL,FEELETTER
                        ,EXPECTEDCLOSE,ACTUALCLOSE,STRUCTURINGFEEAMOUNT,STRUCTURINGFEEFINAL,GUARANTEEFEE
                        ,MONITORINGFEE,REIMBURSIBLE,DEAL_CATEGORY,NOTES,CLOSED
                    FROM TB_INFRCR_TRANSACTION_AUDIT
                )
                SELECT 
                    CLIENTNAME,CREATE_DT, LAST_UPDATE,OPERATION,ORIGINATOR,TRANSACTOR,TRANSACTIONLEGALLEAD,INDUSTRY,
                    PRODUCT,REGION,DEALSIZE,COUPON,TENOR,MORATORIUM,REPAYMENTFREQUENCY,AMORTIZATIONSTYLE,
                    MANDATELETTER,CREDITAPPROVAL,FEELETTER,EXPECTEDCLOSE,ACTUALCLOSE,STRUCTURINGFEEAMOUNT,
                    STRUCTURINGFEEFINAL,GUARANTEEFEE,MONITORINGFEE,REIMBURSIBLE,DEAL_CATEGORY,NOTES,CLOSED 
                FROM REPORTING
                WHERE DATE(LAST_UPDATE) BETWEEN COALESCE($1,CURRENT_DATE) AND COALESCE($2,CURRENT_DATE)
                AND POS = 1;
                `,[start_date, end_date]
                );
            
            if (report_query.rows.length > 0) { 
    
                res.status(200).send({
                    status: (res.statusCode = 200),
                    records: report_query.rows
                })
            }else{
                const report_query = await client.query(
                    `
                    SELECT
                            CLIENTNAME, CREATEDATE AS CREATE_DT
                            ,ORIGINATOR,TRANSACTOR,TRANSACTIONLEGALLEAD,INDUSTRY,PRODUCT,REGION,DEALSIZE,COUPON,TENOR,MORATORIUM
                            ,REPAYMENTFREQUENCY,AMORTIZATIONSTYLE,MANDATELETTER,CREDITAPPROVAL,FEELETTER
                            ,EXPECTEDCLOSE,ACTUALCLOSE,STRUCTURINGFEEAMOUNT,STRUCTURINGFEEFINAL,GUARANTEEFEE
                            ,MONITORINGFEE,REIMBURSIBLE,DEAL_CATEGORY,NOTES,CLOSED
                        FROM TB_INFRCR_TRANSACTION
                        `
                );
                if (report_query.rows) { 
    
                    res.status(200).send({
                        status: (res.statusCode = 200),
                        records: report_query.rows
                    })
                }
            }
        }
        
    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});


// This endpoint will retrieve views for various reporting - as defined in the dashboards
// It takes in view name - each view will represent all or 
router.get('report_by_name/:name',verifyTokenAndAuthorization, async (req, res) => {
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
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});


router.get('/:create_date',verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();
  
    try {
        const create_date = req.params.create_date;
        const returned_date = await client.query(
            "SELECT * FROM TB_INFRCR_TRANSACTION WHERE createdate::text LIKE $1", [create_date + '%']);
        // if (staff) { 
  
            res.status(200).send({
                status: (res.statusCode = 200),
                dateInfo: returned_date.rows
            })
        // }
        
    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
  
  });


router.get('/report_data/all',verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();
     try {
    // query transaction table
        const transaction_data = await client.query("SELECT clientname, originator, transactor, transactionlegallead, industry, product, region, dealsize, coupon, tenor, moratorium, repaymentfrequency, mandateletter, creditapproval, feeletter, expectedclose, actualclose, structuringfeeamount, structuringfeeadvance, structuringfeefinal, guaranteefee, monitoringfee, reimbursible,   deal_category, closed, nbc_approval_date, nbc_submitted_date FROM TB_INFRCR_TRANSACTION");
    // query staff table   
        const staff_data = await  client.query("SELECT originationamount, guaranteepipeline, mandateletter, creditcommiteeapproval, feeletter, financialclose FROM TB_TRS_USERS");
        res.status(200).send({
            status: (res.statusCode = 200),
            transactionInfo: transaction_data.rows,
            staffInfo: staff_data.rows
        })
} catch (e) {
    res.status(403).json({ Error: e.stack });
}finally{
    client.release()
}
  })

// Monthly Credit Committee(CC) Submission Report
router.get('/ccsubmission/monthly/:start_date/:end_date',verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();
     try {
    // query transaction table
        const start_date = req.params.start_date;
        const end_date = req.params.end_date;
        const ccsubmission_data = await client.query(`
        SELECT ccsubmissiondate, clientname, originator, transactor, industry, product, region, dealsize,tenor, mandateletter,creditapproval expectedclose, actualclose, structuringfeeamount,structuringfeeadvance,
            structuringfeefinal, guaranteefee, monitoringfee, reimbursible, deal_category, nbc_approval_date, nbc_submitted_date, closed 
        FROM TB_INFRCR_TRANSACTION 
        WHERE DATE_PART('month', ccsubmissiondate) BETWEEN COALESCE(DATE_PART('month', TO_DATE($1,'DD-MM-YYY')),DATE_PART('month', CURRENT_DATE)) and COALESCE(DATE_PART('month', TO_DATE($2,'DD-MM-YYY')),DATE_PART('month', CURRENT_DATE))
        AND DATE_PART('year', ccsubmissiondate) BETWEEN COALESCE(DATE_PART('year', TO_DATE($1,'DD-MM-YYY')),DATE_PART('year', CURRENT_DATE)) and COALESCE(DATE_PART('year', TO_DATE($2,'DD-MM-YYY')),DATE_PART('year', CURRENT_DATE))
        AND ccsubmissiondate IS NOT NULL
        `,[start_date, end_date]);
  
        res.status(200).send({
            status: (res.statusCode = 200),
            ccsubmissionReport: ccsubmission_data.rows,
        })
} catch (e) {
    res.status(403).json({ Error: e.stack });
}finally{
    client.release()
}
  })


module.exports = router;