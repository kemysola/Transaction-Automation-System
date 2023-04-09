import React from "react";
import { useEffect, useState, useContext, useMemo, useCallback } from "react";
import Service from "../../../../Services/Service";
import TitleContext from "../../../../context/TitleContext";
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
import ExecutionBarChart from "./AllExecutionFiles/ExecutionBarChart";
import ExecutionProductsBarchart from "./AllExecutionFiles/ExecutionProductsBarchart";
import ExecutionIndustryBarchart from "./AllExecutionFiles/ExecutionIndustryBarchart";
import ExecutionTable from "./AllExecutionFiles/ExecutionTable";
import ExecutionActual from "./AllExecutionFiles/ExecutionActual";
import ExecutionCumulative from "./AllExecutionFiles/ExecutionCumulative";

function FilterTable() {
  const [indFilter, setIndFilter] = useState("Value");
  const { filteredStore} = useContext(TitleContext);
  const [data, setData] = useState([]);
  const [target, setTarget] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [staffFilter, setStaffFilter] = useState("All");
  const [dataCategory, setDataCategory] = useState(["All"]);
  const [allFilt, setAllFilt] = useState([]);
  const [prdFilter, setPrdFilter] = useState("Value");

 
  useEffect(() => {
    retrieveDeals();
    retrieveStaffList();
    retrieveGuranteePipeline();
    
  }, [staffFilter, dataCategory,filteredStore]);

  const retrieveDeals =  () => {
     Service.getAllDeals(filteredStore)
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveStaffList = async () => {
    await Service.getStaffList()
      .then((response) => {
        setStaffList(response.data.staffList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveGuranteePipeline = async () => {
    await Service.getAllStaff()
      .then((response) => {
        setTarget(response.data.staff);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFilterChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      setDataCategory([...dataCategory, category]);
    } else {
      setDataCategory(dataCategory.filter((v) => v !== category));
    }
  };
  useEffect(() => {
    function filterData() {
      const filteredData = data.filter((deal) => {
        if (staffFilter !== "All" && !dataCategory.includes("All")) {
          return setAllFilt(
            data.filter(
              (deal) =>
                deal.transactor === staffFilter &&
                dataCategory.includes(deal.deal_category)
            )
          );
        } else if (staffFilter === "All" && dataCategory.includes("All")) {
          return setAllFilt(data);
        } else if (staffFilter !== "All" && dataCategory.includes("All")) {
          return setAllFilt(
            data.filter((data) => data.transactor === staffFilter)
          );
        } else if (staffFilter === "All" && !dataCategory.includes("All")) {
          return setAllFilt(
            data.filter((data) => dataCategory.includes(data.deal_category))
          );
        } else if (staffFilter === "All" && dataCategory.includes("All")) {
          return setAllFilt(data);
        } else if (
          staffFilter === "All" ||
          !dataCategory ||
          dataCategory.includes("All")
        ) {
          return setAllFilt(data);
        } else if (staffFilter !== "All") {
          return setAllFilt(
            data.filter((data) => data.transactor === staffFilter)
          );
        } else {
          return setAllFilt(data);
        }
      });
      return allFilt;
    }
    filterData();
  }, [data, staffFilter]);
  var sumTotal = allFilt.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);

  return (
    <div>
      <Container Fluid>
        <Card
          className="m-1 bg-light"
          style={{ width: "30rem", borderRadius: "10px" }}
        >
          <Card.Body>
            <Card.Title style={{ fontSize: "13px" }}>Filter</Card.Title>

            <Card.Text>
              <Row style={{ fontSize: "12px" }}>
                <Col sm={3} lg={3} style={{ paddingTop: "5px" }}>
                  <Form.Label>Staff Name:</Form.Label>
                </Col>

                <Col sm={4} lg={8}>
                  <Form.Select
                    size="sm"
                    name="staff"
                    onChange={(e) => setStaffFilter(e.target.value)}
                  >
                    <option value="All" name="All">
                      All
                    </option>
                    {staffList.map((opt, i) => (
                      <option
                        key={staffList[i].email}
                        name={staffList[i].stafflist}
                        value={staffList[i].stafflist}
                      >
                        {staffList[i].stafflist}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row style={{ fontSize: "12px", marginTop: "10px" }}>
                <Col sm={3} lg={3}>
                  <Form.Label>Industry by:</Form.Label>
                </Col>
                <Col sm={8}>
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
              </Row>

              <Row style={{ fontSize: "12px" }}>
                <Col sm={3} lg={3}>
                  <Form.Label>Product by:</Form.Label>
                </Col>

                <Col sm={8}>
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
              </Row>

              <Row style={{ fontSize: "12px" }}>
                <Col sm={3} lg={3}>
                  <Form.Label>Deal Category:</Form.Label>
                </Col>

                <Col sm={2} lg={2}>
                <Form.Check
            inline
            label="All"
            type="checkbox"
            name="All"
            value="All"
            defaultChecked
            onChange={handleFilterChange}
          />
        </Col>
        <Col sm={2} lg={2}>
          <label>
            <input
              type="checkbox"
              name="Green"
              onChange={handleFilterChange}
              checked={dataCategory.includes("Green")}
              value="Green"
            />{" "}
            Green
          </label>
        </Col>
        <Col sm={2} lg={2}>
          <label>
            <input
              type="checkbox"
              name="Red"
              onChange={handleFilterChange}
              value="Red"
            />{" "}
            Red
          </label>
        </Col>
        <Col sm={2} lg={2}>
          <label>
            <input
              type="checkbox"
              name="Yellow"
              onChange={handleFilterChange}
              value="Yellow"
              checked={dataCategory.includes("Yellow")}
            />{" "}
            Amber
          </label>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
     

      <ExecutionActual
        sumTotal={sumTotal}
        data={allFilt}
        target={target}
        staffFilter={staffFilter}
        staffList={staffList}
      />
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12} lg={4} md={12} className="my-1">
          <ExecutionBarChart data={allFilt} />
        </Col>
        <Col sm={12} lg={4} md={12} className="my-1">
          <ExecutionIndustryBarchart data={allFilt} indFilter={indFilter} />
        </Col>
        <Col sm={12} lg={4} md={12} className="my-1">
          <ExecutionProductsBarchart data={allFilt} prdFilter={prdFilter} />
        </Col>
      </Row>
      <ExecutionCumulative
        sumTotal={sumTotal}
        data={allFilt}
        target={target}
        staffFilter={staffFilter}
        staffList={staffList}
      />
      <ExecutionTable data={allFilt} />
    </div>
  );
}

export default FilterTable;
