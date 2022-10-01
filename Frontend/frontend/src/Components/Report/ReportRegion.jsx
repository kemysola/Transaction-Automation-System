import React, { useState, useEffect, useContext } from "react";
import Services from "../../Services/Service";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import TitleContext from '../../context/TitleContext';

import {  Row} from "react-bootstrap";
import {
  
  ResponsiveContainer,
} from "recharts";

export default function ReportRegion() {
  const { filteredStore, addFtYear} = useContext(TitleContext)
  const [data, setData] = useState([]);
  const newStore = JSON.parse(filteredStore)

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
  // ............................ Region Data ................................................

  var south = data.reduce(function (filtered, arr) {
    if (arr.region === "SE") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var southwest = data.reduce(function (filtered, arr) {
    if (arr.region === "SW") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var southsouth = data.reduce(function (filtered, arr) {
    if (arr.region === "SS") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var northwest = data.reduce(function (filtered, arr) {
    if (arr.region === "NW") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var northeast = data.reduce(function (filtered, arr) {
    if (arr.region === "NE") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var northcentral = data.reduce(function (filtered, arr) {
    if (arr.region === "NC") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  // summ all values in each of the region arrays

  let southTotal = south.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let southwestTotal = southwest.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let southsouthTotal = southsouth.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let northwestTotal = northwest.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let northeastTotal = northeast.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let northcentralTotal = northcentral.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  //.................................... Chart :Region Chart ...............................................//
  const chartRegion = [
    {
      name: "SOUTH EAST",
      value: southTotal,
    },
    {
      name: "SOUTH WEST",
      value: southwestTotal,
    },
    {
      name: "NC",
      value: northcentralTotal,
    },
    {
      name: "NE",
      value: northeastTotal,
    },
    {
      name: "NW",
      value: northwestTotal,
    },
    {
      name: "SS",
      value: southsouthTotal,
    },
  ];

  // ................................. Rechart Piechart Customized Label ...........................

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "blue", "orange"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    payload,
  }) => {
    const radius = innerRadius * 12.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="start"
        >
          <tspan> {index === 0 ? <tspan> {`SOUTH EAST  `} </tspan> : ""}</tspan>
          <tspan> {index === 1 ? <tspan> SOUTH WEST </tspan> : ""}</tspan>
          <tspan> {index === 2 ? <tspan> NORTH CENTRAL </tspan> : ""}</tspan>
          <tspan> {index === 3 ? <tspan> NORTH EAST </tspan> : ""}</tspan>
          <tspan> {index === 4 ? <tspan> NORTH WEST </tspan> : ""}</tspan>
          <tspan> {index === 5 ? <tspan> SOUTH SOUTH </tspan> : ""}</tspan>
        </text>

        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "end" : "start"}
          dominantBaseline="end"
        >
          {`${(percent * 100).toFixed(1)}% `}
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

  return (
    <>
      <Row>
        <div className="mt-3">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart margin={{ top: 10, right: 0, bottom: 0 }}>
              <Pie
                data={chartRegion}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                fill="white"
                
                innerRadius={10}
                outerRadius={Math.min(220) / 2}
                paddingAngle={1}
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
        </div>
      </Row>
    </>
  );
}
