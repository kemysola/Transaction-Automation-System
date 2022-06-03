const router = require("express").Router();
const pool = require("../database");
const {verifyTokenAndAdmin} = require("../middleware"); 



// create industry by authorized users
router.post('/industry', verifyTokenAndAdmin, async (req, res) => {
    
    const client = await pool.connect();

    try {
        const new_industry = { industry } = req.body

        const industry_data = [
            new_industry.industry
        ]

        await client.query('BEGIN')
        
        const write_to_db = 
        `INSERT INTO TB_INFRCR_INDUSTRY(industry) VALUES ($1) RETURNING *`
    
        
        const res_ = await client.query(write_to_db, industry_data)

        await client.query('COMMIT')

        res.json({
            status: (res.statusCode = 200),
            message: "Industry Created Successfully",
            industry: res_.rows[0],      
          });

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// update industry by authorized users
router.put('/industry/update/:industryid', verifyTokenAndAdmin, async (req, res) => {
    
    const client = await pool.connect();

    try {
        const industry_rec = { industry } = req.body

        const industry_data = [
            industry_rec.industry, req.params.industryid
        ]

        await client.query('BEGIN')
        
        const write_to_db = 
        `UPDATE TB_INFRCR_INDUSTRY SET industry = $1 WHERE industryid = $2 RETURNING *`
    
        
        const res_ = await client.query(write_to_db, industry_data)

        await client.query('COMMIT')

        res.json({
            status: (res.statusCode = 200),
            message: "Industry Record Updated Successfully",
            industry: res_.rows[0],      
          });

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

router.post('/product', verifyTokenAndAdmin, async (req, res) => {
    const client = await pool.connect();
    try {
        const new_product = { product } = req.body

        const product_data = [
            new_product.product
        ]

        await client.query('BEGIN')
        
        const write_to_db = 
        `INSERT INTO TB_INFRCR_PRODUCT(product) VALUES ($1) RETURNING *`
    
        
        const res_ = await client.query(write_to_db, product_data)

        await client.query('COMMIT')

        res.json({
            status: (res.statusCode = 200),
            message: "Product Created Successfully",
            product: res_.rows[0],      
          });

        
    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// update product by authorized users
router.put('/product/update/:productid', verifyTokenAndAdmin, async (req, res) => {
    
    const client = await pool.connect();

    try {
        const product_rec = { product } = req.body

        const product_data = [
            product_rec.product, req.params.productid
        ]

        await client.query('BEGIN')
        
        const write_to_db = 
        `UPDATE TB_INFRCR_PRODUCT SET product = $1 WHERE productid = $2 RETURNING *`
    
        
        const res_ = await client.query(write_to_db, product_data)

        await client.query('COMMIT')

        res.json({
            status: (res.statusCode = 200),
            message: "Product Record Updated Successfully",
            product: res_.rows[0],      
          });

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

router.post('/level', verifyTokenAndAdmin, async (req, res) => {
    const client = await pool.connect();
    try {
        const new_level = { level } = req.body

        const level_data = [
            new_level.level
        ]

        await client.query('BEGIN')
        
        const write_to_db = 
        `INSERT INTO TB_INFRCR_STAFF_LEVELS(stafflevel) VALUES ($1) RETURNING *`
    
        
        const res_ = await client.query(write_to_db, level_data)

        await client.query('COMMIT')

        res.json({
            status: (res.statusCode = 200),
            message: "Level Created Successfully",
            level: res_.rows[0],      
          });

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

// update level by authorized userd
router.put('/level/update/:levelid', verifyTokenAndAdmin, async (req, res) => {
    
    const client = await pool.connect();

    try {
        const level_rec = { level } = req.body

        const level_data = [
            level_rec.level, req.params.levelid
        ]

        await client.query('BEGIN')
        
        const write_to_db = 
        `UPDATE TB_INFRCR_STAFF_LEVELS SET stafflevel = $1 WHERE levelid = $2 RETURNING *`
    
        
        const res_ = await client.query(write_to_db, level_data)

        await client.query('COMMIT')

        res.json({
            status: (res.statusCode = 200),
            message: "Level Record Updated Successfully",
            level: res_.rows[0],      
          });

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

module.exports = router;
