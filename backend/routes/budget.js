// This module handles the backend logic for the budget module

const router = require("express").Router();
const pool = require("../database");
var format = require("pg-format");
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middleware");


/*Fetch all Deals(Priviledged Users only) */
router.get("/get_all_deals", verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        const all_deals = await client.query(
            `SELECT clientname, transactor, dealsize, guaranteefee ,monitoringfee, structuringfeeamount FROM TB_INFRCR_TRANSACTION`
        );

        if (all_deals) {
            res.status(200).send({
                status: (res.statusCode = 200),
                deals: all_deals.rows,
            });
        }
    } catch (e) {
        res.status(403).json({ Error: e.stack });
    } finally {
        client.release();
    }
});


/*
budget should be yearly - we must keep a record of all budgets
=> Guarantee Fee is billed on anniversary date (This is not fixed)
=> Monitoring Fee is fixed and taken yearly on anniversary date
=> Structuring Fee(Mandtate Fee) is taken one-off
=> Deal Lifetime === Tenor column
PseudoCode
    - Determine the anniversary dates (compute using the actual-close-date and tenor)
        -rate change on the system will affect subsequent value of Guarantee Fee i.e. 
        if the gurantee fee is computed with 10% from years 0 - 2 and the rate changes in year 2, years 3 - end must use the new rate
        Todo: 
            a. accurately get rate changes for each deal(pick the most recent rate change per FY)
*/



module.exports = router;