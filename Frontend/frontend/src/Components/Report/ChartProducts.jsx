import React, { useState, useEffect } from "react";
import Services from "../../Services/Service";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {  Row} from "react-bootstrap";
import {
  
  ResponsiveContainer,
} from "recharts";

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
  return (
<>
</>  )
}
