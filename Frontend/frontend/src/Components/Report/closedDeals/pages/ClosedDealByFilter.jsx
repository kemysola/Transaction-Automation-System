import React, { useState, useEffect } from "react";
import { useIsFetching } from "@tanstack/react-query";
import { Table } from "react-bootstrap";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import Navbar from "../../../LandingPage/Navbar";
import Sidenav from "../../../LandingPage/SideNav2";
import { useQuery } from "@tanstack/react-query";
import Service from "../../../../Services/Service";

function ClosedDealByFilter() {
  const isFetching = useIsFetching();
  const [financialYear, setFinancialYear] = useState("FY2022");
  const { data, isLoading, error, isError, isSuccess } = useQuery(
    ["closed-Year", financialYear],
    async () => await Service.getAllClosedDeals(`${financialYear}`),
    {
      staleTime: 1200,
      refetchOnWindowFocus: true,
      onSuccess: (payload) => {},
      onError: (error) => {
        console.log(error);
      },
      signal: true,
    }
  );
  useEffect(() => {}, [data]);

  function GetTops() {
    const newData = data?.data?.current_fy_closed_deal?.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      "Closed_Deals_From_Inception"
    );
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Closed_Deals_From_Inception.xlsx");
  }

  return (
    <>
      <Navbar />
      <Row>
        <Col sm={2}>
          <Sidenav />
        </Col>
        <Col sm={10}>
          <div>
            <Container>
              <div>
                <h4
                  className="d-flex justify-content-start mb-3"
                  style={{ fontWeight: "bold", fontSize: "14px" }}
                >
                  Closed Deals
                </h4>
                <Row>
                  <Col sm={4}>
                    <Card>
                      <Card.Body>
                        <Card.Subtitle></Card.Subtitle>
                        <Card.Text>
                          <Row>
                            <Form>
                              <Form.Label>Financial Year:</Form.Label>
                              <Form.Control
                                inline
                                label="Count"
                                type="text"
                                placeholder="FY2020"
                                name="financialYear"
                                value={financialYear}
                                onChange={(e) =>
                                  setFinancialYear(e.target.value)
                                }
                              />
                              <br />
                              <Button
                                className="bg-dark mt-1"
                                style={{ border: "none" }}
                                onClick={GetTops}
                              >
                                Download
                              </Button>
                            </Form>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
              {isError ? (
                <div className="text-danger">
                  {error === "undefined" ? (
                    <p>Field can not be blank</p>
                  ) : (
                    "An Error Occurred"
                  )}
                </div>
              ) : isLoading ? (
                <p>.....</p>
              ) : null}

              {isFetching ? (
                "Loading"
              ) : isSuccess ? (
                <div>
                  <Table
                    striped="columns"
                    hover
                    variant="light"
                    className="mt-3"
                    style={{ overflowY: "scroll" }}
                  >
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Deal Size</th>
                        <th>Deal Category</th>
                        <th>Product</th>
                        <th>Region</th>
                        <th>Tenor</th>
                      </tr>
                    </thead>
                    {data?.data?.current_fy_closed_deal?.map((data) => (
                      <tbody>
                        <tr key={data.deal_id}>
                          <td>{data.clientname}</td>
                          <td>{data.dealsize}</td>
                          <td>
                            {data.deal_category === "Red" ? (
                              <p className="text-danger">
                                {data.deal_category}
                              </p>
                            ) : data.deal_category === "Yellow" ? (
                              <p style={{ color: "orange" }}>
                                {data.deal_category}
                              </p>
                            ) : (
                              <p style={{ color: "green" }}>
                                {data.deal_category}
                              </p>
                            )}
                          </td>
                          <td>{data.product}</td>
                          <td>{data.region}</td>
                          <td>{data.tenor}</td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                </div>
              ) : null}
            </Container>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ClosedDealByFilter;
