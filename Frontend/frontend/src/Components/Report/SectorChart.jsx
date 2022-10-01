import React, { useState, useEffect, useContext } from "react";
import Services from "../../Services/Service";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Row } from "react-bootstrap";
import { ResponsiveContainer } from "recharts";
import TitleContext from '../../context/TitleContext';


export default function SectorChart() {
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
  let option1 = data.reduce(function (filtered, arr) {
    if (arr.industry === "On-grid Power") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option2 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Off-grid Power") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option3 = data.reduce(function (filtered, arr) {
    if (arr.deal_category === "Agric Infra.") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option4 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Gas") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option5 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Transportation") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option6 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Inputs to Infra.") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option7 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Affordable Housing") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option8 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Education Infra.") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option9 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Healthcare") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option10 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Water/Waste") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option11 = data.reduce(function (filtered, arr) {
    if (arr.industry === "ICT/Telecoms") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option1Total = option1.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option2Total = option2.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option3Total = option3.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option4Total = option4.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option5Total = option5.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option6Total = option6.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option7Total = option7.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option8Total = option8.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option9Total = option9.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option10Total = option10.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option11Total = option11.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);
  const chartData = [
    {
      name: `On-grid Power: ₦${option1Total.toFixed(1)}bn`,
      countName: `On-grid Power: ${option1.length}`,
      value: option1Total,
      count: option1.length,
     
      countPercent: `${((option1.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Off-grid Power: ₦${option2Total.toFixed(1)}bn`,
      countName: `Off-grid Power: ${option2.length}`,
      value: option2Total,
      count: option2.length,
      
      countPercent: `${((option2.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Agric infra: ₦${option3Total.toFixed(1)}bn`,
      countName: `Agric infra: ${option3.length}`,
      value: option3Total,
      count: option3.length,
    
      countPercent: `${((option3.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Gas: ₦${option4Total.toFixed(1)}bn`,
      countName: `Gas: ${option4.length}`,
      value: option4Total,
      count: option4.length,
      
      countPercent: `${((option4.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Transport: ₦${option5Total.toFixed(1)}bn`,
      countName: `Transport: ${option5.length}`,
      value: option5Total,
      count: option5.length,
      
      countPercent: `${((option5.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Inputs to Infra: ₦${option6Total.toFixed(1)}bn`,
      countName: `Inputs to Infra: ${option6.length}`,
      value: option6Total,
      count: option6.length,
      
      countPercent: `${((option6.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Affordable Housing: ₦${option7Total.toFixed(1)}bn`,
      countName: `Affordable Housing: ${option7.length}`,
      value: option7Total,
      count: option7.length,
      
      countPercent: `${((option7.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Education Infra: ₦${option8Total.toFixed(1)}bn`,
      countName: `Education Infra: ${option8.length}`,
      value: option8Total,
      count: option8.length,
      
      countPercent: `${((option8.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Healthcare: ₦${option9Total.toFixed(1)}bn`,
      countName: `Healthcare: ${option9.length}`,
      value: option9Total,
      count: option9.length,
     
      countPercent: `${((option9.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Water/Waste: ₦${option10Total.toFixed(1)} bn`,
      countName: `Water/Waste: ${option10.length}`,
      value: option10Total,
      count: option10.length,
     
      countPercent: `${((option10.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `ICT/Telecoms: ₦${option11Total.toFixed(1)}bn`,
      countName: `ICT/Telecoms: ${option11.length}`,
      value: option11Total,
      count: option11.length,
      
      countPercent: `${((option11.length / data.length) * 100).toFixed(1)}%`,
    },
  ];
  const COLORS = [
    "#a3c1ad",
    "#93c572",
    "#a3c1ad",
    "#93c572",
    "#a3c1ad",
    "#93c572",
  ];

  const RADIAN = Math.PI / 180.5;

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
    const radius = innerRadius * 1.3;
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
          {/* <tspan>
            {" "}
            {index === 0 ? (
              <tspan>
                {`${(percent * 100).toFixed(1)}%   Public Bond ` }
              </tspan>
            ) : (
              ""
            )}
          </tspan>
          <tspan>
            {" "}
            {index === 1 ? (
              <tspan>
                {`${(percent * 100).toFixed(1)}%   Blended Finance`}
              </tspan>
            ) : (
              ""
            )}
          </tspan>
          <tspan>
            {index === 2 ? <tspan> {`  Contigent Refi.G ${(percent * 100).toFixed(1)}%  `}</tspan> : ""}
          </tspan> */}
        </text>
        {/* <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="end"
        >
          <tspan>
            {index === 3 ? <tspan>{`Private Bond (Clean Energy) ${(percent * 100).toFixed(1)}%`} </tspan> : ""}
          </tspan>
        </text>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="end"
        >
          <tspan>
            {index === 4 ? <tspan> {`${(percent * 100).toFixed(1)}% Private Bond(others) `} </tspan> : ""}
          </tspan>
        </text>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="start"
        >
          <tspan className="my-2">
            {index === 5 ? (
              <tspan>
                {`${(percent * 100).toFixed(1)}% Annuity PPP`}
              </tspan>
            ) : (
              ""
            )}
          </tspan>
        </text> */}

        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="start"
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

  return <>
  <Row>
          <ResponsiveContainer width="105%" height={250}>
            <PieChart margin={{ top: 3, right: 0, bottom: 0 }}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="40%"
                fill="white"
                innerRadius={70}
                outerRadius={Math.min(200) / 2}   
                paddingAngle={1}
                isAnimationActive={false}
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
      </Row>
  </>;
}
