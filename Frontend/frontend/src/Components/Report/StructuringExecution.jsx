import React from "react";
import { Stack, Container ,Table} from "react-bootstrap";
import TransactionChart from "./TransactionChart";

export default function StructuringExecution() {
  return (
    <React.Fragment>
      <br/>
      
      <Container className='my-3 pt-2'>
        <Stack gap={1} style={{ fontWeight: "bold", fontSize:'18px'}}>
          Structuring & Execution – Q4 2021 Developments
        </Stack>
        <div>
          <p style={{ fontWeight: "bold" }}>
            Structuring & Execution Activities
          </p>
          <p style={{ fontWeight: "bold" }}>Progress on Due Diligence</p>
          <li>
            Due diligence is actively progressing for thirteen (13) clients –
            LFZC, TotalSupport, Afex, ENL, Auro, Konexa, ColdHubs, Brains &
            Hammers, Darway Coast, Accugas, Urban Shelter, GVE, ACOB
          </li>
          <li>
            Commencing work on two (2) mandates signed in December – Greenville,
            Falcon
          </li>
          <li>
            Progress on three (3) mandates has been relatively slow, pending
            receipt of further information – Rensource, Pirano Energy and Cloud
            Exchange
          </li>
        </div>
        <div className='mt-3'>
          <p style={{ fontWeight: "bold" }}>Progress on Structuring</p>
          <li>
            Submitted three (3) credit papers – one (1) approved and two (2)
            under consideration:
            <br />
            <ul><li>
              Alpha Mead – up to N5.0 billion for up to seven (7) years –
              approved
            </li>
            <li>
              LADOL – up to N5.1 billion for up to five (5) years – under
              consideration
            </li>
            <li>
              Coleman – up to N10.0 billion for up to seven (7) years – under
              consideration
            </li></ul>
            
          </li>
          <li>
            Executed CRG Deed with two (2) clients (FMGSL, Hostel Apartment
            Services), while one (1) is pending (Don Domingo)
          </li>
          <li>
            Executed Fee Letter with one (1) client (Alpha Mead), while two (2)
            are pending (Ekiti State Concessionaire, Babban Gona)
          </li>
        </div>
        <div className='mt-3'>
          <p style={{ fontWeight: "bold" }}>Progress on Execution</p>
          <li>
          Working through guarantee documentation and conditions precedent with the following four (4)
clients that have already executed Fee Letters:
            <br />
            <ul><li>
            Pan African Towers Limited
            </li>
            <li>
            Asiko Power Limited

            </li>
            <li>
            Green Liquified Natural Gas Limited
            </li>
            <li>Alpha Mead Development Company Limited
</li>
            {/* <li></li> */}
            </ul>
            
          </li>
          <li>
          Working through guarantee documentation and conditions precedent with five (5) clients that have
executed CRG Deeds:
<ul>
  <li>Hotspot Network Limited</li>
  <li>Bastanchury Power Solutions Nigeria Limited</li>
  <li>Western Telecoms and Engineering Services Metro Limited
</li>
<li>Hostel Apartment Services Limited</li>
<li>First Modular Gas Systems Limited
</li>
</ul>
          </li>
          <li>
          Re-assessing transaction structure and viability with three (3) clients which have executed Fee
Letters:
<ul>
  <li>Bankers Warehouse Limited</li>
  <li>Mixta Real Estate Plc</li>
  <li>PNG Gas Limited</li>
</ul>
          </li>
        </div>
     </Container>

     <Container>
   <TransactionChart/>
     </Container>
    </React.Fragment>
  );
}
