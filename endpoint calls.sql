--EndPoint Calls
--NOTE: All needs in their Header => token : Bearer <token value>
REGISTER FIRST USER: [http://localhost:5000/api/v1/staff/first_onboard] --Disable/Remove this endpoint definition upon go live
METHOD = POST
Body =>
{
    "email":"superadmin@infracredit.com", 
    "password":"superadmin", 
    "firstName":"super", 
    "lastName":"admin", 
    "level":"CEO",
    "hasOriginationTarget":1, 
    "originationAmount":200000000, 
    "guaranteePipeline":500000, 
    "greenTransaction":0, 
    "amberTransaction":0, 
    "mandateLetter":2, 
    "creditCommiteeApproval":8, 
    "feeLetter":10,
    "status": "Active",
    "isadmin": 1
}


REGISTER STAFF: [http://localhost:5000/api/v1/staff/onboard]
METHOD = POST
Body =>

{ 
    "email":"john3.doe@infracredit.com", 
    "password":"password", 
    "firstName":"John2", 
    "lastName":"Doe2", 
    "level":"CEO",
    "hasOriginationTarget":1, 
    "originationAmount":200000000, 
    "guaranteePipeline":500000, 
    "greenTransaction":0, 
    "amberTransaction":0, 
    "mandateLetter":12, 
    "creditCommiteeApproval":2, 
    "feeLetter":11
}

UPDATE DEAL RECORD: [http://localhost:5000/api/v1/transaction/update/3]
METHOD = PUT
BODY =>

{ 
    "clientName": "United Oils Ltd",
    "originator": "John2 Doe",
    "transactor": "John2 Doe",
    "industry": "Power", 
    "product": "Generator",
    "region": "NE",
    "dealSize": 5000000,
    "coupon": 0,
    "tenor": 5,
    "moratorium": 0,
    "repaymentFrequency": "Semi-Annually",
    "amortizationStyle": "Annuity",
    "mandateLetter": 20211203,
    "creditApproval": null,
    "feeLetter": null,
    "expectedClose": null,
    "actualClose": null,
    "greenA": true, 
    "greenB": true,
    "greenC": true,
    "greenD": true,
    "greenE": true,
    "greenF": true,
    "amberA": true, 
    "amberB": true, 
    "amberC": true, 
    "amberD": true, 
    "amberE": true, 
    "redA": true, 
    "redB": true, 
    "redC": true, 
    "redD": true, 
    "redE": true, 
    "structuringFeeAmount": 100000,
    "structuringFeeAdvance": 5,
    "structuringFeeFinal": 5
}

GET DEAL BY ID: [http://localhost:5000/api/v1/transaction/item/3]
METHOD = GET

GET ONLY CURRENT USER DEALS: [http://localhost:5000/api/v1/transaction/my_deals]
METHOD = GET

GET ALL DEALS: [http://localhost:5000/api/v1/transaction/all_deals]
METHOD = GET

REGISTER NEW DEAL: [http://localhost:5000/api/v1/transaction/createdeal]
METHOD = POST
BODY =>

<<<<<<< HEAD
{ 
=======
{
>>>>>>> 976818e50fa25753441dff26639aa87b14d3cacc
    "clientName": "Exalz Holdings",
    "originator": "James Chukwuma",
    "transactor": "Daniels Chidiebere",
    "transactionLegalLead": "AbdulAfiz Odogwu",
<<<<<<< HEAD
    "industry": "Energy",
=======
    "industry": "Energy", 
>>>>>>> 976818e50fa25753441dff26639aa87b14d3cacc
    "product": "CRG",
    "region": "SE",
    "dealSize": 110000000,
    "coupon": 0,
    "tenor": 10,
    "moratorium": 0,
    "repaymentFrequency": "Annually",
    "amortizationStyle": "Annuity",
    "mandateLetter": 20211203,
    "creditApproval": 20211203,
    "feeLetter": 20211203,
    "expectedClose": null,
    "actualClose": null,
    "greenA": false,
    "greenB": false,
    "greenC": false,
    "greenD": false,
    "greenE": false,
    "greenF": false,
<<<<<<< HEAD
    "amberA": false,
    "amberB": false,
    "amberC": false,
    "amberD": false,
    "amberE": false,
    "redA": true,
    "redB": true,
    "redC": true,
    "redD": false,
    "redE": false,
    "structuringFeeAmount": 3,
    "structuringFeeAdvance": 5,
    "structuringFeeFinal": 5,
=======
    "amberA": false, 
    "amberB": false, 
    "amberC": false, 
    "amberD": false, 
    "amberE": false, 
    "redA": true, 
    "redB": true, 
    "redC": true, 
    "redD": false, 
    "redE": false, 
    "structuringFeeAmount": 3,
    "structuringFeeAdvance": 5,
    "structuringFeeFinal": 5,
    "guaranteeFee": 2,
    "monitoringFee": 5000.00,
    "reimbursible": 8000.90,
>>>>>>> 976818e50fa25753441dff26639aa87b14d3cacc
    "notes": "",
    "closed": false
}

LOGIN: [http://localhost:5000/api/v1/auth/app/login]
METHOD = POST
BODY =>
{
    "email":"john.doe@infracredit.com",
    "password":"password"
}

{
    "email":"superadmin@infracredit.com",
    "password":"superadmin"
}

LANDING PAGE: [http://localhost:5000/api/v1/auth/]
METHOD = GET