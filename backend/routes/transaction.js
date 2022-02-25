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
        mandateLetter, creditApproval, feeLetter, expectedClose, actualClose,
        greenA, greenB, greenC, greenD, greenE, greenF, amberA,  amberB, amberC, 
        amberD, amberE, redA, redB, redC, redD, redE, structuringFeeAmount,structuringFeeAdvance,
        structuringFeeFinal, notes, closed } = req.body;

    const transaction_data = [ new_transaction.clientName, new_transaction.originator, new_transaction.transactor, 
                        new_transaction.industry, new_transaction.product, new_transaction.region,
                        new_transaction.dealSize, new_transaction.coupon, new_transaction.tenor,
                        new_transaction.moratorium, new_transaction.repaymentFrequency, new_transaction.amortizationStyle,
                        new_transaction.mandateLetter, new_transaction.creditApproval, new_transaction.feeLetter,
                        new_transaction.expectedClose, new_transaction.actualClose, new_transaction.greenA, 
                        new_transaction.greenB, new_transaction.greenC, new_transaction.greenD,
                        new_transaction.greenE, new_transaction.greenF, new_transaction.amberA, 
                        new_transaction.amberB, new_transaction.amberC, new_transaction.amberD, 
                        new_transaction.amberE, new_transaction.redA, new_transaction.redB, 
                        new_transaction.redC, new_transaction.redD, new_transaction.redE, 
                        new_transaction.structuringFeeAmount, new_transaction.structuringFeeAdvance,
                        new_transaction.structuringFeeFinal, funcDealCategory(new_transaction.greenA, 
                            new_transaction.greenB, new_transaction.greenC, new_transaction.greenD,
                            new_transaction.greenE, new_transaction.greenF, new_transaction.amberA, 
                            new_transaction.amberB, new_transaction.amberC, new_transaction.amberD, 
                            new_transaction.amberE, new_transaction.product), req.user.Email, new_transaction.transactionLegalLead, new_transaction.notes, new_transaction.closed
                    ]

    await client.query('BEGIN')
    
    const write_to_db = 
      `INSERT INTO TB_INFRCR_TRANSACTION(
                    clientName, originator, transactor, industry, product,region,
                    dealSize, coupon, tenor, moratorium, repaymentFrequency, amortizationStyle,
                    mandateLetter, creditApproval, feeLetter, expectedClose, actualClose,
                    greenA, greenB, greenC, greenD, greenE, greenF, amberA,  amberB, amberC, 
                    amberD, amberE, redA, redB, redC, redD, redE, structuringFeeAmount,structuringFeeAdvance,
                    structuringFeeFinal, deal_category, record_entry, transactionLegalLead, notes, closed
                  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38, $39, $40, $41) RETURNING *`

    const res_ = await client.query(write_to_db, transaction_data)              
    
    await client.query('COMMIT')
    // convert notes field to list
    res_.rows[0]['notes'] = res_.rows[0]['notes'].split('|')

    res.json({
      status: (res.statusCode = 200),
      message: "New Deal Created Successfully",
      dealInfo: res_.rows[0],

    });

  } catch (e) {
    await client.query('ROLLBACK')
    res.status(403).json({ Error: e.stack });
    // throw e
  }finally{
    client.release()
  }
});


/*Fetch Deal by ID - priviledged users*/
router.get('/item/:deal',verifyTokenAndAdmin, async (req, res) => {
    const client = await pool.connect();

    try {
        const deal_record_id = req.params.deal;
        const deal = await client.query(
            "SELECT * FROM TB_INFRCR_TRANSACTION WHERE transID = $1", [deal_record_id]);
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
            `SELECT * 
            FROM TB_INFRCR_TRANSACTION
            WHERE originator = (SELECT CONCAT(firstname,' ',lastname) FROM TB_TRS_USERS where email = $1)
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


/*Fetch all Deals(Priviledged Users only) */
router.get('/all_deals', verifyTokenAndAdmin, async (req, res) => {
    const client = await pool.connect();

    try {
        const all_deals = await client.query(
            `SELECT * FROM TB_INFRCR_TRANSACTION
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


// Deal Record Modification[only deal owner(originator or Transactor can modify deal)]

/*get the owner of deal when retrieving deals from transaction, check the owner is active or an admin

select deal where deal id === supplied deal id and originator or transactor is current user
*/

router.put('/update/:dealID', verifyTokenAndAuthorization, async (req, res) => {
    
    const client = await pool.connect();
    try {

        const updated_rec = { clientName, originator, transactor, industry, product,region,
            dealSize, coupon, tenor, moratorium, repaymentFrequency, amortizationStyle,
            mandateLetter, creditApproval, feeLetter, expectedClose, actualClose,
            greenA, greenB, greenC, greenD, greenE, greenF, amberA,  amberB, amberC, 
            amberD, amberE, redA, redB, redC, redD, redE, structuringFeeAmount,structuringFeeAdvance,
            structuringFeeFinal, transactionLegalLead, notes, closed } = req.body;
    
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
                                updated_rec.amberD, updated_rec.amberE, updated_rec.product), updated_rec.transactionLegalLead, updated_rec.notes, updated_rec.closed
                        ]
        await client.query('BEGIN')
        
        const update_db = 
        `UPDATE TB_INFRCR_TRANSACTION
         SET clientName = $1, originator = $2, transactor = $3, industry = $4, product = $5,region = $6,
            dealSize = $7, coupon = $8, tenor = $9, moratorium = $10, repaymentFrequency = $11, amortizationStyle = $12,
            mandateLetter = $13, creditApproval = $14 , feeLetter = $15, expectedClose = $16, actualClose = $17 ,
            greenA = $18, greenB = $19, greenC = $20, greenD = $21, greenE = $22, greenF = $23, amberA = $24,  amberB = $25, amberC = $26, 
            amberD = $27, amberE = $28, redA = $29, redB = $30, redC = $31, redD = $32 , redE = $33, structuringFeeAmount = $34,
            structuringFeeAdvance = $35,  structuringFeeFinal = $36, record_entry = $38, deal_category = $39, transactionLegalLead = $40, notes = $41, closed = $42
            WHERE transID = $37
        RETURNING *`
        const res_ = await client.query(update_db, updated) 
        
        await client.query('COMMIT')
        
        // convert notes field to list
        res_.rows[0]['notes'] = res_.rows[0]['notes'].split('|')

        res.json({
            status: (res.statusCode = 200),
            message: "Deal UPDATED Successfully",
            dealInfo: res_.rows[0],
      
          });
        
    } catch (e) {
        await client.query('ROLLBACK')
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }

});

module.exports = router;
