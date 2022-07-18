--EndPoint Calls
--NOTE: All needs in their Header => token : Bearer <token value>
REGISTER FIRST USER: [http://localhost:5001/api/v1/staff/first_onboard] --Disable/Remove this endpoint definition upon go live
METHOD = POST
Body =>
{
    "email":"kunleogunlaja@leezro365.onmicrosoft.com", 
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


REGISTER STAFF: [http://localhost:5001/api/v1/staff/onboard]
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

FORGOT PASSWORD: [http://localhost:5001/api/v1/staff/forgotPassword]
METHOD = POST
Body =>

{
    "email":"eIsung@infracredit.ng",
    "newPassword":"password",
    "newPasswordConfirm":"password"
}

UPDATE DEAL RECORD: [http://localhost:5001/api/v1/transaction/update/3]
METHOD = PUT
BODY =>

{
    "transid": 70,
    "clientName": "Arab Energy Inc",
    "originator": "Kunle Ogunlaja",
    "transactor": "Kunle Ogunlaja",
    "transactionLegalLead": "Obong James",
    "industry": "Gas", 
    "product": "CRG",
    "region": "NC",
    "dealSize": 100000000,
    "coupon": 0,
    "tenor": 4,
    "moratorium": 0,
    "repaymentFrequency": "Annually",
    "amortizationStyle": "Annuity",
    "mandateLetter": 20221203,
    "creditApproval": 20221203,
    "feeLetter": 20221203,
    "expectedClose": 19000101,
    "actualClose": 19000101,
    "NBC_approval_date": 19000101,
    "NBC_submitted_date": 19000101,
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
    "structuringFeeAmount": 3,
    "structuringFeeAdvance": 5,
    "structuringFeeFinal": 5,
    "guaranteeFee": 2,
    "monitoringFee": 5000.00,
    "reimbursible": 8000.90,
    "notes": "",
    "closed": false,
   
    "nbcFocus":[
        {"id":23,
        "nbc_focus_original":"no information Updated", 
        "nbc_focus_original_yes_no":0, 
        "nbc_focus_original_date":"2022-06-14", 
        "nbc_focus_original_methodology":"testing",
        "nbc_focus_apprv_1_b":"Information will be later",
        "nbc_focus_apprv_1_c":"2022-06-14",
        "nbc_focus_apprv_2_b":"VARCHAR",
        "nbc_focus_apprv_2_c":"2022-06-01",
        "nbc_focus_apprv_3_b":"Some characters",
        "nbc_focus_apprv_3_c":"2022-05-20",
        "nbc_focus_apprv_4_b":"Got some ideas",
        "nbc_focus_apprv_4_c":"2022-03-19",
        "nbc_focus_apprv_5_b":"Coding is fun",
        "nbc_focus_apprv_5_c":"2021-01-11"
    },
    {   "id":24,
        "nbc_focus_original":"got some info Updated", 
        "nbc_focus_original_yes_no":1, 
        "nbc_focus_original_date":"2022-06-23", 
        "nbc_focus_original_methodology":"automatic ticket",
        "nbc_focus_apprv_1_c":"2022-06-14",
        "nbc_focus_apprv_2_b":"VARCHAR",
        "nbc_focus_apprv_2_c":"2022-06-01",
        "nbc_focus_apprv_3_b":"Not so many characters",
        "nbc_focus_apprv_3_c":"2022-05-20",
        "nbc_focus_apprv_4_b":"No playing around ideas",
        "nbc_focus_apprv_4_c":"2022-03-19",
        "nbc_focus_apprv_5_b":"Never Give Up",
        "nbc_focus_apprv_5_c":"2021-01-11"
    }],
    "parties":[
        {"id":25,
        "parties_role":"This is the main role Updated", 
        "parties_party":"party info is cool", 
        "parties_appointed":0, 
        "parties_status":"Status is Good to Go"
    },
    {   "id":26,
        "parties_role":"This is the secondary role Updated II", 
        "parties_party":"all party info is undefined", 
        "parties_appointed":1, 
        "parties_status":"Emergency"
    },
    {   "id":27,
        "parties_role":"This is the third role Updated III", 
        "parties_party":"party three", 
        "parties_appointed":1, 
        "parties_status":"Victory"
    }
    ],
    "plis":[
        {"id":29,
        "plis_particulars":"Just the particulars", 
        "plis_concern":"No Concerns", 
        "plis_weighting":10, 
        "plis_expected":"2021-01-11",
        "plis_status":"Active"
    },
    {   "id":30,
       "plis_particulars":"Backup particulars", 
        "plis_concern":"Limited Concerns", 
        "plis_weighting":5, 
        "plis_expected":"2023-01-14",
        "plis_status":"Pending"
    },{
        "id":31,
        "plis_particulars":"Just the particulars II", 
        "plis_concern":"No Concerns II", 
        "plis_weighting":10, 
        "plis_expected":"2021-01-11",
        "plis_status":"Active"
    },
    {   "id":32,
       "plis_particulars":"Backup particulars II", 
        "plis_concern":"Limited Concerns II", 
        "plis_weighting":5, 
        "plis_expected":"2023-01-14",
        "plis_status":"Pending"
    }
    ],
    "ocps":[
        {"id":17,
        "ocps_factors":"Fear Factor Updated Mutilated", 
        "ocps_yes_no":1, 
        "ocps_concern":"Power Outage Updated", 
        "ocps_expected":"2023-01-14",
        "ocps_resp_party":"DISCOs Updated",
        "ocps_status":"Unknown"
    },
    {   "id":18,
       "ocps_factors":"Fear Factor II Updated Mutilated II", 
        "ocps_yes_no":0, 
        "ocps_concern":"Power Outage II Updated", 
        "ocps_expected":"2023-01-14",
        "ocps_resp_party":"DISCOs II Updated",
        "ocps_status":"Pending"
    }],
    "kpi":[
        {"id":9,
        "kpi_factors":"KPI Factor", 
        "kpi_yes_no":0, 
        "kpi_concern":"KPI Power Outage", 
        "kpi_expected":"2023-01-14",
        "kpi_resp_party":"KPI DISCOs",
        "kpi_status":"Pending"
    }]
}

GET DEAL BY ID: [http://localhost:5001/api/v1/transaction/item/3]
METHOD = GET

GET ONLY CURRENT USER DEALS: [http://localhost:5001/api/v1/transaction/my_deals]
METHOD = GET

GET ALL DEALS: [http://localhost:5001/api/v1/transaction/all_deals]
METHOD = GET

REGISTER NEW DEAL: [http://localhost:5001/api/v1/transaction/createdeal]
METHOD = POST
BODY =>

{
    "clientName": "Arab Energy Inc",
    "originator": "Kunle Ogunlaja",
    "transactor": "Kunle Ogunlaja",
    "transactionLegalLead": "Obong James",
    "industry": "Gas", 
    "product": "CRG",
    "region": "NC",
    "dealSize": 100000000,
    "coupon": 0,
    "tenor": 4,
    "moratorium": 0,
    "repaymentFrequency": "Annually",
    "amortizationStyle": "Annuity",
    "mandateLetter": 20221203,
    "creditApproval": 20221203,
    "feeLetter": 20221203,
    "expectedClose": 19000101,
    "actualClose": 19000101,
    "NBC_approval_date": 19000101,
    "NBC_submitted_date": 19000101,
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
    "structuringFeeAmount": 3,
    "structuringFeeAdvance": 5,
    "structuringFeeFinal": 5,
    "guaranteeFee": 2,
    "monitoringFee": 5000.00,
    "reimbursible": 8000.90,
    "notes": "",
    "closed": false,
   
    "nbcFocus":[
        {
        "nbc_focus_original":"no information", 
        "nbc_focus_original_yes_no":0, 
        "nbc_focus_original_date":"2022-06-14", 
        "nbc_focus_original_methodology":"testing",
        "nbc_focus_apprv_1_b":"Information will be later",
        "nbc_focus_apprv_1_c":"2022-06-14",
        "nbc_focus_apprv_2_b":"VARCHAR",
        "nbc_focus_apprv_2_c":"2022-06-01",
        "nbc_focus_apprv_3_b":"Some characters",
        "nbc_focus_apprv_3_c":"2022-05-20",
        "nbc_focus_apprv_4_b":"Got some ideas",
        "nbc_focus_apprv_4_c":"2022-03-19",
        "nbc_focus_apprv_5_b":"Coding is fun",
        "nbc_focus_apprv_5_c":"2021-01-11"
    },
    {
        "nbc_focus_original":"got some info", 
        "nbc_focus_original_yes_no":1, 
        "nbc_focus_original_date":"2022-06-23", 
        "nbc_focus_original_methodology":"automatic ticket",
        "nbc_focus_apprv_1_c":"2022-06-14",
        "nbc_focus_apprv_2_b":"VARCHAR",
        "nbc_focus_apprv_2_c":"2022-06-01",
        "nbc_focus_apprv_3_b":"Not so many characters",
        "nbc_focus_apprv_3_c":"2022-05-20",
        "nbc_focus_apprv_4_b":"No playing around ideas",
        "nbc_focus_apprv_4_c":"2022-03-19",
        "nbc_focus_apprv_5_b":"Never Give Up",
        "nbc_focus_apprv_5_c":"2021-01-11"
    }],
    "parties":[
        {
        "parties_role":"This is the main role", 
        "parties_party":"party info is cool", 
        "parties_appointed":0, 
        "parties_status":"Status is Good to Go"
    },
    {
        "parties_role":"This is the secondary role", 
        "parties_party":"all party info is undefined", 
        "parties_appointed":1, 
        "parties_status":"Emergency"
    },
    {
        "parties_role":"This is the third role", 
        "parties_party":"party three", 
        "parties_appointed":1, 
        "parties_status":"Victory"
    }
    ],
    "plis":[
        {
        "plis_particulars":"Just the particulars", 
        "plis_concern":"No Concerns", 
        "plis_weighting":10, 
        "plis_expected":"2021-01-11",
        "plis_status":"Active"
    },
    {
       "plis_particulars":"Backup particulars", 
        "plis_concern":"Limited Concerns", 
        "plis_weighting":5, 
        "plis_expected":"2023-01-14",
        "plis_status":"Pending"
    },{
        "plis_particulars":"Just the particulars II", 
        "plis_concern":"No Concerns II", 
        "plis_weighting":10, 
        "plis_expected":"2021-01-11",
        "plis_status":"Active"
    },
    {
       "plis_particulars":"Backup particulars II", 
        "plis_concern":"Limited Concerns II", 
        "plis_weighting":5, 
        "plis_expected":"2023-01-14",
        "plis_status":"Pending"
    }
    ],
    "ocps":[
        {
        "ocps_factors":"Fear Factor", 
        "ocps_yes_no":1, 
        "ocps_concern":"Power Outage", 
        "ocps_expected":"2023-01-14",
        "ocps_resp_party":"DISCOs",
        "ocps_status":"Unknown"
    },
    {
       "ocps_factors":"Fear Factor II", 
        "ocps_yes_no":0, 
        "ocps_concern":"Power Outage II", 
        "ocps_expected":"2023-01-14",
        "ocps_resp_party":"DISCOs II",
        "ocps_status":"Pending"
    }],
    "kpi":[
        {
        "kpi_factors":"KPI Factor", 
        "kpi_yes_no":0, 
        "kpi_concern":"KPI Power Outage", 
        "kpi_expected":"2023-01-14",
        "kpi_resp_party":"KPI DISCOs",
        "kpi_status":"Pending"
    }]
}

LOGIN: [http://localhost:5001/api/v1/auth/app/login]
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

LANDING PAGE: [http://localhost:5001/api/v1/auth/]
METHOD = GET

REPORTING BY DATE PAGE: [http://localhost:5001/api/v1/report/2022-02-17/2022-02-17/''] #When no client_name is not specified
METHOD = GET

REPORTING BY DATE PAGE: [http://localhost:5001/api/v1/report/2022-02-17/2022-02-17/Exalz Holdings] #When client_name is specified
METHOD = GET

GET LEVEL: [http://localhost:5001/api/v1/configuration/level]
METHOD = GET

GET INDUSTRY: [http://localhost:5001/api/v1/configuration/industry]
METHOD = GET

GET PRODUCT: [http://localhost:5001/api/v1/configuration/product]
METHOD = GET

GET REGION: [http://localhost:5001/api/v1/configuration/region]
METHOD = GET

GET REPAYMENT FREQUENCY: [http://localhost:5001/api/v1/configuration/repay_freq]
METHOD = GET

GET AMORTIZATION STYLE: [http://localhost:5001/api/v1/configuration/amortiz_sty]
METHOD = GET

GET DEAL CATEGORY: [http://localhost:5001/api/v1/configuration/category]
METHOD = GET

GET STAFF LIST: [http://localhost:5001/api/v1/configuration/staff_list]
METHOD = GET

GET Guarantee Projection: [http://localhost:5001/api/v1/configuration/forecast]
METHOD = GET

GET report by year: [http://localhost:5001/api/v1/report/2022] # This can be used across the Management, Execution and Origination Dashboard to filter data
METHOD = GET



------------------------------
---Admin Module End points----
------------------------------
--- User MUST be an admin to access to the routes

---Industry
Create New Indutry: [http://localhost:5001/api/v1/admin/industry]
METHOD = POST
Body => {
    "industry": "clean energy"
}

Update Industry: [http://localhost:5001/api/v1/admin/industry/update/12]
METHOD = PUT
Body => {
    "industry": "Clean Energy"
}


---product
Create New Product: [http://localhost:5001/api/v1/admin/product]
METHOD = POST
Body => {
    "product": "inverter"
}

Update Product: [http://localhost:5001/api/v1/admin/product/update/7]
METHOD = PUT 
Body => {
    "product": "Inverter"
}

---level
Create New Level: [http://localhost:5001/api/v1/admin/level]
METHOD = POST
Body => {
    "level": "CTO"
}

Update Level: [http://localhost:5001/api/v1/admin/level/update/7]
METHOD = PUT 
Body => {
    "level": "CFO"
}

---forecast
Create New Forecast: [ http://localhost:5001/api/v1/admin/forecast]
METHOD = POST
Body => { 
    "projectionyear":"2022", 
    "cumulativegrowth":"300.4",
    "newdeals": "103.4"
}

Update Forecast: [http://localhost:5001/api/v1/admin/forecast/update/33]
METHOD = PUT 
Body => { 
    "projectionyear":"2022", 
    "cumulativegrowth":"300.4",
    "newdeals": "103.4"
}


GET all data for reporting http://localhost:5001/api/v1/report/report_data/all 
METHOD = GET
Response => {
"status": 200,
"transactionInfo": [
{
"clientname": "Arab Energy Inc",
"originator": "Kunle Ogunlaja",
"transactor": "Kunle Ogunlaja",
"transactionlegallead": "Obong James",
"industry": "Gas",
"product": "CRG",
"region": "NC",
"dealsize": "10",
"coupon": "0",
"tenor": 4,
"moratorium": 0,
"repaymentfrequency": "Annually",
"mandateletter": "2022-12-02T23:00:00.000Z",
"creditapproval": "2022-12-02T23:00:00.000Z",
"feeletter": "2022-12-02T23:00:00.000Z",
"expectedclose": "1899-12-31T23:46:25.000Z",
"actualclose": "1899-12-31T23:46:25.000Z",
"structuringfeeamount": "3",
"structuringfeeadvance": 5,
"structuringfeefinal": 5,
"guaranteefee": "2",
"monitoringfee": "50",
"reimbursible": "80.9",
"deal_category": "Red",
"closed": false,
"nbc_approval_date": "1899-12-31T23:46:25.000Z",
"nbc_submitted_date": "1899-12-31T23:46:25.000Z"
},
"staffInfo": [
{
"originationamount": "0",
"guaranteepipeline": "0",
"mandateletter": 0,
"creditcommiteeapproval": 0,
"feeletter": 0,
"financialclose": 0
},
]
}_


