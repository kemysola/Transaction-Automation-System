import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import Service from "../../Services/Service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  Legend,
} from "recharts";
import TitleContext from '../../context/TitleContext';
import { Divider } from "@mui/material";


function GuaranteeForecast() {
  const { filteredStore, addFtYear} = useContext(TitleContext)
  const [forecast, setForecast] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    retrieveDeals();
  }, [filteredStore]);

  useEffect(() => {
    retrieveForecast();
  }, []);

  const retrieveDeals = async () => {
    await Service.getAllDeals(filteredStore)
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Axios :  get forecast  ****************************************

  const retrieveForecast = async () => {
    await Service.getForecast()
      .then((response) => {
        setForecast(response.data.forecast);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const guaranteePipelineData = forecast.map((item) => ({
    name: item.projectionyear,
    Pipeline: item.guaranteepipeline,
  }));

  return (
    <>
      <div
      //   style={{
      //     paddingTop: "5px",
      //     marginTop: "1px",
      //     borderRadius: "15px",
      //     height: "65.4vh",
      //   }}
      >
        <Container className="">
          <Container>
            <Container>
              <BarChart
                width={700}
                height={350}
                data={guaranteePipelineData}
                barSize={54}
                margin={{
                  top: 0,
                  right: 10,
                  left: 60,
                  bottom: 1,
                }}
                layout="horizontal"
              >
                <XAxis
                  xAxisId={0}
                  dataKey="name"
                  tickLine={false}
                  axisLine={true}
                  style={{
                    fontSize: "0.8rem",
                    fontFamily: "Arial",
                    paddingLeft: "2px",
                  }}
                />
                <YAxis hide />
                {/* <Tooltip /> */}
                <Bar
                  dataKey="Pipeline"
                  fill="#32CD32"
                  minPointSize={0}
                  isAnimationActive={false}
                >
                  <LabelList
                    dataKey="Pipeline"
                    position="top"
                    style={{ fontSize: "0.9rem", fontWeight: "bold" }}
                  />
                </Bar>
              </BarChart>
            </Container>
          </Container>
        </Container>
      </div>
    </>
  );
}

export default GuaranteeForecast;
