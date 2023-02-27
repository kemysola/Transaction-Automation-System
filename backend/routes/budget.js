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
            `SELECT clientname, transactor, dealsize, guaranteefee ,monitoringfee, repaymentfrequency, amortizationstyle, structuringfeeamount,moratorium,tenor,coupon FROM TB_INFRCR_TRANSACTION`
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

/*Fetch all Deals(Priviledged Users only) */
    router.post("/compute_amortization", verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    // Get the details of candidate transactions for budget & iterate to compute

    try {
        const payload = req.body;
        const queryBody = `SELECT * FROM FUNC_INFR_AMORTIZATION_SCHEDULE($1::int,$2::numeric,$3::int,$4::numeric,$5::varchar(100),$6::date,$7::date,$8::int,$9::numeric,$10::numeric,$11::varchar(150),$12::int)`;
        
        const result = []

        for (let i = 0; i < payload.length; i++) {

            const Moratorium = payload[i].Moratorium; 
            const Coupon = payload[i].Coupon ;
            const Duration = payload[i].Duration;
            const Principal = payload[i].Principal;
            const RepaymentFrequency = payload[i].RepaymentFrequency;
            const IssueDate =  payload[i].IssueDate;
            const FirstCouponDate = payload[i].FirstCouponDate;
            const TakingFirstInterestEarly = payload[i].TakingFirstInterestEarly;
            const GuaranteeFeeRate =  payload[i].GuaranteeFeeRate; 
            const DiscountFactor =  payload[i].DiscountFactor;
            const DealName =  payload[i].DealName;
            const DealID =  payload[i].DealID;

            const dataLoad = [Moratorium, Coupon, Duration, Principal, RepaymentFrequency, IssueDate, FirstCouponDate, TakingFirstInterestEarly, GuaranteeFeeRate, DiscountFactor, DealName, DealID]

            const budget_payload = await client.query(queryBody, dataLoad);

            result.push(budget_payload.rows)
        }
        
        if (result.length > 0) {
            res.status(200).send({
                status: (res.statusCode = 200),
                deals: result,
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