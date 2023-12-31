const router = require("express").Router();
const pool = require("../database");
const {verifyTokenAndAuthorization} = require("../middleware"); 

 //Use this to validate incoming financial year
 const fy_validator = (fy)=>{
    const reg = new RegExp('^[0-9]+$'); 
    return reg.test(fy)
  }

// fetch all staff level by authorized users
router.get('/level', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        const level = await client.query(
            `SELECT * FROM TB_INFRCR_STAFF_LEVELS
            `);
        
        if (level) { 
            res.status(200).send({
                status: (res.statusCode = 200),
                levels: level.rows
            })
        }

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// fetch all industry by authorized users
router.get('/industry', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        const industry = await client.query(
            `SELECT * FROM TB_INFRCR_INDUSTRY
            ORDER BY industryid
            `);
        
        if (industry) { 
            res.status(200).send({
                status: (res.statusCode = 200),
                industry: industry.rows
            })
        }

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// fetch all PRODUCT by authorized users
router.get('/product', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        const product = await client.query(
            `SELECT * FROM TB_INFRCR_PRODUCT
            `);
        
        if (product) { 
            res.status(200).send({
                status: (res.statusCode = 200),
                product: product.rows
            })
        }
        
    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// fetch all region by authorized users
router.get('/region', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        const region = await client.query(
            `SELECT * FROM TB_INFRCR_REGION
            `);
        
        if (region) { 
            res.status(200).send({
                status: (res.statusCode = 200),
                region: region.rows
            })
        }
        
    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// fetch all repayment frequencies by authorized users
router.get('/repay_freq', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        const frequency = await client.query(
            `SELECT * FROM TB_INFRCR_REPAYMENT_FRQ
            `);
        
        if (frequency) { 
            res.status(200).send({
                status: (res.statusCode = 200),
                frequency: frequency.rows
            })
        }
        
    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// fetch all amortization styles by authorized users
router.get('/amortiz_sty', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        const amortization = await client.query(
            `SELECT * FROM TB_INFRCR_AMORTIZATION_STY
            `);
        
        if (amortization) { 
            res.status(200).send({
                status: (res.statusCode = 200),
                amortization: amortization.rows
            })
        }
        
    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// fetch all deal category by authorized users
router.get('/category', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();

    try {
        const category = await client.query(
            `SELECT * FROM TB_INFRCR_DEAL_CATEGORY
            `);
        
        if (category) { 
            res.status(200).send({
                status: (res.statusCode = 200),
                category: category.rows
            })
        }
        
    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// fetch all staff by authorized users

router.get('/staff_list', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();
    try {
        const staff = await client.query(
            `
            SELECT CONCAT(firstname,' ',lastname) AS stafflist, email, isOriginator, isTransactor, isTransactionLegalLead,mandateletter,financialclose,creditcommiteeapproval,feeletter,financialclose,guaranteepipeline
            FROM TB_TRS_USERS
            `);
        if (staff) {
            res.status(200).send({
                status: (res.statusCode = 200),
                staffList: staff.rows
            })

        }

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// fetch all guarantee projection data  by authorized users
// --p(FY)
// --update forecast status when year = FY
// -- Deactivate when year != FY
router.get('/forecast/:financial_year', verifyTokenAndAuthorization, async (req, res) => {
    const client = await pool.connect();
    try {
        const financial_year = req.params.financial_year;
         const fin_year = fy_validator(financial_year.slice(-4))

         let final_year_slice = ''

        if(fin_year){
            final_year_slice = financial_year.slice(-4)
            
          }else{ 
            res.status(404).send({
              status: (res.statusCode = 404),
              message: 'Invalid Financial Year',
            });
            return;
          }

        const projectionyear = await client.query(
            `UPDATE TB_INFRCR_FORECAST
            SET status = 'Active'
            WHERE  projectionyear = $1;
            `, [final_year_slice]);

        const notProjectionyear = await client.query(
            `UPDATE TB_INFRCR_FORECAST
            SET status = 'Inactive'
            WHERE  projectionyear != $1;
            `, [final_year_slice]);

        const forecast = await client.query(
            `SELECT * FROM TB_INFRCR_FORECAST
            WHERE status = 'Active'
            ORDER BY projectionyear ASC
            `);
        
        if (forecast) { 
            res.status(200).send({
                status: (res.statusCode = 200),
                forecast: forecast.rows
            })
        }
        
    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

module.exports = router;
