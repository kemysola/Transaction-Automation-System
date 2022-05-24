const router = require("express").Router();
const pool = require("../database");
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middleware");

// This method computes the Structuring Fee Final value 
const structuringFeeFinalCompute = (structuringFeeAmount, structuringFeeAdvance) => {
  const finalPercent = (structuringFeeAmount / structuringFeeAdvance) * 100;
  return parseFloat(finalPercent);
};

// 20222-02-03: A function to compute the category of the deal at creation and subsequent updates
const funcDealCategory = (greenA, greenB, greenC, greenD, greenE, greenF, amberA,  amberB, amberC, amberD, amberE, product) =>{

        if( greenA == true &&  greenB == true && greenC == true && greenD == true && greenE == true && greenF == true && product !== 'CRG'){
            return 'Green'
        }else if( amberA == true &&  amberB == true && amberC == true && amberD == true && amberE == true && product !== 'CRG'){
            return 'Yellow'
        }else{
            return 'Red'
        }
}

// convert notes field in all transactions to List Items 2022:Feb:05
function convertNotesFiledsToList(el){
    el['notes'] = el['notes'].split('|')
}

// New Transaction Registration Endpoint[This registration should be done by a all active or admin users authorized based on the role-matrix]
router.post("/createdeal", verifyTokenAndAuthorization, async (req, res) => {
  const client = await pool.connect()
  try {
    // Destrucuring the request body to grab required fields
    const new_transaction = { clientName, originator, transactor, transactionLegalLead, industry, product,region,
        dealSize, coupon, tenor, moratorium, repaymentFrequency, amortizationStyle,
        mandateLetter, creditApproval, feeLetter, expectedClose, actualClose, NBC_approval_date, NBC_submitted_date,
        greenA, greenB, greenC, greenD, greenE, greenF, amberA,  amberB, amberC, 
        amberD, amberE, redA, redB, redC, redD, redE, structuringFeeAmount,structuringFeeAdvance,
        structuringFeeFinal, guaranteeFee, notes, closed, monitoringFee, reimbursible,
        // OTHER CPS columns
        ocps_fac_1_b,ocps_fac_1_c,ocps_fac_1_d,ocps_fac_1_e,ocps_fac_1_f,ocps_fac_2_b,ocps_fac_2_c,ocps_fac_2_d,ocps_fac_2_e,ocps_fac_2_f,
        ocps_fac_3_b,ocps_fac_3_c,ocps_fac_3_d,ocps_fac_3_e,ocps_fac_3_f,ocps_fac_4_b,ocps_fac_4_c,ocps_fac_4_d,ocps_fac_4_e,ocps_fac_4_f,
        ocps_fac_5_b,ocps_fac_5_c,ocps_fac_5_d,ocps_fac_5_e,ocps_fac_5_f,ocps_fac_6_b,ocps_fac_6_c,ocps_fac_6_d,ocps_fac_6_e,ocps_fac_6_f,
        ocps_fac_7_b,ocps_fac_7_c,ocps_fac_7_d,ocps_fac_7_e,ocps_fac_7_f,ocps_fac_8_b,ocps_fac_8_c,ocps_fac_8_d,ocps_fac_8_e,ocps_fac_8_f,
        ocps_fac_9_b,ocps_fac_9_c,ocps_fac_9_d,ocps_fac_9_e,ocps_fac_9_f,ocps_fac_10_b,ocps_fac_10_c,ocps_fac_10_d,ocps_fac_10_e,ocps_fac_10_f,
        ocps_fac_11_b,ocps_fac_11_c,ocps_fac_11_d,ocps_fac_11_e,ocps_fac_11_f,ocps_fac_12_b,ocps_fac_12_c,ocps_fac_12_d,ocps_fac_12_e,ocps_fac_12_f,
        ocps_fac_13_b,ocps_fac_13_c,ocps_fac_13_d,ocps_fac_13_e,ocps_fac_13_f,ocps_fac_14_b,ocps_fac_14_c,ocps_fac_14_d,ocps_fac_14_e,ocps_fac_14_f,
        ocps_fac_15_b,ocps_fac_15_c,ocps_fac_15_d,ocps_fac_15_e,ocps_fac_15_f,ocps_fac_16_b,ocps_fac_16_c,ocps_fac_16_d,ocps_fac_16_e,ocps_fac_16_f,
        ocps_fac_17_b,ocps_fac_17_c,ocps_fac_17_d,ocps_fac_17_e,ocps_fac_17_f,ocps_fac_18_b,ocps_fac_18_c,ocps_fac_18_d,ocps_fac_18_e,ocps_fac_18_f,
        ocps_fac_19_b,ocps_fac_19_c,ocps_fac_19_d,ocps_fac_19_e,ocps_fac_19_f,ocps_fac_20_b,ocps_fac_20_c,ocps_fac_20_d,ocps_fac_20_e,ocps_fac_20_f,

        // NBC FOCUS Columns
        nbc_focus_original_1_b, nbc_focus_original_1_c, nbc_focus_original_1_d, nbc_focus_original_2_b, nbc_focus_original_2_c,
        nbc_focus_original_2_d, nbc_focus_original_3_b, nbc_focus_original_3_c, nbc_focus_original_3_d, nbc_focus_original_4_b, nbc_focus_original_4_c,
        nbc_focus_original_4_d, nbc_focus_original_5_b, nbc_focus_original_5_c, nbc_focus_original_5_d, nbc_focus_apprv_1_b, nbc_focus_apprv_1_c,
        nbc_focus_apprv_2_b, nbc_focus_apprv_2_c, nbc_focus_apprv_3_b, nbc_focus_apprv_3_c, nbc_focus_apprv_4_b, nbc_focus_apprv_4_c,
        nbc_focus_apprv_5_b, nbc_focus_apprv_5_c,

        // PARTIES Columns
        parties_1_b, parties_1_c, parties_1_d, parties_2_b, parties_2_c, parties_2_d, parties_3_b, parties_3_c, parties_3_d, parties_4_b,
        parties_4_c, parties_4_d, parties_5_b, parties_5_c, parties_5_d, parties_6_b, parties_6_c, parties_6_d, parties_7_b, parties_7_c, parties_7_d,
        parties_8_b, parties_8_c, parties_8_d, parties_9_b, parties_9_c, parties_9_d, parties_10_b, parties_10_c, parties_10_d, parties_11_b,
        parties_11_c, parties_11_d,

        // PLIS Columns
        plis_1_b, plis_1_c, plis_1_d, plis_1_e, plis_2_b, plis_2_c, plis_2_d, plis_2_e, plis_3_b, plis_3_c, plis_3_d, plis_3_e, plis_4_b,
        plis_4_c, plis_4_d, plis_4_e, plis_5_b, plis_5_c, plis_5_d, plis_5_e, plis_6_b, plis_6_c, plis_6_d, plis_6_e,

        // KEY DEAL FACTOR
        key_deal_fac_1_b, key_deal_fac_1_c, key_deal_fac_1_d, key_deal_fac_1_e, key_deal_fac_1_f, key_deal_fac_2_b, key_deal_fac_2_c, key_deal_fac_2_d,
        key_deal_fac_2_e, key_deal_fac_2_f, key_deal_fac_3_b, key_deal_fac_3_c, key_deal_fac_3_d, key_deal_fac_3_e, key_deal_fac_3_f, key_deal_fac_4_b,
        key_deal_fac_4_c, key_deal_fac_4_d, key_deal_fac_4_e, key_deal_fac_4_f, key_deal_fac_5_b, key_deal_fac_5_c, key_deal_fac_5_d, key_deal_fac_5_e,
        key_deal_fac_5_f, key_deal_fac_6_b, key_deal_fac_6_c, key_deal_fac_6_d, key_deal_fac_6_e, key_deal_fac_6_f, key_deal_fac_7_b, key_deal_fac_7_c,
        key_deal_fac_7_d, key_deal_fac_7_e, key_deal_fac_7_f, key_deal_fac_8_b, key_deal_fac_8_c, key_deal_fac_8_d, key_deal_fac_8_e, key_deal_fac_8_f,
        key_deal_fac_9_b, key_deal_fac_9_c, key_deal_fac_9_d, key_deal_fac_9_e, key_deal_fac_9_f, key_deal_fac_10_b, key_deal_fac_10_c,
        key_deal_fac_10_d, key_deal_fac_10_e, key_deal_fac_10_f, key_deal_fac_11_b, key_deal_fac_11_c, key_deal_fac_11_d, key_deal_fac_11_e,
        key_deal_fac_11_f, key_deal_fac_12_b, key_deal_fac_12_c, key_deal_fac_12_d, key_deal_fac_12_e, key_deal_fac_12_f, key_deal_fac_13_b,
        key_deal_fac_13_c, key_deal_fac_13_d, key_deal_fac_13_e, key_deal_fac_13_f, key_deal_fac_14_b, key_deal_fac_14_c, key_deal_fac_14_d,
        key_deal_fac_14_e, key_deal_fac_14_f, key_deal_fac_15_b, key_deal_fac_15_c, key_deal_fac_15_d, key_deal_fac_15_e, key_deal_fac_15_f,
        key_deal_fac_16_b, key_deal_fac_16_c, key_deal_fac_17_b, key_deal_fac_17_c, key_deal_fac_18_b, key_deal_fac_18_c, key_deal_fac_19_b,
        key_deal_fac_19_c, key_deal_fac_20_b, key_deal_fac_20_c, key_deal_fac_21_b, key_deal_fac_21_c, key_deal_fac_22_b, key_deal_fac_22_c,
        key_deal_fac_23_b, key_deal_fac_23_c

    
    } = req.body;

    const transaction_data = [ new_transaction.clientName, new_transaction.originator, new_transaction.transactor, 
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
    res_.rows[0]['notes'] = res_.rows[0]['notes'].split('|')
 
    // OTHER CPS data
    const ocps_data = [
        res_.rows[0]["transid"],
        new_transaction.ocps_fac_1_b,new_transaction.ocps_fac_1_c,new_transaction.ocps_fac_1_d,new_transaction.ocps_fac_1_e,new_transaction.ocps_fac_1_f,new_transaction.ocps_fac_2_b,new_transaction.ocps_fac_2_c,new_transaction.ocps_fac_2_d,new_transaction.ocps_fac_2_e,new_transaction.ocps_fac_2_f,
        new_transaction.ocps_fac_3_b,new_transaction.ocps_fac_3_c,new_transaction.ocps_fac_3_d,new_transaction.ocps_fac_3_e,new_transaction.ocps_fac_3_f,new_transaction.ocps_fac_4_b,new_transaction.ocps_fac_4_c,new_transaction.ocps_fac_4_d,new_transaction.ocps_fac_4_e,new_transaction.ocps_fac_4_f,
        new_transaction.ocps_fac_5_b,new_transaction.ocps_fac_5_c,new_transaction.ocps_fac_5_d,new_transaction.ocps_fac_5_e,new_transaction.ocps_fac_5_f,new_transaction.ocps_fac_6_b,new_transaction.ocps_fac_6_c,new_transaction.ocps_fac_6_d,new_transaction.ocps_fac_6_e,new_transaction.ocps_fac_6_f,
        new_transaction.ocps_fac_7_b,new_transaction.ocps_fac_7_c,new_transaction.ocps_fac_7_d,new_transaction.ocps_fac_7_e,new_transaction.ocps_fac_7_f,new_transaction.ocps_fac_8_b,new_transaction.ocps_fac_8_c,new_transaction.ocps_fac_8_d,new_transaction.ocps_fac_8_e,new_transaction.ocps_fac_8_f,
        new_transaction.ocps_fac_9_b,new_transaction.ocps_fac_9_c,new_transaction.ocps_fac_9_d,new_transaction.ocps_fac_9_e,new_transaction.ocps_fac_9_f,new_transaction.ocps_fac_10_b,new_transaction.ocps_fac_10_c,new_transaction.ocps_fac_10_d,new_transaction.ocps_fac_10_e,new_transaction.ocps_fac_10_f,
        new_transaction.ocps_fac_11_b,new_transaction.ocps_fac_11_c,new_transaction.ocps_fac_11_d,new_transaction.ocps_fac_11_e,new_transaction.ocps_fac_11_f,new_transaction.ocps_fac_12_b,new_transaction.ocps_fac_12_c,new_transaction.ocps_fac_12_d,new_transaction.ocps_fac_12_e,new_transaction.ocps_fac_12_f,
        new_transaction.ocps_fac_13_b,new_transaction.ocps_fac_13_c,new_transaction.ocps_fac_13_d,new_transaction.ocps_fac_13_e,new_transaction.ocps_fac_13_f,new_transaction.ocps_fac_14_b,new_transaction.ocps_fac_14_c,new_transaction.ocps_fac_14_d,new_transaction.ocps_fac_14_e,new_transaction.ocps_fac_14_f,
        new_transaction.ocps_fac_15_b,new_transaction.ocps_fac_15_c,new_transaction.ocps_fac_15_d,new_transaction.ocps_fac_15_e,new_transaction.ocps_fac_15_f,new_transaction.ocps_fac_16_b,new_transaction.ocps_fac_16_c,new_transaction.ocps_fac_16_d,new_transaction.ocps_fac_16_e,new_transaction.ocps_fac_16_f,
        new_transaction.ocps_fac_17_b,new_transaction.ocps_fac_17_c,new_transaction.ocps_fac_17_d,new_transaction.ocps_fac_17_e,new_transaction.ocps_fac_17_f,new_transaction.ocps_fac_18_b,new_transaction.ocps_fac_18_c,new_transaction.ocps_fac_18_d,new_transaction.ocps_fac_18_e,new_transaction.ocps_fac_18_f,
        new_transaction.ocps_fac_19_b,new_transaction.ocps_fac_19_c,new_transaction.ocps_fac_19_d,new_transaction.ocps_fac_19_e,new_transaction.ocps_fac_19_f,new_transaction.ocps_fac_20_b,new_transaction.ocps_fac_20_c,new_transaction.ocps_fac_20_d,new_transaction.ocps_fac_20_e,new_transaction.ocps_fac_20_f
        ]
    const write_to_ocps = `
        INSERT INTO TB_INFRCR_TRANSACTION_OTHER_CPS(
            transID,
            ocps_fac_1_b,ocps_fac_1_c,ocps_fac_1_d,ocps_fac_1_e,ocps_fac_1_f,ocps_fac_2_b,ocps_fac_2_c,ocps_fac_2_d,ocps_fac_2_e,ocps_fac_2_f,
            ocps_fac_3_b,ocps_fac_3_c,ocps_fac_3_d,ocps_fac_3_e,ocps_fac_3_f,ocps_fac_4_b,ocps_fac_4_c,ocps_fac_4_d,ocps_fac_4_e,ocps_fac_4_f,
            ocps_fac_5_b,ocps_fac_5_c,ocps_fac_5_d,ocps_fac_5_e,ocps_fac_5_f,ocps_fac_6_b,ocps_fac_6_c,ocps_fac_6_d,ocps_fac_6_e,ocps_fac_6_f,
            ocps_fac_7_b,ocps_fac_7_c,ocps_fac_7_d,ocps_fac_7_e,ocps_fac_7_f,ocps_fac_8_b,ocps_fac_8_c,ocps_fac_8_d,ocps_fac_8_e,ocps_fac_8_f,
            ocps_fac_9_b,ocps_fac_9_c,ocps_fac_9_d,ocps_fac_9_e,ocps_fac_9_f,ocps_fac_10_b,ocps_fac_10_c,ocps_fac_10_d,ocps_fac_10_e,ocps_fac_10_f,
            ocps_fac_11_b,ocps_fac_11_c,ocps_fac_11_d,ocps_fac_11_e,ocps_fac_11_f,ocps_fac_12_b,ocps_fac_12_c,ocps_fac_12_d,ocps_fac_12_e,ocps_fac_12_f,
            ocps_fac_13_b,ocps_fac_13_c,ocps_fac_13_d,ocps_fac_13_e,ocps_fac_13_f,ocps_fac_14_b,ocps_fac_14_c,ocps_fac_14_d,ocps_fac_14_e,ocps_fac_14_f,
            ocps_fac_15_b,ocps_fac_15_c,ocps_fac_15_d,ocps_fac_15_e,ocps_fac_15_f,ocps_fac_16_b,ocps_fac_16_c,ocps_fac_16_d,ocps_fac_16_e,ocps_fac_16_f,
            ocps_fac_17_b,ocps_fac_17_c,ocps_fac_17_d,ocps_fac_17_e,ocps_fac_17_f,ocps_fac_18_b,ocps_fac_18_c,ocps_fac_18_d,ocps_fac_18_e,ocps_fac_18_f,
            ocps_fac_19_b,ocps_fac_19_c,ocps_fac_19_d,ocps_fac_19_e,ocps_fac_19_f,ocps_fac_20_b,ocps_fac_20_c,ocps_fac_20_d,ocps_fac_20_e,ocps_fac_20_f
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43,
            $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80, $81, $82, $83, $84,
            $85, $86, $87, $88, $89, $90, $91, $92, $93, $94, $95, $96, $97, $98, $99, $100, $101) RETURNING *`

    const res_ocps = await client.query(write_to_ocps, ocps_data)    
    
    
    // NBC FOCUS Data
    const nbc_focus_data = [
        res_.rows[0]["transid"],
        new_transaction.nbc_focus_original_1_b, new_transaction.nbc_focus_original_1_c, new_transaction.nbc_focus_original_1_d, new_transaction.nbc_focus_original_2_b, new_transaction.nbc_focus_original_2_c,
        new_transaction.nbc_focus_original_2_d, new_transaction.nbc_focus_original_3_b, new_transaction.nbc_focus_original_3_c, new_transaction.nbc_focus_original_3_d, new_transaction.nbc_focus_original_4_b, new_transaction.nbc_focus_original_4_c,
        new_transaction.nbc_focus_original_4_d, new_transaction.nbc_focus_original_5_b, new_transaction.nbc_focus_original_5_c, new_transaction.nbc_focus_original_5_d, new_transaction.nbc_focus_apprv_1_b, new_transaction.nbc_focus_apprv_1_c,
        new_transaction.nbc_focus_apprv_2_b, new_transaction.nbc_focus_apprv_2_c, new_transaction.nbc_focus_apprv_3_b, new_transaction.nbc_focus_apprv_3_c, new_transaction.nbc_focus_apprv_4_b, new_transaction.nbc_focus_apprv_4_c,
        new_transaction.nbc_focus_apprv_5_b, new_transaction.nbc_focus_apprv_5_c
    ]
    
    const write_to_nbc_focus = `
    INSERT INTO TB_INFRCR_TRANSACTION_NBC_FOCUS(
        transID, 
        nbc_focus_original_1_b, nbc_focus_original_1_c, nbc_focus_original_1_d, nbc_focus_original_2_b, nbc_focus_original_2_c,
        nbc_focus_original_2_d, nbc_focus_original_3_b, nbc_focus_original_3_c, nbc_focus_original_3_d, nbc_focus_original_4_b, nbc_focus_original_4_c,
        nbc_focus_original_4_d, nbc_focus_original_5_b, nbc_focus_original_5_c, nbc_focus_original_5_d, nbc_focus_apprv_1_b, nbc_focus_apprv_1_c,
        nbc_focus_apprv_2_b, nbc_focus_apprv_2_c, nbc_focus_apprv_3_b, nbc_focus_apprv_3_c, nbc_focus_apprv_4_b, nbc_focus_apprv_4_c,
        nbc_focus_apprv_5_b, nbc_focus_apprv_5_c
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26) RETURNING *`

    const res_nbc_focus = await client.query(write_to_nbc_focus, nbc_focus_data)

    // PARTIES
    const parties_data = [
        res_.rows[0]["transid"],
        new_transaction.parties_1_b, new_transaction.parties_1_c, new_transaction.parties_1_d, new_transaction.parties_2_b, new_transaction.parties_2_c,
        new_transaction.parties_2_d, new_transaction.parties_3_b, new_transaction.parties_3_c, new_transaction.parties_3_d, new_transaction.parties_4_b,
        new_transaction.parties_4_c, new_transaction.parties_4_d, new_transaction.parties_5_b, new_transaction.parties_5_c, new_transaction.parties_5_d,
        new_transaction.parties_6_b, new_transaction.parties_6_c, new_transaction.parties_6_d, new_transaction.parties_7_b, new_transaction.parties_7_c,
        new_transaction.parties_7_d, new_transaction.parties_8_b, new_transaction.parties_8_c, new_transaction.parties_8_d, new_transaction.parties_9_b,
        new_transaction.parties_9_c, new_transaction.parties_9_d, new_transaction.parties_10_b, new_transaction.parties_10_c,
        new_transaction.parties_10_d, new_transaction.parties_11_b, new_transaction.parties_11_c, new_transaction.parties_11_d
    ]
    
    const write_to_parties = `
    INSERT INTO TB_INFRCR_TRANSACTION_PARTIES(
        transID, parties_1_b, parties_1_c, parties_1_d, parties_2_b, parties_2_c, parties_2_d, parties_3_b, parties_3_c, parties_3_d, parties_4_b,
        parties_4_c, parties_4_d, parties_5_b, parties_5_c, parties_5_d, parties_6_b, parties_6_c, parties_6_d, parties_7_b, parties_7_c, parties_7_d,
        parties_8_b, parties_8_c, parties_8_d, parties_9_b, parties_9_c, parties_9_d, parties_10_b, parties_10_c, parties_10_d, parties_11_b,
        parties_11_c, parties_11_d
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34) RETURNING *`
    const res_parties = await client.query(write_to_parties, parties_data)

    // PLIS
    const plis_data = [
        res_.rows[0]["transid"],
        new_transaction.plis_1_b, new_transaction.plis_1_c, new_transaction.plis_1_d, new_transaction.plis_1_e, new_transaction.plis_2_b,
        new_transaction.plis_2_c, new_transaction.plis_2_d, new_transaction.plis_2_e, new_transaction.plis_3_b, new_transaction.plis_3_c,
        new_transaction.plis_3_d, new_transaction.plis_3_e, new_transaction.plis_4_b, new_transaction.plis_4_c, new_transaction.plis_4_d,
        new_transaction.plis_4_e, new_transaction.plis_5_b, new_transaction.plis_5_c, new_transaction.plis_5_d, new_transaction.plis_5_e,
        new_transaction.plis_6_b, new_transaction.plis_6_c, new_transaction.plis_6_d, new_transaction.plis_6_e
    ]
    
    const write_to_plis = `
    INSERT INTO TB_INFRCR_TRANSACTION_PLIS(
        transID, plis_1_b, plis_1_c, plis_1_d, plis_1_e, plis_2_b, plis_2_c, plis_2_d, plis_2_e, plis_3_b, plis_3_c, plis_3_d, 
        plis_3_e, plis_4_b,plis_4_c, plis_4_d, plis_4_e, plis_5_b, plis_5_c, plis_5_d, plis_5_e, plis_6_b, plis_6_c, plis_6_d, plis_6_e
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING *`

    const res_plis = await client.query(write_to_plis, plis_data)

    // KEY DEAL FACTOR
    const kdf_data = [
        res_.rows[0]["transid"],
        new_transaction.key_deal_fac_1_b, new_transaction.key_deal_fac_1_c, new_transaction.key_deal_fac_1_d, new_transaction.key_deal_fac_1_e,
        new_transaction.key_deal_fac_1_f, new_transaction.key_deal_fac_2_b, new_transaction.key_deal_fac_2_c, new_transaction.key_deal_fac_2_d,
        new_transaction.key_deal_fac_2_e, new_transaction.key_deal_fac_2_f, new_transaction.key_deal_fac_3_b, new_transaction.key_deal_fac_3_c,
        new_transaction.key_deal_fac_3_d, new_transaction.key_deal_fac_3_e, new_transaction.key_deal_fac_3_f, new_transaction.key_deal_fac_4_b,
        new_transaction.key_deal_fac_4_c, new_transaction.key_deal_fac_4_d, new_transaction.key_deal_fac_4_e, new_transaction.key_deal_fac_4_f,
        new_transaction.key_deal_fac_5_b, new_transaction.key_deal_fac_5_c, new_transaction.key_deal_fac_5_d, new_transaction.key_deal_fac_5_e,
        new_transaction.key_deal_fac_5_f, new_transaction.key_deal_fac_6_b, new_transaction.key_deal_fac_6_c, new_transaction.key_deal_fac_6_d,
        new_transaction.key_deal_fac_6_e, new_transaction.key_deal_fac_6_f, new_transaction.key_deal_fac_7_b, new_transaction.key_deal_fac_7_c,
        new_transaction.key_deal_fac_7_d, new_transaction.key_deal_fac_7_e, new_transaction.key_deal_fac_7_f, new_transaction.key_deal_fac_8_b,
        new_transaction.key_deal_fac_8_c, new_transaction.key_deal_fac_8_d, new_transaction.key_deal_fac_8_e, new_transaction.key_deal_fac_8_f,
        new_transaction.key_deal_fac_9_b, new_transaction.key_deal_fac_9_c, new_transaction.key_deal_fac_9_d, new_transaction.key_deal_fac_9_e,
        new_transaction.key_deal_fac_9_f, new_transaction.key_deal_fac_10_b, new_transaction.key_deal_fac_10_c, new_transaction.key_deal_fac_10_d,
        new_transaction.key_deal_fac_10_e, new_transaction.key_deal_fac_10_f, new_transaction.key_deal_fac_11_b, new_transaction.key_deal_fac_11_c,
        new_transaction.key_deal_fac_11_d, new_transaction.key_deal_fac_11_e, new_transaction.key_deal_fac_11_f, new_transaction.key_deal_fac_12_b,
        new_transaction.key_deal_fac_12_c, new_transaction.key_deal_fac_12_d, new_transaction.key_deal_fac_12_e, new_transaction.key_deal_fac_12_f,
        new_transaction.key_deal_fac_13_b, new_transaction.key_deal_fac_13_c, new_transaction.key_deal_fac_13_d, new_transaction.key_deal_fac_13_e,
        new_transaction.key_deal_fac_13_f, new_transaction.key_deal_fac_14_b, new_transaction.key_deal_fac_14_c, new_transaction.key_deal_fac_14_d,
        new_transaction.key_deal_fac_14_e, new_transaction.key_deal_fac_14_f, new_transaction.key_deal_fac_15_b, new_transaction.key_deal_fac_15_c,
        new_transaction.key_deal_fac_15_d, new_transaction.key_deal_fac_15_e, new_transaction.key_deal_fac_15_f, new_transaction.key_deal_fac_16_b,
        new_transaction.key_deal_fac_16_c, new_transaction.key_deal_fac_17_b, new_transaction.key_deal_fac_17_c, new_transaction.key_deal_fac_18_b,
        new_transaction.key_deal_fac_18_c, new_transaction.key_deal_fac_19_b, new_transaction.key_deal_fac_19_c, new_transaction.key_deal_fac_20_b,
        new_transaction.key_deal_fac_20_c, new_transaction.key_deal_fac_21_b, new_transaction.key_deal_fac_21_c, new_transaction.key_deal_fac_22_b,
        new_transaction.key_deal_fac_22_c, new_transaction.key_deal_fac_23_b, new_transaction.key_deal_fac_23_c
    ]
    
    const write_to_kdf = `
    INSERT INTO TB_INFRCR_TRANSACTION_KDF(
        transID, 
        key_deal_fac_1_b, key_deal_fac_1_c, key_deal_fac_1_d, key_deal_fac_1_e, key_deal_fac_1_f, key_deal_fac_2_b, key_deal_fac_2_c, key_deal_fac_2_d,
        key_deal_fac_2_e, key_deal_fac_2_f, key_deal_fac_3_b, key_deal_fac_3_c, key_deal_fac_3_d, key_deal_fac_3_e, key_deal_fac_3_f, key_deal_fac_4_b,
        key_deal_fac_4_c, key_deal_fac_4_d, key_deal_fac_4_e, key_deal_fac_4_f, key_deal_fac_5_b, key_deal_fac_5_c, key_deal_fac_5_d, key_deal_fac_5_e,
        key_deal_fac_5_f, key_deal_fac_6_b, key_deal_fac_6_c, key_deal_fac_6_d, key_deal_fac_6_e, key_deal_fac_6_f, key_deal_fac_7_b, key_deal_fac_7_c,
        key_deal_fac_7_d, key_deal_fac_7_e, key_deal_fac_7_f, key_deal_fac_8_b, key_deal_fac_8_c, key_deal_fac_8_d, key_deal_fac_8_e, key_deal_fac_8_f,
        key_deal_fac_9_b, key_deal_fac_9_c, key_deal_fac_9_d, key_deal_fac_9_e, key_deal_fac_9_f, key_deal_fac_10_b, key_deal_fac_10_c,
        key_deal_fac_10_d, key_deal_fac_10_e, key_deal_fac_10_f, key_deal_fac_11_b, key_deal_fac_11_c, key_deal_fac_11_d, key_deal_fac_11_e,
        key_deal_fac_11_f, key_deal_fac_12_b, key_deal_fac_12_c, key_deal_fac_12_d, key_deal_fac_12_e, key_deal_fac_12_f, key_deal_fac_13_b,
        key_deal_fac_13_c, key_deal_fac_13_d, key_deal_fac_13_e, key_deal_fac_13_f, key_deal_fac_14_b, key_deal_fac_14_c, key_deal_fac_14_d,
        key_deal_fac_14_e, key_deal_fac_14_f, key_deal_fac_15_b, key_deal_fac_15_c, key_deal_fac_15_d, key_deal_fac_15_e, key_deal_fac_15_f,
        key_deal_fac_16_b, key_deal_fac_16_c, key_deal_fac_17_b, key_deal_fac_17_c, key_deal_fac_18_b, key_deal_fac_18_c, key_deal_fac_19_b,
        key_deal_fac_19_c, key_deal_fac_20_b, key_deal_fac_20_c, key_deal_fac_21_b, key_deal_fac_21_c, key_deal_fac_22_b, key_deal_fac_22_c,
        key_deal_fac_23_b, key_deal_fac_23_c
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43,
        $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80, $81, $82, $83, $84,
        $85, $86, $87, $88, $89, $90, $91, $92) RETURNING *`
    
    const res_kdf = await client.query(write_to_kdf, kdf_data) 


    let transCreateResp = Object.assign(res_.rows[0], res_ocps.rows[0], res_nbc_focus.rows[0], res_parties.rows[0], res_plis.rows[0], res_kdf.rows[0]);

    res.json({
      status: (res.statusCode = 200),
      message: "New Deal Created Successfully",
      dealInfo:  transCreateResp,
    });

  } catch (e) {
    await client.query('ROLLBACK')
    res.status(403).json({ Error: e.stack });

  }finally{
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

            b.ocps_fac_1_b,b.ocps_fac_1_c,b.ocps_fac_1_d,b.ocps_fac_1_e,b.ocps_fac_1_f,b.ocps_fac_2_b,b.ocps_fac_2_c,b.ocps_fac_2_d,b.ocps_fac_2_e,b.ocps_fac_2_f,b.ocps_fac_3_b,b.ocps_fac_3_c,b.ocps_fac_3_d,b.ocps_fac_3_e,b.ocps_fac_3_f,b.ocps_fac_4_b,b.ocps_fac_4_c,b.ocps_fac_4_d,b.ocps_fac_4_e,b.ocps_fac_4_f,
            b.ocps_fac_5_b,b.ocps_fac_5_c,b.ocps_fac_5_d,b.ocps_fac_5_e,b.ocps_fac_5_f,b.ocps_fac_6_b,b.ocps_fac_6_c,b.ocps_fac_6_d,b.ocps_fac_6_e,b.ocps_fac_6_f,b.ocps_fac_7_b,b.ocps_fac_7_c,b.ocps_fac_7_d,b.ocps_fac_7_e,b.ocps_fac_7_f,b.ocps_fac_8_b,b.ocps_fac_8_c,b.ocps_fac_8_d,b.ocps_fac_8_e,b.ocps_fac_8_f,
            b.ocps_fac_9_b,b.ocps_fac_9_c,b.ocps_fac_9_d,b.ocps_fac_9_e,b.ocps_fac_9_f,b.ocps_fac_10_b,b.ocps_fac_10_c,b.ocps_fac_10_d,b.ocps_fac_10_e,b.ocps_fac_10_f,b.ocps_fac_11_b,b.ocps_fac_11_c,b.ocps_fac_11_d,b.ocps_fac_11_e,b.ocps_fac_11_f,b.ocps_fac_12_b,b.ocps_fac_12_c,b.ocps_fac_12_d,b.ocps_fac_12_e,b.ocps_fac_12_f,
            b.ocps_fac_13_b,b.ocps_fac_13_c,b.ocps_fac_13_d,b.ocps_fac_13_e,b.ocps_fac_13_f,b.ocps_fac_14_b,b.ocps_fac_14_c,b.ocps_fac_14_d,b.ocps_fac_14_e,b.ocps_fac_14_f,b.ocps_fac_15_b,b.ocps_fac_15_c,b.ocps_fac_15_d,b.ocps_fac_15_e,b.ocps_fac_15_f,b.ocps_fac_16_b,b.ocps_fac_16_c,b.ocps_fac_16_d,b.ocps_fac_16_e,b.ocps_fac_16_f,
            b.ocps_fac_17_b,b.ocps_fac_17_c,b.ocps_fac_17_d,b.ocps_fac_17_e,b.ocps_fac_17_f,b.ocps_fac_18_b,b.ocps_fac_18_c,b.ocps_fac_18_d,b.ocps_fac_18_e,b.ocps_fac_18_f,b.ocps_fac_19_b,b.ocps_fac_19_c,b.ocps_fac_19_d,b.ocps_fac_19_e,b.ocps_fac_19_f,b.ocps_fac_20_b,b.ocps_fac_20_c,b.ocps_fac_20_d,b.ocps_fac_20_e,b.ocps_fac_20_f,

            c.nbc_focus_original_1_b, c.nbc_focus_original_1_c, c.nbc_focus_original_1_d, c.nbc_focus_original_2_b, c.nbc_focus_original_2_c,c.nbc_focus_original_2_d, c.nbc_focus_original_3_b, c.nbc_focus_original_3_c, c.nbc_focus_original_3_d, c.nbc_focus_original_4_b, c.nbc_focus_original_4_c,
            c.nbc_focus_original_4_d, c.nbc_focus_original_5_b, c.nbc_focus_original_5_c, c.nbc_focus_original_5_d, c.nbc_focus_apprv_1_b, c.nbc_focus_apprv_1_c,c.nbc_focus_apprv_2_b, c.nbc_focus_apprv_2_c, c.nbc_focus_apprv_3_b, c.nbc_focus_apprv_3_c, c.nbc_focus_apprv_4_b, c.nbc_focus_apprv_4_c,
            c.nbc_focus_apprv_5_b, c.nbc_focus_apprv_5_c,

            d.parties_1_b, d.parties_1_c, d.parties_1_d, d.parties_2_b, d.parties_2_c,d.parties_2_d, d.parties_3_b, d.parties_3_c, d.parties_3_d, d.parties_4_b,d.parties_4_c, d.parties_4_d, d.parties_5_b, d.parties_5_c, d.parties_5_d,
            d.parties_6_b, d.parties_6_c, d.parties_6_d, d.parties_7_b, d.parties_7_c,d.parties_7_d, d.parties_8_b, d.parties_8_c, d.parties_8_d, d.parties_9_b,d.parties_9_c, d.parties_9_d, d.parties_10_b, d.parties_10_c,
            d.parties_10_d, d.parties_11_b, d.parties_11_c, d.parties_11_d,

            e.plis_1_b, e.plis_1_c, e.plis_1_d, e.plis_1_e, e.plis_2_b,e.plis_2_c, e.plis_2_d, e.plis_2_e, e.plis_3_b, e.plis_3_c,e.plis_3_d, e.plis_3_e, e.plis_4_b, e.plis_4_c, e.plis_4_d,e.plis_4_e, e.plis_5_b, e.plis_5_c, e.plis_5_d, e.plis_5_e,
            e.plis_6_b, e.plis_6_c, e.plis_6_d, e.plis_6_e,

            f.key_deal_fac_1_b, f.key_deal_fac_1_c, f.key_deal_fac_1_d, f.key_deal_fac_1_e,f.key_deal_fac_1_f, f.key_deal_fac_2_b, f.key_deal_fac_2_c, f.key_deal_fac_2_d,f.key_deal_fac_2_e, f.key_deal_fac_2_f, f.key_deal_fac_3_b, f.key_deal_fac_3_c,
            f.key_deal_fac_3_d, f.key_deal_fac_3_e, f.key_deal_fac_3_f, f.key_deal_fac_4_b,f.key_deal_fac_4_c, f.key_deal_fac_4_d, f.key_deal_fac_4_e, f.key_deal_fac_4_f,f.key_deal_fac_5_b, f.key_deal_fac_5_c, f.key_deal_fac_5_d, f.key_deal_fac_5_e,
            f.key_deal_fac_5_f, f.key_deal_fac_6_b, f.key_deal_fac_6_c, f.key_deal_fac_6_d,f.key_deal_fac_6_e, f.key_deal_fac_6_f, f.key_deal_fac_7_b, f.key_deal_fac_7_c,f.key_deal_fac_7_d, f.key_deal_fac_7_e, f.key_deal_fac_7_f, f.key_deal_fac_8_b,
            f.key_deal_fac_8_c, f.key_deal_fac_8_d, f.key_deal_fac_8_e, f.key_deal_fac_8_f,f.key_deal_fac_9_b, f.key_deal_fac_9_c, f.key_deal_fac_9_d, f.key_deal_fac_9_e,f.key_deal_fac_9_f, f.key_deal_fac_10_b, f.key_deal_fac_10_c, f.key_deal_fac_10_d,
            f.key_deal_fac_10_e, f.key_deal_fac_10_f, f.key_deal_fac_11_b, f.key_deal_fac_11_c,f.key_deal_fac_11_d, f.key_deal_fac_11_e, f.key_deal_fac_11_f, f.key_deal_fac_12_b,f.key_deal_fac_12_c, f.key_deal_fac_12_d, f.key_deal_fac_12_e, f.key_deal_fac_12_f,
            f.key_deal_fac_13_b, f.key_deal_fac_13_c, f.key_deal_fac_13_d, f.key_deal_fac_13_e,f.key_deal_fac_13_f, f.key_deal_fac_14_b, f.key_deal_fac_14_c, f.key_deal_fac_14_d,f.key_deal_fac_14_e, f.key_deal_fac_14_f, f.key_deal_fac_15_b, f.key_deal_fac_15_c,
            f.key_deal_fac_15_d, f.key_deal_fac_15_e, f.key_deal_fac_15_f, f.key_deal_fac_16_b,f.key_deal_fac_16_c, f.key_deal_fac_17_b, f.key_deal_fac_17_c, f.key_deal_fac_18_b,f.key_deal_fac_18_c, f.key_deal_fac_19_b, f.key_deal_fac_19_c, f.key_deal_fac_20_b,
            f.key_deal_fac_20_c, f.key_deal_fac_21_b, f.key_deal_fac_21_c, f.key_deal_fac_22_b,f.key_deal_fac_22_c, f.key_deal_fac_23_b, f.key_deal_fac_23_c


            FROM TB_INFRCR_TRANSACTION a
            LEFT JOIN TB_INFRCR_TRANSACTION_OTHER_CPS b ON b.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_NBC_FOCUS c ON c.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PARTIES d ON d.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PLIS e ON e.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_KDF f ON f.transID = a.transID WHERE a.transID = $1`, [deal_record_id]);
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
            `SELECT a.* ,

                    b.ocps_fac_1_b,b.ocps_fac_1_c,b.ocps_fac_1_d,b.ocps_fac_1_e,b.ocps_fac_1_f,b.ocps_fac_2_b,b.ocps_fac_2_c,b.ocps_fac_2_d,b.ocps_fac_2_e,b.ocps_fac_2_f,b.ocps_fac_3_b,b.ocps_fac_3_c,b.ocps_fac_3_d,b.ocps_fac_3_e,b.ocps_fac_3_f,b.ocps_fac_4_b,b.ocps_fac_4_c,b.ocps_fac_4_d,b.ocps_fac_4_e,b.ocps_fac_4_f,
                    b.ocps_fac_5_b,b.ocps_fac_5_c,b.ocps_fac_5_d,b.ocps_fac_5_e,b.ocps_fac_5_f,b.ocps_fac_6_b,b.ocps_fac_6_c,b.ocps_fac_6_d,b.ocps_fac_6_e,b.ocps_fac_6_f,b.ocps_fac_7_b,b.ocps_fac_7_c,b.ocps_fac_7_d,b.ocps_fac_7_e,b.ocps_fac_7_f,b.ocps_fac_8_b,b.ocps_fac_8_c,b.ocps_fac_8_d,b.ocps_fac_8_e,b.ocps_fac_8_f,
                    b.ocps_fac_9_b,b.ocps_fac_9_c,b.ocps_fac_9_d,b.ocps_fac_9_e,b.ocps_fac_9_f,b.ocps_fac_10_b,b.ocps_fac_10_c,b.ocps_fac_10_d,b.ocps_fac_10_e,b.ocps_fac_10_f,b.ocps_fac_11_b,b.ocps_fac_11_c,b.ocps_fac_11_d,b.ocps_fac_11_e,b.ocps_fac_11_f,b.ocps_fac_12_b,b.ocps_fac_12_c,b.ocps_fac_12_d,b.ocps_fac_12_e,b.ocps_fac_12_f,
                    b.ocps_fac_13_b,b.ocps_fac_13_c,b.ocps_fac_13_d,b.ocps_fac_13_e,b.ocps_fac_13_f,b.ocps_fac_14_b,b.ocps_fac_14_c,b.ocps_fac_14_d,b.ocps_fac_14_e,b.ocps_fac_14_f,b.ocps_fac_15_b,b.ocps_fac_15_c,b.ocps_fac_15_d,b.ocps_fac_15_e,b.ocps_fac_15_f,b.ocps_fac_16_b,b.ocps_fac_16_c,b.ocps_fac_16_d,b.ocps_fac_16_e,b.ocps_fac_16_f,
                    b.ocps_fac_17_b,b.ocps_fac_17_c,b.ocps_fac_17_d,b.ocps_fac_17_e,b.ocps_fac_17_f,b.ocps_fac_18_b,b.ocps_fac_18_c,b.ocps_fac_18_d,b.ocps_fac_18_e,b.ocps_fac_18_f,b.ocps_fac_19_b,b.ocps_fac_19_c,b.ocps_fac_19_d,b.ocps_fac_19_e,b.ocps_fac_19_f,b.ocps_fac_20_b,b.ocps_fac_20_c,b.ocps_fac_20_d,b.ocps_fac_20_e,b.ocps_fac_20_f,

                    c.nbc_focus_original_1_b, c.nbc_focus_original_1_c, c.nbc_focus_original_1_d, c.nbc_focus_original_2_b, c.nbc_focus_original_2_c,c.nbc_focus_original_2_d, c.nbc_focus_original_3_b, c.nbc_focus_original_3_c, c.nbc_focus_original_3_d, c.nbc_focus_original_4_b, c.nbc_focus_original_4_c,
                    c.nbc_focus_original_4_d, c.nbc_focus_original_5_b, c.nbc_focus_original_5_c, c.nbc_focus_original_5_d, c.nbc_focus_apprv_1_b, c.nbc_focus_apprv_1_c,c.nbc_focus_apprv_2_b, c.nbc_focus_apprv_2_c, c.nbc_focus_apprv_3_b, c.nbc_focus_apprv_3_c, c.nbc_focus_apprv_4_b, c.nbc_focus_apprv_4_c,
                    c.nbc_focus_apprv_5_b, c.nbc_focus_apprv_5_c,

                    d.parties_1_b, d.parties_1_c, d.parties_1_d, d.parties_2_b, d.parties_2_c,d.parties_2_d, d.parties_3_b, d.parties_3_c, d.parties_3_d, d.parties_4_b,d.parties_4_c, d.parties_4_d, d.parties_5_b, d.parties_5_c, d.parties_5_d,
                    d.parties_6_b, d.parties_6_c, d.parties_6_d, d.parties_7_b, d.parties_7_c,d.parties_7_d, d.parties_8_b, d.parties_8_c, d.parties_8_d, d.parties_9_b,d.parties_9_c, d.parties_9_d, d.parties_10_b, d.parties_10_c,
                    d.parties_10_d, d.parties_11_b, d.parties_11_c, d.parties_11_d,

                    e.plis_1_b, e.plis_1_c, e.plis_1_d, e.plis_1_e, e.plis_2_b,e.plis_2_c, e.plis_2_d, e.plis_2_e, e.plis_3_b, e.plis_3_c,e.plis_3_d, e.plis_3_e, e.plis_4_b, e.plis_4_c, e.plis_4_d,e.plis_4_e, e.plis_5_b, e.plis_5_c, e.plis_5_d, e.plis_5_e,
                    e.plis_6_b, e.plis_6_c, e.plis_6_d, e.plis_6_e,

                    f.key_deal_fac_1_b, f.key_deal_fac_1_c, f.key_deal_fac_1_d, f.key_deal_fac_1_e,f.key_deal_fac_1_f, f.key_deal_fac_2_b, f.key_deal_fac_2_c, f.key_deal_fac_2_d,f.key_deal_fac_2_e, f.key_deal_fac_2_f, f.key_deal_fac_3_b, f.key_deal_fac_3_c,
                    f.key_deal_fac_3_d, f.key_deal_fac_3_e, f.key_deal_fac_3_f, f.key_deal_fac_4_b,f.key_deal_fac_4_c, f.key_deal_fac_4_d, f.key_deal_fac_4_e, f.key_deal_fac_4_f,f.key_deal_fac_5_b, f.key_deal_fac_5_c, f.key_deal_fac_5_d, f.key_deal_fac_5_e,
                    f.key_deal_fac_5_f, f.key_deal_fac_6_b, f.key_deal_fac_6_c, f.key_deal_fac_6_d,f.key_deal_fac_6_e, f.key_deal_fac_6_f, f.key_deal_fac_7_b, f.key_deal_fac_7_c,f.key_deal_fac_7_d, f.key_deal_fac_7_e, f.key_deal_fac_7_f, f.key_deal_fac_8_b,
                    f.key_deal_fac_8_c, f.key_deal_fac_8_d, f.key_deal_fac_8_e, f.key_deal_fac_8_f,f.key_deal_fac_9_b, f.key_deal_fac_9_c, f.key_deal_fac_9_d, f.key_deal_fac_9_e,f.key_deal_fac_9_f, f.key_deal_fac_10_b, f.key_deal_fac_10_c, f.key_deal_fac_10_d,
                    f.key_deal_fac_10_e, f.key_deal_fac_10_f, f.key_deal_fac_11_b, f.key_deal_fac_11_c,f.key_deal_fac_11_d, f.key_deal_fac_11_e, f.key_deal_fac_11_f, f.key_deal_fac_12_b,f.key_deal_fac_12_c, f.key_deal_fac_12_d, f.key_deal_fac_12_e, f.key_deal_fac_12_f,
                    f.key_deal_fac_13_b, f.key_deal_fac_13_c, f.key_deal_fac_13_d, f.key_deal_fac_13_e,f.key_deal_fac_13_f, f.key_deal_fac_14_b, f.key_deal_fac_14_c, f.key_deal_fac_14_d,f.key_deal_fac_14_e, f.key_deal_fac_14_f, f.key_deal_fac_15_b, f.key_deal_fac_15_c,
                    f.key_deal_fac_15_d, f.key_deal_fac_15_e, f.key_deal_fac_15_f, f.key_deal_fac_16_b,f.key_deal_fac_16_c, f.key_deal_fac_17_b, f.key_deal_fac_17_c, f.key_deal_fac_18_b,f.key_deal_fac_18_c, f.key_deal_fac_19_b, f.key_deal_fac_19_c, f.key_deal_fac_20_b,
                    f.key_deal_fac_20_c, f.key_deal_fac_21_b, f.key_deal_fac_21_c, f.key_deal_fac_22_b,f.key_deal_fac_22_c, f.key_deal_fac_23_b, f.key_deal_fac_23_c
                    
                FROM TB_INFRCR_TRANSACTION a
                LEFT JOIN TB_INFRCR_TRANSACTION_OTHER_CPS b ON b.transID = a.transID
                LEFT JOIN TB_INFRCR_TRANSACTION_NBC_FOCUS c ON c.transID = a.transID
                LEFT JOIN TB_INFRCR_TRANSACTION_PARTIES d ON d.transID = a.transID
                LEFT JOIN TB_INFRCR_TRANSACTION_PLIS e ON e.transID = a.transID
                LEFT JOIN TB_INFRCR_TRANSACTION_KDF f ON f.transID = a.transID
                WHERE a.originator = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
                OR a.transactor = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
            `,
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

                b.ocps_fac_1_b,b.ocps_fac_1_c,b.ocps_fac_1_d,b.ocps_fac_1_e,b.ocps_fac_1_f,b.ocps_fac_2_b,b.ocps_fac_2_c,b.ocps_fac_2_d,b.ocps_fac_2_e,b.ocps_fac_2_f,b.ocps_fac_3_b,b.ocps_fac_3_c,b.ocps_fac_3_d,b.ocps_fac_3_e,b.ocps_fac_3_f,b.ocps_fac_4_b,b.ocps_fac_4_c,b.ocps_fac_4_d,b.ocps_fac_4_e,b.ocps_fac_4_f,
                b.ocps_fac_5_b,b.ocps_fac_5_c,b.ocps_fac_5_d,b.ocps_fac_5_e,b.ocps_fac_5_f,b.ocps_fac_6_b,b.ocps_fac_6_c,b.ocps_fac_6_d,b.ocps_fac_6_e,b.ocps_fac_6_f,b.ocps_fac_7_b,b.ocps_fac_7_c,b.ocps_fac_7_d,b.ocps_fac_7_e,b.ocps_fac_7_f,b.ocps_fac_8_b,b.ocps_fac_8_c,b.ocps_fac_8_d,b.ocps_fac_8_e,b.ocps_fac_8_f,
                b.ocps_fac_9_b,b.ocps_fac_9_c,b.ocps_fac_9_d,b.ocps_fac_9_e,b.ocps_fac_9_f,b.ocps_fac_10_b,b.ocps_fac_10_c,b.ocps_fac_10_d,b.ocps_fac_10_e,b.ocps_fac_10_f,b.ocps_fac_11_b,b.ocps_fac_11_c,b.ocps_fac_11_d,b.ocps_fac_11_e,b.ocps_fac_11_f,b.ocps_fac_12_b,b.ocps_fac_12_c,b.ocps_fac_12_d,b.ocps_fac_12_e,b.ocps_fac_12_f,
                b.ocps_fac_13_b,b.ocps_fac_13_c,b.ocps_fac_13_d,b.ocps_fac_13_e,b.ocps_fac_13_f,b.ocps_fac_14_b,b.ocps_fac_14_c,b.ocps_fac_14_d,b.ocps_fac_14_e,b.ocps_fac_14_f,b.ocps_fac_15_b,b.ocps_fac_15_c,b.ocps_fac_15_d,b.ocps_fac_15_e,b.ocps_fac_15_f,b.ocps_fac_16_b,b.ocps_fac_16_c,b.ocps_fac_16_d,b.ocps_fac_16_e,b.ocps_fac_16_f,
                b.ocps_fac_17_b,b.ocps_fac_17_c,b.ocps_fac_17_d,b.ocps_fac_17_e,b.ocps_fac_17_f,b.ocps_fac_18_b,b.ocps_fac_18_c,b.ocps_fac_18_d,b.ocps_fac_18_e,b.ocps_fac_18_f,b.ocps_fac_19_b,b.ocps_fac_19_c,b.ocps_fac_19_d,b.ocps_fac_19_e,b.ocps_fac_19_f,b.ocps_fac_20_b,b.ocps_fac_20_c,b.ocps_fac_20_d,b.ocps_fac_20_e,b.ocps_fac_20_f,

                c.nbc_focus_original_1_b, c.nbc_focus_original_1_c, c.nbc_focus_original_1_d, c.nbc_focus_original_2_b, c.nbc_focus_original_2_c,c.nbc_focus_original_2_d, c.nbc_focus_original_3_b, c.nbc_focus_original_3_c, c.nbc_focus_original_3_d, c.nbc_focus_original_4_b, c.nbc_focus_original_4_c,
                c.nbc_focus_original_4_d, c.nbc_focus_original_5_b, c.nbc_focus_original_5_c, c.nbc_focus_original_5_d, c.nbc_focus_apprv_1_b, c.nbc_focus_apprv_1_c,c.nbc_focus_apprv_2_b, c.nbc_focus_apprv_2_c, c.nbc_focus_apprv_3_b, c.nbc_focus_apprv_3_c, c.nbc_focus_apprv_4_b, c.nbc_focus_apprv_4_c,
                c.nbc_focus_apprv_5_b, c.nbc_focus_apprv_5_c,

                d.parties_1_b, d.parties_1_c, d.parties_1_d, d.parties_2_b, d.parties_2_c,d.parties_2_d, d.parties_3_b, d.parties_3_c, d.parties_3_d, d.parties_4_b,d.parties_4_c, d.parties_4_d, d.parties_5_b, d.parties_5_c, d.parties_5_d,
                d.parties_6_b, d.parties_6_c, d.parties_6_d, d.parties_7_b, d.parties_7_c,d.parties_7_d, d.parties_8_b, d.parties_8_c, d.parties_8_d, d.parties_9_b,d.parties_9_c, d.parties_9_d, d.parties_10_b, d.parties_10_c,
                d.parties_10_d, d.parties_11_b, d.parties_11_c, d.parties_11_d,

                e.plis_1_b, e.plis_1_c, e.plis_1_d, e.plis_1_e, e.plis_2_b,e.plis_2_c, e.plis_2_d, e.plis_2_e, e.plis_3_b, e.plis_3_c,e.plis_3_d, e.plis_3_e, e.plis_4_b, e.plis_4_c, e.plis_4_d,e.plis_4_e, e.plis_5_b, e.plis_5_c, e.plis_5_d, e.plis_5_e,
                e.plis_6_b, e.plis_6_c, e.plis_6_d, e.plis_6_e,

                f.key_deal_fac_1_b, f.key_deal_fac_1_c, f.key_deal_fac_1_d, f.key_deal_fac_1_e,f.key_deal_fac_1_f, f.key_deal_fac_2_b, f.key_deal_fac_2_c, f.key_deal_fac_2_d,f.key_deal_fac_2_e, f.key_deal_fac_2_f, f.key_deal_fac_3_b, f.key_deal_fac_3_c,
                f.key_deal_fac_3_d, f.key_deal_fac_3_e, f.key_deal_fac_3_f, f.key_deal_fac_4_b,f.key_deal_fac_4_c, f.key_deal_fac_4_d, f.key_deal_fac_4_e, f.key_deal_fac_4_f,f.key_deal_fac_5_b, f.key_deal_fac_5_c, f.key_deal_fac_5_d, f.key_deal_fac_5_e,
                f.key_deal_fac_5_f, f.key_deal_fac_6_b, f.key_deal_fac_6_c, f.key_deal_fac_6_d,f.key_deal_fac_6_e, f.key_deal_fac_6_f, f.key_deal_fac_7_b, f.key_deal_fac_7_c,f.key_deal_fac_7_d, f.key_deal_fac_7_e, f.key_deal_fac_7_f, f.key_deal_fac_8_b,
                f.key_deal_fac_8_c, f.key_deal_fac_8_d, f.key_deal_fac_8_e, f.key_deal_fac_8_f,f.key_deal_fac_9_b, f.key_deal_fac_9_c, f.key_deal_fac_9_d, f.key_deal_fac_9_e,f.key_deal_fac_9_f, f.key_deal_fac_10_b, f.key_deal_fac_10_c, f.key_deal_fac_10_d,
                f.key_deal_fac_10_e, f.key_deal_fac_10_f, f.key_deal_fac_11_b, f.key_deal_fac_11_c,f.key_deal_fac_11_d, f.key_deal_fac_11_e, f.key_deal_fac_11_f, f.key_deal_fac_12_b,f.key_deal_fac_12_c, f.key_deal_fac_12_d, f.key_deal_fac_12_e, f.key_deal_fac_12_f,
                f.key_deal_fac_13_b, f.key_deal_fac_13_c, f.key_deal_fac_13_d, f.key_deal_fac_13_e,f.key_deal_fac_13_f, f.key_deal_fac_14_b, f.key_deal_fac_14_c, f.key_deal_fac_14_d,f.key_deal_fac_14_e, f.key_deal_fac_14_f, f.key_deal_fac_15_b, f.key_deal_fac_15_c,
                f.key_deal_fac_15_d, f.key_deal_fac_15_e, f.key_deal_fac_15_f, f.key_deal_fac_16_b,f.key_deal_fac_16_c, f.key_deal_fac_17_b, f.key_deal_fac_17_c, f.key_deal_fac_18_b,f.key_deal_fac_18_c, f.key_deal_fac_19_b, f.key_deal_fac_19_c, f.key_deal_fac_20_b,
                f.key_deal_fac_20_c, f.key_deal_fac_21_b, f.key_deal_fac_21_c, f.key_deal_fac_22_b,f.key_deal_fac_22_c, f.key_deal_fac_23_b, f.key_deal_fac_23_c
                
            FROM TB_INFRCR_TRANSACTION a
            LEFT JOIN TB_INFRCR_TRANSACTION_OTHER_CPS b ON b.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_NBC_FOCUS c ON c.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PARTIES d ON d.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PLIS e ON e.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_KDF f ON f.transID = a.transID
            WHERE a.originator = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
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
            
                a.* ,

                b.ocps_fac_1_b,b.ocps_fac_1_c,b.ocps_fac_1_d,b.ocps_fac_1_e,b.ocps_fac_1_f,b.ocps_fac_2_b,b.ocps_fac_2_c,b.ocps_fac_2_d,b.ocps_fac_2_e,b.ocps_fac_2_f,b.ocps_fac_3_b,b.ocps_fac_3_c,b.ocps_fac_3_d,b.ocps_fac_3_e,b.ocps_fac_3_f,b.ocps_fac_4_b,b.ocps_fac_4_c,b.ocps_fac_4_d,b.ocps_fac_4_e,b.ocps_fac_4_f,
                b.ocps_fac_5_b,b.ocps_fac_5_c,b.ocps_fac_5_d,b.ocps_fac_5_e,b.ocps_fac_5_f,b.ocps_fac_6_b,b.ocps_fac_6_c,b.ocps_fac_6_d,b.ocps_fac_6_e,b.ocps_fac_6_f,b.ocps_fac_7_b,b.ocps_fac_7_c,b.ocps_fac_7_d,b.ocps_fac_7_e,b.ocps_fac_7_f,b.ocps_fac_8_b,b.ocps_fac_8_c,b.ocps_fac_8_d,b.ocps_fac_8_e,b.ocps_fac_8_f,
                b.ocps_fac_9_b,b.ocps_fac_9_c,b.ocps_fac_9_d,b.ocps_fac_9_e,b.ocps_fac_9_f,b.ocps_fac_10_b,b.ocps_fac_10_c,b.ocps_fac_10_d,b.ocps_fac_10_e,b.ocps_fac_10_f,b.ocps_fac_11_b,b.ocps_fac_11_c,b.ocps_fac_11_d,b.ocps_fac_11_e,b.ocps_fac_11_f,b.ocps_fac_12_b,b.ocps_fac_12_c,b.ocps_fac_12_d,b.ocps_fac_12_e,b.ocps_fac_12_f,
                b.ocps_fac_13_b,b.ocps_fac_13_c,b.ocps_fac_13_d,b.ocps_fac_13_e,b.ocps_fac_13_f,b.ocps_fac_14_b,b.ocps_fac_14_c,b.ocps_fac_14_d,b.ocps_fac_14_e,b.ocps_fac_14_f,b.ocps_fac_15_b,b.ocps_fac_15_c,b.ocps_fac_15_d,b.ocps_fac_15_e,b.ocps_fac_15_f,b.ocps_fac_16_b,b.ocps_fac_16_c,b.ocps_fac_16_d,b.ocps_fac_16_e,b.ocps_fac_16_f,
                b.ocps_fac_17_b,b.ocps_fac_17_c,b.ocps_fac_17_d,b.ocps_fac_17_e,b.ocps_fac_17_f,b.ocps_fac_18_b,b.ocps_fac_18_c,b.ocps_fac_18_d,b.ocps_fac_18_e,b.ocps_fac_18_f,b.ocps_fac_19_b,b.ocps_fac_19_c,b.ocps_fac_19_d,b.ocps_fac_19_e,b.ocps_fac_19_f,b.ocps_fac_20_b,b.ocps_fac_20_c,b.ocps_fac_20_d,b.ocps_fac_20_e,b.ocps_fac_20_f,

                c.nbc_focus_original_1_b, c.nbc_focus_original_1_c, c.nbc_focus_original_1_d, c.nbc_focus_original_2_b, c.nbc_focus_original_2_c,c.nbc_focus_original_2_d, c.nbc_focus_original_3_b, c.nbc_focus_original_3_c, c.nbc_focus_original_3_d, c.nbc_focus_original_4_b, c.nbc_focus_original_4_c,
                c.nbc_focus_original_4_d, c.nbc_focus_original_5_b, c.nbc_focus_original_5_c, c.nbc_focus_original_5_d, c.nbc_focus_apprv_1_b, c.nbc_focus_apprv_1_c,c.nbc_focus_apprv_2_b, c.nbc_focus_apprv_2_c, c.nbc_focus_apprv_3_b, c.nbc_focus_apprv_3_c, c.nbc_focus_apprv_4_b, c.nbc_focus_apprv_4_c,
                c.nbc_focus_apprv_5_b, c.nbc_focus_apprv_5_c,

                d.parties_1_b, d.parties_1_c, d.parties_1_d, d.parties_2_b, d.parties_2_c,d.parties_2_d, d.parties_3_b, d.parties_3_c, d.parties_3_d, d.parties_4_b,d.parties_4_c, d.parties_4_d, d.parties_5_b, d.parties_5_c, d.parties_5_d,
                d.parties_6_b, d.parties_6_c, d.parties_6_d, d.parties_7_b, d.parties_7_c,d.parties_7_d, d.parties_8_b, d.parties_8_c, d.parties_8_d, d.parties_9_b,d.parties_9_c, d.parties_9_d, d.parties_10_b, d.parties_10_c,
                d.parties_10_d, d.parties_11_b, d.parties_11_c, d.parties_11_d,

                e.plis_1_b, e.plis_1_c, e.plis_1_d, e.plis_1_e, e.plis_2_b,e.plis_2_c, e.plis_2_d, e.plis_2_e, e.plis_3_b, e.plis_3_c,e.plis_3_d, e.plis_3_e, e.plis_4_b, e.plis_4_c, e.plis_4_d,e.plis_4_e, e.plis_5_b, e.plis_5_c, e.plis_5_d, e.plis_5_e,
                e.plis_6_b, e.plis_6_c, e.plis_6_d, e.plis_6_e,

                f.key_deal_fac_1_b, f.key_deal_fac_1_c, f.key_deal_fac_1_d, f.key_deal_fac_1_e,f.key_deal_fac_1_f, f.key_deal_fac_2_b, f.key_deal_fac_2_c, f.key_deal_fac_2_d,f.key_deal_fac_2_e, f.key_deal_fac_2_f, f.key_deal_fac_3_b, f.key_deal_fac_3_c,
                f.key_deal_fac_3_d, f.key_deal_fac_3_e, f.key_deal_fac_3_f, f.key_deal_fac_4_b,f.key_deal_fac_4_c, f.key_deal_fac_4_d, f.key_deal_fac_4_e, f.key_deal_fac_4_f,f.key_deal_fac_5_b, f.key_deal_fac_5_c, f.key_deal_fac_5_d, f.key_deal_fac_5_e,
                f.key_deal_fac_5_f, f.key_deal_fac_6_b, f.key_deal_fac_6_c, f.key_deal_fac_6_d,f.key_deal_fac_6_e, f.key_deal_fac_6_f, f.key_deal_fac_7_b, f.key_deal_fac_7_c,f.key_deal_fac_7_d, f.key_deal_fac_7_e, f.key_deal_fac_7_f, f.key_deal_fac_8_b,
                f.key_deal_fac_8_c, f.key_deal_fac_8_d, f.key_deal_fac_8_e, f.key_deal_fac_8_f,f.key_deal_fac_9_b, f.key_deal_fac_9_c, f.key_deal_fac_9_d, f.key_deal_fac_9_e,f.key_deal_fac_9_f, f.key_deal_fac_10_b, f.key_deal_fac_10_c, f.key_deal_fac_10_d,
                f.key_deal_fac_10_e, f.key_deal_fac_10_f, f.key_deal_fac_11_b, f.key_deal_fac_11_c,f.key_deal_fac_11_d, f.key_deal_fac_11_e, f.key_deal_fac_11_f, f.key_deal_fac_12_b,f.key_deal_fac_12_c, f.key_deal_fac_12_d, f.key_deal_fac_12_e, f.key_deal_fac_12_f,
                f.key_deal_fac_13_b, f.key_deal_fac_13_c, f.key_deal_fac_13_d, f.key_deal_fac_13_e,f.key_deal_fac_13_f, f.key_deal_fac_14_b, f.key_deal_fac_14_c, f.key_deal_fac_14_d,f.key_deal_fac_14_e, f.key_deal_fac_14_f, f.key_deal_fac_15_b, f.key_deal_fac_15_c,
                f.key_deal_fac_15_d, f.key_deal_fac_15_e, f.key_deal_fac_15_f, f.key_deal_fac_16_b,f.key_deal_fac_16_c, f.key_deal_fac_17_b, f.key_deal_fac_17_c, f.key_deal_fac_18_b,f.key_deal_fac_18_c, f.key_deal_fac_19_b, f.key_deal_fac_19_c, f.key_deal_fac_20_b,
                f.key_deal_fac_20_c, f.key_deal_fac_21_b, f.key_deal_fac_21_c, f.key_deal_fac_22_b,f.key_deal_fac_22_c, f.key_deal_fac_23_b, f.key_deal_fac_23_c

            FROM TB_INFRCR_TRANSACTION a
            LEFT JOIN TB_INFRCR_TRANSACTION_OTHER_CPS b ON b.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_NBC_FOCUS c ON c.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PARTIES d ON d.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_PLIS e ON e.transID = a.transID
            LEFT JOIN TB_INFRCR_TRANSACTION_KDF f ON f.transID = a.transID
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


// Deal Record Modification[only deal owner(originator or Transactor can modify deal)]

/*get the owner of deal when retrieving deals from transaction, check the owner is active or an admin

select deal where deal id === supplied deal id and originator or transactor is current user
*/

router.put('/update/:dealID', verifyTokenAndAuthorization, async (req, res) => {
    
    const client = await pool.connect();
    try {

        const updated_rec = { clientName, originator, transactor, industry, product,region,
            dealSize, coupon, tenor, moratorium, repaymentFrequency, amortizationStyle,
            mandateLetter, creditApproval, feeLetter, expectedClose, actualClose, NBC_approval_date, NBC_submitted_date,
            greenA, greenB, greenC, greenD, greenE, greenF, amberA,  amberB, amberC, 
            amberD, amberE, redA, redB, redC, redD, redE, structuringFeeAmount,structuringFeeAdvance,
            structuringFeeFinal, guaranteeFee, transactionLegalLead, notes, closed, monitoringFee, reimbursible,
            
                // OTHER CPS columns
            ocps_fac_1_b,ocps_fac_1_c,ocps_fac_1_d,ocps_fac_1_e,ocps_fac_1_f,ocps_fac_2_b,ocps_fac_2_c,ocps_fac_2_d,ocps_fac_2_e,ocps_fac_2_f,
            ocps_fac_3_b,ocps_fac_3_c,ocps_fac_3_d,ocps_fac_3_e,ocps_fac_3_f,ocps_fac_4_b,ocps_fac_4_c,ocps_fac_4_d,ocps_fac_4_e,ocps_fac_4_f,
            ocps_fac_5_b,ocps_fac_5_c,ocps_fac_5_d,ocps_fac_5_e,ocps_fac_5_f,ocps_fac_6_b,ocps_fac_6_c,ocps_fac_6_d,ocps_fac_6_e,ocps_fac_6_f,
            ocps_fac_7_b,ocps_fac_7_c,ocps_fac_7_d,ocps_fac_7_e,ocps_fac_7_f,ocps_fac_8_b,ocps_fac_8_c,ocps_fac_8_d,ocps_fac_8_e,ocps_fac_8_f,
            ocps_fac_9_b,ocps_fac_9_c,ocps_fac_9_d,ocps_fac_9_e,ocps_fac_9_f,ocps_fac_10_b,ocps_fac_10_c,ocps_fac_10_d,ocps_fac_10_e,ocps_fac_10_f,
            ocps_fac_11_b,ocps_fac_11_c,ocps_fac_11_d,ocps_fac_11_e,ocps_fac_11_f,ocps_fac_12_b,ocps_fac_12_c,ocps_fac_12_d,ocps_fac_12_e,ocps_fac_12_f,
            ocps_fac_13_b,ocps_fac_13_c,ocps_fac_13_d,ocps_fac_13_e,ocps_fac_13_f,ocps_fac_14_b,ocps_fac_14_c,ocps_fac_14_d,ocps_fac_14_e,ocps_fac_14_f,
            ocps_fac_15_b,ocps_fac_15_c,ocps_fac_15_d,ocps_fac_15_e,ocps_fac_15_f,ocps_fac_16_b,ocps_fac_16_c,ocps_fac_16_d,ocps_fac_16_e,ocps_fac_16_f,
            ocps_fac_17_b,ocps_fac_17_c,ocps_fac_17_d,ocps_fac_17_e,ocps_fac_17_f,ocps_fac_18_b,ocps_fac_18_c,ocps_fac_18_d,ocps_fac_18_e,ocps_fac_18_f,
            ocps_fac_19_b,ocps_fac_19_c,ocps_fac_19_d,ocps_fac_19_e,ocps_fac_19_f,ocps_fac_20_b,ocps_fac_20_c,ocps_fac_20_d,ocps_fac_20_e,ocps_fac_20_f,

            // NBC FOCUS Columns
            nbc_focus_original_1_b, nbc_focus_original_1_c, nbc_focus_original_1_d, nbc_focus_original_2_b, nbc_focus_original_2_c,
            nbc_focus_original_2_d, nbc_focus_original_3_b, nbc_focus_original_3_c, nbc_focus_original_3_d, nbc_focus_original_4_b, nbc_focus_original_4_c,
            nbc_focus_original_4_d, nbc_focus_original_5_b, nbc_focus_original_5_c, nbc_focus_original_5_d, nbc_focus_apprv_1_b, nbc_focus_apprv_1_c,
            nbc_focus_apprv_2_b, nbc_focus_apprv_2_c, nbc_focus_apprv_3_b, nbc_focus_apprv_3_c, nbc_focus_apprv_4_b, nbc_focus_apprv_4_c,
            nbc_focus_apprv_5_b, nbc_focus_apprv_5_c,

            // PARTIES Columns
            parties_1_b, parties_1_c, parties_1_d, parties_2_b, parties_2_c, parties_2_d, parties_3_b, parties_3_c, parties_3_d, parties_4_b,
            parties_4_c, parties_4_d, parties_5_b, parties_5_c, parties_5_d, parties_6_b, parties_6_c, parties_6_d, parties_7_b, parties_7_c, parties_7_d,
            parties_8_b, parties_8_c, parties_8_d, parties_9_b, parties_9_c, parties_9_d, parties_10_b, parties_10_c, parties_10_d, parties_11_b,
            parties_11_c, parties_11_d,

            // PLIS Columns
            plis_1_b, plis_1_c, plis_1_d, plis_1_e, plis_2_b, plis_2_c, plis_2_d, plis_2_e, plis_3_b, plis_3_c, plis_3_d, plis_3_e, plis_4_b,
            plis_4_c, plis_4_d, plis_4_e, plis_5_b, plis_5_c, plis_5_d, plis_5_e, plis_6_b, plis_6_c, plis_6_d, plis_6_e,

            // KEY DEAL FACTOR
            key_deal_fac_1_b, key_deal_fac_1_c, key_deal_fac_1_d, key_deal_fac_1_e, key_deal_fac_1_f, key_deal_fac_2_b, key_deal_fac_2_c, key_deal_fac_2_d,
            key_deal_fac_2_e, key_deal_fac_2_f, key_deal_fac_3_b, key_deal_fac_3_c, key_deal_fac_3_d, key_deal_fac_3_e, key_deal_fac_3_f, key_deal_fac_4_b,
            key_deal_fac_4_c, key_deal_fac_4_d, key_deal_fac_4_e, key_deal_fac_4_f, key_deal_fac_5_b, key_deal_fac_5_c, key_deal_fac_5_d, key_deal_fac_5_e,
            key_deal_fac_5_f, key_deal_fac_6_b, key_deal_fac_6_c, key_deal_fac_6_d, key_deal_fac_6_e, key_deal_fac_6_f, key_deal_fac_7_b, key_deal_fac_7_c,
            key_deal_fac_7_d, key_deal_fac_7_e, key_deal_fac_7_f, key_deal_fac_8_b, key_deal_fac_8_c, key_deal_fac_8_d, key_deal_fac_8_e, key_deal_fac_8_f,
            key_deal_fac_9_b, key_deal_fac_9_c, key_deal_fac_9_d, key_deal_fac_9_e, key_deal_fac_9_f, key_deal_fac_10_b, key_deal_fac_10_c,
            key_deal_fac_10_d, key_deal_fac_10_e, key_deal_fac_10_f, key_deal_fac_11_b, key_deal_fac_11_c, key_deal_fac_11_d, key_deal_fac_11_e,
            key_deal_fac_11_f, key_deal_fac_12_b, key_deal_fac_12_c, key_deal_fac_12_d, key_deal_fac_12_e, key_deal_fac_12_f, key_deal_fac_13_b,
            key_deal_fac_13_c, key_deal_fac_13_d, key_deal_fac_13_e, key_deal_fac_13_f, key_deal_fac_14_b, key_deal_fac_14_c, key_deal_fac_14_d,
            key_deal_fac_14_e, key_deal_fac_14_f, key_deal_fac_15_b, key_deal_fac_15_c, key_deal_fac_15_d, key_deal_fac_15_e, key_deal_fac_15_f,
            key_deal_fac_16_b, key_deal_fac_16_c, key_deal_fac_17_b, key_deal_fac_17_c, key_deal_fac_18_b, key_deal_fac_18_c, key_deal_fac_19_b,
            key_deal_fac_19_c, key_deal_fac_20_b, key_deal_fac_20_c, key_deal_fac_21_b, key_deal_fac_21_c, key_deal_fac_22_b, key_deal_fac_22_c,
            key_deal_fac_23_b, key_deal_fac_23_c
        } = req.body;
    
        const updated = [ updated_rec.clientName, updated_rec.originator, updated_rec.transactor,
                            updated_rec.industry, updated_rec.product, updated_rec.region,
                            updated_rec.dealSize, updated_rec.coupon, updated_rec.tenor,
                            updated_rec.moratorium, updated_rec.repaymentFrequency, updated_rec.amortizationStyle,
                            updated_rec.mandateLetter, updated_rec.creditApproval, updated_rec.feeLetter,
                            updated_rec.expectedClose, updated_rec.actualClose, updated_rec.greenA,
                            updated_rec.greenB, updated_rec.greenC, updated_rec.greenD,
                            updated_rec.greenE, updated_rec.greenF, updated_rec.amberA, 
                            updated_rec.amberB, updated_rec.amberC, updated_rec.amberD, 
                            updated_rec.amberE, updated_rec.redA, updated_rec.redB, 
                            updated_rec.redC, updated_rec.redD, updated_rec.redE, 
                            updated_rec.structuringFeeAmount, updated_rec.structuringFeeAdvance,
                            updated_rec.structuringFeeFinal, req.params.dealID, req.user.Email,
                            funcDealCategory(updated_rec.greenA, updated_rec.greenB, updated_rec.greenC, updated_rec.greenD,
                                updated_rec.greenE, updated_rec.greenF, updated_rec.amberA, updated_rec.amberB, updated_rec.amberC, 
                                updated_rec.amberD, updated_rec.amberE, updated_rec.product), updated_rec.transactionLegalLead, 
                                updated_rec.notes, updated_rec.closed, updated_rec.guaranteeFee, updated_rec.NBC_approval_date, updated_rec.NBC_submitted_date,
                                updated_rec.monitoringFee, updated_rec.reimbursible
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
        const update_ocps_data = [ updated_rec.ocps_fac_1_b,updated_rec.ocps_fac_1_c,updated_rec.ocps_fac_1_d,updated_rec.ocps_fac_1_e,updated_rec.ocps_fac_1_f,updated_rec.ocps_fac_2_b,updated_rec.ocps_fac_2_c,updated_rec.ocps_fac_2_d,updated_rec.ocps_fac_2_e,updated_rec.ocps_fac_2_f,
            updated_rec.ocps_fac_3_b,updated_rec.ocps_fac_3_c,updated_rec.ocps_fac_3_d,updated_rec.ocps_fac_3_e,updated_rec.ocps_fac_3_f,updated_rec.ocps_fac_4_b,updated_rec.ocps_fac_4_c,updated_rec.ocps_fac_4_d,updated_rec.ocps_fac_4_e,updated_rec.ocps_fac_4_f,
            updated_rec.ocps_fac_5_b,updated_rec.ocps_fac_5_c,updated_rec.ocps_fac_5_d,updated_rec.ocps_fac_5_e,updated_rec.ocps_fac_5_f,updated_rec.ocps_fac_6_b,updated_rec.ocps_fac_6_c,updated_rec.ocps_fac_6_d,updated_rec.ocps_fac_6_e,updated_rec.ocps_fac_6_f,
            updated_rec.ocps_fac_7_b,updated_rec.ocps_fac_7_c,updated_rec.ocps_fac_7_d,updated_rec.ocps_fac_7_e,updated_rec.ocps_fac_7_f,updated_rec.ocps_fac_8_b,updated_rec.ocps_fac_8_c,updated_rec.ocps_fac_8_d,updated_rec.ocps_fac_8_e,updated_rec.ocps_fac_8_f,
            updated_rec.ocps_fac_9_b,updated_rec.ocps_fac_9_c,updated_rec.ocps_fac_9_d,updated_rec.ocps_fac_9_e,updated_rec.ocps_fac_9_f,updated_rec.ocps_fac_10_b,updated_rec.ocps_fac_10_c,updated_rec.ocps_fac_10_d,updated_rec.ocps_fac_10_e,updated_rec.ocps_fac_10_f,
            updated_rec.ocps_fac_11_b,updated_rec.ocps_fac_11_c,updated_rec.ocps_fac_11_d,updated_rec.ocps_fac_11_e,updated_rec.ocps_fac_11_f,updated_rec.ocps_fac_12_b,updated_rec.ocps_fac_12_c,updated_rec.ocps_fac_12_d,updated_rec.ocps_fac_12_e,updated_rec.ocps_fac_12_f,
            updated_rec.ocps_fac_13_b,updated_rec.ocps_fac_13_c,updated_rec.ocps_fac_13_d,updated_rec.ocps_fac_13_e,updated_rec.ocps_fac_13_f,updated_rec.ocps_fac_14_b,updated_rec.ocps_fac_14_c,updated_rec.ocps_fac_14_d,updated_rec.ocps_fac_14_e,updated_rec.ocps_fac_14_f,
            updated_rec.ocps_fac_15_b,updated_rec.ocps_fac_15_c,updated_rec.ocps_fac_15_d,updated_rec.ocps_fac_15_e,updated_rec.ocps_fac_15_f,updated_rec.ocps_fac_16_b,updated_rec.ocps_fac_16_c,updated_rec.ocps_fac_16_d,updated_rec.ocps_fac_16_e,updated_rec.ocps_fac_16_f,
            updated_rec.ocps_fac_17_b,updated_rec.ocps_fac_17_c,updated_rec.ocps_fac_17_d,updated_rec.ocps_fac_17_e,updated_rec.ocps_fac_17_f,updated_rec.ocps_fac_18_b,updated_rec.ocps_fac_18_c,updated_rec.ocps_fac_18_d,updated_rec.ocps_fac_18_e,updated_rec.ocps_fac_18_f,
            updated_rec.ocps_fac_19_b,updated_rec.ocps_fac_19_c,updated_rec.ocps_fac_19_d,updated_rec.ocps_fac_19_e,updated_rec.ocps_fac_19_f,updated_rec.ocps_fac_20_b,updated_rec.ocps_fac_20_c,updated_rec.ocps_fac_20_d,updated_rec.ocps_fac_20_e,updated_rec.ocps_fac_20_f, req.params.dealID]

    
        const update_db_ocps = 
        `UPDATE TB_INFRCR_TRANSACTION_OTHER_CPS
            SET 
                ocps_fac_1_b = $1, ocps_fac_1_c = $2, ocps_fac_1_d = $3, ocps_fac_1_e = $4, ocps_fac_1_f = $5, ocps_fac_2_b = $6, ocps_fac_2_c = $7, ocps_fac_2_d = $8, 
                ocps_fac_2_e = $9, ocps_fac_2_f = $10, ocps_fac_3_b = $11, ocps_fac_3_c = $12, ocps_fac_3_d = $13, ocps_fac_3_e = $14, ocps_fac_3_f = $15, ocps_fac_4_b = $16, 
                ocps_fac_4_c = $17, ocps_fac_4_d = $18, ocps_fac_4_e = $19, ocps_fac_4_f = $20, ocps_fac_5_b = $21, ocps_fac_5_c = $22, ocps_fac_5_d = $23, ocps_fac_5_e = $24, 
                ocps_fac_5_f = $25, ocps_fac_6_b = $26, ocps_fac_6_c = $27, ocps_fac_6_d = $28, ocps_fac_6_e = $29, ocps_fac_6_f = $30, ocps_fac_7_b = $31, ocps_fac_7_c = $32, 
                ocps_fac_7_d = $33, ocps_fac_7_e = $34, ocps_fac_7_f = $35, ocps_fac_8_b = $36, ocps_fac_8_c = $37, ocps_fac_8_d = $38, ocps_fac_8_e = $39, ocps_fac_8_f = $40, 
                ocps_fac_9_b = $41, ocps_fac_9_c = $42, ocps_fac_9_d = $43, ocps_fac_9_e = $44, ocps_fac_9_f = $45, ocps_fac_10_b = $46, ocps_fac_10_c = $47, ocps_fac_10_d = $48, 
                ocps_fac_10_e = $49, ocps_fac_10_f = $50, ocps_fac_11_b = $51, ocps_fac_11_c = $52, ocps_fac_11_d = $53, ocps_fac_11_e = $54, ocps_fac_11_f = $55, ocps_fac_12_b = $56, 
                ocps_fac_12_c = $57, ocps_fac_12_d = $58, ocps_fac_12_e = $59, ocps_fac_12_f = $60, ocps_fac_13_b = $61, ocps_fac_13_c = $62, ocps_fac_13_d = $63, ocps_fac_13_e = $64, 
                ocps_fac_13_f = $65, ocps_fac_14_b = $66, ocps_fac_14_c = $67, ocps_fac_14_d = $68, ocps_fac_14_e = $69, ocps_fac_14_f = $70, ocps_fac_15_b = $71, ocps_fac_15_c = $72, 
                ocps_fac_15_d = $73, ocps_fac_15_e = $74, ocps_fac_15_f = $75, ocps_fac_16_b = $76, ocps_fac_16_c = $77, ocps_fac_16_d = $78, ocps_fac_16_e = $79, ocps_fac_16_f = $80, 
                ocps_fac_17_b = $81, ocps_fac_17_c = $82, ocps_fac_17_d = $83, ocps_fac_17_e = $84, ocps_fac_17_f = $85, ocps_fac_18_b = $86, ocps_fac_18_c = $87, ocps_fac_18_d = $88, 
                ocps_fac_18_e = $89, ocps_fac_18_f = $90, ocps_fac_19_b = $91, ocps_fac_19_c = $92, ocps_fac_19_d = $93, ocps_fac_19_e = $94, ocps_fac_19_f = $95, ocps_fac_20_b = $96,
                ocps_fac_20_c = $97, ocps_fac_20_d = $98, ocps_fac_20_e = $99, ocps_fac_20_f = $100
            
            WHERE transID = $101
        RETURNING *`
        const res_ocps_upd = await client.query(update_db_ocps, update_ocps_data)

        
        // NBC FOCUS Columns
        const update_nbc_focus_data = [ 
            updated_rec.nbc_focus_original_1_b, updated_rec.nbc_focus_original_1_c, updated_rec.nbc_focus_original_1_d, updated_rec.nbc_focus_original_2_b, updated_rec.nbc_focus_original_2_c, 
            updated_rec.nbc_focus_original_2_d, updated_rec.nbc_focus_original_3_b, updated_rec.nbc_focus_original_3_c, updated_rec.nbc_focus_original_3_d, updated_rec.nbc_focus_original_4_b, 
            updated_rec.nbc_focus_original_4_c, updated_rec.nbc_focus_original_4_d, updated_rec.nbc_focus_original_5_b, updated_rec.nbc_focus_original_5_c, updated_rec.nbc_focus_original_5_d, 
            updated_rec.nbc_focus_apprv_1_b, updated_rec.nbc_focus_apprv_1_c, updated_rec.nbc_focus_apprv_2_b, updated_rec.nbc_focus_apprv_2_c, updated_rec.nbc_focus_apprv_3_b, 
            updated_rec.nbc_focus_apprv_3_c, updated_rec.nbc_focus_apprv_4_b, updated_rec.nbc_focus_apprv_4_c, updated_rec.nbc_focus_apprv_5_b, updated_rec.nbc_focus_apprv_5_c,
            req.params.dealID]

    
        const update_db_nbc_focus = 
        `UPDATE TB_INFRCR_TRANSACTION_NBC_FOCUS
            SET 
            nbc_focus_original_1_b = $1, nbc_focus_original_1_c = $2, nbc_focus_original_1_d = $3, nbc_focus_original_2_b = $4, nbc_focus_original_2_c = $5, nbc_focus_original_2_d = $6, nbc_focus_original_3_b = $7, 
            nbc_focus_original_3_c = $8, nbc_focus_original_3_d = $9, nbc_focus_original_4_b = $10, nbc_focus_original_4_c = $11, nbc_focus_original_4_d = $12, nbc_focus_original_5_b = $13,
            nbc_focus_original_5_c = $14, nbc_focus_original_5_d = $15, nbc_focus_apprv_1_b = $16, nbc_focus_apprv_1_c = $17, nbc_focus_apprv_2_b = $18, nbc_focus_apprv_2_c = $19, nbc_focus_apprv_3_b = $20, 
            nbc_focus_apprv_3_c = $21, nbc_focus_apprv_4_b = $22, nbc_focus_apprv_4_c = $23, nbc_focus_apprv_5_b = $24, nbc_focus_apprv_5_c = $25
            
            WHERE transID = $26
        RETURNING *`
        const res_nbc_focus_upd = await client.query(update_db_nbc_focus, update_nbc_focus_data)


        // PARTIES Columns
        const update_parties_data = [ 
            updated_rec.parties_1_b, updated_rec.parties_1_c, updated_rec.parties_1_d, updated_rec.parties_2_b, updated_rec.parties_2_c, updated_rec.parties_2_d, updated_rec.parties_3_b, updated_rec.parties_3_c, 
            updated_rec.parties_3_d, updated_rec.parties_4_b, updated_rec.parties_4_c, updated_rec.parties_4_d, updated_rec.parties_5_b, updated_rec.parties_5_c, updated_rec.parties_5_d,
            updated_rec.parties_6_b, updated_rec.parties_6_c, updated_rec.parties_6_d, updated_rec.parties_7_b, updated_rec.parties_7_c, updated_rec.parties_7_d, updated_rec.parties_8_b, 
            updated_rec.parties_8_c, updated_rec.parties_8_d, updated_rec.parties_9_b, updated_rec.parties_9_c, updated_rec.parties_9_d, updated_rec.parties_10_b, updated_rec.parties_10_c, updated_rec.parties_10_d,
            updated_rec.parties_11_b, updated_rec.parties_11_c, updated_rec.parties_11_d,req.params.dealID]

    
        const update_db_parties = 
        `UPDATE TB_INFRCR_TRANSACTION_PARTIES
            SET 
            parties_1_b = $1, parties_1_c = $2, parties_1_d = $3, parties_2_b = $4, parties_2_c = $5, parties_2_d = $6, parties_3_b = $7, parties_3_c = $8, parties_3_d = $9, 
            parties_4_b = $10, parties_4_c = $11, parties_4_d = $12, parties_5_b = $13, parties_5_c = $14, parties_5_d = $15, parties_6_b = $16, parties_6_c = $17, parties_6_d = $18, parties_7_b = $19, parties_7_c = $20, parties_7_d = $21,
            parties_8_b = $22, parties_8_c = $23, parties_8_d = $24, parties_9_b = $25, parties_9_c = $26, parties_9_d = $27, parties_10_b = $28, parties_10_c = $29, parties_10_d = $30, parties_11_b = $31, parties_11_c = $32, parties_11_d = $33
            
            WHERE transID = $34
        RETURNING *`
        const res_parties_upd = await client.query(update_db_parties, update_parties_data)


     // PLIS Columns
     const update_plis_data = [ 
            updated_rec.plis_1_b, updated_rec.plis_1_c, updated_rec.plis_1_d, updated_rec.plis_1_e, updated_rec.plis_2_b, updated_rec.plis_2_c, updated_rec.plis_2_d, updated_rec.plis_2_e, 
            updated_rec.plis_3_b, updated_rec.plis_3_c, updated_rec.plis_3_d, updated_rec.plis_3_e, updated_rec.plis_4_b, updated_rec.plis_4_c, updated_rec.plis_4_d, updated_rec.plis_4_e, updated_rec.plis_5_b, updated_rec.plis_5_c,
            updated_rec.plis_5_d, updated_rec.plis_5_e, updated_rec.plis_6_b, updated_rec.plis_6_c, updated_rec.plis_6_d, updated_rec.plis_6_e, req.params.dealID]

    const update_db_plis = 
    `UPDATE TB_INFRCR_TRANSACTION_PLIS
        SET 
        plis_1_b=$1, plis_1_c=$2, plis_1_d=$3, plis_1_e=$4, plis_2_b=$5, plis_2_c=$6, plis_2_d=$7, plis_2_e=$8, plis_3_b=$9, plis_3_c=$10, plis_3_d=$11, 
        plis_3_e=$12, plis_4_b=$13, plis_4_c=$14, plis_4_d=$15, plis_4_e=$16, plis_5_b=$17, plis_5_c=$18, plis_5_d=$19, plis_5_e=$20, plis_6_b=$21, plis_6_c=$22, plis_6_d=$23, plis_6_e=$24
        WHERE transID = $25
    RETURNING *`
    const res_plis_upd = await client.query(update_db_plis, update_plis_data)

    
    // KEY DEAL FACTORS Columns
    const update_kdf_data = [ 
        updated_rec.key_deal_fac_1_b, updated_rec.key_deal_fac_1_c, updated_rec.key_deal_fac_1_d, updated_rec.key_deal_fac_1_e, updated_rec.key_deal_fac_1_f, updated_rec.key_deal_fac_2_b, updated_rec.key_deal_fac_2_c, 
        updated_rec.key_deal_fac_2_d, updated_rec.key_deal_fac_2_e, updated_rec.key_deal_fac_2_f, updated_rec.key_deal_fac_3_b, updated_rec.key_deal_fac_3_c, updated_rec.key_deal_fac_3_d,
        updated_rec.key_deal_fac_3_e, updated_rec.key_deal_fac_3_f, updated_rec.key_deal_fac_4_b, updated_rec.key_deal_fac_4_c, updated_rec.key_deal_fac_4_d, updated_rec.key_deal_fac_4_e, 
        updated_rec.key_deal_fac_4_f, updated_rec.key_deal_fac_5_b, updated_rec.key_deal_fac_5_c, updated_rec.key_deal_fac_5_d, updated_rec.key_deal_fac_5_e, updated_rec.key_deal_fac_5_f, updated_rec.key_deal_fac_6_b,
        updated_rec.key_deal_fac_6_c, updated_rec.key_deal_fac_6_d, updated_rec.key_deal_fac_6_e, updated_rec.key_deal_fac_6_f, updated_rec.key_deal_fac_7_b, updated_rec.key_deal_fac_7_c, updated_rec.key_deal_fac_7_d, 
        updated_rec.key_deal_fac_7_e, updated_rec.key_deal_fac_7_f, updated_rec.key_deal_fac_8_b, updated_rec.key_deal_fac_8_c, updated_rec.key_deal_fac_8_d, updated_rec.key_deal_fac_8_e,
        updated_rec.key_deal_fac_8_f, updated_rec.key_deal_fac_9_b, updated_rec.key_deal_fac_9_c, updated_rec.key_deal_fac_9_d, updated_rec.key_deal_fac_9_e, updated_rec.key_deal_fac_9_f, updated_rec.key_deal_fac_10_b, 
        updated_rec.key_deal_fac_10_c, updated_rec.key_deal_fac_10_d, updated_rec.key_deal_fac_10_e, updated_rec.key_deal_fac_10_f, updated_rec.key_deal_fac_11_b, updated_rec.key_deal_fac_11_c,
        updated_rec.key_deal_fac_11_d, updated_rec.key_deal_fac_11_e, updated_rec.key_deal_fac_11_f, updated_rec.key_deal_fac_12_b, updated_rec.key_deal_fac_12_c, updated_rec.key_deal_fac_12_d, 
        updated_rec.key_deal_fac_12_e, updated_rec.key_deal_fac_12_f, updated_rec.key_deal_fac_13_b, updated_rec.key_deal_fac_13_c, updated_rec.key_deal_fac_13_d, updated_rec.key_deal_fac_13_e,
        updated_rec.key_deal_fac_13_f, updated_rec.key_deal_fac_14_b, updated_rec.key_deal_fac_14_c, updated_rec.key_deal_fac_14_d, updated_rec.key_deal_fac_14_e, updated_rec.key_deal_fac_14_f, 
        updated_rec.key_deal_fac_15_b, updated_rec.key_deal_fac_15_c, updated_rec.key_deal_fac_15_d, updated_rec.key_deal_fac_15_e, updated_rec.key_deal_fac_15_f, updated_rec.key_deal_fac_16_b,
        updated_rec.key_deal_fac_16_c, updated_rec.key_deal_fac_17_b, updated_rec.key_deal_fac_17_c, updated_rec.key_deal_fac_18_b, updated_rec.key_deal_fac_18_c, updated_rec.key_deal_fac_19_b, 
        updated_rec.key_deal_fac_19_c, updated_rec.key_deal_fac_20_b, updated_rec.key_deal_fac_20_c, updated_rec.key_deal_fac_21_b, updated_rec.key_deal_fac_21_c, updated_rec.key_deal_fac_22_b,
        updated_rec.key_deal_fac_22_c, updated_rec.key_deal_fac_23_b, updated_rec.key_deal_fac_23_c,

         req.params.dealID]

    const update_db_kdf = 
    `UPDATE TB_INFRCR_TRANSACTION_KDF
        SET 
        key_deal_fac_1_b = $1, key_deal_fac_1_c = $2, key_deal_fac_1_d = $3, key_deal_fac_1_e = $4, key_deal_fac_1_f = $5, key_deal_fac_2_b = $6, key_deal_fac_2_c = $7, key_deal_fac_2_d = $8, key_deal_fac_2_e = $9, key_deal_fac_2_f = $10, 
        key_deal_fac_3_b = $11, key_deal_fac_3_c = $12, key_deal_fac_3_d = $13, key_deal_fac_3_e = $14, key_deal_fac_3_f = $15, key_deal_fac_4_b = $16, key_deal_fac_4_c = $17, key_deal_fac_4_d = $18, key_deal_fac_4_e = $19, key_deal_fac_4_f = $20, 
        key_deal_fac_5_b = $21, key_deal_fac_5_c = $22, key_deal_fac_5_d = $23, key_deal_fac_5_e = $24, key_deal_fac_5_f = $25, key_deal_fac_6_b = $26, 
        key_deal_fac_6_c = $27, key_deal_fac_6_d = $28, key_deal_fac_6_e = $29, key_deal_fac_6_f = $30, key_deal_fac_7_b = $31, key_deal_fac_7_c = $32, key_deal_fac_7_d = $33,
        key_deal_fac_7_e = $34, key_deal_fac_7_f = $35, key_deal_fac_8_b = $36, key_deal_fac_8_c = $37, key_deal_fac_8_d = $38, key_deal_fac_8_e = $39, key_deal_fac_8_f = $40, 
        key_deal_fac_9_b = $41, key_deal_fac_9_c = $42, key_deal_fac_9_d = $43, key_deal_fac_9_e = $44, key_deal_fac_9_f = $45, key_deal_fac_10_b = $46, key_deal_fac_10_c = $47, 
        key_deal_fac_10_d = $48, key_deal_fac_10_e = $49, key_deal_fac_10_f = $50, key_deal_fac_11_b = $51, key_deal_fac_11_c = $52, key_deal_fac_11_d = $53, key_deal_fac_11_e = $54, 
        key_deal_fac_11_f = $55, key_deal_fac_12_b = $56, key_deal_fac_12_c = $57, key_deal_fac_12_d = $58, key_deal_fac_12_e = $59, key_deal_fac_12_f = $60, key_deal_fac_13_b = $61, key_deal_fac_13_c = $62, 
        key_deal_fac_13_d = $63, key_deal_fac_13_e = $64, key_deal_fac_13_f = $65, key_deal_fac_14_b = $66, key_deal_fac_14_c = $67, key_deal_fac_14_d = $68, key_deal_fac_14_e = $69, key_deal_fac_14_f = $70, 
        key_deal_fac_15_b = $71, key_deal_fac_15_c = $72, key_deal_fac_15_d = $73, key_deal_fac_15_e = $74, key_deal_fac_15_f = $75, key_deal_fac_16_b = $76, key_deal_fac_16_c = $77, key_deal_fac_17_b = $78, 
        key_deal_fac_17_c = $79, key_deal_fac_18_b = $80, key_deal_fac_18_c = $81, key_deal_fac_19_b = $82, key_deal_fac_19_c = $83, key_deal_fac_20_b = $84, key_deal_fac_20_c = $85, key_deal_fac_21_b = $86, 
        key_deal_fac_21_c = $87, key_deal_fac_22_b = $88, key_deal_fac_22_c = $89, key_deal_fac_23_b = $90, key_deal_fac_23_c = $91
        
        WHERE transID = $92
    RETURNING *`

    const res_kdf_upd = await client.query(update_db_kdf, update_kdf_data)


        await client.query('COMMIT')
        
        
        let transUpdateResp = Object.assign(res_.rows[0], res_ocps_upd.rows[0], res_nbc_focus_upd.rows[0], res_parties_upd.rows[0], res_plis_upd.rows[0], res_kdf_upd.rows[0]);
        // let transUpdateResp = Object.assign( res_.rows[0], res_ocps_upd.rows[0]);

        res.json({
            status: (res.statusCode = 200),
            message: "Deal UPDATED Successfully",
            dealInfo: transUpdateResp,
      
          });
        
    } catch (e) {
        await client.query('ROLLBACK')
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});

module.exports = router;
