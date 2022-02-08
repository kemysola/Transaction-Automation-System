// This manages the connection between the app server and the database server
const Pool = require("pg").Pool;
const dotenv = require("dotenv")
dotenv.config()


const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    
});


module.exports = pool;