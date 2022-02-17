-- This script contains all DDLs for the application

-- Instruction: Run these commands on your Postgres instance
-- > psql -U <database username>  -P <databse passwprd>
-- postgres=# <your database commands> [lookup commands for working with Postgres]


CREATE DATABASE "InfraCreditTRS"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE TB_TRS_USERS(
    userID uuid DEFAULT uuid_generate_v4 (),
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    firstName  VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    createDate TIMESTAMP DEFAULT NOW(),
    lastUpdated TIMESTAMP DEFAULT NOW(),
    level VARCHAR(3),
    --Employee Bussiness Performance Data
    hasOriginationTarget BOOLEAN DEFAULT FALSE,
    originationAmount MONEY DEFAULT 00.0000,
    guaranteePipeline MONEY DEFAULT 00.0000,
    greenTransaction MONEY DEFAULT 00.0000,
    amberTransaction MONEY DEFAULT 00.0000,
    --Employee Performance Pay Data
    mandateLetter INT DEFAULT 0,
    creditCommiteeApproval INT DEFAULT 0,
    feeLetter INT DEFAULT 0,
    financialClose INT DEFAULT 0,
    originator INT DEFAULT 0,

    status VARCHAR DEFAULT 'Inactive',
    record_entry VARCHAR,
    activationCode VARCHAR
    PRIMARY KEY(email)
);

--###################[USER AUDITITNG BLOCK START]###################

--This trigger propagates all user CUD operations on TB_TRS_USERS table
CREATE TABLE TB_TRS_USERS_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
    userID uuid,
    email VARCHAR ,
    password VARCHAR,
    firstName  VARCHAR,
    lastName VARCHAR,
    isAdmin BOOLEAN,
    createDate TIMESTAMP,
    lastUpdated TIMESTAMP,
    level VARCHAR(3),
    --Employee Bussiness Performance Data
    hasOriginationTarget BOOLEAN,
    originationAmount MONEY,
    guaranteePipeline MONEY,
    greenTransaction MONEY,
    amberTransaction MONEY,
    --Employee Performance Pay Data
    mandateLetter INT,
    creditCommiteeApproval INT,
    feeLetter INT,
    financialClose INT,
    originator INT, --Added 2022Feb03(client wants to capture performance for Originators )

    status VARCHAR,
    record_entry VARCHAR,
    activationCode VARCHAR
);

CREATE OR REPLACE FUNCTION FUNC_TRS_USERS_AUDIT() RETURNS TRIGGER AS $TB_TRS_USERS_AUDIT$
    BEGIN
        --
        -- Create a row in TB_TRS_USERS_AUDIT to reflect the operation performed on TB_TRS_USERS,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO TB_TRS_USERS_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO TB_TRS_USERS_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO TB_TRS_USERS_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_TRS_USERS_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_USERS_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON TB_TRS_USERS
    FOR EACH ROW EXECUTE FUNCTION FUNC_TRS_USERS_AUDIT();

--###################[USER AUDITITNG BLOCK END]###################


--This table serves as the central repository for all deals
CREATE TABLE TB_INFRCR_TRANSACTION(
    transID INT GENERATED ALWAYS AS IDENTITY,
    clientName VARCHAR NOT NULL,
    originator VARCHAR NOT NULL,
    transactor VARCHAR NOT NULL,
    transactionLegalLead VARCHAR NULL,
    --Deal Profile
    industry VARCHAR NOT NULL, 
    product VARCHAR NOT NULL,
    region VARCHAR(2) NOT NULL,
    dealSize MONEY NOT NULL,
    coupon INT,
    tenor INT,
    moratorium INT,
    repaymentFrequency VARCHAR DEFAULT 'Semi-Annually',
    amortizationStyle VARCHAR DEFAULT 'Annuity',
    mandateLetter DATE NOT NULL,
    --Milestone Dates
    creditApproval DATE NOT NULL,
    feeLetter DATE,
    expectedClose DATE,
    actualClose DATE,
    --Deal Category Info
    greenA BOOLEAN DEFAULT FALSE, 
    greenB BOOLEAN DEFAULT FALSE,
    greenC BOOLEAN DEFAULT FALSE,
    greenD BOOLEAN DEFAULT FALSE,
    greenE BOOLEAN DEFAULT FALSE,
    greenF BOOLEAN DEFAULT FALSE,
    amberA BOOLEAN DEFAULT FALSE, 
    amberB BOOLEAN DEFAULT FALSE, 
    amberC BOOLEAN DEFAULT FALSE, 
    amberD BOOLEAN DEFAULT FALSE, 
    amberE BOOLEAN DEFAULT FALSE, 
    redA BOOLEAN DEFAULT TRUE, 
    redB BOOLEAN DEFAULT TRUE, 
    redC BOOLEAN DEFAULT TRUE, 
    redD BOOLEAN DEFAULT FALSE, 
    redE BOOLEAN DEFAULT FALSE, 
    --Fees and Reimbursible
    structuringFeeAmount MONEY DEFAULT 00.0000,
    structuringFeeAdvance INT,
    structuringFeeFinal INT,

    guaranteeFee INT,
    monitoringFee MONEY,
    reimbursible MONEY,

    record_entry VARCHAR,
    --Transaction Category
    deal_category VARCHAR,
    notes VARCHAR,
    closed BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(transID)
);

--###################[TRANSACTION AUDITITNG BLOCK START]###################

--This trigger propagates all user CUD operations on TB_INFRCR_TRANSACTION table
CREATE TABLE TB_INFRCR_TRANSACTION_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
    
    transID INT,
    clientName VARCHAR,
    originator VARCHAR,
    transactor VARCHAR,
    transactionLegalLead VARCHAR,
    --Deal Profile
    industry VARCHAR, 
    product VARCHAR,
    region VARCHAR(2),
    dealSize MONEY,
    coupon INT,
    tenor INT,
    moratorium INT,
    repaymentFrequency VARCHAR ,
    amortizationStyle VARCHAR,
    mandateLetter DATE,
    --Milestone Dates
    creditApproval DATE,
    feeLetter DATE,
    expectedClose DATE,
    actualClose DATE,
    --Deal Category Info
    greenA BOOLEAN , 
    greenB BOOLEAN ,
    greenC BOOLEAN ,
    greenD BOOLEAN ,
    greenE BOOLEAN ,
    greenF BOOLEAN ,
    amberA BOOLEAN , 
    amberB BOOLEAN , 
    amberC BOOLEAN , 
    amberD BOOLEAN , 
    amberE BOOLEAN , 
    redA BOOLEAN , 
    redB BOOLEAN , 
    redC BOOLEAN , 
    redD BOOLEAN , 
    redE BOOLEAN , 
    --Fees and Reimbursible
    structuringFeeAmount MONEY
    structuringFeeAdvance INT,
    structuringFeeFinal INT,

    guaranteeFee INT,
    monitoringFee MONEY,
    reimbursible MONEY,

    record_entry VARCHAR,
    --Transaction Category
    deal_category VARCHAR,
    notes VARCHAR,
    closed BOOLEAN DEFAULT FALSE,

);

CREATE OR REPLACE FUNCTION FUNC_TRS_TRANSACTION_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_USERS_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON TB_INFRCR_TRANSACTION
    FOR EACH ROW EXECUTE FUNCTION FUNC_TRS_TRANSACTION_AUDIT();

--###################[TRANSACTION AUDITITNG BLOCK END]###################

--This table holds the meaning of the various deal category as defined by the company
CREATE TABLE TB_INFRCR_DEAL_CATEGORY
(
categoryID VARCHAR(6),
description VARCHAR,
PRIMARY KEY(categoryID)
)
INSERT INTO TB_INFRCR_DEAL_CATEGORY(categoryID, description)
VALUES('greenA','Transaction has obtained Credit Committee approval'),
        ('greenB','Guarantee Document in agreed form'),
        ('greenC','Professional Parties to the Bond Issue appointed or selected'),
        ('greenD','Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks'),
        ('greenE','All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for completion on or before Financial Close'),
        ('greenF','Financial Close expected within 3-6 months'),
        ('amberA','Mandate Letter signed'),
        ('amberB','Transaction has obtained Credit Committe approval'),
        ('amberC','Professional Parties to the Bond issue appointed or selected'),
        ('amberD','Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks'),
        ('amberE','All Materials CPs with timelines for completion agreed with the client'),
        ('redA','Mandate Letter signed'),
        ('redB','Due dilligence ongoing'),
        ('redC','Pending Credit Committee approval'),
        ('redD','Client has expressed interest to defer transaction'),
        ('redE','Conditional refinancing guarantee transaction');


--All industries within the InfraCredit business net
CREATE TABLE TB_INFRCR_INDUSTRY
(
industryID INT GENERATED ALWAYS AS IDENTITY,
industry VARCHAR,
PRIMARY KEY(industry)
);
INSERT INTO TB_INFRCR_INDUSTRY(industry)
VALUES('On-grid Power'),
    ('Off-grid Power'),
    ('Agric. Infra.'),
    ('Gas'),
    ('Transportation'),
    ('Inputs to Infra'),
    ('Affordable Housing'),
    ('Education Infra.'),
    ('Healthcare'),
    ('Water/Waste'),
    ('ICT/Telecoms');

--All products within the InfraCredit business net
CREATE TABLE TB_INFRCR_PRODUCT
(
productID INT GENERATED ALWAYS AS IDENTITY,
product VARCHAR,
PRIMARY KEY(product)
);
INSERT INTO TB_INFRCR_PRODUCT(product)
VALUES('Public Bond'),
    ('Private Bond (Clean Energy)'),
    ('Contigent Refi. Gte'),
    ('Annuity PPP'),
    ('Blended Finance'),
    ('Private Bond (Other)');

--All geographical regions within the InfraCredit business net
CREATE TABLE TB_INFRCR_REGION
(
regionID INT GENERATED ALWAYS AS IDENTITY,
region VARCHAR(5),
country VARCHAR NULL,
PRIMARY KEY(region)
);
INSERT INTO TB_INFRCR_REGION(region, country)
VALUES('SW', 'NIGERIA'),
    ('SS', 'NIGERIA'),
    ('SE', 'NIGERIA'),
    ('NW', 'NIGERIA'),
    ('NC', 'NIGERIA'),
    ('NE', 'NIGERIA');

--All possible repayment frequencies defined by InfraCredit
CREATE TABLE TB_INFRCR_REPAYMENT_FRQ
(
ID INT GENERATED ALWAYS AS IDENTITY,
frequency VARCHAR,
PRIMARY KEY(frequency)
);
INSERT INTO TB_INFRCR_REPAYMENT_FRQ(frequency)
VALUES('Monthly'),
    ('Quarterly'),
    ('Semi-Annually'),
    ('Annually');

--All possible amortization styles defined by InfraCredit
CREATE TABLE TB_INFRCR_AMORTIZATION_STY
(
ID INT GENERATED ALWAYS AS IDENTITY,
amortizationStyle VARCHAR,
PRIMARY KEY(amortizationStyle)
);
INSERT INTO TB_INFRCR_AMORTIZATION_STY(amortizationStyle)
VALUES('Straight-Line'),
    ('Annuity'),
    ('Any Other');


--Create a function to generate this patter for deals' transaction ID
'INFCR0000000001'

--General Instruction to Front End Developers
-- mandateLetter DATE NOT NULL ** use datepicker
-- creditApproval DATE  ** use datepicker
-- feeLetter DATE  ** use datepicker
-- expectedClose DATE  ** use datepicker
-- actualClose DATE  ** use datepicker

--Questions for Client
--[Transaction Module]
--1. originator vs transactor relationship
--2. Structuring Fee's Advance and Final - How are they calculated
--3. What else needs to be audited

--[Next:=>]
---1. Create maintenance function on all tables
---2. Create timed trigger to run maintenance

--[Rules]:
--1. User status will be inactive until password is reset
--2. Only Admin role can onboard new staff
--3. Admin role will be granted after approval and from backend (review most convinient option)
