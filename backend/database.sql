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

CREATE TABLE TB_TRS_USERS(
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

CREATE SEQUENCE IF NOT EXISTS user_id_seq
START 10000
INCREMENT 1
MINVALUE 10000
OWNED BY TB_TRS_USERS.userID;
--###################[USER AUDITITNG BLOCK START]###################

--This trigger propagates all user CUD operations on TB_TRS_USERS table
CREATE TABLE TB_TRS_USERS_AUDIT(
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
CREATE TABLE TB_INFRCR_TRANSACTION_AUDIT(
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

CREATE TRIGGER TR_TRS_TRANSACTION_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON TB_INFRCR_TRANSACTION
    FOR EACH ROW EXECUTE FUNCTION FUNC_TRS_TRANSACTION_AUDIT();

--###################[TRANSACTION AUDITITNG BLOCK END]###################

--This table holds the meaning of the various deal category as defined by the company
CREATE TABLE TB_INFRCR_DEAL_CATEGORY
(
categoryID VARCHAR(6),
description VARCHAR,
PRIMARY KEY(categoryID)
);
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

--All possible staff level defined by InfraCredit
CREATE TABLE TB_INFRCR_STAFF_LEVELS
(
levelID INT GENERATED ALWAYS AS IDENTITY,
staffLevel VARCHAR,
PRIMARY KEY(staffLevel)
);
INSERT INTO TB_INFRCR_STAFF_LEVELS(staffLevel)
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

INSERT INTO TB_TRS_USERS(
                  userID, email, password, firstName, lastName,
                  level, hasOriginationTarget, originationAmount, guaranteePipeline,
                  greenTransaction, amberTransaction, mandateLetter, creditCommiteeApproval,
                  feeLetter, financialClose, record_entry, status, isadmin
                  )
values(nextval('user_id_seq'), 'trms@infracredit.ng', 'U2FsdGVkX1/+HYRk+9HGscroXD/vVTXbCGYM43JRMVc=','appuser', 'appuser', 'mvp', false, 0, 0,0,0,0,0,0,0,'', 'Active', true);

-- Guarantee Projection Table as defined by Infracredit
CREATE TABLE TB_INFRCR_FORECAST
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
INSERT INTO TB_INFRCR_FORECAST(projectionYear, cumulativeGrowth, newDeals, guaranteePipeline, greenAndAmberDeals, greenDeals)
VALUES(2021, 146.9, 103.4, 335.3, 155.1, 108.6),
    (2022, 267, 120.1, 388.7, 180.2, 126.1),
    (2023, 406, 139, 448.5, 208.5, 146.0),
    (2024, 566, 160, 501.0, 240.0, 168.0),
    (2025, 740, 174, 261.0, 261.0, 182.7);

--- Added new columns to transaction table
ALTER TABLE tb_infrcr_transaction
ADD COLUMN nbc_approval_date DATE,
ADD COLUMN nbc_submitted_date DATE;

ALTER TABLE tb_infrcr_transaction_audit
ADD COLUMN nbc_approval_date DATE,
ADD COLUMN nbc_submitted_date DATE;


-- DANIEL MULLER'S FEATURE : 2022-May-24
DROP TABLE TB_INFRCR_TRANSACTION_NBC_FOCUS;

CREATE TABLE TB_INFRCR_TRANSACTION_NBC_FOCUS(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	transID INT,
	nbc_focus_original	VARCHAR,
	nbc_focus_original_yes_no	BOOLEAN DEFAULT FALSE,
	nbc_focus_original_date	DATE,
	nbc_focus_original_methodology	VARCHAR,
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
DROP TABLE TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT;
CREATE TABLE TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
	transID INT,
	nbc_focus_original	VARCHAR,
	nbc_focus_original_yes_no	BOOLEAN DEFAULT FALSE,
	nbc_focus_original_date	DATE,
	nbc_focus_original_methodology	VARCHAR,
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

DROP TABLE TB_INFRCR_TRANSACTION_PARTIES;
CREATE TABLE TB_INFRCR_TRANSACTION_PARTIES(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	transID INT,
	parties_role	VARCHAR,
	parties_party	VARCHAR,
	parties_appointed	BOOLEAN DEFAULT FALSE,
	parties_status	VARCHAR
);
DROP TABLE TB_INFRCR_TRANSACTION_PARTIES_AUDIT
CREATE TABLE TB_INFRCR_TRANSACTION_PARTIES_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
    ID INT,
	transID INT,
	parties_role	VARCHAR,
	parties_party	VARCHAR,
	parties_appointed	BOOLEAN DEFAULT FALSE,
	parties_status	VARCHAR
);
DROP TABLE TB_INFRCR_TRANSACTION_PLIS;
CREATE TABLE TB_INFRCR_TRANSACTION_PLIS(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	transID INT,
	plis_particulars	VARCHAR,
	plis_concern	VARCHAR,
	plis_weighting	NUMERIC,
	plis_expected	DATE,
	plis_status	VARCHAR
);
DROP TABLE TB_INFRCR_TRANSACTION_PLIS_AUDIT
CREATE TABLE TB_INFRCR_TRANSACTION_PLIS_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
	transID INT,
	plis_particulars	VARCHAR,
	plis_concern	VARCHAR,
	plis_weighting	NUMERIC,
	plis_expected	DATE,
	plis_status	VARCHAR
);
DROP TABLE TB_INFRCR_TRANSACTION_OTHER_CPS
CREATE TABLE TB_INFRCR_TRANSACTION_OTHER_CPS(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	transID INT,
	ocps_factors	VARCHAR,
	ocps_yes_no		BOOLEAN DEFAULT FALSE,
	ocps_concern	VARCHAR,
	ocps_expected	DATE,
	ocps_resp_party	VARCHAR,
	ocps_status		VARCHAR
);
DROP TABLE TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT
CREATE TABLE TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
	transID INT,
	ocps_factors	VARCHAR,
	ocps_yes_no		BOOLEAN DEFAULT FALSE,
	ocps_concern	VARCHAR,
	ocps_expected	DATE,
	ocps_resp_party	VARCHAR,
	ocps_status		VARCHAR
);
DROP TABLE TB_INFRCR_TRANSACTION_KPI
CREATE TABLE TB_INFRCR_TRANSACTION_KPI(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	transID INT,
	kpi_factors			VARCHAR,
	kpi_yes_no			BOOLEAN DEFAULT FALSE,
	kpi_concern	VARCHAR,
	kpi_expected	DATE,
	kpi_resp_party	VARCHAR,
	kpi_status	VARCHAR
);

DROP TABLE TB_INFRCR_TRANSACTION_KPI_AUDIT
CREATE TABLE TB_INFRCR_TRANSACTION_KPI_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
	transID INT,
	kpi_factors			VARCHAR,
	kpi_yes_no			BOOLEAN DEFAULT FALSE,
	kpi_concern	VARCHAR,
	kpi_expected	DATE,
	kpi_resp_party	VARCHAR,
	kpi_status	VARCHAR
);

CREATE OR REPLACE FUNCTION FUNC_TRS_TRANSACTION_PLIS_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_PLIS_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_PLIS_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_PLIS,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_PLIS_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_PLIS_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_PLIS_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_PLIS_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_PLIS_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON TB_INFRCR_TRANSACTION_PLIS
    FOR EACH ROW EXECUTE FUNCTION FUNC_TRS_TRANSACTION_PLIS_AUDIT();
    


CREATE OR REPLACE FUNCTION FUNC_TRS_TRANSACTION_PARTIES_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_PARTIES_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_PARTIES_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_PARTIES,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_PARTIES_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_PARTIES_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_PARTIES_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_PARTIES_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_PARTIES_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON TB_INFRCR_TRANSACTION_PARTIES
    FOR EACH ROW EXECUTE FUNCTION FUNC_TRS_TRANSACTION_PARTIES_AUDIT();


CREATE OR REPLACE FUNCTION FUNC_TRS_TRANSACTION_OTHER_CPS_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_OTHER_CPS,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_OTHER_CPS_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_OTHER_CPS_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON TB_INFRCR_TRANSACTION_OTHER_CPS
    FOR EACH ROW EXECUTE FUNCTION FUNC_TRS_TRANSACTION_OTHER_CPS_AUDIT();
	

CREATE OR REPLACE FUNCTION FUNC_TRS_TRANSACTION_NBC_FOCUS_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_NBC_FOCUS,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_NBC_FOCUS_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_NBC_FOCUS_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON TB_INFRCR_TRANSACTION_NBC_FOCUS
    FOR EACH ROW EXECUTE FUNCTION FUNC_TRS_TRANSACTION_NBC_FOCUS_AUDIT();


CREATE OR REPLACE FUNCTION FUNC_TRS_TRANSACTION_KPI_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_TRANSACTION_KPI_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_TRANSACTION_KPI_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_KPI,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_KPI_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_KPI_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO TB_INFRCR_TRANSACTION_KPI_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_TRANSACTION_KPI_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_TRS_TRANSACTION_KPI_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON TB_INFRCR_TRANSACTION_KPI
    FOR EACH ROW EXECUTE FUNCTION FUNC_TRS_TRANSACTION_KPI_AUDIT();

-- Hot Fix: Avoid duplicate transactions
-- Note: None of the columns(in the unique index avoid_dup_deal) must be posted as NULL to the db - for date columns, default it to 1900-01-01 if the user does not send a date
CREATE UNIQUE INDEX avoid_dup_deal
ON TB_INFRCR_TRANSACTION(clientName,originator,transactor,transactionLegalLead,industry, product,region,dealSize,tenor,moratorium,repaymentFrequency,amortizationStyle,mandateLetter,creditApproval,feeLetter,expectedClose,actualClose)


-- -- -- House cleaning: To be run after creating the new objects for Daniel's features
-- INSERT INTO TB_INFRCR_TRANSACTION_PLIS (transID) 
-- SELECT transID FROM TB_INFRCR_TRANSACTION A
-- WHERE NOT EXISTS (SELECT 1 FROM TB_INFRCR_TRANSACTION_PLIS WHERE transID=A.transID);

-- INSERT INTO TB_INFRCR_TRANSACTION_PARTIES (transID) 
-- SELECT transID FROM TB_INFRCR_TRANSACTION A
-- WHERE NOT EXISTS (SELECT 1 FROM TB_INFRCR_TRANSACTION_PARTIES WHERE transID=A.transID);

-- INSERT INTO TB_INFRCR_TRANSACTION_OTHER_CPS (transID) 
-- SELECT transID FROM TB_INFRCR_TRANSACTION A
-- WHERE NOT EXISTS (SELECT 1 FROM TB_INFRCR_TRANSACTION_OTHER_CPS WHERE transID=A.transID);

-- INSERT INTO TB_INFRCR_TRANSACTION_NBC_FOCUS (transID) 
-- SELECT transID FROM TB_INFRCR_TRANSACTION A
-- WHERE NOT EXISTS (SELECT 1 FROM TB_INFRCR_TRANSACTION_NBC_FOCUS WHERE transID=A.transID);

-- INSERT INTO TB_INFRCR_TRANSACTION_KDF (transID) 
-- SELECT transID FROM TB_INFRCR_TRANSACTION A
-- WHERE NOT EXISTS (SELECT 1 FROM TB_INFRCR_TRANSACTION_KDF WHERE transID=A.transID);


--- 5th June, 2022. Altered Forecast Table to include 2026 data and set status for all
ALTER TABLE TB_INFRCR_FORECAST
ADD COLUMN status VARCHAR;

UPDATE TB_INFRCR_FORECAST AS f SET
  projectionYear = f2.projectionYear,
  cumulativeGrowth = f2.cumulativeGrowth,
  newDeals = f2.newDeals,
  guaranteePipeline = f2.guaranteePipeline,
  greenAndAmberDeals = f2.greenAndAmberDeals,
  greenDeals = f2.greenDeals,
  status = f2.status
FROM (VALUES
		(2021, 146.9, 103.4, 335.3, 155.1, 108.6, 'Inactive'),
		(2022, 180.3, 103.4, 335, 155, 109, 'Active'),
		(2023, 300.4, 120.1, 388.65, 180.15, 126.105, 'Active'),
		(2024, 439.4, 139, 426, 208.5, 145.95, 'Active'),
		(2025, 584.4, 145, 450.9, 217.5, 152.25, 'Active')
) AS f2(projectionYear, cumulativeGrowth, newDeals, guaranteePipeline, greenAndAmberDeals, greenDeals, status)
WHERE f2.projectionYear = f.projectionYear;

INSERT INTO TB_INFRCR_FORECAST(projectionYear, cumulativeGrowth, newDeals, guaranteePipeline, greenAndAmberDeals, greenDeals, status)
VALUES(2026, 740.0, 155.6, 233.4, 233.4, 163.38, 'Active');

-- 3rd August, 2022. ALtered Transaction and transaction Audit tables to include CCC Submission Date


ALTER TABLE tb_infrcr_transaction
drop COLUMN cccSubmissionDate;

ALTER TABLE tb_infrcr_transaction_audit
drop COLUMN cccSubmissionDate;

ALTER TABLE tb_infrcr_transaction
ADD COLUMN ccSubmissionDate DATE;

ALTER TABLE tb_infrcr_transaction_audit
ADD COLUMN ccSubmissionDate DATE;

-- 2022-08-08: Financial Year Table to manage the global view of all data
DROP TABLE TB_INFRCR_FINANCIAL_YEAR
CREATE TABLE TB_INFRCR_FINANCIAL_YEAR(
	ID  INT GENERATED ALWAYS AS IDENTITY,
    fy VARCHAR(10),
	fy_start_date	DATE,
	fy_end_date	DATE,
    fy_status VARCHAR(10)
);

DROP TABLE TB_INFRCR_FINANCIAL_YEAR_AUDIT
CREATE TABLE TB_INFRCR_FINANCIAL_YEAR_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
    fy VARCHAR(10),
	fy_start_date	DATE,
	fy_end_date	DATE,
    fy_status VARCHAR(10)
);

CREATE OR REPLACE FUNCTION FUNC_INFRCR_FINANCIAL_YEAR_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_FINANCIAL_YEAR_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_FINANCIAL_YEAR_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_KPI,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO TB_INFRCR_FINANCIAL_YEAR_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO TB_INFRCR_FINANCIAL_YEAR_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO TB_INFRCR_FINANCIAL_YEAR_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_FINANCIAL_YEAR_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_INFRCR_FINANCIAL_YEAR_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON TB_INFRCR_FINANCIAL_YEAR
    FOR EACH ROW EXECUTE FUNCTION FUNC_INFRCR_FINANCIAL_YEAR_AUDIT();

-- 9 August, 2022: Alter transaction table data type of structuring Fee and Advance values


ALTER TABLE TB_INFRCR_TRANSACTION
ALTER COLUMN structuringFeeAdvance TYPE NUMERIC,
ALTER COLUMN structuringFeeFinal TYPE NUMERIC;

ALTER TABLE TB_INFRCR_TRANSACTION_AUDIT
ALTER COLUMN structuringFeeAdvance TYPE NUMERIC,
ALTER COLUMN structuringFeeFinal TYPE NUMERIC;


CREATE TABLE TB_INFRCR_OANDS_QUARTERLY(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	ReportFYQuarter VARCHAR NOT NULL,
	ReportFY	VARCHAR NOT NULL,
	ReportSectionContent VARCHAR NOT NULL,
    UNIQUE (ReportFYQuarter, ReportFY)
);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
    ReportFYQuarter VARCHAR NOT NULL,
	ReportFY	VARCHAR NOT NULL,
	ReportSectionContent VARCHAR NOT NULL
);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_CurrentGuaranteePortfolio(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	ReportFYQuarter VARCHAR NOT NULL,
	ReportFY	VARCHAR NOT NULL,
	ReportSectionContent VARCHAR NOT NULL,
    ReportSectionTitle VARCHAR NOT NULL,
    UNIQUE (ReportFYQuarter, ReportFY)
);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_TB_INFRCR_OANDS_QUARTERLY_CurrentGuaranteePortfolio_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
    ReportFYQuarter VARCHAR NOT NULL,
	ReportFY	VARCHAR NOT NULL,
	ReportSectionContent VARCHAR NOT NULL,
    ReportSectionTitle VARCHAR NOT NULL,

);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_GuaranteePortfolioGrowth(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	ReportFYQuarter VARCHAR NOT NULL,
	ReportFY	VARCHAR NOT NULL,
	ReportSectionContent VARCHAR NOT NULL,
    ReportSectionTitle VARCHAR NOT NULL,
    UNIQUE (ReportFYQuarter, ReportFY)
);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_TB_INFRCR_OANDS_QUARTERLY_GuaranteePortfolioGrowth_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
    ReportFYQuarter VARCHAR NOT NULL,
	ReportFY	VARCHAR NOT NULL,
	ReportSectionContent VARCHAR NOT NULL,
    ReportSectionTitle VARCHAR NOT NULL,

);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_GuaranteePortfolioGrowth_Table(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	ReportFYQuarter VARCHAR NOT NULL,
	ReportFY	VARCHAR NOT NULL,
	ID INT,
    infrastureEntity VARCHAR NOT NULL,
	infrastureActivity	VARCHAR NOT NULL,
	size Numeric NOT NULL,
    expectedClosing Date,
    UNIQUE (ReportFYQuarter, ReportFY)
);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_TB_INFRCR_OANDS_QUARTERLY_GuaranteePortfolioGrowth_Table_AUDIT(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
    infrastureEntity VARCHAR NOT NULL,
	infrastureActivity	VARCHAR NOT NULL,
	size NUMERIC NOT NULL,
    expectedClosing Date

);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_ORIGINATIONACTIVITY(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	ReportFYQuarter VARCHAR NOT NULL,
	ReportFY	VARCHAR NOT NULL,
	ID INT,
    infrastureEntity VARCHAR NOT NULL,
	infrastureActivity	VARCHAR NOT NULL,
	size Numeric NOT NULL,
    description VARCHAR,
    status VARCHAR NOT NULL,
    originationActivity VARCHAR NOT NULL,
    UNIQUE (ReportFYQuarter, ReportFY)
);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_ORIGINATIONACTIVITY_audit(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
    infrastureEntity VARCHAR NOT NULL,
	infrastureActivity	VARCHAR NOT NULL,
	size Numeric NOT NULL,
    description VARCHAR,
    status VARCHAR NOT NULL,
    originationActivity VARCHAR NOT NULL,

);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_GUARANTEEPIPELINE(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	ReportFYQuarter VARCHAR NOT NULL,
	ReportFY	VARCHAR NOT NULL,
    ReportSectionTitle VARCHAR NOT NULL,
    ReportSectionBODY VARCHAR NOT NULL,
    UNIQUE (ReportFYQuarter, ReportFY)
);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_GUARANTEEPIPELINE_audit(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
    ReportSectionTitle VARCHAR NOT NULL,
    ReportSectionBODY VARCHAR NOT NULL,
);


CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_STRUCTURINGANDEXECUTIONACTIVITIES(
	ID  INT GENERATED ALWAYS AS IDENTITY,
	ReportFYQuarter VARCHAR NOT NULL,
	ReportFY	VARCHAR NOT NULL,
    DUEDILIGENCE VARCHAR NOT NULL,
    EXECUTION VARCHAR NOT NULL,
    STRUCTURING VARCHAR NOT NULL,
    UNIQUE (ReportFYQuarter, ReportFY)
);

CREATE TABLE TB_INFRCR_OANDS_QUARTERLY_STRUCTURINGANDEXECUTIONACTIVITIES_audit(
    operation         char(1)   NOT NULL,
    stamp             timestamp NOT NULL,
    performed_by            text      NOT NULL,
	ID INT,
     DUEDILIGENCE VARCHAR NOT NULL,
    EXECUTION VARCHAR NOT NULL,
    STRUCTURING VARCHAR NOT NULL
);






CREATE OR REPLACE FUNCTION FUNC_INFRCR_OANDS_QUARTERLY_AUDIT() RETURNS TRIGGER AS $TB_INFRCR_OANDS_QUARTERLY_AUDIT$
    BEGIN
        --
        -- Create a row in TB_INFRCR_OANDS_QUARTERLY_AUDIT to reflect the operation performed on TB_INFRCR_TRANSACTION_KPI,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO TB_INFRCR_OANDS_QUARTERLY_AUDIT SELECT 'D', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO TB_INFRCR_OANDS_QUARTERLY_AUDIT SELECT 'U', now(), user, NEW.*;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO TB_INFRCR_OANDS_QUARTERLY_AUDIT SELECT 'I', now(), user, NEW.*;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$TB_INFRCR_OANDS_QUARTERLY_AUDIT$ LANGUAGE plpgsql;

CREATE TRIGGER TR_INFRCR_QUARTERLY_OANDS_AUDIT
AFTER INSERT OR UPDATE OR DELETE ON TB_INFRCR_OANDS_QUARTERLY
    FOR EACH ROW EXECUTE FUNCTION FUNC_INFRCR_OANDS_QUARTERLY_AUDIT();

    --for Production
    ALTER TABLE TB_TRS_USERS
ADD COLUMN isOriginator BOOLEAN DEFAULT FALSE,
ADD COLUMN isTransactor BOOLEAN DEFAULT FALSE,
ADD COLUMN isTransactionLegalLead BOOLEAN DEFAULT FALSE;

ALTER TABLE TB_TRS_USERS_AUDIT
ADD COLUMN isOriginator BOOLEAN,
ADD COLUMN isTransactor BOOLEAN,
ADD COLUMN isTransactionLegalLead BOOLEAN;

--remove from originator === Bolaji, Oluwatoyin, it services
UPDATE TB_TRS_USERS
SET isOriginator = TRUE
WHERE email not in (
'bfasehun','onathaniel@infracredit.ng','itservices@infracredit.ng'
);
--remove from transactor === Lola, Chidi, Bolaji, Oluwatoyin ,IT services
UPDATE TB_TRS_USERS
SET isTransactor = TRUE
WHERE email not in (
'bfasehun','onathaniel@infracredit.ng','itservices@infracredit.ng','loyebola@infracredit.ng','cmike-eneh@infracredit.ng'
)
--
UPDATE TB_TRS_USERS
SET isTransactionLegalLead = TRUE
WHERE email in (
'siguh@infracredit.ng'
);
--add Damilola to originator, and TLD (Can't find Damilola in DB)

--Modify length for staff level
ALTER TABLE TB_TRS_USERS ALTER COLUMN level TYPE varchar(30);
ALTER TABLE TB_TRS_USERS_AUDIT ALTER COLUMN level TYPE varchar(30);


CREATE TABLE IF NOT EXISTS tb_amortization_schedule_master
(
    recordcreatedate timestamp without time zone DEFAULT now(),
    dealname character varying(150) COLLATE pg_catalog."default",
    dealid integer,
    period_date date,
    "Period" character varying(50) COLLATE pg_catalog."default",
    principalrepayment numeric(36,2),
    interestpayment numeric(36,2),
    totalpayment numeric(36,2),
    principaloutstanding numeric(36,2)
);


--==> PMT: METHOD FOR COMPUTING THE PAYMENT VALUE OF A GUARANTEE
CREATE OR REPLACE FUNCTION dbo.PMT(
	ir decimal(36,9),
	np int, pv decimal(36,9),
	fv int,
	type int
	)
	
	/*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     
     NOTE: np => if repayment frequency is monthly, then np = Duration * 12, quarterly, then npm = Duration * 4, etc
     
     fv is always 0
     ir === coupon rate in InfraCredit
     pv === Principal outstanding
     */
	
RETURNS decimal(36,9) AS
$$
DECLARE
  pmt decimal(36,9);
  pvif decimal(36,9);
BEGIN
  IF ir = 0 THEN
    RETURN -(pv + fv)/np;
  END IF;
 
  pvif := power(1 + ir, np);
  pmt := -ir * (pv * pvif + fv) / nullif(pvif - 1, 0);
 
  IF type = 1 THEN
    pmt := pmt/(1 + ir);
  END IF;
 
  RETURN pmt;
END;
$$
LANGUAGE plpgsql;


--==> AMORTIZATION FUNCTION
CREATE OR REPLACE FUNCTION func_infr_amortization_schedule(
	nparamsmoratorium integer,
	nparamscoupon numeric,
	nparamsduration integer,
	nparamsprincipal numeric,
	sparamsrepaymentfrequency character varying,
	dparamsissuedate date,
	dparamsfirstcoupondate date,
	bparamstakingfirstinterestearly integer,
	nparamsguaranteefeerate numeric,
	nparamsdiscountfactor numeric,
	sparamsdealname character varying,
	nparamsdealid integer DEFAULT 1002,
    dparamsStartDate date default null,
    dparamsEndDate date default null
)
    RETURNS TABLE(ndealid integer, ddate date, noutstanding_bond_balance numeric, nguaranteefees numeric, ndiscountfactor numeric, npresentvalue numeric, ninterestincome numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
 -- start of execution
DECLARE
  nCouponInPercentage NUMERIC(36, 9);
  nOriginalCouponInPercentage NUMERIC(36, 9);
  nRepaymentAmount NUMERIC(36, 9);
  nRepaymentFrequency INTEGER;
  nTotalRepaymentCycle INTEGER;
  nLoanScheduleLenght INTEGER;
  nCounter INTEGER;
  nInterestPayment NUMERIC(36, 9);
  nPrincipalRepayment NUMERIC(36, 9);
  nMoratoriumEffectPrincipal INTEGER; --This marks when the Principal Repayment will start, based on given moratorium
  nMonthsBetweenRepaymentFrequency INTEGER;
  bTakingFirstInterestEarlyTracker INTEGER := 0;
  nIssueDateDiffFirstCouponDate INTEGER;
BEGIN

  nRepaymentFrequency :=
    CASE
      WHEN sParamsRepaymentFrequency = 'Semi-Annually' THEN 2
      WHEN sParamsRepaymentFrequency = 'Annually' THEN 1
      WHEN sParamsRepaymentFrequency = 'Quarterly' THEN 4
      WHEN sParamsRepaymentFrequency = 'Monthly' THEN 12
    END;

  nCouponInPercentage := (nParamsCoupon / 100) / nRepaymentFrequency;
  nTotalRepaymentCycle := (nParamsDuration - nParamsMoratorium) * nRepaymentFrequency;
  nLoanScheduleLenght := nTotalRepaymentCycle + (nParamsMoratorium * 2);
--   call PMT function
  nRepaymentAmount := PMT(nCouponInPercentage,nTotalRepaymentCycle,-nParamsPrincipal,0,0);
  nCounter := 0;
  nMoratoriumEffectPrincipal := nParamsMoratorium * nRepaymentFrequency;
  nMonthsBetweenRepaymentFrequency := 12 / nRepaymentFrequency;
  nOriginalCouponInPercentage := nParamsCoupon / 100;

  IF bParamsTakingFirstInterestEarly = 1 THEN
    bTakingFirstInterestEarlyTracker := 1;
  END IF;

-- information_schema.tables is used to replace OBJECT_ID()
  IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name = 'tb_amortization_schedule') THEN
    DROP TABLE tb_amortization_schedule;
  END IF;

  CREATE TABLE tb_amortization_schedule(
    rwnum INTEGER,
    Period_Date DATE,
	"Period" varchar(50),
	PrincipalRepayment numeric(36,2),
	InterestPayment numeric(36,2),
	TotalPayment numeric(36,2),
	PrincipalOutstanding numeric(36,2)
  );
 
--#******# Create the amortization template for a given customer
  WHILE nCounter <= nLoanScheduleLenght LOOP
    INSERT INTO tb_amortization_schedule(rwnum, "Period", PrincipalOutstanding, PrincipalRepayment, InterestPayment, TotalPayment)
    SELECT nCounter,
      CASE
        WHEN CAST(nCounter AS VARCHAR) = '0' THEN 'Bond Issuance'
        ELSE CAST(nCounter AS VARCHAR) || ' Coupon' END,
      0.00,
      0.00,
      0.00,
      0.00;

    nCounter := nCounter + 1;
  END LOOP;

  IF dParamsFirstCouponDate IS NULL THEN
    UPDATE tb_amortization_schedule
    SET PrincipalOutstanding = ROUND(nParamsPrincipal, 2),
      Period_Date = dParamsIssueDate
    WHERE rwnum = 0;

    UPDATE tb_amortization_schedule
    SET TotalPayment = ROUND(nRepaymentAmount, 2)
    WHERE rwnum > 0;
  ELSE
    UPDATE tb_amortization_schedule
    SET PrincipalOutstanding = ROUND(nParamsPrincipal, 2),
      Period_date = dParamsIssueDate
    WHERE rwnum = 0;

    UPDATE tb_amortization_schedule
    SET TotalPayment = ROUND(nRepaymentAmount, 2),
      Period_Date = dParamsFirstCouponDate
    WHERE rwnum = 1;
	
	--Compute the Payment Cycle Dates
    nCounter := 2;
    nLoanScheduleLenght := nLoanScheduleLenght + 2;

    WHILE nCounter <= nLoanScheduleLenght LOOP

		UPDATE tb_amortization_schedule
	SET period_date = (
	SELECT date_trunc('month', period_date + interval '1 month' * nMonthsBetweenRepaymentFrequency)
	FROM tb_amortization_schedule
	WHERE rwnum = nCounter - 1
	)
		  WHERE rwnum = nCounter;

		  nCounter := nCounter + 1;
    END LOOP;
  END IF;
 
  nCounter := 0;
  nParamsCoupon := (nParamsCoupon / 100) / nRepaymentFrequency;
 
  WHILE nCounter <= nLoanScheduleLenght LOOP
    IF nCounter = 0 THEN
	-- 			DOUBLE CHECK THIS PART OF THE CODE

      SELECT PrincipalOutstanding INTO nParamsPrincipal
--         nParamsPrincipal =
      FROM TB_AMORTIZATION_SCHEDULE
      WHERE rwnum = nCounter;
    ELSE
      SELECT lead(PrincipalOutstanding, 1, PrincipalOutstanding) over (ORDER BY rwnum) INTO
        nParamsPrincipal
      FROM TB_AMORTIZATION_SCHEDULE
      WHERE rwnum = nCounter;
    END IF;
	

    IF bParamsTakingFirstInterestEarly = 1 AND bTakingFirstInterestEarlyTracker = 1 THEN
      SELECT INTO nIssueDateDiffFirstCouponDate
            extract(day from date_trunc('day', dParamsFirstCouponDate) - date_trunc('day', dParamsIssueDate));
--         nIssueDateDiffFirstCouponDate = dParamsFirstCouponDate::date - dParamsIssueDate::date;
     
      nInterestPayment := ROUND(((nParamsPrincipal * nParamsCoupon) * nIssueDateDiffFirstCouponDate) / 184, 2);
     
      bTakingFirstInterestEarlyTracker := -1;
    ELSE
      nInterestPayment := ROUND(nParamsPrincipal * nParamsCoupon, 2);
    END IF;
   
    nPrincipalRepayment := nRepaymentAmount - nInterestPayment;
   
    IF nMoratoriumEffectPrincipal = 0 THEN
      UPDATE TB_AMORTIZATION_SCHEDULE
      SET
        InterestPayment = ROUND(nInterestPayment, 2),
        PrincipalRepayment = ROUND(nPrincipalRepayment, 2),
        PrincipalOutstanding = ROUND(nParamsPrincipal, 2) - ROUND(nPrincipalRepayment, 2)
      WHERE rwnum = nCounter + 1;
    ELSE
      UPDATE TB_AMORTIZATION_SCHEDULE
      SET
        InterestPayment = ROUND(nInterestPayment, 2),
        PrincipalOutstanding = ROUND(nParamsPrincipal, 2)
      WHERE rwnum = nCounter + 1;
     
      nMoratoriumEffectPrincipal := nMoratoriumEffectPrincipal - 1;
    END IF;
   
    nCounter := nCounter + 1;
  END LOOP;
 
 
 
  UPDATE TB_AMORTIZATION_SCHEDULE
  SET
    TotalPayment = InterestPayment + PrincipalRepayment;
 
  UPDATE TB_AMORTIZATION_SCHEDULE
  SET
    PrincipalRepayment = ROUND(PrincipalRepayment, 2),
    InterestPayment = ROUND(InterestPayment, 2),
    TotalPayment = ROUND(TotalPayment, 2),
    PrincipalOutstanding = round(PrincipalOutstanding,2);

		INSERT INTO TB_AMORTIZATION_SCHEDULE_MASTER(
	DealName, DealID,Period_Date,"Period",PrincipalRepayment,InterestPayment,TotalPayment,PrincipalOutstanding
	)
		SELECT   sParamsDealName,
		 nParamsDealID,
		A.Period_Date,
		A."Period",
		A.PrincipalRepayment,
		A.InterestPayment,
		A.TotalPayment,
		A.PrincipalOutstanding
		FROM TB_AMORTIZATION_SCHEDULE A
        WHERE NOT EXISTS(SELECT 1 FROM TB_AMORTIZATION_SCHEDULE_MASTER WHERE DealID = nParamsDealID AND period_date::DATE <> A."period_date"::DATE AND principaloutstanding <> A.principaloutstanding);
	
	-- Return Query returns the output of WITH
	RETURN QUERY
	WITH FinancialGuarantee AS (
	SELECT
		-- datediff has been replaced with date_part
		-- dd has been replacedy with day
		-- yy has been replacedy with year
		row_number() over (partition by date_part('year', Period_Date) order by date_part('year', Period_Date)) RowNumber,
		Period_Date AS Date,
		DealID,
		PrincipalOutstanding AS Outstanding_Bond_Balance,
		lead((nParamsGuaranteeFeeRate/100) * PrincipalOutstanding, 0, 0) over (partition by date_part('year', Period_Date) order by date_part('year', Period_Date)) as GuaranteeFees
		FROM TB_AMORTIZATION_SCHEDULE_MASTER
        WHERE DealID = nparamsdealid
		), FinancialGuarantee_GF AS (
		SELECT
		RowNumber,
           DealID,
		Date,
		Outstanding_Bond_Balance,
		CASE WHEN RowNumber = 1 THEN round(GuaranteeFees,2) ELSE 0 END as GuaranteeFees
		FROM FinancialGuarantee
		), FinancialGuarantee_GFS AS (
		SELECT
		RowNumber,
            DealID,
		Date,
		Outstanding_Bond_Balance,
		GuaranteeFees,
		CASE WHEN round(GuaranteeFees,0) > 0 THEN
		round(1 / power(
		( 1 + nOriginalCouponInPercentage),
		round(((row_number() over (order by Date) - row_number() over (partition by date_part('year', Date) order by Date)))/2,0)
		),9)
		ELSE 0 END as DiscountFactor
		FROM FinancialGuarantee_GF
	)
	--output
	SELECT 
    dealid, Date, Outstanding_Bond_Balance, GuaranteeFees, DiscountFactor,
	round(GuaranteeFees * DiscountFactor,0) AS PresentValue,
	round(GuaranteeFees - (GuaranteeFees * DiscountFactor),0) AS InterestIncome
	FROM FinancialGuarantee_GFS
    WHERE Date::text BETWEEN CONCAT(COALESCE(dparamsStartDate::text,'1900'), '-01-01') AND CONCAT(COALESCE(dparamsEndDate::text,'3000'), '-12-31');
END
$BODY$;


-- Sample Call:
-- SELECT * FROM func_infr_amortization_schedule( 1,14.7,7,15000000000.00,'Semi-Annual'::text, '20220413'::date,'20221031'::date,0,2.2,14.7,'Asiko'::text,1002,'20220101'::date, '20221231'::date)

--When the start and dates are not specified:
--SELECT * FROM func_infr_amortization_schedule( 1,14.7,7,15000000000.00,'Semi-Annual'::text, '20220413'::date,'20221031'::date,0,2.2,14.7,'Asiko'::text,1002, NULL::date, NULL::date)
-- Budget --Alter transaction TABLE
ALTER TABLE tb_infrcr_transaction
ADD COLUMN FirstCouponDate DATE,
ADD COLUMN TakingFirstInterestEarly NUMERIC,
ADD COLUMN GuaranteeFeeRate NUMERIC,
ADD COLUMN DiscountFactor NUMERIC,
ADD COLUMN IssueDate DATE;

ALTER TABLE tb_infrcr_transaction_audit
ADD COLUMN FirstCouponDate DATE,
ADD COLUMN TakingFirstInterestEarly NUMERIC,
ADD COLUMN GuaranteeFeeRate NUMERIC,
ADD COLUMN DiscountFactor NUMERIC,
ADD COLUMN IssueDate DATE;


ALTER TABLE TB_INFRCR_TRANSACTION
   ALTER COLUMN clientName TYPE VARCHAR(225) USING clientName::VARCHAR(225), ALTER COLUMN clientName SET NOT NULL, ADD CONSTRAINT clientName_unique UNIQUE (clientName);
   ALTER COLUMN tenor SET DATA TYPE NUMERIC,
   ALTER COLUMN moratorium SET DATA TYPE NUMERIC,
   ALTER COLUMN structuringFeeAdvance SET DATA TYPE NUMERIC,
   ALTER COLUMN structuringFeeFinal SET DATA TYPE NUMERIC
   ALTER COLUMN guaranteefeerate SET DATA TYPE NUMERIC
   ALTER COLUMN discountfactor SET DATA TYPE 
   ALTER COLUMN principal SET DATA TYPE NUMERIC


ALTER TABLE TB_INFRCR_TRANSACTION_AUDIT
  ALTER COLUMN clientName TYPE VARCHAR(225), 
   ALTER COLUMN tenor SET DATA TYPE NUMERIC,
   ALTER COLUMN moratorium SET DATA TYPE NUMERIC,
   ALTER COLUMN structuringFeeAdvance SET DATA TYPE NUMERIC,
   ALTER COLUMN structuringFeeFinal SET DATA TYPE NUMERIC,
   ALTER COLUMN guaranteefeerate SET DATA TYPE NUMERIC
   ALTER COLUMN discountfactor SET DATA TYPE NUMERIC
   ALTER COLUMN principal SET DATA TYPE NUMERIC
   

-- Add a new colum to users table
    ALTER TABLE TB_TRS_USERS
   ADD COLUMN office_type varchar(200)
   
     ALTER TABLE TB_TRS_USERS_AUDIT
   ADD COLUMN office_type varchar(200)

-- update a user
  UPDATE TB_TRS_USERS
   SET office_type = 'Front Office'
