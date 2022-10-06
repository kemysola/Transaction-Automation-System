import React, { useState, useEffect, useContext } from "react";
import { Row } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  ResponsiveContainer,
} from "recharts";
import TitleContext from '../../context/TitleContext';

import Services from "../../Services/Service";


//  ........................................React functional component.......................
export default function GeneralPie(props) {
  const { filteredStore, addFtYear} = useContext(TitleContext)

  const newStore = filteredStore

  const [data, setData] = useState([]);
  useEffect(() => {
    retrieveDeals();
  }, [newStore]);

  const retrieveDeals = () => {
    Services.getAllDeals(newStore)
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {});
  };

  // .......................... Get transactions according to deal category ...................

  var red = data.reduce(function (filtered, arr) {
    if (arr.deal_category === "Red") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var amber = data.reduce(function (filtered, arr) {
    if (arr.deal_category === "Yellow") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var green = data.reduce(function (filtered, arr) {
    if (arr.deal_category === "Green") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);
  //........................ Return Region Total ......................................

  // ......... Return deal_category total ...............................................

  var redTotal = red.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var amberTotal = amber.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var greenTotal = green.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  // ......................... Store Transaction in Recharts Array .....................

  const chartData = [
    { name: "Red", value: redTotal },
    { name: "Amber", value: amberTotal },
    { name: "Green", value: greenTotal },
  ];

  // ................................. Rechart Piechart Customized Label ...........................

  const COLORS = ["#FF4500", "#FFBB28", "#00C49F"];

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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "central" : "end"}
          dominantBaseline="start"
        >
          {index === 0
            ? `   
            RED : ${(percent * 100).toFixed(1)}%  `
            : "" || index === 2
            ? ` ${(percent * 100).toFixed(1)}% :GREEN  `
            : "" || index === 1
            ? `${(percent * 100).toFixed(1)}% :AMBER `
            : ""}
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

  const chartLegend = chartData.map((item, i) => {
    if (`${item.name}` === "Amber") {
      return (
        <div key={i} style={{ color: "#FFBF00", margin: " 0 10px" }}>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>❒</span>
          {item.name}: ₦
          {item.value.toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}
          bn
        </div>
      );
    }
    return (
      <div key={i} style={{ color: `${item.name}`, margin: " 0 10px" }}>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>❒</span>
        {item.name}: ₦
        {item.value.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}
        bn
      </div>
    );
  });

  return (
    <>
      <Row>
        <div className="mt-1">
        
          <ResponsiveContainer width="140%" height={270}>
            <PieChart margin={{ top: 3,right: 0, bottom: 0 }}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="40%"
                cy="40%"
                fill="#8884d8"
                innerRadius={75}
                outerRadius={220/2}
                paddingAngle={2}
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
          <small
            style={{ display: "inlineBlock" }}
            className="d-flex justify-content-center mr-1"
          >
            {chartLegend}
          </small>
          

          
        </div>
      </Row>
      {props.children}
    </>
  );
}
