import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import Navbar from "../../../LandingPage/Navbar";
import Sidenav from "../../../LandingPage/SideNav2";
import { useGetAllClosedDealsQuery } from "../../../../Services/apiSlice";

function ClosedDeals() {
  const { data, isLoading, error, isError, isSuccess } =
    useGetAllClosedDealsQuery();
  function GetTops() {
    const newData = data?.current_fy_closed_deal?.map((row) => {
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
    //Buffer
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
                <Row>
                  <Col sm={6} className='d-flex justify-content-start' style={{fontWeight:'bold'}}>
                    
                      Closed Deals From Inception
                  </Col>
                  <Col sm={6} className='d-flex justify-content-end'>
                    <Button
                      className="bg-dark "
                      style={{ border: "none" }}
                      onClick={GetTops}
                    >
                      Download
                    </Button>
                  </Col>
                </Row>
              </div>
              {isError ? (
                <div className="text-danger">
                  {error === "undefined" ? (
                    <p>Field can not be blank</p>
                  ) : (
                    error?.data.Error
                  )}
                </div>
              ) : isLoading ? (
                <p>.....</p>
              ) : null}

              {isSuccess ? (
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
                    {data?.current_fy_closed_deal?.map((data) => (
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

export default ClosedDeals;
