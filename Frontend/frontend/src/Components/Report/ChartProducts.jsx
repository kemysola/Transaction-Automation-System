import React, { useState, useEffect } from "react";
import Services from "../../Services/Service";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Row } from "react-bootstrap";
import { ResponsiveContainer } from "recharts";

export default function ChartProducts() {
  const [data, setData] = useState([]);
  useEffect(() => {
    retrieveDeals();
  }, []);
  const retrieveDeals = () => {
    Services.getAllDeals()
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {});
  };

  //-------------------- PRODUCT ------------------------------//

  let productOption1 = data.reduce(function (filtered, arr) {
    if (arr.product === "Public Bond") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption2 = data.reduce(function (filtered, arr) {
    if (arr.product === "Blended Finance") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption3 = data.reduce(function (filtered, arr) {
    if (arr.product === "Contigent Refi. Gte") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption4 = data.reduce(function (filtered, arr) {
    if (arr.product === "Private Bond (Clean Energy)") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption5 = data.reduce(function (filtered, arr) {
    if (arr.product === "Private Bond (Other)") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption6 = data.reduce(function (filtered, arr) {
    if (arr.product === "Annuity PPP") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption1Total = productOption1.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption2Total = productOption2.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption3Total = productOption3.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption4Total = productOption4.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption5Total = productOption5.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption6Total = productOption6.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  const productChart = [
    {
      name: `Public Bond`,
      value: productOption1Total,
    },
    {
      name: `Blended Finance: ₦${productOption2Total.toFixed(1)}bn`,
      value: productOption2Total,
    },
    {
      name: `Contigent Refi. Gte.: ₦${productOption3Total.toFixed(1)}bn`,
      value: productOption3Total,
    },
    {
      name: `Private Bond (Clean Energy): ₦${productOption4Total.toFixed(1)}bn`,
      value: productOption4Total,
    },
    {
      name: `Private Bond (Other): ₦${productOption5Total.toFixed(1)}bn`,
      value: productOption5Total,
    },
    {
      name: `Annuity PPP: ₦${productOption6Total.toFixed(1)}bn`,
      value: productOption6Total,
    },
  ];
  // ................................. Rechart Piechart Customized Label ...........................

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
    const radius = innerRadius * 1.1;
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
          <tspan>
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
        </text>

        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="start"
        >
          {/* {`${(percent * 100).toFixed(1)}% `} */}
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
          <ResponsiveContainer width="150%" height={280}>
            <PieChart margin={{ top: 10, right: 0, bottom: 0 }}>
              <Pie
                data={productChart}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                fill="white"
                innerRadius={60}
                outerRadius={Math.min(250) / 2}   
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
        </div>
      </Row>
    </>
  );
}
