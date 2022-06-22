const router = require("express").Router();
const { parse } = require("dotenv");
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


// b.	Forecasting Values; New Guarantee Forecast, Guarantee Pipeline Forecast, Deal Category Forecast 

// fetch all guarantee projection data  by authorized users
function projected_gurantee_pipeline(value_projection_year, newdeals) {
    let value = parseFloat(value_projection_year) + parseFloat(newdeals) 
    return (value * 1.5).toFixed(2)
}

function projected_green_and_amber_deals(newdeals){
    return parseFloat(newdeals * 1.5).toFixed(2)
}

function projected_green_transaction(value_projected_green_and_amber){
    return parseFloat(value_projected_green_and_amber * 0.7).toFixed(2)
}

router.post('/forecast', verifyTokenAndAdmin, async (req, res) => {
    const client = await pool.connect();
    try {
        const new_forecast = { projectionyear, cumulativegrowth, newdeals } = req.body

          // this gets the current year and adds 1 to get data for the projected year
          let nextprojectyear = parseInt(new_forecast.projectionyear) + 1
          // Query the db to get data for the projected year
          const get_projection_year = await client.query(`SELECT newdeals FROM TB_INFRCR_FORECAST WHERE projectionyear = $1`, [nextprojectyear]);
          // store the return value
          const value_projection_year = get_projection_year.rows[0].newdeals
          const value_projected_green_and_amber = projected_green_and_amber_deals(new_forecast.newdeals)
          const forecast_data = [
            new_forecast.projectionyear, new_forecast.cumulativegrowth, new_forecast.newdeals, projected_gurantee_pipeline(value_projection_year, new_forecast.newdeals), value_projected_green_and_amber, projected_green_transaction(value_projected_green_and_amber)
        ]

      

        await client.query('BEGIN')
        
        const write_to_db = 
        `INSERT INTO TB_INFRCR_FORECAST(projectionYear, cumulativeGrowth, newDeals, guaranteePipeline, greenAndAmberDeals, greenDeals) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
    
        
        const res_ = await client.query(write_to_db, forecast_data)

        await client.query('COMMIT')

        res.json({
            status: (res.statusCode = 200),
            message: "Forecast Created Successfully",
            forecast: res_.rows[0],      
          });

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
    }
})

router.put('/forecast/update/:forecastid', verifyTokenAndAdmin, async (req, res) => {
    
    const client = await pool.connect();

    try {
        const forecast_rec = { projectionyear, cumulativegrowth, newdeals } = req.body

        // this gets the current year and adds 1 to get data for the projected year
        let nextprojectyear = parseInt(forecast_rec.projectionyear) + 1
        // Query the db to get data for the projected year
        const get_projection_year = await client.query(`SELECT newdeals FROM TB_INFRCR_FORECAST WHERE projectionyear = $1`, [nextprojectyear]);
        // store the return value
        const value_projection_year = get_projection_year.rows[0].newdeals
        const value_projected_green_and_amber = projected_green_and_amber_deals(forecast_rec.newdeals)

        const forecast_data = [
            forecast_rec.projectionyear, forecast_rec.cumulativegrowth, forecast_rec.newdeals, projected_gurantee_pipeline(value_projection_year, forecast_rec.newdeals), value_projected_green_and_amber, projected_green_transaction(value_projected_green_and_amber),  req.params.forecastid
        ]

        await client.query('BEGIN')
        
        const write_to_db = 
        `UPDATE TB_INFRCR_FORECAST SET projectionYear = $1, cumulativeGrowth = $2, newDeals = $3, guaranteePipeline = $4, greenAndAmberDeals = $5, greenDeals = $6 WHERE projectionid = $7 RETURNING *`
    
        
        const res_ = await client.query(write_to_db, forecast_data)

        await client.query('COMMIT')

        res.json({
            status: (res.statusCode = 200),
            message: "Forecast Record Updated Successfully",
            forecast: res_.rows[0],      
          });

    } catch (e) {
        res.status(403).json({ Error: e.stack });
    }finally{
        client.release()
      }
});

module.exports = router;
