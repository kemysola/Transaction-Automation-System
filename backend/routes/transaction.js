const router = require("express").Router();
const pool = require("../database");
var format = require('pg-format');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware");
const { status } = require("express/lib/response");

// This method computes the Structuring Fee Final value 
const structuringFeeFinalCompute = (structuringFeeAmount, structuringFeeAdvance) => {
    const finalPercent = (structuringFeeAmount / structuringFeeAdvance) * 100;
    return parseFloat(finalPercent);
};

// 20222-02-03: A function to compute the category of the deal at creation and subsequent updates
const funcDealCategory = (greenA, greenB, greenC, greenD, greenE, greenF, amberA, amberB, amberC, amberD, amberE, product) => {

    if (greenA == true && greenB == true && greenC == true && greenD == true && greenE == true && greenF == true && product !== 'CRG') {
        return 'Green'
    } else if (amberA == true && amberB == true && amberC == true && amberD == true && amberE == true && product !== 'CRG') {
        return 'Yellow'
    } else {
        return 'Red'
    }
}

// convert notes field in all transactions to List Items 2022:Feb:05
function convertNotesFiledsToList(el) {
    el['notes'] = el['notes'].split('|')
}

// New Transaction Registration Endpoint[This registration should be done by a all active or admin users authorized based on the role-matrix]
router.post("/createdeal", verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect()

    try {
        // Destrucuring the request body to grab required fields
        const new_transaction = {
            clientName, originator, transactor, transactionLegalLead, industry, product, region, dealSize, coupon, tenor, moratorium, repaymentFrequency, amortizationStyle,
            mandateLetter, creditApproval, feeLetter, expectedClose, actualClose, NBC_approval_date, NBC_submitted_date, greenA, greenB, greenC, greenD, greenE, greenF, amberA, amberB, amberC,
            amberD, amberE, redA, redB, redC, redD, redE, structuringFeeAmount, structuringFeeAdvance, structuringFeeFinal, guaranteeFee, notes, closed, monitoringFee, reimbursible,
            nbcFocus,  parties, plis,
            ocps,
            kpi
            
        } = req.body;

        const transaction_data = [new_transaction.clientName, new_transaction.originator, new_transaction.transactor,
        new_transaction.industry, new_transaction.product, new_transaction.region,
        new_transaction.dealSize, new_transaction.coupon, new_transaction.tenor,
        new_transaction.moratorium, new_transaction.repaymentFrequency, new_transaction.amortizationStyle,
        new_transaction.mandateLetter, new_transaction.creditApproval, new_transaction.feeLetter,
        new_transaction.expectedClose, new_transaction.actualClose, new_transaction.NBC_approval_date, new_transaction.NBC_submitted_date, new_transaction.greenA,
        new_transaction.greenB, new_transaction.greenC, new_transaction.greenD,
        new_transaction.greenE, new_transaction.greenF, new_transaction.amberA,
        new_transaction.amberB, new_transaction.amberC, new_transaction.amberD,
        new_transaction.amberE, new_transaction.redA, new_transaction.redB,
        new_transaction.redC, new_transaction.redD, new_transaction.redE,
        new_transaction.structuringFeeAmount, new_transaction.structuringFeeAdvance,
        new_transaction.structuringFeeFinal, new_transaction.guaranteeFee, funcDealCategory(new_transaction.greenA,
            new_transaction.greenB, new_transaction.greenC, new_transaction.greenD,
            new_transaction.greenE, new_transaction.greenF, new_transaction.amberA,
            new_transaction.amberB, new_transaction.amberC, new_transaction.amberD,
            new_transaction.amberE, new_transaction.product), req.user.Email, new_transaction.transactionLegalLead,
        new_transaction.notes, new_transaction.closed, new_transaction.monitoringFee, new_transaction.reimbursible
        ]

        // 
        await client.query('BEGIN')

        const write_to_db =
            `INSERT INTO TB_INFRCR_TRANSACTION(
                    clientName, originator, transactor, industry, product,region,
                    dealSize, coupon, tenor, moratorium, repaymentFrequency, amortizationStyle,
                    mandateLetter, creditApproval, feeLetter, expectedClose, actualClose,  NBC_approval_date, NBC_submitted_date,
                    greenA, greenB, greenC, greenD, greenE, greenF, amberA,  amberB, amberC, 
                    amberD, amberE, redA, redB, redC, redD, redE, structuringFeeAmount,structuringFeeAdvance,
                    structuringFeeFinal, guaranteeFee, deal_category, record_entry, transactionLegalLead, notes, closed, monitoringFee, reimbursible
                  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38, $39, $40, $41, $42, $43, $44, $45, $46)   
        ON CONFLICT(clientName,originator,transactor,transactionLegalLead,industry, product,region,dealSize,tenor,moratorium,repaymentFrequency,amortizationStyle,mandateLetter,creditApproval,feeLetter,expectedClose,actualClose) DO NOTHING
        RETURNING *`

        const res_ = await client.query(write_to_db, transaction_data)

        await client.query('COMMIT')
        // convert notes field to list
        if (res_.rows.length !== 0) {
            res_.rows[0]['notes'] = res_.rows[0]['notes'].split('|')
        
        // NBC FOCUS 
        
        let funcNbcFocus =  (transID) => {
            new_transaction.nbcFocus.forEach(async element => {
                var rows = [transID, element.nbc_focus_original, element.nbc_focus_original_yes_no, element.nbc_focus_original_date, element.nbc_focus_original_methodology,
                            element.nbc_focus_apprv_1_b, element.nbc_focus_apprv_1_c, element.nbc_focus_apprv_2_b, element.nbc_focus_apprv_2_c, element.nbc_focus_apprv_3_b, 
                            element.nbc_focus_apprv_3_c, element.nbc_focus_apprv_4_b, element.nbc_focus_apprv_4_c, element.nbc_focus_apprv_5_b, element.nbc_focus_apprv_5_c];
                const write_to_nbc_focus = `
                INSERT INTO TB_INFRCR_TRANSACTION_NBC_FOCUS(
                transID, nbc_focus_original, nbc_focus_original_yes_no, nbc_focus_original_date, nbc_focus_original_methodology,
                nbc_focus_apprv_1_b, nbc_focus_apprv_1_c, nbc_focus_apprv_2_b, nbc_focus_apprv_2_c, nbc_focus_apprv_3_b, nbc_focus_apprv_3_c, 
                nbc_focus_apprv_4_b, nbc_focus_apprv_4_c, nbc_focus_apprv_5_b, nbc_focus_apprv_5_c
                ) VALUES %L RETURNING *`

                const res_nbc_focus = await client.query(format(write_to_nbc_focus,[rows]))

                await client.query('COMMIT')
                return res_nbc_focus.rows[0]
            });
        }
        var vfuncNbcFocus = funcNbcFocus(res_.rows[0]["transid"])

         // PARTIES
         let funcParties =  (transID) => {
            new_transaction.parties.forEach(async element => {
                var rows = [transID, element.parties_role, element.parties_party, element.parties_appointed, element.parties_status];
                const write_to_parties = `INSERT INTO TB_INFRCR_TRANSACTION_PARTIES(transID, parties_role, parties_party, parties_appointed, parties_status) VALUES %L RETURNING *`

                const res_parties = await client.query(format(write_to_parties,[rows]))

                await client.query('COMMIT')
                return res_parties.rows[0]
 
            });
        }
        var vfuncParties = funcParties(res_.rows[0]["transid"])
        
        // PLIS
        let funcPLIS =  (transID) => {
            new_transaction.plis.forEach(async element => {
                var rows = [transID, element.plis_particulars, element.plis_concern, element.plis_weighting, element.plis_expected, element.plis_status];
                const write_to_plis = `INSERT INTO TB_INFRCR_TRANSACTION_PLIS(transID, plis_particulars, plis_concern, plis_weighting, plis_expected, plis_status) VALUES %L RETURNING *`

                const res_plis = await client.query(format(write_to_plis,[rows]))

                await client.query('COMMIT')
                return res_plis.rows[0]
 
            });
        }
        var vfuncPLIS = funcPLIS(res_.rows[0]["transid"])
       
        // OTHER CPS 
        let funcOtherCPs =  (transID) => {
            new_transaction.ocps.forEach(async element => {
                var rows = [transID, element.ocps_factors, element.ocps_yes_no, element.ocps_concern, element.ocps_expected, element.ocps_resp_party, element.ocps_status];
                const write_to_ocps = `INSERT INTO TB_INFRCR_TRANSACTION_OTHER_CPS(transID, ocps_factors, ocps_yes_no, ocps_concern, ocps_expected, ocps_resp_party, ocps_status) VALUES %L RETURNING *`

                const res_ocps = await client.query(format(write_to_ocps,[rows]))

                await client.query('COMMIT')

                return res_ocps.rows[0]
 
            });
        }
        var vfuncOtherCPs = funcOtherCPs(res_.rows[0]["transid"])

         // KPI
         let funcKPI =  (transID) => {
            new_transaction.kpi.forEach(async element => {
                var rows = [transID, element.kpi_factors, element.kpi_yes_no, element.kpi_concern, element.kpi_expected, element.kpi_resp_party, element.kpi_status];
                const write_to_kpi = `
                INSERT INTO TB_INFRCR_TRANSACTION_KPI(transID, kpi_factors, kpi_yes_no, kpi_concern, kpi_expected, kpi_resp_party, kpi_status) VALUES %L RETURNING *`

                const res_kpi = await client.query(format(write_to_kpi,[rows]))

                await client.query('COMMIT')
                return res_kpi.rows[0]
 
            });
        }
        var vfuncKPI = funcKPI(res_.rows[0]["transid"])

        // let transCreateResp = Object.assign(res_.rows[0], vfuncOtherCPs, vfuncNbcFocus, vfuncParties, vfuncPLIS, vfuncKPI);
        const trans_id = [res_.rows[0]["transid"]]
        const sqlReq = `SELECT 
                            a.* ,
                            B.ID as ocps_ID, b.ocps_factors, b.ocps_yes_no, b.ocps_concern, b.ocps_expected, b.ocps_resp_party, b.ocps_status,
                            c.ID as nbc_focus_ID, c.nbc_focus_original, c.nbc_focus_original_yes_no, c.nbc_focus_original_date, c.nbc_focus_original_methodology, c.nbc_focus_apprv_1_c, c.nbc_focus_apprv_2_b, c.nbc_focus_apprv_2_c, c.nbc_focus_apprv_3_b, c.nbc_focus_apprv_3_c,
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
                        `
        const sqlResp = await client.query(sqlReq, trans_id)                        

        res.json({
          status: (res.statusCode = 200),
          message: "New Deal Created Successfully",
          dealInfo:  sqlResp.rows,
        });
    }else{
        res.json({
            status: (res.statusCode = 400),
            message: "New Deal Creation Failed - Duplicate Transaction Registration, Please confirm the exact transaction doesn't already exist in the system"
          });
    }
    } catch (e) {
        await client.query('ROLLBACK')
        res.status(403).json({ ErrorStatus: e.status, Error: e.stack });

    } finally {
        client.release()
    }
});

/*Fetch Deal by ID - priviledged users*/
router.get('/item/:deal',verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        const deal_record_id = req.params.deal;
        const deal = await client.query(
            `SELECT a.* ,
            

            b.id as ocid,b.ocps_factors, b.ocps_yes_no, b.ocps_concern, b.ocps_expected, b.ocps_resp_party, b.ocps_status,

            c.id as nbcid,c.nbc_focus_original, c.nbc_focus_original_yes_no, c.nbc_focus_original_date, c.nbc_focus_original_methodology, c.nbc_focus_apprv_1_c, c.nbc_focus_apprv_2_b, c.nbc_focus_apprv_2_c, c.nbc_focus_apprv_3_b, c.nbc_focus_apprv_3_c,
            c.nbc_focus_apprv_4_b, c.nbc_focus_apprv_4_c, c.nbc_focus_apprv_5_b, c.nbc_focus_apprv_5_c,
            
            d.id as pid,d.parties_role, d.parties_party, d.parties_appointed, d.parties_status,
           
            e.id as plid,e.plis_particulars, e.plis_concern, e.plis_weighting, e.plis_expected, e.plis_status,

            f.id as kid,f.kpi_factors, f.kpi_yes_no, f.kpi_concern, f.kpi_expected, f.kpi_resp_party, f.kpi_status 

            FROM TB_INFRCR_TRANSACTION a
            LEFT JOIN TB_INFRCR_TRANSACTION_OTHER_CPS b ON b.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_NBC_FOCUS c ON c.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PARTIES d ON d.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PLIS e ON e.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_KPI f ON f.transID = a.transID WHERE a.transID = $1`, [deal_record_id]);
        if (deal) { 
            res.deal_info = deal

            // convert notes field to list
            myArray = deal.rows
            myNotes = myArray.forEach(convertNotesFiledsToList)

            res.status(200).send({
                status: (res.statusCode = 200),
                dealInfo: deal.rows
            })
        }

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});

/*Fetch Deal for curent user */
router.get('/my_deals', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        // const deal_record_id = req.params.deal;
        const current_user = req.user

        const my_deals = await client.query(
            // `SELECT a.* ,

            // b.ocps_factors, b.ocps_yes_no, b.ocps_concern, b.ocps_expected, b.ocps_resp_party, b.ocps_status,

            // c.nbc_focus_original, c.nbc_focus_original_yes_no, c.nbc_focus_original_date, c.nbc_focus_original_methodology, c.nbc_focus_apprv_1_c, c.nbc_focus_apprv_2_b, c.nbc_focus_apprv_2_c, c.nbc_focus_apprv_3_b, c.nbc_focus_apprv_3_c,
            // c.nbc_focus_apprv_4_b, c.nbc_focus_apprv_4_c, c.nbc_focus_apprv_5_b, c.nbc_focus_apprv_5_c,
            
            // d.parties_role, d.parties_party, d.parties_appointed, d.parties_status,
           
            // e.plis_particulars, e.plis_concern, e.plis_weighting, e.plis_expected, e.plis_status,

            // f.kpi_factors, f.kpi_yes_no, f.kpi_concern, f.kpi_expected, f.kpi_resp_party, f.kpi_status 
        
            // FROM TB_INFRCR_TRANSACTION a
            // LEFT JOIN TB_INFRCR_TRANSACTION_OTHER_CPS b ON b.transID = a.transID
            // LEFT JOIN TB_INFRCR_TRANSACTION_NBC_FOCUS c ON c.transID = a.transID
            // LEFT JOIN TB_INFRCR_TRANSACTION_PARTIES d ON d.transID = a.transID
            // LEFT JOIN TB_INFRCR_TRANSACTION_PLIS e ON e.transID = a.transID
            // LEFT JOIN TB_INFRCR_TRANSACTION_KPI f ON f.transID = a.transID
            // WHERE a.originator = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            // OR a.transactor = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            // `
            `SELECT a.*
        
            FROM TB_INFRCR_TRANSACTION a
            WHERE a.originator = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            OR a.transactor = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            `
            ,
            [current_user.Email]);
        if (my_deals) { 
            // convert notes field to list
            myArray = my_deals.rows
            myNotes = myArray.forEach(convertNotesFiledsToList)

            res.status(200).send({
                status: (res.statusCode = 200),
                deals: my_deals.rows
            })
        }

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});


router.get('/get_staff_deals/:email', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        // const deal_record_id = req.params.deal;
        const staff_email = req.params.email

        const my_deals = await client.query(
            `SELECT 
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
            `,
            [staff_email]);
        if (my_deals) { 
            // convert notes field to list
            myArray = my_deals.rows
            myNotes = myArray.forEach(convertNotesFiledsToList)

            res.status(200).send({
                status: (res.statusCode = 200),
                deals: my_deals.rows
            })
        }

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});

/*Fetch all Deals(Priviledged Users only) */
router.get('/all_deals', verifyTokenAndAdmin, async (req, res) => {
    const client = await pool.connect();

    try {
        const all_deals = await client.query(
            `SELECT 
                a.* 
            FROM TB_INFRCR_TRANSACTION a
            WHERE closed = false
            `
            );

        if (all_deals) { 

            myArray = all_deals.rows
            myNotes = myArray.forEach(convertNotesFiledsToList)

            res.status(200).send({
                status: (res.statusCode = 200),
                deals: all_deals.rows
            })
        }

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

/*Fetch all Deals(Priviledged Users only) */
router.get('/all_deals/portfolio', verifyTokenAndAdmin, async (req, res) => {
    const client = await pool.connect();

    try {
        const all_deals = await client.query(
            `SELECT 
                a.* 
            FROM TB_INFRCR_TRANSACTION a
            `
            );

        if (all_deals) { 

            myArray = all_deals.rows
            myNotes = myArray.forEach(convertNotesFiledsToList)

            res.status(200).send({
                status: (res.statusCode = 200),
                deals: all_deals.rows
            })
        }

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

//**************************************** Download endpoint for origination dashboard */

// create an endpoint to download deals by indidvidual staff on the origination dashboard
router.get('/download_all_deals', verifyTokenAndAdmin, async (req, res) => {
    const client = await pool.connect();

    try {
        const all_deals = await client.query(
            `SELECT createdate,transid,clientname,originator, transactor,transactionlegallead,industry,product, region,dealsize,tenor,repaymentfrequency,mandateletter, creditapproval,expectedclose, actualclose,guaranteefee,closed,deal_category,notes,nbc_approval_date, nbc_submitted_date FROM TB_INFRCR_TRANSACTION
            `);

        if (all_deals) { 

            myArray = all_deals.rows
            myNotes = myArray.forEach(convertNotesFiledsToList)

            res.status(200).send({
                status: (res.statusCode = 200),
                deals: all_deals.rows
            })
        }

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});

//******************************************** Download Staff deals by selected columns */
router.get('/download_staff_deals/:email', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        // const deal_record_id = req.params.deal;
        const staff_email = req.params.email

        const my_deals = await client.query(
            `SELECT createdate,transid,clientname,originator, transactor,transactionlegallead,industry,product, region,dealsize,tenor,repaymentfrequency,mandateletter, creditapproval,expectedclose, actualclose,guaranteefee,closed,deal_category,notes,nbc_approval_date, nbc_submitted_date
            FROM TB_INFRCR_TRANSACTION
            WHERE originator = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            `,
            [staff_email]);
        if (my_deals) { 
            // convert notes field to list
            myArray = my_deals.rows
            myNotes = myArray.forEach(convertNotesFiledsToList)

            res.status(200).send({
                status: (res.statusCode = 200),
                deals: my_deals.rows
            })
        }

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});

/*
        Deal Record Modification[only deal owner(originator or Transactor can modify deal)]
    get the owner of deal when retrieving deals from transaction, check the owner is active or an admin
    select deal where deal id === supplied deal id and originator or transactor is current user
*/

router.put('/update/:dealID', verifyTokenAndAuthorization, async (req, res) => {

    const client = await pool.connect();
    try {
        const updated_rec = { clientName, originator, transactor, industry, product,region, dealSize, coupon, tenor, moratorium, repaymentFrequency, amortizationStyle,
            mandateLetter, creditApproval, feeLetter, expectedClose, actualClose, NBC_approval_date, NBC_submitted_date, greenA, greenB, greenC, greenD, greenE, greenF, amberA,  amberB, amberC, 
            amberD, amberE, redA, redB, redC, redD, redE, structuringFeeAmount,structuringFeeAdvance,  structuringFeeFinal, guaranteeFee, transactionLegalLead, notes, closed, monitoringFee, reimbursible,

            nbcFocus,parties, plis, ocps, kpi

        } = req.body;

        const updated = [ updated_rec.clientName, updated_rec.originator, updated_rec.transactor,  updated_rec.industry, updated_rec.product, updated_rec.region,    updated_rec.dealSize, updated_rec.coupon, updated_rec.tenor,
                            updated_rec.moratorium, updated_rec.repaymentFrequency, updated_rec.amortizationStyle, updated_rec.mandateLetter, updated_rec.creditApproval, updated_rec.feeLetter,
                            updated_rec.expectedClose, updated_rec.actualClose, updated_rec.greenA, updated_rec.greenB, updated_rec.greenC, updated_rec.greenD, updated_rec.greenE, updated_rec.greenF, updated_rec.amberA, 
                            updated_rec.amberB, updated_rec.amberC, updated_rec.amberD, updated_rec.amberE, updated_rec.redA, updated_rec.redB, updated_rec.redC, updated_rec.redD, updated_rec.redE, 
                            updated_rec.structuringFeeAmount, updated_rec.structuringFeeAdvance, updated_rec.structuringFeeFinal, req.params.dealID, req.user.Email,  funcDealCategory(updated_rec.greenA, updated_rec.greenB, updated_rec.greenC, updated_rec.greenD,
                            updated_rec.greenE, updated_rec.greenF, updated_rec.amberA, updated_rec.amberB, updated_rec.amberC, updated_rec.amberD, updated_rec.amberE, updated_rec.product), updated_rec.transactionLegalLead, 
                            updated_rec.notes, updated_rec.closed, updated_rec.guaranteeFee, updated_rec.NBC_approval_date, updated_rec.NBC_submitted_date, updated_rec.monitoringFee, updated_rec.reimbursible
                        ]
        await client.query('BEGIN')

        const update_db = 
        `UPDATE TB_INFRCR_TRANSACTION
         SET clientName = $1, originator = $2, transactor = $3, industry = $4, product = $5,region = $6,
            dealSize = $7, coupon = $8, tenor = $9, moratorium = $10, repaymentFrequency = $11, amortizationStyle = $12,
            mandateLetter = $13, creditApproval = $14 , feeLetter = $15, expectedClose = $16, actualClose = $17 ,
            greenA = $18, greenB = $19, greenC = $20, greenD = $21, greenE = $22, greenF = $23, amberA = $24,  amberB = $25, amberC = $26, 
            amberD = $27, amberE = $28, redA = $29, redB = $30, redC = $31, redD = $32 , redE = $33, structuringFeeAmount = $34,
            structuringFeeAdvance = $35,  structuringFeeFinal = $36, record_entry = $38, deal_category = $39, transactionLegalLead = $40, notes = $41, 
            closed = $42, guaranteeFee = $43, nbc_approval_date = $44, nbc_submitted_date = $45, monitoringFee = $46, reimbursible = $47
            WHERE transID = $37
        RETURNING *`
        const res_ = await client.query(update_db, updated) 

         // convert notes field to list
        res_.rows[0]['notes'] = res_.rows[0]['notes'].split('|')

        // UPDATE OCPS

        let funcOtherCPsUpdate =  () => {
            updated_rec.ocps.forEach(async element => {
                var rows = [req.params.dealID, element.id, element.ocps_factors, element.ocps_yes_no, element.ocps_concern, element.ocps_expected, element.ocps_resp_party, element.ocps_status];
                const update_to_ocps = `
                UPDATE TB_INFRCR_TRANSACTION_OTHER_CPS
                SET ocps_factors = $3
                    ,ocps_yes_no = $4
                    ,ocps_concern = $5
                    ,ocps_expected = $6
                    ,ocps_resp_party = $7
                    ,ocps_status = $8
                WHERE transID = $1 AND id = $2
                `
                const res_ocps = await client.query(update_to_ocps,rows)

                await client.query('COMMIT')

                return res_ocps.rows[0]
 
            });
        }
        var vfuncOtherCPsUpdate = funcOtherCPsUpdate()
        
        // UPDATE NBC FOCUS
        let funcNbcFocusUpdate =  () => {
            updated_rec.nbcFocus.forEach(async element => {
                var rows = [req.params.dealID, element.id, element.nbc_focus_original, element.nbc_focus_original_yes_no, element.nbc_focus_original_date, element.nbc_focus_original_methodology];
                const update_to_nbcfocus = `
                UPDATE TB_INFRCR_TRANSACTION_NBC_FOCUS
                SET nbc_focus_original = $3
                    ,nbc_focus_original_yes_no = $4
                    ,nbc_focus_original_date = $5
                    ,nbc_focus_original_methodology = $6
                WHERE transID = $1 AND id = $2
                `
                const res_nbc_focus = await client.query(update_to_nbcfocus,rows)

                await client.query('COMMIT')

                return res_nbc_focus.rows[0]
                
 
            });
        }
        var vfuncNbcFocusUpdate = funcNbcFocusUpdate()

        // UPDATE PARTIES
        let funcPartiesUpdate =  () => {
            updated_rec.parties.forEach(async element => {
                var rows = [req.params.dealID, element.id, element.parties_role, element.parties_party, element.parties_appointed, element.parties_status];
                const update_to_parties = `
                UPDATE TB_INFRCR_TRANSACTION_PARTIES
                SET parties_role = $3
                    ,parties_party = $4
                    ,parties_appointed = $5
                    ,parties_status = $6
                WHERE transID = $1 AND id = $2
                `
                const res_parties = await client.query(update_to_parties,rows)

                await client.query('COMMIT')

                return res_parties.rows[0]
 
            });
        }
        var vfuncPartiesUpdate = funcPartiesUpdate()

    // UPDATE PLIs
    let funcPLIsUpdate =  () => {
        updated_rec.plis.forEach(async element => {
            var rows = [req.params.dealID, element.id, element.plis_particulars, element.plis_concern, element.plis_weighting, element.plis_expected, element.plis_status];
            const update_to_plis = `
            UPDATE TB_INFRCR_TRANSACTION_PLIS
            SET plis_particulars = $3
                ,plis_concern = $4
                ,plis_weighting = $5
                ,plis_expected = $6
                ,plis_status = $7
            WHERE transID = $1 AND id = $2
            `
            const res_plis = await client.query(update_to_plis,rows)

            await client.query('COMMIT')


            return res_plis.rows[0]

        });
    }

    // UPDATE KPIs
    let funcKPIsUpdate =  () => {
        updated_rec.kpi.forEach(async element => {
            var rows = [req.params.dealID, element.id, element.kpi_factors, element.kpi_yes_no, element.kpi_concern, element.kpi_expected, element.kpi_resp_party, element.kpi_status];
            const update_to_kpi = `
            UPDATE TB_INFRCR_TRANSACTION_KPI
            SET kpi_factors = $3
                ,kpi_yes_no = $4
                ,kpi_concern = $5
                ,kpi_expected = $6
                ,kpi_resp_party = $7
                ,kpi_status = $8
            WHERE transID = $1 AND id = $2
            `
            const res_kpi = await client.query(update_to_kpi,rows)

            await client.query('COMMIT')

            return res_kpi.rows[0]

        });
    }

    var vffuncKPIsUpdate = funcKPIsUpdate()

        res.json({
            status: (res.statusCode = 200),
            message: "Deal UPDATED Successfully",
            dealInfo: vffuncKPIsUpdate,

          });

    } catch (e) {
        await client.query('ROLLBACK')
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});

module.exports = router;