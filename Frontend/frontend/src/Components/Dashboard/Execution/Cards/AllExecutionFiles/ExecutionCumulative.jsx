import { useState, useEffect } from "react";
import {
  Container,
 
} from "react-bootstrap";
import Divider from "@mui/material/Divider";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
  } from "recharts";
export default function ExecutionCumulative({data,sumTotal,staffFilter,target,staffList,}) {
    const [indTarget, setIndTarget] = useState([]);
    useEffect(() => {}, [indTarget]);
  
    useEffect(() => {
      function filterData() {
        const filteredData = target.filter((deal) => {
          if (staffFilter.includes("All")) {
            return setIndTarget(target);
          }else if (staffFilter !== "All") {
              let filtedStaff = target.filter(
                  (data) => data?.firstname + " " + data?.lastname === staffFilter
                );
                return setIndTarget(filtedStaff);
  
            }  
          else {
            return setIndTarget(target);
          }
        });
        return indTarget;
      }
      filterData();
    }, [staffFilter]);
    let mandate = indTarget.length > 0 ? indTarget.map((data) => data.mandateletter): target.map((data) => data.mandateletter)
   const financialClose = indTarget.length > 0 ? indTarget.map((data) => data.financialclose):target.map((data) => data.financialclose)
   const cca = indTarget.length > 0 ? indTarget.map((data) => data.creditcommiteeapproval) :target.map((data) => data.creditcommiteeapproval)
   const feeLetter = indTarget.length > 0 ? indTarget.map((data) => data.feeletter): target.map((data) => data.feeletter)
   
    const approvalData = [
        {
          name: "Mandate:2%",
          value: mandate,
          percent: `${(mandate * 1).toFixed(1)}%`,
        },
        {
          name: `Credit Approval :10%`,
          value: cca,
          percent: `${(cca * 1).toFixed(1)}%`,
        },
        {
          name: "Financial Close:100%",
          value: financialClose,
          percent: `${(financialClose * 1).toFixed(1)}%`,
        },
        {
          name: "Fee Letter:20%",
          value: feeLetter,
          percent: `${(feeLetter * 1).toFixed(1)}%`,
        },
      ];
      const colorBreakPoint = 0;
      const { min, max } = data.reduce(
        (result, datapoint) => ({
          min: datapoint.value < result.min === 0 ? datapoint.value : result.min,
          max: datapoint.value > result.max === 0 ? datapoint.value : result.max,
        }),
        { min: 0, max: 0 }
      );
      const colorBreakPointPercentage = `${
        (1 - (colorBreakPoint - min) / (max / min)) * 100
      }%`;
    
  return (
    <div>
      <Divider style={{color:"#E2E2E2"}}/>
         <BarChart
          width={280}
          height={250}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
          data={approvalData}
          layout="horizontal"
        >
          <YAxis
            style={{
              fontSize: "0.52rem",
              fontFamily: "Arial",
              padding: "15px",
            }}
            stroke="black"
          />

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            textAnchor="middle"
            scaleToFit="true"
            verticalAnchor="start"
            interval={0}
            angle="1"
            style={{
              fontSize: "0.5rem",
              paddingLeft: "1px",
              textAlign: "center",
              paddingRight: "2.9rem",
            }}
          />

          <XAxis
            xAxisId={1}
            dataKey="counters"
            tickLine={false}
            axisLine={false}
            // orientation="top"
            style={{ fontSize: "0.5rem", padding: "1rem" }}
          />
          <Tooltip />

          <Bar label dataKey="value" background={{ fill: "white" }}>
            {approvalData.map((datacolor, entry, index) => (
              <Cell
                key={`cell-$${index}`}
                fill={datacolor.value > 0 ? "green" : "red"}
              />
            ))}
          </Bar>
        </BarChart>
        <Container>
          <small
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            CUMULATIVE PERFORMANCE INCENTIVE EARNED
          </small>
          </Container>
    </div>
  )
}
