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
    "clientName": "Exalz Holdings",
    "originator": "James Chukwuma",
    "transactor": "Daniels Chidiebere",
    "transactionLegalLead": "AbdulAfiz Odogwu",
    "industry": "Energy", 
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
    "notes": "",
    "closed": false
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

{
    "clientName": "Exalz Holdings",
    "originator": "James Chukwuma",
    "transactor": "Daniels Chidiebere",
    "transactionLegalLead": "AbdulAfiz Odogwu",
    "industry": "Energy", 
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

REPORTING BY DATE PAGE: [http://localhost:5000/api/v1/report/2022-02-17/2022-02-17/''] #When no client_name is not specified
METHOD = GET

REPORTING BY DATE PAGE: [http://localhost:5000/api/v1/report/2022-02-17/2022-02-17/Exalz Holdings] #When client_name is specified
METHOD = GET

GET LEVEL: [http://localhost:5000/api/v1/configuration/level]
METHOD = GET

GET INDUSTRY: [http://localhost:5000/api/v1/configuration/industry]
METHOD = GET

GET PRODUCT: [http://localhost:5000/api/v1/configuration/product]
METHOD = GET

GET REGION: [http://localhost:5000/api/v1/configuration/region]
METHOD = GET

GET REPAYMENT FREQUENCY: [http://localhost:5000/api/v1/configuration/repay_freq]
METHOD = GET

GET AMORTIZATION STYLE: [http://localhost:5000/api/v1/configuration/amortiz_sty]
METHOD = GET

GET DEAL CATEGORY: [http://localhost:5000/api/v1/configuration/category]
METHOD = GET
