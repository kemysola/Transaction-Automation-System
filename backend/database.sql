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