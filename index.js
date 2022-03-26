const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors"); //Review
const path = require("path")
const bodyParser = require("body-parser")

// Routes
const authRoute = require("./backend/routes/auth");
const staffRegRoute = require("./backend/routes/staff");
const transactionRoute = require("./backend/routes/transaction");
const reportsRoute = require("./backend/routes/reporting");
const passwdReset = require("./backend/routes/password_reset");
const configRoute = require("./backend/routes/configuration");

dotenv.config();
const app_port = process.env.APP_SERVER_PORT;

// Middlewares
app.use(cors()); //Review need in project

app.use(express.json()); //To get access to client's request.body as json object
app.use(bodyParser.json());

//to use the build during the production.

//app.use(express.static(process.cwd()+"./Frontend/frontend/build/"));

app.use(express.static(path.join(__dirname, './frontend/frontend/build')));








try {
    app.use("/api/v1/auth", authRoute)
    app.use("/api/v1/staff", staffRegRoute)
    app.use("/api/v1/transaction", transactionRoute)
    app.use("/api/v1/report", reportsRoute)
    app.use("/api/v1/password_reset", passwdReset)
    app.use("/api/v1/configuration", configRoute)
    
} catch (err) {
    console.error(err)
}



process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './frontend/frontend/build/index.html'));
  });

/*app.get('*', (req,res) => {
    res.sendFile(process.cwd()+"./Frontend/frontend/build/index.html");
  });*/

app.listen(app_port || 5001, () => {
    console.log(`InfraCreditTRS Server Listening on Port: ${app_port}`)
});

