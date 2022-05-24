-- This script contains all DDLs for the application

-- Instruction: Run these commands on your Postgres instance
-- > psql -U <database username>  -P <databse passwprd>
-- postgres=# <your database commands> [lookup commands for working with Postgres]


CREATE DATABASE "trmsdb"
    WITH 
    OWNER = trmsdbserveradmin
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE SCHEMA IF NOT EXISTS trms;

ALTER USER trmsdbserveradmin SET search_path = trms, public;

CREATE TABLE trms.TB_TRS_USERS(
    -- userID uuid DEFAULT uuid_generate_v4 (),
    userID INT NOT NULL,
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
    originationAmount  NUMERIC DEFAULT 00.0000,
    guaranteePipeline  NUMERIC DEFAULT 00.0000,
    greenTransaction  NUMERIC DEFAULT 00.0000,
    amberTransaction  NUMERIC DEFAULT 00.0000,
    --Employee Performance Pay Data
    mandateLetter INT DEFAULT 0,
    creditCommiteeApproval INT DEFAULT 0,
    feeLetter INT DEFAULT 0,
    financialClose INT DEFAULT 0,
    originator INT DEFAULT 0,

    status VARCHAR DEFAULT 'Inactive',
    record_entry VARCHAR,
    activationCode VARCHAR,
    PRIMARY KEY(email)
);

CREATE SEQUENCE IF NOT EXISTS trms.user_id_seq
START 10000
INCREMENT 1
MINVALUE 10000
OWNED BY trms.TB_TRS_USERS.userID;
--###################[USER AUDITITNG BLOCK START]###################

--This trigger propagates all user CUD operations on TB_TRS_USERS table
CREATE TABLE trms.TB_TRS_USERS_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
    userID INT,
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
    originationAmount  NUMERIC,
    guaranteePipeline  NUMERIC,
    greenTransaction  NUMERIC,
    amberTransaction  NUMERIC,
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

CREATE OR REPLACE FUNCTION trms.FUNC_TRS_USERS_AUDIT() RETURNS TRIGGER AS $TB_TRS_USERS_AUDIT$
    BEGIN
        --
        -- Create a row in TB_TRS_USERS_AUDIT to reflect the operation performed on TB_TRS_USERS,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO trms.TB_TRS_USERS_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO trms.TB_TRS_USERS_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO trms.TB_TRS_USERS_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_TRS_USERS_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_USERS_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON trms.TB_TRS_USERS
    FOR EACH ROW EXECUTE FUNCTION trms.FUNC_TRS_USERS_AUDIT();

--###################[USER AUDITITNG BLOCK END]###################


--This table serves as the central repository for all deals

CREATE TABLE trms.TB_INFRCR_TRANSACTION(
    createDate DATE DEFAULT CURRENT_DATE,
    transID INT GENERATED ALWAYS AS IDENTITY,
    clientName VARCHAR NOT NULL,
    originator VARCHAR NOT NULL,
    transactor VARCHAR NOT NULL,
    transactionLegalLead VARCHAR NULL,
    --Deal Profile
    industry VARCHAR DEFAULT '' NOT NULL, 
    product VARCHAR NOT NULL,
    region VARCHAR(2) NOT NULL,
    dealSize NUMERIC DEFAULT 00.0000,
    coupon NUMERIC DEFAULT 00.00,
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
    structuringFeeAmount NUMERIC DEFAULT 00.0000,
    structuringFeeAdvance INT,
    structuringFeeFinal INT,

    guaranteeFee NUMERIC DEFAULT 00.00,
    monitoringFee NUMERIC DEFAULT 00.0000,
    reimbursible NUMERIC DEFAULT 00.0000,

    record_entry VARCHAR,
    --Transaction Category
    deal_category VARCHAR,
    notes VARCHAR,
    closed BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(transID)
);


--###################[TRANSACTION AUDITITNG BLOCK START]###################

--This trigger propagates all user CUD operations on TB_INFRCR_TRANSACTION table
CREATE TABLE trms.TB_INFRCR_TRANSACTION_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
    
    createDate DATE DEFAULT CURRENT_DATE,
    transID INT,
    clientName VARCHAR,
    originator VARCHAR,
    transactor VARCHAR,
    transactionLegalLead VARCHAR,
    --Deal Profile
    industry VARCHAR, 
    product VARCHAR,
    region VARCHAR(2),
    dealSize NUMERIC,
    coupon NUMERIC,
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
    structuringFeeAmount NUMERIC,
    structuringFeeAdvance INT,
    structuringFeeFinal INT,

    guaranteeFee NUMERIC,
    monitoringFee NUMERIC,
    reimbursible NUMERIC,

    record_entry VARCHAR,
    --Transaction Category
    deal_category VARCHAR,
    notes VARCHAR,
    closed BOOLEAN DEFAULT FALSE

);

CREATE OR REPLACE FUNCTION trms.FUNC_TRS_TRANSACTION_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON trms.TB_INFRCR_TRANSACTION
    FOR EACH ROW EXECUTE FUNCTION trms.FUNC_TRS_TRANSACTION_AUDIT();

--###################[TRANSACTION AUDITITNG BLOCK END]###################

--This table holds the meaning of the various deal category as defined by the company
CREATE TABLE trms.TB_INFRCR_DEAL_CATEGORY
(
categoryID VARCHAR(6),
description VARCHAR,
PRIMARY KEY(categoryID)
);
INSERT INTO trms.TB_INFRCR_DEAL_CATEGORY(categoryID, description)
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
CREATE TABLE trms.TB_INFRCR_INDUSTRY
(
industryID INT GENERATED ALWAYS AS IDENTITY,
industry VARCHAR,
PRIMARY KEY(industry)
);
INSERT INTO trms.TB_INFRCR_INDUSTRY(industry)
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
CREATE TABLE trms.TB_INFRCR_PRODUCT
(
productID INT GENERATED ALWAYS AS IDENTITY,
product VARCHAR,
PRIMARY KEY(product)
);
INSERT INTO trms.TB_INFRCR_PRODUCT(product)
VALUES('Public Bond'),
    ('Private Bond (Clean Energy)'),
    ('Contigent Refi. Gte'),
    ('Annuity PPP'),
    ('Blended Finance'),
    ('Private Bond (Other)');

--All geographical regions within the InfraCredit business net
CREATE TABLE trms.TB_INFRCR_REGION
(
regionID INT GENERATED ALWAYS AS IDENTITY,
region VARCHAR(5),
country VARCHAR NULL,
PRIMARY KEY(region)
);
INSERT INTO trms.TB_INFRCR_REGION(region, country)
VALUES('SW', 'NIGERIA'),
    ('SS', 'NIGERIA'),
    ('SE', 'NIGERIA'),
    ('NW', 'NIGERIA'),
    ('NC', 'NIGERIA'),
    ('NE', 'NIGERIA');

--All possible repayment frequencies defined by InfraCredit
CREATE TABLE trms.TB_INFRCR_REPAYMENT_FRQ
(
ID INT GENERATED ALWAYS AS IDENTITY,
frequency VARCHAR,
PRIMARY KEY(frequency)
);
INSERT INTO trms.TB_INFRCR_REPAYMENT_FRQ(frequency)
VALUES('Monthly'),
    ('Quarterly'),
    ('Semi-Annually'),
    ('Annually');

--All possible amortization styles defined by InfraCredit
CREATE TABLE trms.TB_INFRCR_AMORTIZATION_STY
(
ID INT GENERATED ALWAYS AS IDENTITY,
amortizationStyle VARCHAR,
PRIMARY KEY(amortizationStyle)
);
INSERT INTO trms.TB_INFRCR_AMORTIZATION_STY(amortizationStyle)
VALUES('Straight-Line'),
    ('Annuity'),
    ('Any Other');

--All possible staff level defined by InfraCredit
CREATE TABLE trms.TB_INFRCR_STAFF_LEVELS
(
levelID INT GENERATED ALWAYS AS IDENTITY,
staffLevel VARCHAR,
PRIMARY KEY(staffLevel)
);
INSERT INTO trms.TB_INFRCR_STAFF_LEVELS(staffLevel)
VALUES
    ('CEO'),
    ('VP'),
    ('AVP'),
    ('CONTRACT'),
    ('ANALYST');

--CONNECT THIS TO THE AD AND AUTO POPULATE THE LEVEL ONCE NAME IS SELECTED DURING TRANSACTION CREATION PROCESS
-- CREATE TABLE  IF NOT EXISTS TB_INFRCR_STAFFLIST
-- (
-- staffID INT GENERATED ALWAYS AS IDENTITY,
-- F= VARCHAR,
-- staffLevel VARCHAR NULL,
-- PRIMARY KEY(staffList)
-- );
-- INSERT INTO TB_INFRCR_STAFFLIST(staffList)
-- VALUES
--     ('Chinua Azubike'),
--     ('Daniel Mueller'),
--     ('Chido Onyilimba'),
--     ('Shadrach Iguh'),
--     ('Solape Oguntayo'),
--     ('Tolulope Adesina'),
--     ('Omolara Ekundayo'),
--     ('Yemi Rufai'),
--     ('Osaze Osaghae'),
--     ('Babajide Oladimeji'),
--     ('Obiajuru Adeniji'),
--     ('Uzoma Okoro'),
--     ('Muyiwa Jesuro');

INSERT INTO trms.TB_TRS_USERS(
                  userID, email, password, firstName, lastName,
                  level, hasOriginationTarget, originationAmount, guaranteePipeline,
                  greenTransaction, amberTransaction, mandateLetter, creditCommiteeApproval,
                  feeLetter, financialClose, record_entry, status, isadmin
                  )
values(nextval('trms.user_id_seq'), 'trms@infracredit.ng', 'U2FsdGVkX1/+HYRk+9HGscroXD/vVTXbCGYM43JRMVc=','appuser', 'appuser', 'mvp', false, 0, 0,0,0,0,0,0,0,'', 'Active', true)

-- Guarantee Projection Table as defined by Infracredit
CREATE TABLE trms.TB_INFRCR_FORECAST
(
projectionID INT GENERATED ALWAYS AS IDENTITY,
projectionYear INT,
cumulativeGrowth NUMERIC,
newDeals NUMERIC,
guaranteePipeline NUMERIC,
greenAndAmberDeals NUMERIC,
greenDeals NUMERIC,
PRIMARY KEY(projectionYear)
);
INSERT INTO trms.TB_INFRCR_FORECAST(projectionYear, cumulativeGrowth, newDeals, guaranteePipeline, greenAndAmberDeals, greenDeals)
VALUES(2021, 146.9, 103.4, 335.3, 155.1, 108.6),
    (2022, 267, 120.1, 388.7, 180.2, 126.1),
    (2023, 406, 139, 448.5, 208.5, 146.0),
    (2024, 566, 160, 501.0, 240.0, 168.0),
    (2025, 740, 174, 261.0, 261.0, 182.7)
--- Added new columns to transaction table
ALTER TABLE tb_infrcr_transaction
ADD COLUMN nbc_approval_date DATE,
ADD COLUMN nbc_submitted_date DATE;

ALTER TABLE tb_infrcr_transaction_audit
ADD COLUMN nbc_approval_date DATE,
ADD COLUMN nbc_submitted_date DATE;



-- DANIEL MULLER'S FEATURE : 2022-May-24
CREATE TABLE trms.TB_INFRCR_TRANSACTION_PLIS(
	transID INT,
	plis_1_b	VARCHAR,
	plis_1_c	NUMERIC,
	plis_1_d	DATE,
	plis_1_e	VARCHAR,
	plis_2_b	VARCHAR,
	plis_2_c	NUMERIC,
	plis_2_d	DATE,
	plis_2_e	VARCHAR,
	plis_3_b	VARCHAR,
	plis_3_c	NUMERIC,
	plis_3_d	DATE,
	plis_3_e	VARCHAR,
	plis_4_b	VARCHAR,
	plis_4_c	NUMERIC,
	plis_4_d	DATE,
	plis_4_e	VARCHAR,
	plis_5_b	VARCHAR,
	plis_5_c	NUMERIC,
	plis_5_d	DATE,
	plis_5_e	VARCHAR,
	plis_6_b	VARCHAR,
	plis_6_c	NUMERIC,
	plis_6_d	DATE,
	plis_6_e	VARCHAR
);

CREATE TABLE trms.TB_INFRCR_TRANSACTION_PLIS_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,

	transID INT,
	plis_1_b	VARCHAR,
	plis_1_c	NUMERIC,
	plis_1_d	DATE,
	plis_1_e	VARCHAR,
	plis_2_b	VARCHAR,
	plis_2_c	NUMERIC,
	plis_2_d	DATE,
	plis_2_e	VARCHAR,
	plis_3_b	VARCHAR,
	plis_3_c	NUMERIC,
	plis_3_d	DATE,
	plis_3_e	VARCHAR,
	plis_4_b	VARCHAR,
	plis_4_c	NUMERIC,
	plis_4_d	DATE,
	plis_4_e	VARCHAR,
	plis_5_b	VARCHAR,
	plis_5_c	NUMERIC,
	plis_5_d	DATE,
	plis_5_e	VARCHAR,
	plis_6_b	VARCHAR,
	plis_6_c	NUMERIC,
	plis_6_d	DATE,
	plis_6_e	VARCHAR
);
CREATE TABLE trms.TB_INFRCR_TRANSACTION_PARTIES(
	transID INT,
	parties_1_b	VARCHAR,
	parties_1_c	BOOLEAN DEFAULT FALSE,
	parties_1_d	VARCHAR,

	parties_2_b	VARCHAR,
	parties_2_c	BOOLEAN DEFAULT FALSE,
	parties_2_d	VARCHAR,

	parties_3_b	VARCHAR,
	parties_3_c	BOOLEAN DEFAULT FALSE,
	parties_3_d	VARCHAR,

	parties_4_b	VARCHAR,
	parties_4_c	BOOLEAN DEFAULT FALSE,
	parties_4_d	VARCHAR,

	parties_5_b	VARCHAR,
	parties_5_c	BOOLEAN DEFAULT FALSE,
	parties_5_d	VARCHAR,

	parties_6_b	VARCHAR,
	parties_6_c	BOOLEAN DEFAULT FALSE,
	parties_6_d	VARCHAR,

	parties_7_b	VARCHAR,
	parties_7_c	BOOLEAN DEFAULT FALSE,
	parties_7_d	VARCHAR,

	parties_8_b	VARCHAR,
	parties_8_c	BOOLEAN DEFAULT FALSE,
	parties_8_d	VARCHAR,

	parties_9_b	VARCHAR,
	parties_9_c	BOOLEAN DEFAULT FALSE,
	parties_9_d	VARCHAR,

	parties_10_b	VARCHAR,
	parties_10_c	BOOLEAN DEFAULT FALSE,
	parties_10_d	VARCHAR,

	parties_11_b	VARCHAR,
	parties_11_c	BOOLEAN DEFAULT FALSE,
	parties_11_d	VARCHAR
);

CREATE TABLE trms.TB_INFRCR_TRANSACTION_PARTIES_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
    
	transID INT,
	parties_1_b	VARCHAR,
	parties_1_c	Boolean,
	parties_1_d	VARCHAR,

	parties_2_b	VARCHAR,
	parties_2_c	Boolean,
	parties_2_d	VARCHAR,

	parties_3_b	VARCHAR,
	parties_3_c	Boolean,
	parties_3_d	VARCHAR,

	parties_4_b	VARCHAR,
	parties_4_c	Boolean,
	parties_4_d	VARCHAR,

	parties_5_b	VARCHAR,
	parties_5_c	Boolean,
	parties_5_d	VARCHAR,

	parties_6_b	VARCHAR,
	parties_6_c	Boolean,
	parties_6_d	VARCHAR,

	parties_7_b	VARCHAR,
	parties_7_c	Boolean,
	parties_7_d	VARCHAR,

	parties_8_b	VARCHAR,
	parties_8_c	Boolean,
	parties_8_d	VARCHAR,

	parties_9_b	VARCHAR,
	parties_9_c	Boolean,
	parties_9_d	VARCHAR,

	parties_10_b	VARCHAR,
	parties_10_c	Boolean,
	parties_10_d	VARCHAR,

	parties_11_b	VARCHAR,
	parties_11_c	Boolean,
	parties_11_d	VARCHAR
);
CREATE TABLE trms.TB_INFRCR_TRANSACTION_OTHER_CPS(
	transID INT,
	ocps_fac_1_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_1_c	VARCHAR,
	ocps_fac_1_d	VARCHAR,
	ocps_fac_1_e	VARCHAR,
	ocps_fac_1_f	VARCHAR,

	ocps_fac_2_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_2_c	VARCHAR,
	ocps_fac_2_d	VARCHAR,
	ocps_fac_2_e	VARCHAR,
	ocps_fac_2_f	VARCHAR,

	ocps_fac_3_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_3_c	VARCHAR,
	ocps_fac_3_d	VARCHAR,
	ocps_fac_3_e	VARCHAR,
	ocps_fac_3_f	VARCHAR,

	ocps_fac_4_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_4_c	VARCHAR,
	ocps_fac_4_d	VARCHAR,
	ocps_fac_4_e	VARCHAR,
	ocps_fac_4_f	VARCHAR,

	ocps_fac_5_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_5_c	VARCHAR,
	ocps_fac_5_d	VARCHAR,
	ocps_fac_5_e	VARCHAR,
	ocps_fac_5_f	VARCHAR,

	ocps_fac_6_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_6_c	VARCHAR,
	ocps_fac_6_d	VARCHAR,
	ocps_fac_6_e	VARCHAR,
	ocps_fac_6_f	VARCHAR,

	ocps_fac_7_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_7_c	VARCHAR,
	ocps_fac_7_d	VARCHAR,
	ocps_fac_7_e	VARCHAR,
	ocps_fac_7_f	VARCHAR,

	ocps_fac_8_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_8_c	VARCHAR,
	ocps_fac_8_d	VARCHAR,
	ocps_fac_8_e	VARCHAR,
	ocps_fac_8_f	VARCHAR,

	ocps_fac_9_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_9_c	VARCHAR,
	ocps_fac_9_d	VARCHAR,
	ocps_fac_9_e	VARCHAR,
	ocps_fac_9_f	VARCHAR,

	ocps_fac_10_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_10_c	VARCHAR,
	ocps_fac_10_d	VARCHAR,
	ocps_fac_10_e	VARCHAR,
	ocps_fac_10_f	VARCHAR,

	ocps_fac_11_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_11_c	VARCHAR,
	ocps_fac_11_d	VARCHAR,
	ocps_fac_11_e	VARCHAR,
	ocps_fac_11_f	VARCHAR,

	ocps_fac_12_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_12_c	VARCHAR,
	ocps_fac_12_d	VARCHAR,
	ocps_fac_12_e	VARCHAR,
	ocps_fac_12_f	VARCHAR,

	ocps_fac_13_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_13_c	VARCHAR,
	ocps_fac_13_d	VARCHAR,
	ocps_fac_13_e	VARCHAR,
	ocps_fac_13_f	VARCHAR,

	ocps_fac_14_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_14_c	VARCHAR,
	ocps_fac_14_d	VARCHAR,
	ocps_fac_14_e	VARCHAR,
	ocps_fac_14_f	VARCHAR,

	ocps_fac_15_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_15_c	VARCHAR,
	ocps_fac_15_d	VARCHAR,
	ocps_fac_15_e	VARCHAR,
	ocps_fac_15_f	VARCHAR,

	ocps_fac_16_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_16_c	VARCHAR,
	ocps_fac_16_d	VARCHAR,
	ocps_fac_16_e	VARCHAR,
	ocps_fac_16_f	VARCHAR,

	ocps_fac_17_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_17_c	VARCHAR,
	ocps_fac_17_d	VARCHAR,
	ocps_fac_17_e	VARCHAR,
	ocps_fac_17_f	VARCHAR,

	ocps_fac_18_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_18_c	VARCHAR,
	ocps_fac_18_d	VARCHAR,
	ocps_fac_18_e	VARCHAR,
	ocps_fac_18_f	VARCHAR,

	ocps_fac_19_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_19_c	VARCHAR,
	ocps_fac_19_d	VARCHAR,
	ocps_fac_19_e	VARCHAR,
	ocps_fac_19_f	VARCHAR,

	ocps_fac_20_b	BOOLEAN DEFAULT FALSE,
	ocps_fac_20_c	VARCHAR,
	ocps_fac_20_d	VARCHAR,
	ocps_fac_20_e	VARCHAR,
	ocps_fac_20_f	VARCHAR
);

CREATE TABLE trms.TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,

	transID INT,
	ocps_fac_1_b	BOOLEAN,
	ocps_fac_1_c	VARCHAR,
	ocps_fac_1_d	VARCHAR,
	ocps_fac_1_e	VARCHAR,
	ocps_fac_1_f	VARCHAR,

	ocps_fac_2_b	BOOLEAN,
	ocps_fac_2_c	VARCHAR,
	ocps_fac_2_d	VARCHAR,
	ocps_fac_2_e	VARCHAR,
	ocps_fac_2_f	VARCHAR,

	ocps_fac_3_b	BOOLEAN,
	ocps_fac_3_c	VARCHAR,
	ocps_fac_3_d	VARCHAR,
	ocps_fac_3_e	VARCHAR,
	ocps_fac_3_f	VARCHAR,

	ocps_fac_4_b	BOOLEAN,
	ocps_fac_4_c	VARCHAR,
	ocps_fac_4_d	VARCHAR,
	ocps_fac_4_e	VARCHAR,
	ocps_fac_4_f	VARCHAR,

	ocps_fac_5_b	BOOLEAN,
	ocps_fac_5_c	VARCHAR,
	ocps_fac_5_d	VARCHAR,
	ocps_fac_5_e	VARCHAR,
	ocps_fac_5_f	VARCHAR,

	ocps_fac_6_b	BOOLEAN,
	ocps_fac_6_c	VARCHAR,
	ocps_fac_6_d	VARCHAR,
	ocps_fac_6_e	VARCHAR,
	ocps_fac_6_f	VARCHAR,

	ocps_fac_7_b	BOOLEAN,
	ocps_fac_7_c	VARCHAR,
	ocps_fac_7_d	VARCHAR,
	ocps_fac_7_e	VARCHAR,
	ocps_fac_7_f	VARCHAR,

	ocps_fac_8_b	BOOLEAN,
	ocps_fac_8_c	VARCHAR,
	ocps_fac_8_d	VARCHAR,
	ocps_fac_8_e	VARCHAR,
	ocps_fac_8_f	VARCHAR,

	ocps_fac_9_b	BOOLEAN,
	ocps_fac_9_c	VARCHAR,
	ocps_fac_9_d	VARCHAR,
	ocps_fac_9_e	VARCHAR,
	ocps_fac_9_f	VARCHAR,

	ocps_fac_10_b	BOOLEAN,
	ocps_fac_10_c	VARCHAR,
	ocps_fac_10_d	VARCHAR,
	ocps_fac_10_e	VARCHAR,
	ocps_fac_10_f	VARCHAR,

	ocps_fac_11_b	BOOLEAN,
	ocps_fac_11_c	VARCHAR,
	ocps_fac_11_d	VARCHAR,
	ocps_fac_11_e	VARCHAR,
	ocps_fac_11_f	VARCHAR,

	ocps_fac_12_b	BOOLEAN,
	ocps_fac_12_c	VARCHAR,
	ocps_fac_12_d	VARCHAR,
	ocps_fac_12_e	VARCHAR,
	ocps_fac_12_f	VARCHAR,

	ocps_fac_13_b	BOOLEAN,
	ocps_fac_13_c	VARCHAR,
	ocps_fac_13_d	VARCHAR,
	ocps_fac_13_e	VARCHAR,
	ocps_fac_13_f	VARCHAR,

	ocps_fac_14_b	BOOLEAN,
	ocps_fac_14_c	VARCHAR,
	ocps_fac_14_d	VARCHAR,
	ocps_fac_14_e	VARCHAR,
	ocps_fac_14_f	VARCHAR,

	ocps_fac_15_b	BOOLEAN,
	ocps_fac_15_c	VARCHAR,
	ocps_fac_15_d	VARCHAR,
	ocps_fac_15_e	VARCHAR,
	ocps_fac_15_f	VARCHAR,

	ocps_fac_16_b	BOOLEAN,
	ocps_fac_16_c	VARCHAR,
	ocps_fac_16_d	VARCHAR,
	ocps_fac_16_e	VARCHAR,
	ocps_fac_16_f	VARCHAR,

	ocps_fac_17_b	BOOLEAN,
	ocps_fac_17_c	VARCHAR,
	ocps_fac_17_d	VARCHAR,
	ocps_fac_17_e	VARCHAR,
	ocps_fac_17_f	VARCHAR,

	ocps_fac_18_b	BOOLEAN,
	ocps_fac_18_c	VARCHAR,
	ocps_fac_18_d	VARCHAR,
	ocps_fac_18_e	VARCHAR,
	ocps_fac_18_f	VARCHAR,

	ocps_fac_19_b	BOOLEAN,
	ocps_fac_19_c	VARCHAR,
	ocps_fac_19_d	VARCHAR,
	ocps_fac_19_e	VARCHAR,
	ocps_fac_19_f	VARCHAR,

	ocps_fac_20_b	BOOLEAN,
	ocps_fac_20_c	VARCHAR,
	ocps_fac_20_d	VARCHAR,
	ocps_fac_20_e	VARCHAR,
	ocps_fac_20_f	VARCHAR
);
CREATE TABLE trms.TB_INFRCR_TRANSACTION_NBC_FOCUS(
	transID INT,
	nbc_focus_original_1_b	BOOLEAN DEFAULT FALSE,
	nbc_focus_original_1_c	DATE,
	nbc_focus_original_1_d	VARCHAR,
	
	nbc_focus_original_2_b	BOOLEAN DEFAULT FALSE,
	nbc_focus_original_2_c	DATE,
	nbc_focus_original_2_d	VARCHAR,
		
	nbc_focus_original_3_b	BOOLEAN DEFAULT FALSE,
	nbc_focus_original_3_c	DATE,
	nbc_focus_original_3_d	VARCHAR,
		
	nbc_focus_original_4_b	BOOLEAN DEFAULT FALSE,
	nbc_focus_original_4_c	DATE,
	nbc_focus_original_4_d	VARCHAR,
		
	nbc_focus_original_5_b	BOOLEAN DEFAULT FALSE,
	nbc_focus_original_5_c	DATE,
	nbc_focus_original_5_d	VARCHAR,
	
	nbc_focus_apprv_1_b	VARCHAR,
	nbc_focus_apprv_1_c	DATE,
		
	nbc_focus_apprv_2_b	VARCHAR,
	nbc_focus_apprv_2_c	DATE,
		
	nbc_focus_apprv_3_b	VARCHAR,
	nbc_focus_apprv_3_c	DATE,
		
	nbc_focus_apprv_4_b	VARCHAR,
	nbc_focus_apprv_4_c	DATE,
		
	nbc_focus_apprv_5_b	VARCHAR,
	nbc_focus_apprv_5_c	DATE
);

CREATE TABLE trms.TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,

	transID INT,
	nbc_focus_original_1_b	BOOLEAN,
	nbc_focus_original_1_c	DATE,
	nbc_focus_original_1_d	VARCHAR,
	
	nbc_focus_original_2_b	BOOLEAN,
	nbc_focus_original_2_c	DATE,
	nbc_focus_original_2_d	VARCHAR,
		
	nbc_focus_original_3_b	BOOLEAN,
	nbc_focus_original_3_c	DATE,
	nbc_focus_original_3_d	VARCHAR,
		
	nbc_focus_original_4_b	BOOLEAN,
	nbc_focus_original_4_c	DATE,
	nbc_focus_original_4_d	VARCHAR,
		
	nbc_focus_original_5_b	BOOLEAN,
	nbc_focus_original_5_c	DATE,
	nbc_focus_original_5_d	VARCHAR,
	
	nbc_focus_apprv_1_b	VARCHAR,
	nbc_focus_apprv_1_c	DATE,
		
	nbc_focus_apprv_2_b	VARCHAR,
	nbc_focus_apprv_2_c	DATE,
		
	nbc_focus_apprv_3_b	VARCHAR,
	nbc_focus_apprv_3_c	DATE,
		
	nbc_focus_apprv_4_b	VARCHAR,
	nbc_focus_apprv_4_c	DATE,
		
	nbc_focus_apprv_5_b	VARCHAR,
	nbc_focus_apprv_5_c	DATE
);

CREATE TABLE trms.TB_INFRCR_TRANSACTION_KDF(
	transID INT,
	key_deal_fac_1_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_1_c	VARCHAR,
	key_deal_fac_1_d	DATE,
	key_deal_fac_1_e	VARCHAR,
	key_deal_fac_1_f	VARCHAR,	
	key_deal_fac_2_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_2_c	VARCHAR,
	key_deal_fac_2_d	DATE,
	key_deal_fac_2_e	VARCHAR,
	key_deal_fac_2_f	VARCHAR,
	key_deal_fac_3_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_3_c	VARCHAR,
	key_deal_fac_3_d	DATE,
	key_deal_fac_3_e	VARCHAR,
	key_deal_fac_3_f	VARCHAR,
	key_deal_fac_4_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_4_c	VARCHAR,
	key_deal_fac_4_d	DATE,
	key_deal_fac_4_e	VARCHAR,
	key_deal_fac_4_f	VARCHAR,
	key_deal_fac_5_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_5_c	VARCHAR,
	key_deal_fac_5_d	DATE,
	key_deal_fac_5_e	VARCHAR,
	key_deal_fac_5_f	VARCHAR,
	key_deal_fac_6_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_6_c	VARCHAR,
	key_deal_fac_6_d	DATE,
	key_deal_fac_6_e	VARCHAR,
	key_deal_fac_6_f	VARCHAR,
	key_deal_fac_7_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_7_c	VARCHAR,
	key_deal_fac_7_d	DATE,
	key_deal_fac_7_e	VARCHAR,
	key_deal_fac_7_f	VARCHAR,
	key_deal_fac_8_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_8_c	VARCHAR,
	key_deal_fac_8_d	DATE,
	key_deal_fac_8_e	VARCHAR,
	key_deal_fac_8_f	VARCHAR,
	key_deal_fac_9_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_9_c	VARCHAR,
	key_deal_fac_9_d	DATE,
	key_deal_fac_9_e	VARCHAR,
	key_deal_fac_9_f	VARCHAR,
	key_deal_fac_10_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_10_c	VARCHAR,
	key_deal_fac_10_d	DATE,
	key_deal_fac_10_e	VARCHAR,
	key_deal_fac_10_f	VARCHAR,
	key_deal_fac_11_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_11_c	VARCHAR,
	key_deal_fac_11_d	DATE,
	key_deal_fac_11_e	VARCHAR,
	key_deal_fac_11_f	VARCHAR,
	key_deal_fac_12_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_12_c	VARCHAR,
	key_deal_fac_12_d	DATE,
	key_deal_fac_12_e	VARCHAR,
	key_deal_fac_12_f	VARCHAR,
	key_deal_fac_13_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_13_c	VARCHAR,
	key_deal_fac_13_d	DATE,
	key_deal_fac_13_e	VARCHAR,
	key_deal_fac_13_f	VARCHAR,
	key_deal_fac_14_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_14_c	VARCHAR,
	key_deal_fac_14_d	DATE,
	key_deal_fac_14_e	VARCHAR,
	key_deal_fac_14_f	VARCHAR,
	key_deal_fac_15_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_15_c	VARCHAR,
	key_deal_fac_15_d	DATE,
	key_deal_fac_15_e	VARCHAR,
	key_deal_fac_15_f	VARCHAR,
	key_deal_fac_16_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_16_c	DATE,
	key_deal_fac_17_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_17_c	DATE,
	key_deal_fac_18_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_18_c	DATE,
	key_deal_fac_19_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_19_c	DATE,
	key_deal_fac_20_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_20_c	DATE,
	key_deal_fac_21_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_21_c	DATE,
	key_deal_fac_22_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_22_c	DATE,
	key_deal_fac_23_b	BOOLEAN DEFAULT FALSE,
	key_deal_fac_23_c	DATE
);


CREATE TABLE trms.TB_INFRCR_TRANSACTION_KDF_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,

	transID INT,
	key_deal_fac_1_b	Boolean,
	key_deal_fac_1_c	VARCHAR,
	key_deal_fac_1_d	DATE,
	key_deal_fac_1_e	VARCHAR,
	key_deal_fac_1_f	VARCHAR,	
	key_deal_fac_2_b	Boolean,
	key_deal_fac_2_c	VARCHAR,
	key_deal_fac_2_d	DATE,
	key_deal_fac_2_e	VARCHAR,
	key_deal_fac_2_f	VARCHAR,
	key_deal_fac_3_b	Boolean,
	key_deal_fac_3_c	VARCHAR,
	key_deal_fac_3_d	DATE,
	key_deal_fac_3_e	VARCHAR,
	key_deal_fac_3_f	VARCHAR,
	key_deal_fac_4_b	Boolean,
	key_deal_fac_4_c	VARCHAR,
	key_deal_fac_4_d	DATE,
	key_deal_fac_4_e	VARCHAR,
	key_deal_fac_4_f	VARCHAR,
	key_deal_fac_5_b	Boolean,
	key_deal_fac_5_c	VARCHAR,
	key_deal_fac_5_d	DATE,
	key_deal_fac_5_e	VARCHAR,
	key_deal_fac_5_f	VARCHAR,
	key_deal_fac_6_b	Boolean,
	key_deal_fac_6_c	VARCHAR,
	key_deal_fac_6_d	DATE,
	key_deal_fac_6_e	VARCHAR,
	key_deal_fac_6_f	VARCHAR,
	key_deal_fac_7_b	Boolean,
	key_deal_fac_7_c	VARCHAR,
	key_deal_fac_7_d	DATE,
	key_deal_fac_7_e	VARCHAR,
	key_deal_fac_7_f	VARCHAR,
	key_deal_fac_8_b	Boolean,
	key_deal_fac_8_c	VARCHAR,
	key_deal_fac_8_d	DATE,
	key_deal_fac_8_e	VARCHAR,
	key_deal_fac_8_f	VARCHAR,
	key_deal_fac_9_b	Boolean,
	key_deal_fac_9_c	VARCHAR,
	key_deal_fac_9_d	DATE,
	key_deal_fac_9_e	VARCHAR,
	key_deal_fac_9_f	VARCHAR,
	key_deal_fac_10_b	Boolean,
	key_deal_fac_10_c	VARCHAR,
	key_deal_fac_10_d	DATE,
	key_deal_fac_10_e	VARCHAR,
	key_deal_fac_10_f	VARCHAR,
	key_deal_fac_11_b	Boolean,
	key_deal_fac_11_c	VARCHAR,
	key_deal_fac_11_d	DATE,
	key_deal_fac_11_e	VARCHAR,
	key_deal_fac_11_f	VARCHAR,
	key_deal_fac_12_b	Boolean,
	key_deal_fac_12_c	VARCHAR,
	key_deal_fac_12_d	DATE,
	key_deal_fac_12_e	VARCHAR,
	key_deal_fac_12_f	VARCHAR,
	key_deal_fac_13_b	Boolean,
	key_deal_fac_13_c	VARCHAR,
	key_deal_fac_13_d	DATE,
	key_deal_fac_13_e	VARCHAR,
	key_deal_fac_13_f	VARCHAR,
	key_deal_fac_14_b	Boolean,
	key_deal_fac_14_c	VARCHAR,
	key_deal_fac_14_d	DATE,
	key_deal_fac_14_e	VARCHAR,
	key_deal_fac_14_f	VARCHAR,
	key_deal_fac_15_b	Boolean,
	key_deal_fac_15_c	VARCHAR,
	key_deal_fac_15_d	DATE,
	key_deal_fac_15_e	VARCHAR,
	key_deal_fac_15_f	VARCHAR,
	key_deal_fac_16_b	Boolean,
	key_deal_fac_16_c	DATE,
	key_deal_fac_17_b	Boolean,
	key_deal_fac_17_c	DATE,
	key_deal_fac_18_b	Boolean,
	key_deal_fac_18_c	DATE,
	key_deal_fac_19_b	Boolean,
	key_deal_fac_19_c	DATE,
	key_deal_fac_20_b	Boolean,
	key_deal_fac_20_c	DATE,
	key_deal_fac_21_b	Boolean,
	key_deal_fac_21_c	DATE,
	key_deal_fac_22_b	Boolean,
	key_deal_fac_22_c	DATE,
	key_deal_fac_23_b	Boolean,
	key_deal_fac_23_c	DATE
);

CREATE OR REPLACE FUNCTION trms.FUNC_TRS_TRANSACTION_PLIS_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_PLIS_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_PLIS_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_PLIS,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_PLIS_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_PLIS_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_PLIS_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_PLIS_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_PLIS_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON trms.TB_INFRCR_TRANSACTION_PLIS
    FOR EACH ROW EXECUTE FUNCTION trms.FUNC_TRS_TRANSACTION_PLIS_AUDIT();
    


CREATE OR REPLACE FUNCTION trms.FUNC_TRS_TRANSACTION_PARTIES_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_PARTIES_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_PARTIES_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_PARTIES,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_PARTIES_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_PARTIES_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_PARTIES_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_PARTIES_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_PARTIES_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON trms.TB_INFRCR_TRANSACTION_PARTIES
    FOR EACH ROW EXECUTE FUNCTION trms.FUNC_TRS_TRANSACTION_PARTIES_AUDIT();


CREATE OR REPLACE FUNCTION trms.FUNC_TRS_TRANSACTION_OTHER_CPS_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_OTHER_CPS,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_OTHER_CPS_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON trms.TB_INFRCR_TRANSACTION_OTHER_CPS
    FOR EACH ROW EXECUTE FUNCTION trms.FUNC_TRS_TRANSACTION_OTHER_CPS_AUDIT();
	

CREATE OR REPLACE FUNCTION trms.FUNC_TRS_TRANSACTION_NBC_FOCUS_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_NBC_FOCUS,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_NBC_FOCUS_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON trms.TB_INFRCR_TRANSACTION_NBC_FOCUS
    FOR EACH ROW EXECUTE FUNCTION trms.FUNC_TRS_TRANSACTION_NBC_FOCUS_AUDIT();


CREATE OR REPLACE FUNCTION trms.FUNC_TRS_TRANSACTION_KDF_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_KDF_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_KDF_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_KDF,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_KDF_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_KDF_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO trms.TB_INFRCR_TRANSACTION_KDF_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_KDF_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_KDF_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON trms.TB_INFRCR_TRANSACTION_KDF
    FOR EACH ROW EXECUTE FUNCTION trms.FUNC_TRS_TRANSACTION_KDF_AUDIT();


-- -- House cleaning: To be run after creating the new objects for Daniel's features
INSERT INTO trms.TB_INFRCR_TRANSACTION_PLIS (transID) 
SELECT transID FROM trms.TB_INFRCR_TRANSACTION A
WHERE NOT EXISTS (SELECT 1 FROM trms.TB_INFRCR_TRANSACTION_PLIS WHERE transID=A.transID);

INSERT INTO trms.TB_INFRCR_TRANSACTION_PARTIES (transID) 
SELECT transID FROM trms.TB_INFRCR_TRANSACTION A
WHERE NOT EXISTS (SELECT 1 FROM trms.TB_INFRCR_TRANSACTION_PARTIES WHERE transID=A.transID);

INSERT INTO trms.TB_INFRCR_TRANSACTION_OTHER_CPS (transID) 
SELECT transID FROM trms.TB_INFRCR_TRANSACTION A
WHERE NOT EXISTS (SELECT 1 FROM trms.TB_INFRCR_TRANSACTION_OTHER_CPS WHERE transID=A.transID);

INSERT INTO trms.TB_INFRCR_TRANSACTION_NBC_FOCUS (transID) 
SELECT transID FROM trms.TB_INFRCR_TRANSACTION A
WHERE NOT EXISTS (SELECT 1 FROM trms.TB_INFRCR_TRANSACTION_NBC_FOCUS WHERE transID=A.transID);

INSERT INTO trms.TB_INFRCR_TRANSACTION_KDF (transID) 
SELECT transID FROM trms.TB_INFRCR_TRANSACTION A
WHERE NOT EXISTS (SELECT 1 FROM trms.TB_INFRCR_TRANSACTION_KDF WHERE transID=A.transID);

-- Hot Fix: Avoid duplicate transactions
CREATE UNIQUE INDEX avoid_dup_deal
ON TB_INFRCR_TRANSACTION(clientName,originator,transactor,transactionLegalLead,industry, product,region,dealSize,tenor,moratorium,repaymentFrequency,amortizationStyle,mandateLetter,creditApproval,feeLetter,expectedClose,actualClose)

-- Note: None of the columns(in the unique index avoid_dup_deal) must be posted as NULL to the db - for date columns, default it to 1900-01-01 if the user does not send a date
-- Note: 
-- 1. all date columns should default to 1900-01-01 if the user does not send a date, 
-- 2. all varchar/text should default to '' no nulls 
-- 3. integers/numeric should default to 0(zero)