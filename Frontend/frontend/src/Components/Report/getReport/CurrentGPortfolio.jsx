import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import GeneralPie from "../GeneralPie";
import { Divider } from 'antd';



export default function CurrentGPortfolio(props){
    const data = [
        { name: "GPC", value: 26 },
        { name: "GELUL", value: 17 },
        { name: "LFZC", value: 13 },
        { name: "TSL", value: 15 },
        { name: "North Soth Power", value: 14 },
        { name: "VIATHAN", value: 15 },
      ];
      
    
      // ******************************************  Color selection for the pie chart ****************************************
      const COLORS = ["#FF4500", "#FFBB28", "#00C49F", "GREEN", "BLUE", "PURPLE"];
    
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
        const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        return (
          <>
            <text x={cx} y={cy} dy={8} textAnchor="left"></text>
            <text
              x={x}
              y={y}
              fill="black"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {`${(percent * 100).toFixed(0)}%`}
            </text>
          </>
        );
      };
    
      // ....................... Recharts customTooltip .........................................
    
      const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div
              className="custom-tooltip"
              style={{
                backgroundColor: "white",
                height: "30px",
                padding: "2px 2px",
              }}
            >
              <p className="label">
                {`${payload[0].name} : 
                ₦${payload[0].value.toLocaleString("en-US", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 2,
                })}bn`}
              </p>
            </div>
          );
        }
        return null;
      };
    
    return(
        <>
        <Container fluid>
        <Divider> Current Guarantee  Portfolio</Divider>
        <div className="pt-1">
          <p
            style={{
              fontWeight: "",
              marginLeft: "",
            }}
          >
            {props?.data}
          </p>
        </div>
      </Container>

      <Container className="my-3">
        <Row className="mt-1">
          <Col sm={6}>
            <p
              className="text-success text-center"
              style={{ fontWeight: "", fontSize: "12px" }}
            >
              Analysis of Guarantee Transactions Since Inception 
            </p>
            <ResponsiveContainer width="140%" height={270}>
              <PieChart margin={{ top: 3, right: 0, bottom: 0 }}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="40%"
                  cy="40%"
                  fill="#8884d8"
                  innerRadius={75}
                  outerRadius={220 / 2}
                  paddingAngle={2}
                  isAnimationActive={true}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={customTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col sm={6}>
            <p
              className="text-success text-center"
              style={{ fontWeight: "", fontSize: "12px" }}
            >
              Categorisation  of Mandated Transactions as at
              Financial Year.
            </p>
            <GeneralPie />
          </Col>
        </Row>
      </Container>
        </>
    )
}