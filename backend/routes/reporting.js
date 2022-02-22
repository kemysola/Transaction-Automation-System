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
                // console.log(report_query.rows.length)
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
        console.log(e)
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
        console.log(e)
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});



module.exports = router;