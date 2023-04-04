const router = require("express").Router();
const pool = require("../database");
var format = require("pg-format");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware");
const { status } = require("express/lib/response");
const CryptoJS = require("crypto-js");

// This method computes the Structuring Fee Final value
const structuringFeeFinalCompute = (
  structuringFeeAmount,
  structuringFeeAdvance
) => {
  const finalPercent = (structuringFeeAmount / structuringFeeAdvance) * 100;
  return parseFloat(finalPercent);
};

//Use this to validate incoming financial year
const fy_validator = (fy) => {
  const reg = new RegExp("^[0-9]+$");
  return reg.test(fy);
};

// 20222-02-03: A function to compute the category of the deal at creation and subsequent updates
const funcDealCategory = (
  greenA,
  greenB,
  greenC,
  greenD,
  greenE,
  greenF,
  amberA,
  amberB,
  amberC,
  amberD,
  amberE,
  product
) => {
  if (
    greenA == true &&
    greenB == true &&
    greenC == true &&
    greenD == true &&
    greenE == true &&
    greenF == true &&
    product !== "CRG"
  ) {
    return "Green";
  } else if (
    amberA == true &&
    amberB == true &&
    amberC == true &&
    amberD == true &&
    amberE == true &&
    product !== "CRG"
  ) {
    return "Yellow";
  } else {
    return "Red";
  }
};

// convert notes field in all transactions to List Items 2022:Feb:05
function convertNotesFiledsToList(el) {
  el["notes"] = el["notes"].split("|");
}

// New Transaction Registration Endpoint[This registration should be done by a all active or admin users authorized based on the role-matrix]
router.post("/createdeal", verifyTokenAndAuthorization, async (req, res) => {
  const client = await pool.connect();

  try {
    // Destrucuring the request body to grab required fields
    const new_transaction = ({
      clientName,
      originator,
      transactor,
      transactionLegalLead,
      industry,
      product,
      region,
      dealSize,
      coupon,
      tenor,
      moratorium,
      repaymentFrequency,
      amortizationStyle,
      mandateLetter,
      creditApproval,
      feeLetter,
      expectedClose,
      actualClose,
      NBC_approval_date,
      NBC_submitted_date,
      greenA,
      greenB,
      greenC,
      greenD,
      greenE,
      greenF,
      amberA,
      amberB,
      amberC,
      amberD,
      amberE,
      redA,
      redB,
      redC,
      redD,
      redE,
      structuringFeeAmount,
      structuringFeeAdvance,
      structuringFeeFinal,
      guaranteeFee,
      notes,
      closed,
      monitoringFee,
      reimbursible,
      nbcFocus,
      parties,
      plis,
      ocps,
      kpi,
      ccSubmissionDate,
      principal,
      firstcoupondate,
      takingfirstinterestearly,
      guaranteefeerate,
      discountfactor,
      issuedate,
    } = req.body);

    const transaction_data = [
      new_transaction.clientName,
      new_transaction.originator,
      new_transaction.transactor,
      new_transaction.industry,
      new_transaction.product,
      new_transaction.region,
      new_transaction.dealSize,
      new_transaction.coupon,
      new_transaction.tenor,
      new_transaction.moratorium,
      new_transaction.repaymentFrequency,
      new_transaction.amortizationStyle,
      new_transaction.mandateLetter,
      new_transaction.creditApproval,
      new_transaction.feeLetter,
      new_transaction.expectedClose,
      new_transaction.actualClose,
      new_transaction.NBC_approval_date,
      new_transaction.NBC_submitted_date,
      new_transaction.greenA,
      new_transaction.greenB,
      new_transaction.greenC,
      new_transaction.greenD,
      new_transaction.greenE,
      new_transaction.greenF,
      new_transaction.amberA,
      new_transaction.amberB,
      new_transaction.amberC,
      new_transaction.amberD,
      new_transaction.amberE,
      new_transaction.redA,
      new_transaction.redB,
      new_transaction.redC,
      new_transaction.redD,
      new_transaction.redE,
      new_transaction.structuringFeeAmount,
      new_transaction.structuringFeeAdvance,
      new_transaction.structuringFeeFinal,
      new_transaction.guaranteeFee,
      funcDealCategory(
        new_transaction.greenA,
        new_transaction.greenB,
        new_transaction.greenC,
        new_transaction.greenD,
        new_transaction.greenE,
        new_transaction.greenF,
        new_transaction.amberA,
        new_transaction.amberB,
        new_transaction.amberC,
        new_transaction.amberD,
        new_transaction.amberE,
        new_transaction.product
      ),
      req.user.Email,
      new_transaction.transactionLegalLead,
      new_transaction.notes,
      new_transaction.closed,
      new_transaction.monitoringFee,
      new_transaction.reimbursible,
      new_transaction.ccSubmissionDate,
      new_transaction.principal,
      new_transaction.firstcoupondate,
      new_transaction.takingfirstinterestearly,
      new_transaction.guaranteefeerate,
      new_transaction.discountfactor,
      new_transaction.issuedate,
    ];

    await client.query("BEGIN");

    
    const clientCheck = await client.query('SELECT COUNT(*) FROM TB_INFRCR_TRANSACTION WHERE LOWER(clientName) = $1', [new_transaction.clientName.trim().toLowerCase()]);

    if(clientCheck.rows[0].count > 0){
      // res.status(404).send('Client already exist')
      res.json({
        status: (res.statusCode = 404),
        message: "Client already exist",
      });
      return
    }

    const write_to_db = `INSERT INTO TB_INFRCR_TRANSACTION(
                    clientName, originator, transactor, industry, product,region,
                    dealSize, coupon, tenor, moratorium, repaymentFrequency, amortizationStyle,
                    mandateLetter, creditApproval, feeLetter, expectedClose, actualClose,  NBC_approval_date, NBC_submitted_date,
                    greenA, greenB, greenC, greenD, greenE, greenF, amberA,  amberB, amberC, 
                    amberD, amberE, redA, redB, redC, redD, redE, structuringFeeAmount,structuringFeeAdvance,
                    structuringFeeFinal, guaranteeFee, deal_category, record_entry, transactionLegalLead, notes, closed, 
                    monitoringFee, reimbursible, ccSubmissionDate,principal,
                    firstcoupondate,takingfirstinterestearly,guaranteefeerate,discountfactor,issuedate
                  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38, $39, $40, $41, $42, $43, $44, $45, $46, $47,$48,$49,$50,$51,$52, $53)   
        ON CONFLICT(clientName,originator,transactor,transactionLegalLead,industry, product,region,dealSize,tenor,moratorium,repaymentFrequency,amortizationStyle,mandateLetter,creditApproval,feeLetter,expectedClose,actualClose) DO NOTHING
        RETURNING *`;

    const res_ = await client.query(write_to_db, transaction_data);

    await client.query("COMMIT");
    // convert notes field to list
    if (res_.rows.length !== 0) {
      res_.rows[0]["notes"] = res_.rows[0]["notes"].split("|");

      // NBC FOCUS

      let funcNbcFocus = (transID) => {
        new_transaction.nbcFocus.forEach(async (element) => {
          var rows = [
            transID,
            element.nbc_focus_original,
            element.nbc_focus_original_yes_no,
            element.nbc_focus_original_date,
            element.nbc_focus_original_methodology,
            element.nbc_focus_apprv_1_b,
            element.nbc_focus_apprv_1_c,
            element.nbc_focus_apprv_2_b,
            element.nbc_focus_apprv_2_c,
            element.nbc_focus_apprv_3_b,
            element.nbc_focus_apprv_3_c,
            element.nbc_focus_apprv_4_b,
            element.nbc_focus_apprv_4_c,
            element.nbc_focus_apprv_5_b,
            element.nbc_focus_apprv_5_c,
          ];
          const write_to_nbc_focus = `
                INSERT INTO TB_INFRCR_TRANSACTION_NBC_FOCUS(
                transID, nbc_focus_original, nbc_focus_original_yes_no, nbc_focus_original_date, nbc_focus_original_methodology,
                nbc_focus_apprv_1_b, nbc_focus_apprv_1_c, nbc_focus_apprv_2_b, nbc_focus_apprv_2_c, nbc_focus_apprv_3_b, nbc_focus_apprv_3_c, 
                nbc_focus_apprv_4_b, nbc_focus_apprv_4_c, nbc_focus_apprv_5_b, nbc_focus_apprv_5_c
                ) VALUES %L RETURNING *`;

          const res_nbc_focus = await client.query(
            format(write_to_nbc_focus, [rows])
          );

          await client.query("COMMIT");
          return res_nbc_focus.rows[0];
        });
      };
      var vfuncNbcFocus = funcNbcFocus(res_.rows[0]["transid"]);

      // PARTIES
      let funcParties = (transID) => {
        new_transaction.parties.forEach(async (element) => {
          var rows = [
            transID,
            element.parties_role,
            element.parties_party,
            element.parties_appointed,
            element.parties_status,
          ];
          const write_to_parties = `INSERT INTO TB_INFRCR_TRANSACTION_PARTIES(transID, parties_role, parties_party, parties_appointed, parties_status) VALUES %L RETURNING *`;

          const res_parties = await client.query(
            format(write_to_parties, [rows])
          );

          await client.query("COMMIT");
          return res_parties.rows[0];
        });
      };
      var vfuncParties = funcParties(res_.rows[0]["transid"]);

      // PLIS
      let funcPLIS = (transID) => {
        new_transaction.plis.forEach(async (element) => {
          var rows = [
            transID,
            element.plis_particulars,
            element.plis_concern,
            element.plis_weighting,
            element.plis_expected,
            element.plis_status,
          ];
          const write_to_plis = `INSERT INTO TB_INFRCR_TRANSACTION_PLIS(transID, plis_particulars, plis_concern, plis_weighting, plis_expected, plis_status) VALUES %L RETURNING *`;

          const res_plis = await client.query(format(write_to_plis, [rows]));

          await client.query("COMMIT");
          return res_plis.rows[0];
        });
      };
      var vfuncPLIS = funcPLIS(res_.rows[0]["transid"]);

      // OTHER CPS
      let funcOtherCPs = (transID) => {
        new_transaction.ocps.forEach(async (element) => {
          var rows = [
            transID,
            element.ocps_factors,
            element.ocps_yes_no,
            element.ocps_concern,
            element.ocps_expected,
            element.ocps_resp_party,
            element.ocps_status,
          ];
          const write_to_ocps = `INSERT INTO TB_INFRCR_TRANSACTION_OTHER_CPS(transID, ocps_factors, ocps_yes_no, ocps_concern, ocps_expected, ocps_resp_party, ocps_status) VALUES %L RETURNING *`;

          const res_ocps = await client.query(format(write_to_ocps, [rows]));

          await client.query("COMMIT");

          return res_ocps.rows[0];
        });
      };
      var vfuncOtherCPs = funcOtherCPs(res_.rows[0]["transid"]);

      // KPI
      let funcKPI = (transID) => {
        new_transaction.kpi.forEach(async (element) => {
          var rows = [
            transID,
            element.kpi_factors,
            element.kpi_yes_no,
            element.kpi_concern,
            element.kpi_expected,
            element.kpi_resp_party,
            element.kpi_status,
          ];
          const write_to_kpi = `INSERT INTO TB_INFRCR_TRANSACTION_KPI(transID, kpi_factors, kpi_yes_no, kpi_concern, kpi_expected, kpi_resp_party, kpi_status) VALUES %L RETURNING *`;

          const res_kpi = await client.query(format(write_to_kpi, [rows]));

          await client.query("COMMIT");
          return res_kpi.rows[0];
        });
      };
      var vfuncKPI = funcKPI(res_.rows[0]["transid"]);

      // let transCreateResp = Object.assign(res_.rows[0], vfuncOtherCPs, vfuncNbcFocus, vfuncParties, vfuncPLIS, vfuncKPI);
      const trans_id = [res_.rows[0]["transid"]];
      const sqlReq = `SELECT 
                            a.* ,
                            B.ID as ocps_ID, b.ocps_factors, b.ocps_yes_no, b.ocps_concern, b.ocps_expected, b.ocps_resp_party, b.ocps_status,
                            c.ID as nbc_focus_ID, c.nbc_focus_original, c.nbc_focus_original_yes_no, c.nbc_focus_original_date, c.nbc_focus_original_methodology, c.nbc_focus_apprv_1_b, c.nbc_focus_apprv_1_c, c.nbc_focus_apprv_2_b, c.nbc_focus_apprv_2_c, c.nbc_focus_apprv_3_b, c.nbc_focus_apprv_3_c,
                            c.nbc_focus_apprv_4_b, c.nbc_focus_apprv_4_c, c.nbc_focus_apprv_5_b, c.nbc_focus_apprv_5_c,
                            d.ID as parties_ID, d.parties_role, d.parties_party, d.parties_appointed, d.parties_status,
                            e.ID as plis_ID, e.plis_particulars, e.plis_concern, e.plis_weighting, e.plis_expected, e.plis_status,
                            f.ID as kpi_ID, f.kpi_factors, f.kpi_yes_no, f.kpi_concern, f.kpi_expected, f.kpi_resp_party, f.kpi_status 
                        FROM TB_INFRCR_TRANSACTION a
                        LEFT JOIN TB_INFRCR_TRANSACTION_OTHER_CPS b ON b.transID = a.transID
                        LEFT JOIN TB_INFRCR_TRANSACTION_NBC_FOCUS c ON c.transID = a.transID
                        LEFT JOIN TB_INFRCR_TRANSACTION_PARTIES d ON d.transID = a.transID
                        LEFT JOIN TB_INFRCR_TRANSACTION_PLIS e ON e.transID = a.transID
                        LEFT JOIN TB_INFRCR_TRANSACTION_KPI f ON f.transID = a.transID WHERE a.transID = $1
                        `;
      const sqlResp = await client.query(sqlReq, trans_id);

      res.json({
        status: (res.statusCode = 200),
        message: "New Deal Created Successfully",
        dealInfo: sqlResp.rows,
      });
    } else {
      res.json({
        status: (res.statusCode = 400),
        message:
          "New Deal Creation Failed - Duplicate Transaction Registration, Please confirm the exact transaction doesn't already exist in the system",
      });
    }
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(403).json({ ErrorStatus: e.status, Error: e.stack });
  } finally {
    client.release();
  }
});

/*Fetch Deal by ID - priviledged users*/
router.get(
  "/item/:deal/:financial_year",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();

    try {
      const deal_record_id = req.params.deal;
      const financial_year = req.params.financial_year;
      const fin_year = fy_validator(financial_year.slice(-4));

      let final_year_slice = "";

      if (fin_year) {
        final_year_slice = financial_year.slice(-4);
      } else {
        res.status(404).send({
          status: (res.statusCode = 404),
          message: "Invalid Financial Year",
        });
        return;
      }

      const deal = await client.query(
        `SELECT a.* ,
            

            b.id as ocid,b.ocps_factors, b.ocps_yes_no, b.ocps_concern, b.ocps_expected, b.ocps_resp_party, b.ocps_status,

            c.id as nbcid,c.nbc_focus_original, c.nbc_focus_original_yes_no, c.nbc_focus_original_date, c.nbc_focus_original_methodology, c.nbc_focus_apprv_1_b, c.nbc_focus_apprv_1_c, c.nbc_focus_apprv_2_b, c.nbc_focus_apprv_2_c, c.nbc_focus_apprv_3_b, c.nbc_focus_apprv_3_c,
            c.nbc_focus_apprv_4_b, c.nbc_focus_apprv_4_c, c.nbc_focus_apprv_5_b, c.nbc_focus_apprv_5_c,
            
            d.id as pid,d.parties_role, d.parties_party, d.parties_appointed, d.parties_status,
           
            e.id as plid,e.plis_particulars, e.plis_concern, e.plis_weighting, e.plis_expected, e.plis_status,

            f.id as kid,f.kpi_factors, f.kpi_yes_no, f.kpi_concern, f.kpi_expected, f.kpi_resp_party, f.kpi_status 

            FROM TB_INFRCR_TRANSACTION a
            LEFT JOIN TB_INFRCR_TRANSACTION_OTHER_CPS b ON b.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_NBC_FOCUS c ON c.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PARTIES d ON d.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PLIS e ON e.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_KPI f ON f.transID = a.transID WHERE a.transID = $1
            AND DATE_PART('year', a.createdate)::varchar(10) <= COALESCE($2, (SELECT RIGHT(fy, 4) FROM tb_infrcr_financial_year WHERE fy_status = 'Active'))
            ORDER BY b.id, c.id, d.id, e.id, f.id;`,
        [deal_record_id, final_year_slice]
      );
      if (deal) {
        res.deal_info = deal;

        // convert notes field to list
        myArray = deal.rows;
        myNotes = myArray.forEach(convertNotesFiledsToList);

        res.status(200).send({
          status: (res.statusCode = 200),
          dealInfo: deal.rows,
        });
      }
    } catch (e) {
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

/*Fetch Deal for curent user */
router.get(
  "/my_deals/:financial_year",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();

    try {
      // const deal_record_id = req.params.deal;
      const current_user = req.user;
      const financial_year = req.params.financial_year;
      const fin_year = fy_validator(financial_year.slice(-4));

      let final_year_slice = "";

      if (fin_year) {
        final_year_slice = financial_year.slice(-4);
      } else {
        res.status(404).send({
          status: (res.statusCode = 404),
          message: "Invalid Financial Year",
        });
        return;
      }

      const my_deals = await client.query(
        `SELECT a.*
        
            FROM TB_INFRCR_TRANSACTION a
            WHERE (a.originator = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            OR a.transactor = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            )AND DATE_PART('year', a.createdate)::varchar(10) = COALESCE($2, (SELECT RIGHT(fy, 4) FROM tb_infrcr_financial_year WHERE fy_status = 'Active'))
            `,
        [current_user.Email, final_year_slice]
      );
      if (my_deals) {
        // convert notes field to list
        myArray = my_deals.rows;
        myNotes = myArray.forEach(convertNotesFiledsToList);

        res.status(200).send({
          status: (res.statusCode = 200),
          deals: my_deals.rows,
        });
      }
    } catch (e) {
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

router.get(
  "/get_staff_deals/:email/:financial_year",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();

    const financial_year = req.params.financial_year;
    const fin_year = fy_validator(financial_year.slice(-4));

    let final_year_slice = "";

    if (fin_year) {
      final_year_slice = financial_year.slice(-4);
    } else {
      res.status(404).send({
        status: (res.statusCode = 404),
        message: "Invalid Financial Year",
      });
      return;
    }

    try {
      // const deal_record_id = req.params.deal;
      const staff_email = req.params.email;

      const my_deals = await client.query(
        `SELECT DISTINCT ON (a.transID)
                a.* ,

                b.ocps_factors, b.ocps_yes_no, b.ocps_concern, b.ocps_expected, b.ocps_resp_party, b.ocps_status,

                c.nbc_focus_original, c.nbc_focus_original_yes_no, c.nbc_focus_original_date, c.nbc_focus_original_methodology, c.nbc_focus_apprv_1_c, c.nbc_focus_apprv_2_b, c.nbc_focus_apprv_2_c, c.nbc_focus_apprv_3_b, c.nbc_focus_apprv_3_c,
                c.nbc_focus_apprv_4_b, c.nbc_focus_apprv_4_c, c.nbc_focus_apprv_5_b, c.nbc_focus_apprv_5_c,
                
                d.parties_role, d.parties_party, d.parties_appointed, d.parties_status,
            
                e.plis_particulars, e.plis_concern, e.plis_weighting, e.plis_expected, e.plis_status,

                f.kpi_factors, f.kpi_yes_no, f.kpi_concern, f.kpi_expected, f.kpi_resp_party, f.kpi_status 

            FROM TB_INFRCR_TRANSACTION a
            LEFT JOIN TB_INFRCR_TRANSACTION_OTHER_CPS b ON b.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_NBC_FOCUS c ON c.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PARTIES d ON d.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PLIS e ON e.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_KPI f ON f.transID = a.transID
            WHERE a.transactor = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            AND DATE_PART('year', a.createdate)::varchar(10) = COALESCE($2, (SELECT RIGHT(fy, 4) FROM tb_infrcr_financial_year WHERE fy_status = 'Active'))
            `,
        [staff_email, final_year_slice]
      );
      if (my_deals) {
        // convert notes field to list
        myArray = my_deals.rows;
        myNotes = myArray.forEach(convertNotesFiledsToList);

        res.status(200).send({
          status: (res.statusCode = 200),
          deals: my_deals.rows,
        });
      }
    } catch (e) {
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

/*Fetch all Deals(Priviledged Users only) */
router.get(
  "/all_deals/:financial_year",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    const financial_year = req.params.financial_year;
    const fin_year = fy_validator(financial_year.slice(-4));

    let final_year_slice = "";

    if (fin_year) {
      final_year_slice = financial_year.slice(-4);
    } else {
      res.status(404).send({
        status: (res.statusCode = 404),
        message: "Invalid Financial Year",
      });
      return;
    }

    try {
      const all_deals = await client.query(
        `SELECT 
                a.* 
            FROM TB_INFRCR_TRANSACTION a
            WHERE DATE_PART('year', a.createdate)::varchar(10) <= COALESCE($1, (SELECT RIGHT(fy, 4) FROM tb_infrcr_financial_year WHERE fy_status = 'Active'))
            `,[final_year_slice]
    );

      if (all_deals) {
        myArray = all_deals.rows;
        myNotes = myArray.forEach(convertNotesFiledsToList);

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
  }
);

/*Fetch all Deals(Priviledged Users only) */
router.get(
  "/all_deals/portfolio/:financial_year",
  verifyTokenAndAdmin,
  async (req, res) => {
    const client = await pool.connect();
    const financial_year = req.params.financial_year;
    const fin_year = fy_validator(financial_year.slice(-4));

    let final_year_slice = "";

    if (fin_year) {
      final_year_slice = financial_year.slice(-4);
    } else {
      res.status(404).send({
        status: (res.statusCode = 404),
        message: "Invalid Financial Year",
      });
      return;
    }

    try {
      const all_deals = await client.query(
        `
        SELECT 
                a.* 
FROM TB_INFRCR_TRANSACTION a
WHERE DATE_PART('year', a.createdate)::varchar(10) <= COALESCE($1, (SELECT RIGHT(fy, 4) FROM tb_infrcr_financial_year WHERE fy_status = 'Active'))
and closed = false
union
SELECT 
                a.* 
FROM TB_INFRCR_TRANSACTION a
WHERE DATE_PART('year', a.createdate)::varchar(10) = COALESCE($1, (SELECT RIGHT(fy, 4) FROM tb_infrcr_financial_year WHERE fy_status = 'Active'))
and closed = true
        `,[final_year_slice]
    );

      if (all_deals) {
        myArray = all_deals.rows;
        myNotes = myArray.forEach(convertNotesFiledsToList);

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
  }
);

/*Fetch Pipeline */
router.get(
  "/pipeline/:financial_year",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    const financial_year = req.params.financial_year;
    const fin_year = fy_validator(financial_year.slice(-4));

    let final_year_slice = "";

    if (fin_year) {
      final_year_slice = financial_year.slice(-4);
    } else {
      res.status(404).send({
        status: (res.statusCode = 404),
        message: "Invalid Financial Year",
      });
      return;
    }

    try {
      // const deal_record_id = req.params.deal;
      const current_user = req.user;

      const my_pipeline = await client.query(
        `SELECT a.*
        
            FROM TB_INFRCR_TRANSACTION a
            WHERE a.closed = false
            AND (a.originator = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            OR a.transactor = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1))
            AND DATE_PART('year', a.createdate)::varchar(10) <= COALESCE($2, (SELECT RIGHT(fy, 4) FROM tb_infrcr_financial_year WHERE fy_status = 'Active'))
            `,
        [current_user.Email, final_year_slice]
      );
      if (my_pipeline) {
        res.status(200).send({
          status: (res.statusCode = 200),
          deals: my_pipeline.rows,
        });
      }
    } catch (e) {
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

/*Fetch Portfolio deals per user */
router.get(
  "/portfolio/:financial_year",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    const financial_year = req.params.financial_year;
    const fin_year = fy_validator(financial_year.slice(-4));

    let final_year_slice = "";

    if (fin_year) {
      final_year_slice = financial_year.slice(-4);
    } else {
      res.status(404).send({
        status: (res.statusCode = 404),
        message: "Invalid Financial Year",
      });
      return;
    }

    try {
      // const deal_record_id = req.params.deal;
      const current_user = req.user;

      const my_portfolio = await client.query(
        `SELECT a.*
        
            FROM TB_INFRCR_TRANSACTION a
            WHERE a.closed = true
            AND (a.originator = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            OR a.transactor = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1))
            AND DATE_PART('year', a.createdate)::varchar(10) = COALESCE($2, (SELECT RIGHT(fy, 4) FROM tb_infrcr_financial_year WHERE fy_status = 'Active'))
            `,
        [current_user.Email, final_year_slice]
      );
      if (my_portfolio) {
        res.status(200).send({
          status: (res.statusCode = 200),
          deals: my_portfolio.rows,
        });
      }
    } catch (e) {
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);
//**************************************** Download endpoint for origination dashboard */

// create an endpoint to download deals by indidvidual staff on the origination dashboard
router.get(
  "/download_all_deals/:financial_year",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    const financial_year = req.params.financial_year;
    const fin_year = fy_validator(financial_year.slice(-4));

    let final_year_slice = "";

    if (fin_year) {
      final_year_slice = financial_year.slice(-4);
    } else {
      res.status(404).send({
        status: (res.statusCode = 404),
        message: "Invalid Financial Year",
      });
      return;
    }

    try {
      const all_deals = await client.query(
        `SELECT createdate,transid,clientname,originator, transactor,transactionlegallead,industry,product, region,dealsize,tenor,repaymentfrequency,mandateletter, creditapproval,expectedclose, actualclose,guaranteefee,closed,deal_category,notes,nbc_approval_date, nbc_submitted_date 
        FROM TB_INFRCR_TRANSACTION
        WHERE DATE_PART('year', a.createdate)::varchar(10) <= COALESCE($1, (SELECT RIGHT(fy, 4) FROM tb_infrcr_financial_year WHERE fy_status = 'Active'))
            `,[final_year_slice]
      );

      if (all_deals) {
        myArray = all_deals.rows;
        myNotes = myArray.forEach(convertNotesFiledsToList);

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
  }
);

//******************************************** Download Staff deals by selected columns */
router.get(
  "/download_staff_deals/:email/:financial_year",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    const financial_year = req.params.financial_year;
    const fin_year = fy_validator(financial_year.slice(-4));

    let final_year_slice = "";

    if (fin_year) {
      final_year_slice = financial_year.slice(-4);
    } else {
      res.status(404).send({
        status: (res.statusCode = 404),
        message: "Invalid Financial Year",
      });
      return;
    }

    try {
      // const deal_record_id = req.params.deal;
      const staff_email = req.params.email;

      const my_deals = await client.query(
        `SELECT createdate,transid,clientname,originator, transactor,transactionlegallead,industry,product, region,dealsize,tenor,repaymentfrequency,mandateletter, creditapproval,expectedclose, actualclose,guaranteefee,closed,deal_category,notes,nbc_approval_date, nbc_submitted_date
            FROM TB_INFRCR_TRANSACTION
            WHERE originator = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            AND DATE_PART('year', a.createdate)::varchar(10) = COALESCE($2, (SELECT RIGHT(fy, 4) FROM tb_infrcr_financial_year WHERE fy_status = 'Active'))
            `,
        [staff_email, final_year_slice]
      );
      if (my_deals) {
        // convert notes field to list
        myArray = my_deals.rows;
        myNotes = myArray.forEach(convertNotesFiledsToList);

        res.status(200).send({
          status: (res.statusCode = 200),
          deals: my_deals.rows,
        });
      }
    } catch (e) {
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

/*
        Deal Record Modification[only deal owner(originator or Transactor can modify deal)]
    get the owner of deal when retrieving deals from transaction, check the owner is active or an admin
    select deal where deal id === supplied deal id and originator or transactor is current user
*/

router.put("/update/:dealID", verifyTokenAndAuthorization, async (req, res) => {
  const client = await pool.connect();
  try {
    const updated_rec = ({
      clientName,
      originator,
      transactor,
      industry,
      product,
      region,
      dealSize,
      coupon,
      tenor,
      moratorium,
      repaymentFrequency,
      amortizationStyle,
      mandateLetter,
      creditApproval,
      feeLetter,
      expectedClose,
      actualClose,
      NBC_approval_date,
      NBC_submitted_date,
      greenA,
      greenB,
      greenC,
      greenD,
      greenE,
      greenF,
      amberA,
      amberB,
      amberC,
      amberD,
      amberE,
      redA,
      redB,
      redC,
      redD,
      redE,
      structuringFeeAmount,
      structuringFeeAdvance,
      structuringFeeFinal,
      guaranteeFee,
      transactionLegalLead,
      notes,
      closed,
      monitoringFee,
      reimbursible,
      ccSubmissionDate,
      principal,
      guaranteefeerate,
      issuedate,
      takingfirstinterestearly,
      discountfactor,
      firstcoupondate,
      nbcFocus,
      parties,
      plis,
      ocps,
      kpi,
    } = req.body);

    

    const updated_rec_nbc = ({ nbcFocus } = req.body);

    
      const updNBCFocus = updated_rec_nbc.nbcFocus;
   
          updNBCFocus.forEach(async (element) => {
            var rows = [
              req.params.dealID,
              element.id,
              element.nbc_focus_original,
              element.nbc_focus_original_yes_no,
              element.nbc_focus_original_date,
              element.nbc_focus_original_methodology,
              element.nbc_focus_apprv_1_b,
              element.nbc_focus_apprv_1_c,
              element.nbc_focus_apprv_2_b,
              element.nbc_focus_apprv_2_c,
              element.nbc_focus_apprv_3_b,
              element.nbc_focus_apprv_3_c,
              element.nbc_focus_apprv_4_b,
              element.nbc_focus_apprv_4_c,
              element.nbc_focus_apprv_5_b,
              element.nbc_focus_apprv_5_c,
            ];
  
          
  
            const res_check_rec = await client.query(
              `SELECT * FROM TB_INFRCR_TRANSACTION_NBC_FOCUS WHERE id in ($1)`,
              [rows[1]]
            );
  
            if (res_check_rec.rows.length <= 0) {
              var insert_rows = [
                req.params.dealID,
                element.nbc_focus_original,
                element.nbc_focus_original_yes_no,
                element.nbc_focus_original_date,
                element.nbc_focus_original_methodology,
                element.nbc_focus_apprv_1_b,
                element.nbc_focus_apprv_1_c,
                element.nbc_focus_apprv_2_b,
                element.nbc_focus_apprv_2_c,
                element.nbc_focus_apprv_3_b,
                element.nbc_focus_apprv_3_c,
                element.nbc_focus_apprv_4_b,
                element.nbc_focus_apprv_4_c,
                element.nbc_focus_apprv_5_b,
                element.nbc_focus_apprv_5_c,
              ];
              const insert_to_nbcfocus = `
                              INSERT INTO TB_INFRCR_TRANSACTION_NBC_FOCUS(transID, nbc_focus_original, nbc_focus_original_yes_no, nbc_focus_original_date, nbc_focus_original_methodology,  nbc_focus_apprv_1_b, nbc_focus_apprv_1_c, nbc_focus_apprv_2_b, nbc_focus_apprv_2_c, nbc_focus_apprv_3_b, nbc_focus_apprv_3_c, 
                                nbc_focus_apprv_4_b, nbc_focus_apprv_4_c, nbc_focus_apprv_5_b, nbc_focus_apprv_5_c) 
                              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                              `;
              const res_ins_nbc_focus = await client.query(
                insert_to_nbcfocus,
                insert_rows
              );
  
              await client.query("COMMIT");
            } else {
              const update_to_nbcfocus = `
                          UPDATE TB_INFRCR_TRANSACTION_NBC_FOCUS
                          SET nbc_focus_original = coalesce($3, nbc_focus_original)
                              ,nbc_focus_original_yes_no = coalesce($4, nbc_focus_original_yes_no)
                              ,nbc_focus_original_date = coalesce($5, nbc_focus_original_date)
                              ,nbc_focus_original_methodology = coalesce($6, nbc_focus_original_methodology),
                              nbc_focus_apprv_1_b = coalesce($7, nbc_focus_apprv_1_b ),
                              nbc_focus_apprv_1_c = coalesce($8, nbc_focus_apprv_1_c ), 
                              nbc_focus_apprv_2_b = coalesce($9, nbc_focus_apprv_2_b ),
                              nbc_focus_apprv_2_c = coalesce($10, nbc_focus_apprv_2_c), 
                              nbc_focus_apprv_3_b = coalesce($11, nbc_focus_apprv_3_b ), 
                              nbc_focus_apprv_3_c = coalesce($12, nbc_focus_apprv_3_c), 
                              nbc_focus_apprv_4_b = coalesce($13, nbc_focus_apprv_4_b ), 
                              nbc_focus_apprv_4_c = coalesce($14, nbc_focus_apprv_4_c ), 
                              nbc_focus_apprv_5_b = coalesce($15, nbc_focus_apprv_5_b ), 
                              nbc_focus_apprv_5_c = coalesce($16, nbc_focus_apprv_5_c )
                          WHERE transID = $1 AND id = $2
                      `;
              const res_nbc_focus = await client.query(update_to_nbcfocus, rows);
  
              await client.query("COMMIT");
  
              return res_nbc_focus.rows[0];
            }
          });

      // }
    const updated = [
      updated_rec.clientName,
      updated_rec.originator,
      updated_rec.transactor,
      updated_rec.industry,
      updated_rec.product,
      updated_rec.region,
      updated_rec.dealSize,
      updated_rec.coupon,
      updated_rec.tenor,
      updated_rec.moratorium,
      updated_rec.repaymentFrequency,
      updated_rec.amortizationStyle,
      updated_rec.mandateLetter,
      updated_rec.creditApproval,
      updated_rec.feeLetter,
      updated_rec.expectedClose,
      updated_rec.actualClose,
      updated_rec.greenA,
      updated_rec.greenB,
      updated_rec.greenC,
      updated_rec.greenD,
      updated_rec.greenE,
      updated_rec.greenF,
      updated_rec.amberA,
      updated_rec.amberB,
      updated_rec.amberC,
      updated_rec.amberD,
      updated_rec.amberE,
      updated_rec.redA,
      updated_rec.redB,
      updated_rec.redC,
      updated_rec.redD,
      updated_rec.redE,
      updated_rec.structuringFeeAmount,
      updated_rec.structuringFeeAdvance,
      updated_rec.structuringFeeFinal,
      req.params.dealID,
      req.user.Email,
      funcDealCategory(
        updated_rec.greenA,
        updated_rec.greenB,
        updated_rec.greenC,
        updated_rec.greenD,
        updated_rec.greenE,
        updated_rec.greenF,
        updated_rec.amberA,
        updated_rec.amberB,
        updated_rec.amberC,
        updated_rec.amberD,
        updated_rec.amberE,
        updated_rec.product
      ),
      updated_rec.transactionLegalLead,
      updated_rec.notes,
      updated_rec.closed,
      updated_rec.guaranteeFee,
      updated_rec.NBC_approval_date,
      updated_rec.NBC_submitted_date,
      updated_rec.monitoringFee,
      updated_rec.reimbursible,
      updated_rec.ccSubmissionDate,
      updated_rec.principal,
      updated_rec.guaranteefeerate,
      updated_rec.issuedate,
      updated_rec.takingfirstinterestearly,
      updated_rec.discountfactor,
      updated_rec.firstcoupondate,

    ];

    await client.query("BEGIN");

    const clientCheck = await client.query('SELECT LOWER(trim(clientName)) FROM TB_INFRCR_TRANSACTION WHERE LOWER(trim(clientName)) = $1 AND transID != $2', [updated_rec.clientName.trim().toLowerCase(), req.params.dealID]);
    if(clientCheck.rows.length > 0){
      // res.status(404).send('Client already exist')
      res.json({
        status: (res.statusCode = 404),
        message: "client already exist",
      });
      return
    }

    const update_db = `UPDATE TB_INFRCR_TRANSACTION
         SET clientName = $1, originator = $2, transactor = $3, industry = $4, product = $5,region = $6,
            dealSize = $7, coupon = $8, tenor = $9, moratorium = $10, repaymentFrequency = $11, amortizationStyle = $12,
            mandateLetter = $13, creditApproval = $14 , feeLetter = $15, expectedClose = $16, actualClose = $17 ,
            greenA = $18, greenB = $19, greenC = $20, greenD = $21, greenE = $22, greenF = $23, amberA = $24,  amberB = $25, amberC = $26, 
            amberD = $27, amberE = $28, redA = $29, redB = $30, redC = $31, redD = $32 , redE = $33, structuringFeeAmount = $34,
            structuringFeeAdvance = $35,  structuringFeeFinal = $36, record_entry = $38, deal_category = $39, transactionLegalLead = $40, notes = $41, 
            closed = $42, guaranteeFee = $43, nbc_approval_date = $44, nbc_submitted_date = $45, monitoringFee = $46, reimbursible = $47, ccSubmissionDate = $48,
            principal =$49,guaranteefeerate = $50,issuedate =$51,takingfirstinterestearly = $52, discountfactor = $53,firstcoupondate = $54
            WHERE transID = $37
        RETURNING *`;
    const res_ = await client.query(update_db, updated);


    await client.query("COMMIT");

    // convert notes field to list
    res_.rows[0]["notes"] = res_.rows[0]["notes"].split("|");

    // // UPDATE OCPS

    // let funcOtherCPsUpdate =  () => {
    //     updated_rec.ocps.forEach(async element => {
    //         var rows = [req.params.dealID, element.id, element.ocps_factors, element.ocps_yes_no, element.ocps_concern, element.ocps_expected, element.ocps_resp_party, element.ocps_status];
    //         const update_to_ocps = `
    //         UPDATE TB_INFRCR_TRANSACTION_OTHER_CPS
    //         SET ocps_factors = $3
    //             ,ocps_yes_no = $4
    //             ,ocps_concern = $5
    //             ,ocps_expected = $6
    //             ,ocps_resp_party = $7
    //             ,ocps_status = $8
    //         WHERE transID = $1 AND id = $2
    //         `
    //         const res_ocps = await client.query(update_to_ocps,rows)

    //         await client.query('COMMIT')

    //         return res_ocps.rows[0]

    //     });
    // }
    // var vfuncOtherCPsUpdate = funcOtherCPsUpdate()

    // // UPDATE NBC FOCUS
    // let funcNbcFocusUpdate =  () => {
    //     updated_rec.nbcFocus.forEach(async element => {
    //         var rows = [req.params.dealID, element.id, element.nbc_focus_original, element.nbc_focus_original_yes_no, element.nbc_focus_original_date, element.nbc_focus_original_methodology];
    //         const update_to_nbcfocus = `
    //         UPDATE TB_INFRCR_TRANSACTION_NBC_FOCUS
    //         SET nbc_focus_original = $3
    //             ,nbc_focus_original_yes_no = $4
    //             ,nbc_focus_original_date = $5
    //             ,nbc_focus_original_methodology = $6
    //         WHERE transID = $1 AND id = $2
    //         `
    //         const res_nbc_focus = await client.query(update_to_nbcfocus,rows)

    //         await client.query('COMMIT')

    //         return res_nbc_focus.rows[0]

    //     });
    // }
    // var vfuncNbcFocusUpdate = funcNbcFocusUpdate()

    // // UPDATE PARTIES
    // let funcPartiesUpdate =  () => {
    //     updated_rec.parties.forEach(async element => {
    //         var rows = [req.params.dealID, element.id, element.parties_role, element.parties_party, element.parties_appointed, element.parties_status];
    //         const update_to_parties = `
    //         UPDATE TB_INFRCR_TRANSACTION_PARTIES
    //         SET parties_role = $3
    //             ,parties_party = $4
    //             ,parties_appointed = $5
    //             ,parties_status = $6
    //         WHERE transID = $1 AND id = $2
    //         `
    //         const res_parties = await client.query(update_to_parties,rows)

    //         await client.query('COMMIT')

    //         return res_parties.rows[0]

    //     });
    // }
    // var vfuncPartiesUpdate = funcPartiesUpdate()

    // // UPDATE PLIs
    // let funcPLIsUpdate =  () => {
    //     updated_rec.plis.forEach(async element => {
    //         var rows = [req.params.dealID, element.id, element.plis_particulars, element.plis_concern, element.plis_weighting, element.plis_expected, element.plis_status];
    //         const update_to_plis = `
    //         UPDATE TB_INFRCR_TRANSACTION_PLIS
    //         SET plis_particulars = $3
    //             ,plis_concern = $4
    //             ,plis_weighting = $5
    //             ,plis_expected = $6
    //             ,plis_status = $7
    //         WHERE transID = $1 AND id = $2
    //         `
    //         const res_plis = await client.query(update_to_plis,rows)

    //         await client.query('COMMIT')

    //         return res_plis.rows[0]

    //     });
    // }
    // var vfuncPLIsUpdate = funcPLIsUpdate()

    // // UPDATE KPIs
    // let funcKPIsUpdate =  () => {
    //     updated_rec.kpi.forEach(async element => {
    //         var rows = [req.params.dealID, element.id, element.kpi_factors, element.kpi_yes_no, element.kpi_concern, element.kpi_expected, element.kpi_resp_party, element.kpi_status];
    //         const update_to_kpi = `
    //         UPDATE TB_INFRCR_TRANSACTION_KPI
    //         SET kpi_factors = $3
    //             ,kpi_yes_no = $4
    //             ,kpi_concern = $5
    //             ,kpi_expected = $6
    //             ,kpi_resp_party = $7
    //             ,kpi_status = $8
    //         WHERE transID = $1 AND id = $2
    //         `
    //         const res_kpi = await client.query(update_to_kpi,rows)

    //         await client.query('COMMIT')

    //         return res_kpi.rows[0]

    //     });
    // }

    // var vffuncKPIsUpdate = funcKPIsUpdate()

    res.json({
      status: (res.statusCode = 200),
      message: "Deal UPDATED Successfully",
      dealInfo: res_.rows[0],
    });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(403).json({ Error: e.stack });
  } finally {
    client.release();
  }
});

// UPDATE NBC FOCUS
router.put(
  "/update/nbcfocus/:dealID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    try {
      const updated_rec = ({ nbcFocus } = req.body);
      const updNBCFocus = [updated_rec];

      // UPDATE NBC FOCUS
      let funcNbcFocusUpdate = () => {
        updNBCFocus.forEach(async (element) => {
          var rows = [
            req.params.dealID,
            element.id,
            element.nbc_focus_original,
            element.nbc_focus_original_yes_no,
            element.nbc_focus_original_date,
            element.nbc_focus_original_methodology,
            element.nbc_focus_apprv_1_b,
            element.nbc_focus_apprv_1_c,
            element.nbc_focus_apprv_2_b,
            element.nbc_focus_apprv_2_c,
            element.nbc_focus_apprv_3_b,
            element.nbc_focus_apprv_3_c,
            element.nbc_focus_apprv_4_b,
            element.nbc_focus_apprv_4_c,
            element.nbc_focus_apprv_5_b,
            element.nbc_focus_apprv_5_c,
          ];

  

          const res_check_rec = await client.query(
            `SELECT * FROM TB_INFRCR_TRANSACTION_NBC_FOCUS WHERE id in ($1)`,
            [rows[1]]
          );

          if (res_check_rec.rows.length <= 0) {
            var insert_rows = [
              req.params.dealID,
              element.nbc_focus_original,
              element.nbc_focus_original_yes_no,
              element.nbc_focus_original_date,
              element.nbc_focus_original_methodology,
              element.nbc_focus_apprv_1_b,
              element.nbc_focus_apprv_1_c,
              element.nbc_focus_apprv_2_b,
              element.nbc_focus_apprv_2_c,
              element.nbc_focus_apprv_3_b,
              element.nbc_focus_apprv_3_c,
              element.nbc_focus_apprv_4_b,
              element.nbc_focus_apprv_4_c,
              element.nbc_focus_apprv_5_b,
              element.nbc_focus_apprv_5_c,
            ];
            const insert_to_nbcfocus = `
                            INSERT INTO TB_INFRCR_TRANSACTION_NBC_FOCUS(transID, nbc_focus_original, nbc_focus_original_yes_no, nbc_focus_original_date, nbc_focus_original_methodology,  nbc_focus_apprv_1_b, nbc_focus_apprv_1_c, nbc_focus_apprv_2_b, nbc_focus_apprv_2_c, nbc_focus_apprv_3_b, nbc_focus_apprv_3_c, 
                              nbc_focus_apprv_4_b, nbc_focus_apprv_4_c, nbc_focus_apprv_5_b, nbc_focus_apprv_5_c) 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                            `;
            const res_ins_nbc_focus = await client.query(
              insert_to_nbcfocus,
              insert_rows
            );

            await client.query("COMMIT");
          } else {
            const update_to_nbcfocus = `
                        UPDATE TB_INFRCR_TRANSACTION_NBC_FOCUS
                        SET nbc_focus_original = coalesce($3, nbc_focus_original)
                            ,nbc_focus_original_yes_no = coalesce($4, nbc_focus_original_yes_no)
                            ,nbc_focus_original_date = coalesce($5, nbc_focus_original_date)
                            ,nbc_focus_original_methodology = coalesce($6, nbc_focus_original_methodology),
                            nbc_focus_apprv_1_b = coalesce($7, nbc_focus_apprv_1_b ),
                            nbc_focus_apprv_1_c = coalesce($8, nbc_focus_apprv_1_c ), 
                            nbc_focus_apprv_2_b = coalesce($9, nbc_focus_apprv_2_b ),
                            nbc_focus_apprv_2_c = coalesce($10, nbc_focus_apprv_2_c), 
                            nbc_focus_apprv_3_b = coalesce($11, nbc_focus_apprv_3_b ), 
                            nbc_focus_apprv_3_c = coalesce($12, nbc_focus_apprv_3_c), 
                            nbc_focus_apprv_4_b = coalesce($13, nbc_focus_apprv_4_b ), 
                            nbc_focus_apprv_4_c = coalesce($14, nbc_focus_apprv_4_c ), 
                            nbc_focus_apprv_5_b = coalesce($15, nbc_focus_apprv_5_b ), 
                            nbc_focus_apprv_5_c = coalesce($16, nbc_focus_apprv_5_c )
                        WHERE transID = $1 AND id = $2
                    `;
            const res_nbc_focus = await client.query(update_to_nbcfocus, rows);

            await client.query("COMMIT");

            return res_nbc_focus.rows[0];
          }
        });
      };
      var vfuncNbcFocusUpdate = funcNbcFocusUpdate();

      res.json({
        status: (res.statusCode = 200),
        message: "Deal UPDATED Successfully",
        // dealInfo: vfuncNbcFocusUpdate,
      });
    } catch (e) {
      await client.query("ROLLBACK");
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

// UPDATE OCPS
router.put(
  "/update/ocps/:dealID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    try {
      const updated_rec = ({ ocps } = req.body);
      const updOCPs = [updated_rec];

      let funcOtherCPsUpdate = () => {
        updOCPs.forEach(async (element) => {
          var rows = [
            req.params.dealID,
            element.id,
            element.ocps_factors,
            element.ocps_yes_no,
            element.ocps_concern,
            element.ocps_expected,
            element.ocps_resp_party,
            element.ocps_status,
          ];

          const res_check_rec = await client.query(
            `SELECT * FROM TB_INFRCR_TRANSACTION_OTHER_CPS WHERE id in ($1)`,
            [rows[1]]
          );

          if (res_check_rec.rows.length <= 0) {
            var insert_ocp_rows = [
              req.params.dealID,
              element.ocps_factors,
              element.ocps_yes_no,
              element.ocps_concern,
              element.ocps_expected,
              element.ocps_resp_party,
              element.ocps_status,
            ];
            const insert_to_ocps = `INSERT INTO TB_INFRCR_TRANSACTION_OTHER_CPS(transID, ocps_factors, ocps_yes_no, ocps_concern, ocps_expected, ocps_resp_party, ocps_status) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

            const res_ins_ocps = await client.query(
              insert_to_ocps,
              insert_ocp_rows
            );

            await client.query("COMMIT");
          } else {
            const update_to_ocps = `
                UPDATE TB_INFRCR_TRANSACTION_OTHER_CPS
                SET ocps_factors = coalesce($3,ocps_factors)
                    ,ocps_yes_no = coalesce($4,ocps_yes_no)
                    ,ocps_concern = coalesce($5,ocps_concern)
                    ,ocps_expected = coalesce($6,ocps_expected)
                    ,ocps_resp_party = coalesce($7,ocps_resp_party)
                    ,ocps_status = coalesce($8,ocps_status)
                WHERE transID = $1 AND id = $2
                `;
            const res_ocps = await client.query(update_to_ocps, rows);

            await client.query("COMMIT");

            return res_ocps.rows[0];
          }
        });
      };
      var vfuncOtherCPsUpdate = funcOtherCPsUpdate();

      res.json({
        status: (res.statusCode = 200),
        message: "Deal UPDATED Successfully",
        dealInfo: vfuncOtherCPsUpdate,
      });
    } catch (e) {
      await client.query("ROLLBACK");
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

// UPDATE PARTIES
router.put(
  "/update/parties/:dealID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    try {
      const updated_rec = ({ parties } = req.body);
      const updParties = [updated_rec];

      let funcPartiesUpdate = () => {
        updParties.forEach(async (element) => {
          var rows = [
            req.params.dealID,
            element.id,
            element.parties_role,
            element.parties_party,
            element.parties_appointed,
            element.parties_status,
          ];

          const res_check_rec = await client.query(
            `SELECT * FROM TB_INFRCR_TRANSACTION_PARTIES WHERE id in ($1)`,
            [rows[1]]
          );
          if (res_check_rec.rows.length <= 0) {
            var insert_rows = [
              req.params.dealID,
              element.parties_role,
              element.parties_party,
              element.parties_appointed,
              element.parties_status,
            ];

            const insert_to_parties = `INSERT INTO TB_INFRCR_TRANSACTION_PARTIES(transID, parties_role, parties_party, parties_appointed, parties_status) VALUES ($1, $2, $3, $4, $5)`;

            const res_ins_parties = await client.query(
              insert_to_parties,
              insert_rows
            );

            await client.query("COMMIT");
          } else {
            const update_to_parties = `
                UPDATE TB_INFRCR_TRANSACTION_PARTIES
                SET parties_role = coalesce($3,parties_role)
                    ,parties_party = coalesce($4,parties_party)
                    ,parties_appointed = coalesce($5,parties_appointed)
                    ,parties_status = coalesce($6,parties_status)
                WHERE transID = $1 AND id = $2
                `;
            const res_parties = await client.query(update_to_parties, rows);

            await client.query("COMMIT");

            return res_parties.rows[0];
          }
        });
      };
      var vfuncPartiesUpdate = funcPartiesUpdate();
      res.json({
        status: (res.statusCode = 200),
        message: "Deal UPDATED Successfully",
        // dealInfo: vfuncPartiesUpdate,
      });
    } catch (e) {
      await client.query("ROLLBACK");
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

// UPDATE PLIs
router.put(
  "/update/plis/:dealID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    try {
      const updated_rec = ({ plis } = req.body);
      const updPLIs = [updated_rec];

      

      /****************************Start: Validation for PLI weights ********************** */

      const geDataWithoutId = await client.query(`SELECT id, plis_weighting FROM TB_INFRCR_TRANSACTION_PLIS WHERE transid = $1 AND id != $2`, [req.params.dealID, updated_rec.id])
      let totalWeight = geDataWithoutId.rows.reduce((v, i) => v + parseFloat(i.plis_weighting), 0)

      if (totalWeight > 100){
        res.json({
          status: (res.statusCode = 404),
          message: "Total weight cannot be greater than 100%",
        })
        return
      }
      
     
      if (parseFloat(updated_rec.plis_weighting) + totalWeight  > 100){
        res.json({
          status: (res.statusCode = 404),
          message: "Total weight cannot be greater than 100%",
        })
        return
      }

      if (updated_rec.plis_weighting === null){
        const geDataWithId = await client.query(`SELECT id, plis_weighting FROM TB_INFRCR_TRANSACTION_PLIS WHERE transid = $1 AND id = $2`, [req.params.dealID, updated_rec.id])
        let totalWeight2 = geDataWithId.rows[0].plis_weighting
  
  
        if (parseFloat(totalWeight2) + totalWeight > 100){
          res.json({
            status: (res.statusCode = 404),
            message: "Total weight cannot be greater than 100%",
          })
          return
        }

      }

     
  
       /****************************END: Validation for PLI weights ********************** */


      let funcPLIsUpdate = () => {
        updPLIs.forEach(async (element) => {
          var rows = [
            req.params.dealID,
            element.id,
            element.plis_particulars,
            element.plis_concern,
            element.plis_weighting,
            element.plis_expected,
            element.plis_status,
          ];
          const res_check_rec = await client.query(
            `SELECT * FROM TB_INFRCR_TRANSACTION_PLIS WHERE id in ($1)`,
            [rows[1]]
          );

          if (res_check_rec.rows.length <= 0) {
            var insert_rows = [
              req.params.dealID,
              element.plis_particulars,
              element.plis_concern,
              element.plis_weighting,
              element.plis_expected,
              element.plis_status,
            ];

            const insert_to_plis = `INSERT INTO TB_INFRCR_TRANSACTION_PLIS(transID, plis_particulars, plis_concern, plis_weighting, plis_expected, plis_status) VALUES ($1, $2, $3, $4, $5, $6)`;
            const res_ins_plis = await client.query(
              insert_to_plis,
              insert_rows
            );
            await client.query("COMMIT");
          } else {
            const update_to_plis = `
                    UPDATE TB_INFRCR_TRANSACTION_PLIS
                    SET plis_particulars = coalesce($3,plis_particulars)
                        ,plis_concern = coalesce($4,plis_concern)
                        ,plis_weighting = coalesce($5,plis_weighting)
                        ,plis_expected = coalesce($6,plis_expected)
                        ,plis_status = coalesce($7,plis_status)
                    WHERE transID = $1 AND id = $2
                    `;
            const res_plis = await client.query(update_to_plis, rows);

            await client.query("COMMIT");

            return res_plis.rows[0];
          }
        });
      };
      var vfuncPLIsUpdate = funcPLIsUpdate();

      

      res.json({
        status: (res.statusCode = 200),
        message: "Deal UPDATED Successfully",
        dealInfo: vfuncPLIsUpdate,
      });
    } catch (e) {
      await client.query("ROLLBACK");
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

// UPDATE KPIs
router.put(
  "/update/kpis/:dealID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    try {
      const updated_rec = ({ kpi } = req.body);
      const updKPI = [updated_rec];

      let funcKPIsUpdate = () => {
        updKPI.forEach(async (element) => {
          var rows = [
            req.params.dealID,
            element.id,
            element.kpi_factors,
            element.kpi_yes_no,
            element.kpi_concern,
            element.kpi_expected,
            element.kpi_resp_party,
            element.kpi_status,
          ];
          const res_check_rec = await client.query(
            `SELECT * FROM TB_INFRCR_TRANSACTION_KPI WHERE id in ($1)`,
            [rows[1]]
          );
          if (res_check_rec.rows.length <= 0) {
            var insert_rows = [
              req.params.dealID,
              element.kpi_factors,
              element.kpi_yes_no,
              element.kpi_concern,
              element.kpi_expected,
              element.kpi_resp_party,
              element.kpi_status,
            ];

            const insert_to_kpis = `INSERT INTO TB_INFRCR_TRANSACTION_KPI(transID, kpi_factors, kpi_yes_no, kpi_concern, kpi_expected, kpi_resp_party, kpi_status) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            const res_ins_kpis = await client.query(
              insert_to_kpis,
              insert_rows
            );
            await client.query("COMMIT");
          } else {
            const update_to_kpi = `
                    UPDATE TB_INFRCR_TRANSACTION_KPI
                    SET kpi_factors = coalesce($3,kpi_factors)
                        ,kpi_yes_no = coalesce($4,kpi_yes_no)
                        ,kpi_concern = coalesce($5,kpi_concern)
                        ,kpi_expected = coalesce($6,kpi_expected)
                        ,kpi_resp_party = coalesce($7,kpi_resp_party)
                        ,kpi_status = coalesce($8,kpi_status)
                    WHERE transID = $1 AND id = $2
                    `;
            const res_kpi = await client.query(update_to_kpi, rows);

            await client.query("COMMIT");

            return res_kpi.rows[0];
          }
        });
      };

      var vffuncKPIsUpdate = funcKPIsUpdate();

      res.json({
        status: (res.statusCode = 200),
        message: "Deal UPDATED Successfully",
        dealInfo: vffuncKPIsUpdate,
      });
    } catch (e) {
      await client.query("ROLLBACK");
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

// // DELETE Daniel Feature
router.delete("/delete/:dealID", async (req, res) => {
  const client = await pool.connect();
  try {
    var rows = [req.params.dealID, req.body["id"], req.body["tableID"]];

    var targetTable = "";

    if (rows[2] === "nbcFocus") {
      targetTable = "TB_INFRCR_TRANSACTION_NBC_FOCUS";
    } else if (rows[2] === "parties") {
      targetTable = "TB_INFRCR_TRANSACTION_PARTIES";
    } else if (rows[2] === "plis") {
      targetTable = "TB_INFRCR_TRANSACTION_PLIS";
    } else if (rows[2] === "ocps") {
      targetTable = "TB_INFRCR_TRANSACTION_OTHER_CPS";
    } else if (rows[2] === "kpi") {
      targetTable = "TB_INFRCR_TRANSACTION_KPI";
    }

    const res_check_rec = await client.query(
      `SELECT * FROM ` + targetTable + ` WHERE id in ($1)`,
      [rows[1]]
    );

    if (res_check_rec.rows.length > 0) {
      const insert_to_parties =
        `DELETE FROM ` + targetTable + ` WHERE transID = $1 AND id = $2`;
      const del_cols = [rows[0], rows[1]];
      const res_ins_parties = await client.query(insert_to_parties, del_cols);
      await client.query("COMMIT");

      res.json({
        status: (res.statusCode = 200),
        message: "Record Deleted Successfully",
      });
    } else {
      res.json({
        status: (res.statusCode = 404),
        message: "Record Not Found",
      });
    }
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(403).json({ Error: e.stack });
  } finally {
    client.release();
  }
});

// Top N Reimbursible Stats
router.get(
  "/reimbursible/:topn/:start_date/:end_date",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    try {
      // query transaction table
      const start_date = req.params.start_date;
      const end_date = req.params.end_date;
      const top_n = req.params.topn;

      const ccsubmission_data = await client.query(
        `
        SELECT clientname, originator, transactor, dealsize, reimbursible
        FROM TB_INFRCR_TRANSACTION 
        WHERE DATE_PART('year', createdate) BETWEEN COALESCE(DATE_PART('year', TO_DATE($1,'YYY-MM-DD')),DATE_PART('year', CURRENT_DATE)) and COALESCE(DATE_PART('year', TO_DATE($2,'YYY-MM-DD')),DATE_PART('year', CURRENT_DATE))
        --(SELECT COALESCE(DATE_PART('year', fy_start_date), DATE_PART('year', CURRENT_DATE)) FROM TB_INFRCR_FINANCIAL_YEAR WHERE fy_status = 'Active')
        ORDER BY reimbursible DESC
        LIMIT $3
        `,
        [start_date, end_date, top_n]
      );

      res.status(200).send({
        status: (res.statusCode = 200),
        ccsubmissionReport: ccsubmission_data.rows,
      });
    } catch (e) {
      res.status(403).json({ Error: e.stack });
    } finally {
      client.release();
    }
  }
);

// Actual Guarantee: for only closed deals within the current FY
router.get(
  "/guarantee/actual/:financial_year",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const client = await pool.connect();
    const financial_year = req.params.financial_year;
    const fin_year = fy_validator(financial_year.slice(-4));

    let final_year_slice = "";

    if (fin_year) {
      final_year_slice = financial_year.slice(-4);
    } else {
      res.status(404).send({
        status: (res.statusCode = 404),
        message: "Invalid Financial Year",
      });
      return;
    }

    try {
      if (final_year_slice !== "") {
        const actual_guarantee = await client.query(
          `
        SELECT 	SUM(guaranteefee) GuaranteeActualValue
        FROM TB_INFRCR_TRANSACTION_AUDIT
        WHERE date_part('year', stamp) = $1
        AND operation = 'U'
        AND closed = true
        `,
          [final_year_slice]
        );

        res.status(200).send({
          status: (res.statusCode = 200),
          actualGuarantee: actual_guarantee.rows,
        });
      } else {
        const actual_guarantee = await client.query(`
          SELECT 	SUM(guaranteefee) GuaranteeActualValue
          FROM TB_INFRCR_TRANSACTION_AUDIT
          WHERE date_part('year', stamp) = (SELECT date_part('year', fy_start_date) FROM TB_INFRCR_FINANCIAL_YEAR WHERE fy_status = 'Active')
          AND operation = 'U'
          AND closed = true
          `);

        res.status(200).send({
          status: (res.statusCode = 200),
          actualGuarantee: actual_guarantee.rows,
        });
      }
    } catch (e) {
      res.status(403).json({ Error: e.message });
    } finally {
      client.release();
    }
  }
);


// DELETE Transaction

router.delete("/delete/deal/:transid", verifyTokenAndAdmin, async (req, res) => {
  const client = await pool.connect();
  // const userId = req.params.id;
  const clientPassword  = req.body.password;
  const transID = req.params.transid;
  const userID = req.user.ID

  try {
  
    const user = await client.query(
      "SELECT * FROM TB_TRS_USERS WHERE userId = $1",
      [userID]
    );
    
    if (user && user.rows[0]["status"] === "Active") {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.rows[0]["password"],
        process.env.PASSWORD_SECRET_PASSPHRASE
      );
      const password = hashedPassword.toString(CryptoJS.enc.Utf8);

      // Confirm that the client and database passwords match
      if (clientPassword === password) {
             // Delete rows from all tables using a CTE: This will delete Transactions from all tables associated with the trans id
             const deleteTransaction = `
             WITH deleted_rows AS (
               DELETE FROM TB_INFRCR_TRANSACTION WHERE transID = $1 RETURNING transID
             ), 
             deleted_rows_other_cps AS (
               DELETE FROM TB_INFRCR_TRANSACTION_OTHER_CPS WHERE transID IN (SELECT transID FROM deleted_rows) RETURNING transID
             ),
             deleted_rows_nbc_focus AS (
               DELETE FROM TB_INFRCR_TRANSACTION_NBC_FOCUS WHERE transID IN (SELECT transID FROM deleted_rows) RETURNING transID
             ),
             deleted_rows_parties AS (
               DELETE FROM TB_INFRCR_TRANSACTION_PARTIES WHERE transID IN (SELECT transID FROM deleted_rows) RETURNING transID
             ),
             deleted_rows_plis AS (
               DELETE FROM TB_INFRCR_TRANSACTION_PLIS WHERE transID IN (SELECT transID FROM deleted_rows) RETURNING transID
             ),
             deleted_rows_kpi AS (
               DELETE FROM TB_INFRCR_TRANSACTION_KPI WHERE transID IN (SELECT transID FROM deleted_rows) RETURNING transID
             )
             SELECT * FROM deleted_rows;
           `;
        const deleteResult = await client.query(deleteTransaction, [transID]);
        await client.query('COMMIT'); // commit transaction

        if (deleteResult.rows.length > 0){
           res.json({
           status: (res.statusCode = 200),
           message: "Transaction deleted Successfully",
         });
       } else {
         res.json({
           status: (res.statusCode = 404),
           message: "Unable to delete transaction",
         })
       };

      } else {
        // res.status(403).json({ Error: "Wrong Password" });
        res.json({
          status: (res.statusCode = 404),
          message: "Wrong Password",
        })
      }
    }
 
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(403).json({ Error: e.stack });
  } finally {
    client.release();
  }
});


module.exports = router;
