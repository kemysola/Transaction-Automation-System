import React,{useState} from "react";
import { Container, Row, Col, Stack ,Table} from "react-bootstrap";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import ReactTable from "react-table";  
import GuaranteePortGrowthVsTar from "./GuaranteePortGrowthVsTar";
import FinancialYearGPipeline from "./FinancialYearGPipeline";
import OriginationActivity from "./OriginationActivity";
import StructuringExecution from "./StructuringExecution";


export default function CurrentGuarantee() {
  const[ctitle, setCTitle] =(" ")
    

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    // { name: "Group C", value: 300 },
    // { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <React.Fragment>
           <p>{ctitle}</p>
      <Container fluid>
        <Stack gap={2}>
          <div className="pb-3 mb-3" style={{ fontWeight: "bold" , color:'black'}}>
          Current Guarantee Portfolio
       
          </div>
        </Stack>
        <div>
        Gross guarantee fee income is based on total guarantee guarantees issued since inception of 77.6
Billion through 31 December 2021. In FY2021, a total of N34.1 in guarantee transactions have reached
financial close. The pipeline of active mandates comprises 35 transactions totalling N311.5 billion, of
which N103.4 billion is projected to close in FY2022.
        </div>
      </Container>
      <Container>
        <Row className="py-2 my-2">
          <Col sm={6}>
            <p
              className="text-success text-center"
              style={{ fontWeight: "", fontSize: "12px" }}
            >
              Analysis of Guarantee Transactions Since Inception of NGN77.6
              Billion as at 31 December 2021.
            </p>
            <br />
            {/* pie chart */}
            <ResponsiveContainer width="100%" height="69%">
        <PieChart width={400} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
          </Col>
          <Col sm={6}>
            <p
              className="text-success text-center"
              style={{ fontWeight: "", fontSize: "12px" }}
            >
              Categorization of N311.5 Billion of Mandate Transactions at 31
              December 2021.
            </p>
            <br />
            <ResponsiveContainer width="100%" height="69%">
              <PieChart width={400} height={200}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* pie chart ---- Red, green and amber : red 89%, NGN278.9B ..... green: 7% - NGN21.0B
                      Red: 4% -- NGN11.6B
                       */}
          </Col>
        </Row>
        <Container className='my-3 py-1'>
            
              <p style={{fontWeight:'bold', fontSize:'13px', textAlign:'cnter'}}> Key Statistics on O & S Activity - Inception till Date</p>
          {/* Table..... Summary of Key Activity  .... 2017-19, 2020, 2021, 2022 
                  Period Ending Statistics:
                  Size of Guaranteed Transactions Since Inception N31.5 billion , N43.5 billion , N77.6 billion
                  Size of Mandated Deal Pipeline(period-end) N123.9 billion N203.5 billion N 311.5 billion
                  Advanced Mandates (to close in < 6months) N62.5 billion , N70.6 billion, N63.6 billion
                  Longer Mnadates ( to close in > 6 months) N43.9 billion,N93.0 billion,N191.4 billion
                  Contingent Refs (long -led GreenField)  N17.5 billion,N39.9 billion, N56.5 billioN 
                  Applying the
            
                  */}
                  

   <Table striped bordered hover>
  <thead style={{fontSize:'12px'}}>
    <tr>
    <th>S/n</th>
         <th  >Size Of Guarantee Transactions since Inception </th>
         <th>Size Of Mandated Deal Pipeline(period_end) </th>
         <th>Advanced Mandates (to close in > 6 months) </th>
         <th>Longer Mandates ( to close in > 6 months) </th>
         <th>Contingent Refs (long -led GreenField) </th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>1</td>
         <td>N31.5 billion</td>
         <td> N123.9 billion</td>
         <td>N62.5 billion</td>
         <td>N43.9 billion</td>
         <td>N17.5 billion</td>
    </tr>
    <tr>
    <td>2</td>
         <td>N43.5 billion</td>
         <td>N203.5 billion</td>
         <td>N70.6 billion</td>
         <td>N93.0 billion</td>
         <td>N39.9 billion</td>
    </tr>
    <tr>
    <td>3</td>
         <td>N77.6 billion</td>
         <td>N 311.5 billion</td>
         <td>N 311.5 billion</td>
         <td>N191.4 billion</td>
         <td>N56.5 billion</td>
    </tr>
   
  </tbody>
</Table>
 
                  
        </Container>
      </Container>
      <GuaranteePortGrowthVsTar/>
      <FinancialYearGPipeline/>
      <OriginationActivity/>
      <StructuringExecution/>
    </React.Fragment>
  );
}
