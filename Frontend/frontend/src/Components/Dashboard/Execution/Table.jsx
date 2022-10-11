import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Row, Col, Form as Fm, Spinner, Container } from "react-bootstrap";
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
  usePagination,
  useSortBy,
} from "react-table";
import styled from "styled-components";
import Service from "../../../Services/Service";
import * as XLSX from "xlsx";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Divider } from "@mui/material";
import TitleContext from "../../../context/TitleContext";

const ContainerWrapper = styled.div`
  font-size: 11px;
  margin-top: 0.55rem;
  padding: 1rem 1rem;
  border-radius: 5px;
`;

const TableWrapper = styled.div`
  padding: 0rem 1rem;
  background: white;
  border-radius: 5px;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-spacing: 0;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const ButtonWrapper = styled.button`
  color: white;
  background: green;
  border: 1px solid white;
  padding: 2px 15px;
  font-size: 13px;
  margin-top: 40px;
  height: 32px;
  border-radius: 3px;
`;

const DateWrapper = styled.button`
  // display: flex;
  // align-items: left;
  background: white;
  border: none;
  // justify-content: start;
  // position: absolute;
  // margin-right: 1.8rem;
  // right: 120px;
  // padding-bottom: 1rem;
`;
const Pagination = styled.div`
  padding: 1em;

  button {
    margin: 2px;
    border-radius: 3px;
    border: 1px solid black;
  }

  span {
    font-size: 12px;
    margin: 2px;
  }

  select {
    margin: 2px;
    width: 80px;
    font-size: 12px;
  }
`;
const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block text-danger">
        This field is required!
      </div>
    );
  }
};

const DealsTable = ({ props, dealFilter, staffFilter }) => {
  const initialDateState = {
    start_date: "",
    end_date: "",
    client_name: "",
  };

  // const { filteredStore, addFtYear} = useContext(TitleContext)
  const { filteredStore, addFtYear } = useContext(TitleContext);
  const [date, setDate] = useState(initialDateState);
  const [deals, setDeals] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(false);
  const dealsRef = useRef();
  const form = useRef();
  dealsRef.current = deals;

  const newStore = filteredStore;
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
  }, [dealFilter, staffFilter, newStore]);

  // Filter Data by Deal Category
  const filterData = (dealFilter) => {
    setLoading(true);
    const filteredData = rawData.filter((item) => {
      return item.deal_category === dealFilter;
    });
    setDeals(filteredData);
    setLoading(false);
    return filteredData;
  };

  // Filter Individual Staff Data by Deal Category
  let filterTimeout;
  const filterStaffData = (dealFilter) => {
    clearTimeout(filterTimeout);
    setLoading(true);

    filterTimeout = setTimeout(() => {
      const filteredData = staffData.filter((item) => {
        return item.deal_category === dealFilter;
      });
      setDeals(
        staffData.filter((item) => {
          return item.deal_category === dealFilter;
        })
      );
      setLoading(false);

      return filteredData;
    }, 500);
  };

  // Get All Deals
  const retrieveDeals = () => {
    setLoading(true);
    Service.getAllDeals(newStore)
      .then((response) => {
        setDeals(response.data.deals);
        setRawData(response.data.deals);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Get deals by staff email
  const retrieveStaffDeals = () => {
    setLoading(true);
    Service.getMyDealsByEmail(staffFilter, newStore)
      .then((res) => {
        setDeals(res.data.deals);
        setStaffData(res.data.deals);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDate({ ...date, [name]: value });
  };

  const saveDate = (e) => {
    e.preventDefault();
    form.current.validateAll();

    let start_date = date.start_date;
    let end_date = date.end_date;
    let client_name = date.client_name ? date.client_name : "''"; // i'd love to come back to this, as the output for when client name is not specified is inaccurate

    Service.getDealByDate(start_date, end_date, client_name)
      .then((response) => {
        setDeals(response.data.records);
      })
      .catch((e) => {
        setResponse("Please Fill All Required Fields");
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        maxWidth: 50,
        filterable: true,
        Cell: (props) => {
          const rowIdx = parseInt(props.row.id);

          return <div>{`${rowIdx + 1}`}</div>;
        },
      },
      {
        Header: "Client",
        accessor: "clientname",
      },
      {
        Header: "Transactor",
        accessor: "transactor",
      },
      {
        Header: "Deal Size(₦'BN)",
        accessor: "dealsize",
        Cell: (props) => {
          const amount = parseInt(props.row.original["dealsize"]);
          return <div>{`${amount.toFixed(1)}`}</div>;
        },
      },
      {
        Header: "Industry",
        accessor: "industry",
      },
      {
        Header: "Product",
        accessor: "product",
      },
      {
        Header: "Region",
        accessor: "region",
      },
      {
        Header: "Tenor(yrs)",
        accessor: "tenor",
      },
      {
        Header: "Coupon(%)",
        accessor: "coupon",
      },
      {
        Header: "Expected Financial Close Date",
        accessor: "expectedclose",
        Cell: (props) => {
          const date = props.row.original["expectedclose"];
          if (date !== null) {
            const expectedDate = new Date(date);
            return <div>{`${expectedDate.toISOString().slice(0, 10)}`}</div>;
          }
          return <div>-</div>;
        },
      },
      {
        Header: "Structuring Fee Amount(₦'MN)",
        accessor: "structuringfeeamount",
      },
      {
        Header: "Guarantee Fee(%)",
        accessor: "guaranteefee",
        Cell: ({ cell: { value } }) => value || "-",
      },
      {
        Header: "Monitoring Fee(₦'MN)",
        accessor: "monitoringfee",
      },
    ],
    []
  );

  const getTrProps = (row, i) => {
    if (row) {
      // if deal category is yellow, return a warmer yellow color
      if (`${deals[i].deal_category}` === "Yellow") {
        return {
          style: {
            color: "#FFBF00",
            borderColor: "transparent",
          },
        };
      }
      return {
        style: {
          color: `${deals[i].deal_category}`,
          borderColor: "transparent",
        },
      };
    }
    //
    return {
      style: {},
    };
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: deals,
      initialState: { pageIndex: 0 },
      getRowProps: getTrProps(),
    },
    useResizeColumns,
    useFlexLayout,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const downloadExcel = () => {
    const newData = deals.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Execution_Summary");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Execution_Report.xlsx");
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner animation="border" role="status" variant="secondary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <ContainerWrapper className="bg-light">
          <Divider></Divider>
          <Container className="my-3">
            <Form ref={form}>
              <Row>
                <Col sm={3}>
                  <Fm.Group className="mb-0 mt-2 pt-2 pb-1">
                    <Fm.Label style={{ fontSize: "12px" }}>
                      Start Date <span style={{ color: "red" }}>*</span>
                    </Fm.Label>
                    <Input
                      size="sm"
                      type="date"
                      value={date.start_date}
                      max={date.end_date}
                      onChange={handleInputChange}
                      name="start_date"
                      validations={[required]}
                      style={{ width: "80%", height: "5vh" }}
                    />
                  </Fm.Group>
                </Col>

                <Col sm={3}>
                  <Fm.Group className="mb-0 mt-2 pt-2 pb-1">
                    <Fm.Label style={{ fontSize: "12px" }}>
                      End Date <span style={{ color: "red" }}>*</span>
                    </Fm.Label>
                    <Input
                      size="sm"
                      type="date"
                      value={date.end_date}
                      min={date.start_date}
                      onChange={handleInputChange}
                      name="end_date"
                      validations={[required]}
                      style={{ width: "80%", height: "5vh" }}
                    />
                  </Fm.Group>
                </Col>

                <Col sm={3}>
                  <Fm.Group className="mb-0 mt-2 pt-2 pb-1">
                    <Fm.Label style={{ fontSize: "12px" }}>
                      Client Name
                    </Fm.Label>
                    <Input
                      size="sm"
                      type="text"
                      value={date.client_name}
                      onChange={handleInputChange}
                      name="client_name"
                      style={{ width: "80%", height: "5vh" }}
                    />
                  </Fm.Group>
                </Col>

                <Col lg={1} sm={4} className="mt-3">
                  <br />
                  <button
                    onClick={saveDate}
                    ref={form}
                    style={{
                      background: "green",
                      padding: "5px 12px",
                      color: "white",
                      border: "none",
                      marginTop: "12px",
                      fontSize: "13px",
                    }}
                  >
                    Submit
                  </button>
                  <div className="invalid-feedback d-block text-danger">
                    {response}
                  </div>
                </Col>

                <Col lg={1} sm={4} className="mt-3">
                  <br />

                  <button
                    onClick={downloadExcel}
                    style={{
                      background: "green",
                      padding: "5px 12px",
                      color: "white",
                      border: "none",
                      marginTop: "12px",
                      fontSize: "13px",
                    }}
                  >
                    Download
                  </button>
                </Col>
              </Row>
            </Form>
          </Container>
          <Divider></Divider>

          <TableWrapper>
            <div className="table-responsive mt-2 pt-2">
              <table
                className="table py-3 mt-3  table-hover table striped align-middle table-bordered"
                id="myTable"
                {...getTableProps()}
              >
                <thead className="">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="table-bordered">
                  {page.map((row, i) => {
                    prepareRow(row);

                    return (
                      <tr {...row.getRowProps(getTrProps(row, i))}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TableWrapper>

          <Pagination>
            <div className="pagination mt-1 pt-1">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>{" "}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>{" "}
              <span style={{ paddingTop: "2.5px" }}>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "30px" }}
                />
              </span>{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </Pagination>
        </ContainerWrapper>
      )}
    </React.Fragment>
  );
};

export default DealsTable;
