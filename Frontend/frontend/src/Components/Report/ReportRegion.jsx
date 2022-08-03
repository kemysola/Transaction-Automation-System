import React,{useState,useEffect} from 'react'
import Services from "../../Services/Service";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Container, Row, Col, Spinner, Stack} from "react-bootstrap";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
  } from "recharts";



export default function ReportRegion() {
    const [region, setRegion] = useState([])
    const [data, setData] = useState([]);
    useEffect(() => {
        retrieveDeals()

    },[])
    const retrieveDeals = () => {
        Services.getAllDeals()
          .then((response) => {
            setData(response.data.deals);
          })
          .catch((e) => {
          });
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
       //.................................... Chart :Region Chart ...............................................//
       const chartRegion = [
        {
          name:"South",
          value:south,
        },
        {
          name:"SW",
          value:southwest,
        },
        {
          name:"NC",
          value:northcentral,
        },
        {
          name:"NE",
          value:northeast,
        },
        {
          name:"NW",
          value:northwest,
        },
        {
          name:"SS",
          value:southsouth,
        }
      ]

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
        const radius = innerRadius + (outerRadius - innerRadius) * 1;        
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        return (
          <>
            <text
              x={x}
              y={y}
              fill="black"
              textAnchor={x > cx? 'start' : 'end'} dominantBaseline="start">
            {`${(percent * 100).toFixed(1)}% `}
              {/* {index === 0 ? 
              `   
               NGN${redTotal}B `
              :'' || index === 2 ? `NGN${greenTotal}B `:'' || index === 1? 'Amber':''} */}
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
                ₦${(payload[0].value).toLocaleString("en-US", {
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
                <ResponsiveContainer width="120%" height={210}>
                  <PieChart margin={{ top: 10, left: 100, right: 0, bottom: 0 }}>
                    <Pie
                      data={chartRegion}
                      dataKey="value"
                      nameKey="name"
                      cx="25%"
                      cy="40%"
                      fill="#8884d8"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={2}
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
  )
}
