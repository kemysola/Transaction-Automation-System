const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors"); //Review
const path = require("path")

// Routes
const authRoute = require("./backend/routes/auth");
const staffRegRoute = require("./backend/routes/staff");
const transactionRoute = require("./backend/routes/transaction");
const reportsRoute = require("./backend/routes/reporting");
const passwdReset = require("./backend/routes/password_reset");
const configRoute = require("./backend/routes/configuration");
const adminRoute = require("./backend/routes/admin");

dotenv.config();
// const app_port = process.env.APP_SERVER_PORT;
const app_port = process.env.PORT;

// Middlewares
app.use(cors()); //Review need in project
app.use(express.json()); //To get access to client's request.body as json object
//to use the build during the production.
app.use(express.static(path.join(__dirname, './frontend/frontend/build')));


app.set('port', app_port  || 3000)
// Implemeting all endpoints

app.use(express.static(path.join(__dirname, './frontend/frontend/build')));

try {
    app.use("/api/v1/auth", authRoute)
    app.use("/api/v1/staff", staffRegRoute)
    app.use("/api/v1/transaction", transactionRoute)
    app.use("/api/v1/report", reportsRoute)
    app.use("/api/v1/password_reset", passwdReset)
    app.use("/api/v1/configuration", configRoute)
    app.use("/api/v1/admin", adminRoute)
    
} catch (err) {
    console.error(err)
}

if(process.env.NODE_ENV === 'production'){
 // app.use(express.static('Frontend/frontend/build'))
 app.use(express.static(path.join(__dirname, 'Frontend/frontend/build')));
app.get("*", (req,res) =>{
res.sendFile(path.resolve(__dirname,"Frontend/frontend","build", "index.html"))
    
  })
 }

app.use(express.static(path.join(__dirname, './frontend/build')));
    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(__dirname,"Frontend/frontend","build", "index.html"))
    
    })



process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'Frontend/frontend/build/index.html'));
  });

app.listen(app_port || 3000, () => {
   console.log(`InfraCreditTRS Server Listening on Port: ${app.get('port')}`)

})

