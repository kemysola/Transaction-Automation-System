import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Card,
  Form,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import styled from "styled-components";
import Table from "../Table";
import Service from "../../../../Services/Service";
import PieCard from "./PieCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProgressBarDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: center;
  font-size: 10px;
  padding: 4px 15px;
  border-radius: 20px;
`;

const ModalDiv = styled.div`
  position: absolute;
  top: 10px;
  right: 100px;
  bottom: 0;
  left: 0;
  z-index: 10040;
  overflow: auto;
  overflow-y: auto;
`;

export default function Progress() {
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [target, setTarget] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [indFilter, setIndFilter] = useState("Value");
  const [prdFilter, setPrdFilter] = useState("Value");
  const [dealFilter, setDealFilter] = useState("All");
  const [staffFilter, setStaffFilter] = useState("All");
  const [staffName, setStaffName] = useState("All");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dealFilter === "All" && staffFilter === "All") {
      retrieveDeals();
    }
    if (dealFilter !== "All" && staffFilter === "All") {
      setLoading(true);
      filterData(dealFilter);
    }
    if (dealFilter === "All" && staffFilter !== "All") {
      retrieveStaffDeals();
    }
    if (dealFilter !== "All" && staffFilter !== "All") {
      retrieveStaffDeals();
      setLoading(true);
      filterStaffData(dealFilter);
    }
  }, [dealFilter, staffFilter]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  useEffect(() => {
    retrieveStaffList();
  }, []);

  useEffect(() => {
    retrieveGuranteePipeline();
  }, []);

  // Filter Data by Deal Category
  const filterData = (dealFilter) => {
    setLoading(true);
    const filteredData = rawData.filter((item) => {
      return item.deal_category === dealFilter;
    });
    setData(filteredData);
    setLoading(false);
    return filteredData;
  };

  // Filter Individual Staff Data by Deal Category 
  let filterTimeout
  const filterStaffData = (dealFilter) => {  
    clearTimeout(filterTimeout)
    setLoading(true)

    filterTimeout = setTimeout(() => {
      const filteredData = staffData.filter(item => {return item.deal_category === dealFilter})
        setData(staffData.filter(item => {return item.deal_category === dealFilter}))
        setLoading(false)
      return filteredData
    }, 500)
  }
 
  // Retrieve All Deals using a get request
  const retrieveDeals = async() => {
    //setLoading(true);
    await Service.getAllDeals()
      .then((response) => {
        setData(response.data.deals);
        setRawData(response.data.deals);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveStaffList = async() => {
    await Service.getStaffList()
      .then((response) => {
        setStaffList(response.data.staffList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Get deals by staff email
  const retrieveStaffDeals = () => {
    setLoading(true)
    Service.getMyDealsByEmail(staffFilter)
      .then((res) =>{
        setData(res.data.deals)
        setStaffData(res.data.deals)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const retrieveGuranteePipeline = () => {
    Service.getAllStaff()
      .then((response) => {
        setTarget(response.data.staff);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // handle modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // let Target value i.e gurantee fee
  var targetValue = target.reduce(function (tot, arr) {
    return tot + parseFloat(arr.guaranteepipeline);
  }, 0);

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

  // actual deal size
  var sumTotal = data.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);

  //*****************************Variance******************/

  let varianceAmount = targetValue - sumTotal;

  function varianceDisplay(variance) {
    if (variance < 1) {
      let varianceAns = variance * -1;
      return `↓ ₦${varianceAns.toFixed(1)}bn`;
    }
    return `↑ ${variance.toFixed(1)}bn`;
  }

  let variancePercent = ((varianceAmount / targetValue) * 100).toFixed(1);

  function variancePerDisplay(variancePer) {
    if (variancePer < 1) {
      let varianceAns = variancePer * -1;
      return `↓ ${varianceAns}%`;
    }
    return `↑ ${variancePer}%`;
  }

  const chartData = [
    {
      name: `On-grid Power: ₦${option1Total.toFixed(1)}bn`,
      countName: `On-grid Power: ${option1.length}`,
      value: option1Total,
      count: option1.length,
      percent: `${((option1Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option1.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Off-grid Power: ₦${option2Total.toFixed(1)}bn`,
      countName: `Off-grid Power: ${option2.length}`,
      value: option2Total,
      count: option2.length,
      percent: `${((option2Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option2.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Agric infra: ₦${option3Total.toFixed(1)}bn`,
      countName: `Agric infra: ${option3.length}`,
      value: option3Total,
      count: option3.length,
      percent: `${((option3Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option3.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Gas: ₦${option4Total.toFixed(1)}bn`,
      countName: `Gas: ${option4.length}`,
      value: option4Total,
      count: option4.length,
      percent: `${((option4Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option4.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Transport: ₦${option5Total.toFixed(1)}bn`,
      countName: `Transport: ${option5.length}`,
      value: option5Total,
      count: option5.length,
      percent: `${((option5Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option5.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Inputs to Infra: ₦${option6Total.toFixed(1)}bn`,
      countName: `Inputs to Infra: ${option6.length}`,
      value: option6Total,
      count: option6.length,
      percent: `${((option6Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option6.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Affordable Housing: ₦${option7Total.toFixed(1)}bn`,
      countName: `Affordable Housing: ${option7.length}`,
      value: option7Total,
      count: option7.length,
      percent: `${((option7Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option7.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Education Infra: ₦${option8Total.toFixed(1)}bn`,
      countName: `Education Infra: ${option8.length}`,
      value: option8Total,
      count: option8.length,
      percent: `${((option8Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option8.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Healthcare: ₦${option9Total.toFixed(1)}bn`,
      countName: `Healthcare: ${option9.length}`,
      value: option9Total,
      count: option9.length,
      percent: `${((option9Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option9.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Water/Waste: ₦${option10Total.toFixed(1)} bn`,
      countName: `Water/Waste: ${option10.length}`,
      value: option10Total,
      count: option10.length,
      percent: `${((option10Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option10.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `ICT/Telecoms: ₦${option11Total.toFixed(1)}bn`,
      countName: `ICT/Telecoms: ${option11.length}`,
      value: option11Total,
      count: option11.length,
      percent: `${((option11Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option11.length / data.length) * 100).toFixed(1)}%`,
    },
  ];

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
    if (arr.product === "Contingent Refi. Gte.") {
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

  const productChartData = [
    {
      name: `Public Bond: ₦${productOption1Total.toFixed(1)}bn`,
      countName: `Public Bond: ${productOption1.length}`,
      value: productOption1Total,
      count: productOption1.length,
      percent: `${((productOption1Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption1.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Blended Finance: ₦${productOption2Total.toFixed(1)}bn`,
      countName: `Blended Finance: ${productOption2.length}`,
      value: productOption2Total,
      count: productOption2.length,
      percent: `${((productOption2Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption2.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Contigent Refi. Gte.: ₦${productOption3Total.toFixed(1)}bn`,
      countName: `Contigent Refi. Gte.: ${productOption3.length}`,
      value: productOption3Total,
      count: productOption3.length,
      percent: `${((productOption3Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption3.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Private Bond (Clean Energy): ₦${productOption4Total.toFixed(1)}bn`,
      countName: `Private Bond (Clean Energy): ${productOption4.length}`,
      value: productOption4Total,
      count: productOption4.length,
      percent: `${((productOption4Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption4.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Private Bond (Other): ₦${productOption5Total.toFixed(1)}bn`,
      countName: `Private Bond (Other): ${productOption5.length}`,
      value: productOption5Total,
      count: productOption5.length,
      percent: `${((productOption5Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption5.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Annuity PPP: ₦${productOption6Total.toFixed(1)}bn`,
      countName: `Annuity PPP: ${productOption6.length}`,
      value: productOption6Total,
      count: productOption6.length,
      percent: `${((productOption6Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption6.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
  ];

  return (
    <React.Fragment>
      <Container fluid className="bg-light">
        <Row className="d-flex justify-content-between">
          <Col sm={6} lg={8}>
            <p class="animate__animated animate__pulse pt-2">
              <b>Execution Summary</b>
            </p>
            {/* <span>{staffName}</span> */}
          </Col>

          <Col sm={6} lg={4}>
            <Button
              variant="info"
              className="my-1"
              size="sm"
              onClick={handleShow}
            >
              Filter
            </Button>
          </Col>
        </Row>

        {/* ------------------- Filter Modal ------------------------------ */}
        {/* <ModalDiv> */}
        <Modal show={show} onHide={handleClose} backdrop={false}>
          <Modal.Header closeButton>
            <Modal.Title>Filter</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col sm={4} className="mt-3 pt-2">
                <Form.Label>Staff Name</Form.Label>
              </Col>

              <Col sm={4} className="mt-3 pt-2">
                <Form.Select
                  size="sm"
                  name="staff"
                  onChange={(e) => setStaffFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  {staffList.map((opt, i) => (
                    <option
                      key={staffList[i].email}
                      name={staffList[i].stafflist}
                      value={staffList[i].email}
                    >
                      {staffList[i].stafflist}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              {/* Filter Industry Barchart */}
              <Col sm={4} className="mt-3 pt-2">
                <Form.Label>Industry by</Form.Label>
                <Form.Check
                  inline
                  label="Value"
                  type="radio"
                  name="indFilter"
                  value="Value"
                  onClick={(e) => setIndFilter(e.target.value)}
                  defaultChecked
                />
                <Form.Check
                  inline
                  label="Count"
                  type="radio"
                  name="indFilter"
                  value="Count"
                  onClick={(e) => setIndFilter(e.target.value)}
                />
              </Col>

              {/* Filter Product Barchart  */}
              <Col sm={4} className="mt-3 pt-2">
                <Form.Label>Product by</Form.Label>
                <Form.Check
                  inline
                  label="Value"
                  type="radio"
                  name="prdFilter"
                  value="Value"
                  onClick={(e) => setPrdFilter(e.target.value)}
                  defaultChecked
                />
                <Form.Check
                  inline
                  label="Count"
                  type="radio"
                  name="prdFilter"
                  value="Count"
                  onClick={(e) => setPrdFilter(e.target.value)}
                />
              </Col>

              {/* Filter By deal Category */}
              <Col sm={4} className="mt-3 pt-2">
                <Form.Label>Deal Category</Form.Label>
                <Form.Check
                  inline
                  label="All"
                  type="radio"
                  name="dealFilter"
                  value="All"
                  onClick={(e) => setDealFilter(e.target.value)}
                  defaultChecked
                />
                <Form.Check
                  inline
                  label="Green"
                  type="radio"
                  name="dealFilter"
                  value="Green"
                  onClick={(e) => setDealFilter(e.target.value)}
                />
                <Form.Check
                  inline
                  label="Amber"
                  type="radio"
                  name="dealFilter"
                  value="Yellow"
                  onClick={(e) => setDealFilter(e.target.value)}
                />
                <Form.Check
                  inline
                  label="Red"
                  type="radio"
                  name="dealFilter"
                  value="Red"
                  onClick={(e) => setDealFilter(e.target.value)}
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* </ModalDiv> */}

        {loading ? (
          <Spinner animation="border" role="status" variant="secondary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container>
            {/* ---------------------- Actual, Target, Variance Cards ------------------------- */}
            <Row>
              <Col
                sm={3}
                lg={4}
                md={12}
                className="my-1"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Card style={{ width: "18rem", flex: 1 }}>
                  <Card.Body>
                    <Card.Title>{`₦${sumTotal.toFixed(1)}bn`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    <Card.Text>Actual</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col
                sm={3}
                lg={4}
                md={12}
                className="my-1"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Card style={{ width: "18rem", flex: 1 }}>
                  <Card.Body>
                    <Card.Title>{`₦${targetValue.toFixed(1)}bn`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    <Card.Text>Target</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col
                sm={3}
                lg={4}
                md={12}
                className="my-1"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Card style={{ width: "18rem", flex: 1 }}>
                  <Card.Body>
                    <Card.Title>
                      {variancePerDisplay(variancePercent)}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {varianceDisplay(varianceAmount)}
                    </Card.Subtitle>
                    <Card.Text>Variance</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* --------- Deal Category Pie Chart, Industry and Product BarChart --------------- */}
            <Row style={{ marginTop: "5px " }}>
              {/* Deal Category PieChart */}
              <Col sm={12} lg={4} md={12} className="my-1">
                <br/>
                <PieCard dealFilter={dealFilter} staffFilter={staffFilter}/>
              </Col>

              {/* Industry Bar Chart */}
              <Col sm={12} lg={4} md={12} className="my-1">
                <div
                  style={{
                    padding: "10px",
                    marginTop: "3px",
                    borderRadius: "15px",
                  }}
                >
                  <Container>
                    <Container className="bg-light py-3">
                      <p
                        style={{
                          fontSize: "13px",
                          paddingLeft: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        INDUSTRY
                      </p>

                      {indFilter === "Value" ? (
                        <BarChart
                          width={220}
                          height={340}
                          data={chartData}
                          barSize={15}
                          margin={{
                            top: 5,
                            right: 5,
                            left: 5,
                            bottom: 2,
                          }}
                          layout="vertical"
                        >
                          <XAxis type="number" hide />
                          <YAxis
                            type="category"
                            dataKey="name"
                            yAxisId={0}
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "0.5rem", fontFamily: "Arial" }}
                          />
                          <YAxis
                            orientation="right"
                            yAxisId={1}
                            dataKey="percent"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "0.5rem", fontFamily: "Arial" }}
                          />
                          <Bar
                            dataKey="value"
                            fill="#82ca9d"
                            minPointSize={1}
                            background={{ fill: "#eee" }}
                          />
                        </BarChart>
                      ) : (
                        <BarChart
                          width={220}
                          height={340}
                          data={chartData}
                          barSize={15}
                          margin={{
                            top: 5,
                            right: 5,
                            left: 5,
                            bottom: 2,
                          }}
                          layout="vertical"
                        >
                          <XAxis type="number" hide />
                          <YAxis
                            type="category"
                            dataKey="countName"
                            yAxisId={0}
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "0.5rem", fontFamily: "Arial" }}
                          />
                          <YAxis
                            orientation="right"
                            yAxisId={1}
                            dataKey="countPercent"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "0.5rem", fontFamily: "Arial" }}
                          />
                          <Bar
                            dataKey="count"
                            fill="#82ca9d"
                            minPointSize={1}
                            background={{ fill: "#eee" }}
                          />
                        </BarChart>
                      )}
                    </Container>
                  </Container>
                </div>
              </Col>

              {/* Product BarChart */}
              <Col sm={12} lg={4} className="my-1">
                <div
                  style={{
                    paddingTop: "10px",
                    marginTop: "3px",
                    borderRadius: "15px",
                    height: "65.4vh",
                  }}
                >
                  <Container>
                    <Container className="bg-light py-3">
                      <p
                        style={{
                          fontSize: "13px",
                          paddingLeft: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        PRODUCT
                      </p>

                      {prdFilter === "Value" ? (
                        <BarChart
                          width={250}
                          height={250}
                          data={productChartData}
                          barSize={15}
                          margin={{
                            top: 25,
                            right: 10,
                            left: 10,
                            bottom: 22,
                          }}
                          style={{
                            paddingTop: 20,
                          }}
                          layout="vertical"
                        >
                          <XAxis type="number" hide />
                          <YAxis
                            type="category"
                            yAxisId={0}
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            style={{
                              fontSize: "0.52rem",
                              fontFamily: "Arial",
                              // width: "10px"
                            }}
                          />
                          <YAxis
                            orientation="right"
                            yAxisId={1}
                            dataKey="percent"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            style={{
                              fontSize: "0.52rem",
                              fontFamily: "Arial",
                              padding: "15px",
                            }}
                          />
                          <Bar
                            dataKey="value"
                            fill="#82ca9d"
                            minPointSize={1}
                            background={{ fill: "#eee" }}
                          />
                        </BarChart>
                      ) : (
                        <BarChart
                          width={250}
                          height={250}
                          data={productChartData}
                          barSize={15}
                          margin={{
                            top: 25,
                            right: 10,
                            left: 10,
                            bottom: 22,
                          }}
                          style={{
                            paddingTop: 20,
                          }}
                          layout="vertical"
                        >
                          <XAxis type="number" hide />
                          <YAxis
                            type="category"
                            yAxisId={0}
                            dataKey="countName"
                            tickLine={false}
                            axisLine={false}
                            style={{
                              fontSize: "0.52rem",
                              fontFamily: "Arial",
                              // width: "10px"
                            }}
                          />
                          <YAxis
                            orientation="right"
                            yAxisId={1}
                            dataKey="countPercent"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            style={{
                              fontSize: "0.52rem",
                              fontFamily: "Arial",
                              padding: "15px",
                            }}
                          />
                          <Bar
                            dataKey="count"
                            fill="#82ca9d"
                            minPointSize={1}
                            background={{ fill: "#eee" }}
                          />
                        </BarChart>
                      )}
                    </Container>
                  </Container>
                </div>
              </Col>
              {/*------------------------ Column ------------------------------- */}
            </Row>
          </Container>
        )}
      </Container>
      {/* <br /> */}

      {/* Exxecution Dashboard Table */}
      <Table dealFilter={dealFilter} staffFilter={staffFilter} />
      {/* </Container> */}
    </React.Fragment>
  );
}
