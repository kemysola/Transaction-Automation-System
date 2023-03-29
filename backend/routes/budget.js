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
      `SELECT clientname, transactor, dealsize, guaranteefee ,monitoringfee, repaymentfrequency, amortizationstyle, structuringfeeamount,moratorium,tenor,coupon,discountfactor,
            takingfirstinterestearly,
            firstcoupondate,
            principal,
            guaranteefeerate,
            transid,
            issuedate FROM TB_INFRCR_TRANSACTION`
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

/*Computes the guarantee fees for each facility */
router.post("/compute_amortization/:startdate/:enddate", async (req, res) => {
  const client = await pool.connect();

  // Get the details of candidate transactions for budget & iterate to compute

  try {
    const payload = req.body;
    // const payload = [
    //             {"Moratorium": 1 ,"Coupon": 14.7,"Duration": 7,"Principal": 1500000000.00,"RepaymentFrequency": 'Semi-Annual',"IssueDate": '20220413',"FirstCouponDate":'20221031',"TakingFirstInterestEarly": 0,"GuaranteeFeeRate": 2.2,"DiscountFactor": 14.7,"DealName": 'Asiko',"DealID": 1002},
    //             {"Moratorium": 5 ,"Coupon": 13.25,"Duration": 20,"Principal": 25000000000.00,"RepaymentFrequency": 'Semi-Annual',"IssueDate": '20220510',"FirstCouponDate":'20220916',"TakingFirstInterestEarly": 1,"GuaranteeFeeRate": 2.5,"DiscountFactor": 13.25,"DealName": 'LFCZ',"DealID": 1001}
    //         ]

    const queryBody = `SELECT * FROM FUNC_INFR_AMORTIZATION_SCHEDULE($1::int,$2::numeric,$3::int,$4::numeric,$5::varchar(100),$6::date,$7::date,$8::int,$9::numeric,$10::numeric,$11::varchar(150),$12::int,$13::date,$14::date)`;

    const result = [];

    for (let i = 0; i < payload.length; i++) {
      const Moratorium = payload[i].moratorium;
      const Coupon = +payload[i].coupon;
      const Duration = payload[i].tenor;
      const Principal = payload[i].principal;
      const RepaymentFrequency = payload[i].repaymentfrequency;
      const IssueDate = payload[i].issuedate;
      const FirstCouponDate = payload[i].firstcoupondate;
      const TakingFirstInterestEarly = payload[i].takingfirstinterestearly;
      const GuaranteeFeeRate = payload[i].guaranteefeerate;
      const DiscountFactor = payload[i].discountfactor;
      const DealName = payload[i].clientname;
      const DealID = payload[i].transid;

      const dataLoad = [
        Moratorium,
        Coupon,
        Duration,
        Principal,
        RepaymentFrequency,
        IssueDate,
        FirstCouponDate,
        TakingFirstInterestEarly,
        GuaranteeFeeRate,
        DiscountFactor,
        DealName,
        DealID,
        req.params.startdate,
        req.params.enddate,
      ];
      const budget_payload = await client.query(queryBody, dataLoad);
      result.push(budget_payload.rows);
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

/*Fetch Amortizatiokn Schedule for a customer */
router.get("/amortization_schedule/:dealid", async (req, res) => {
  const client = await pool.connect();

  try {
    const dealid = req.params.dealid;

    const amortz_sched = await client.query(
      `SELECT * FROM TB_AMORTIZATION_SCHEDULE_MASTER WHERE dealid = $1;`,
      [dealid]
    );

    if (amortz_sched) {
      res.status(200).send({
        status: (res.statusCode = 200),
        amortization_schedule: amortz_sched.rows,
      });
    }
  } catch (e) {
    res.status(403).json({ Error: e.stack });
  } finally {
    client.release();
  }
});

module.exports = router;
