import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import CartContext from "../../../context/cart/CartContext";

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
  useSortBy,
} from "react-table";
import { GrView } from "react-icons/gr";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { GrStatusDisabled } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Service from "../../../Services/Service";
import TitleContext from "../../../context/TitleContext";

const ContainerWrapper = styled.div`
`;

const Pagination = styled.div`
`;

const TableStyle = styled.div`
 
`;
//Define a default UI for filtering
export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="">
      <input
        className="form-control "
        style={{
          outline: "none",
          border: "1px solid black",
          padding: "1px 10px",
          marginTop: "2px",
          marginRight: "2px",
          width: "170px",
        }}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} records`}
      />
    </span>
  );
};

export default function TransactionTable(props) {
  const history = useHistory();
  const {cartItems, removeItem } =
    useContext(CartContext);

  let structuringFees = cartItems.reduce(function (filtered, arr) {
    if (arr.structuringFee) {
      let someNewValue = arr.structuringFee;
      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let structuringTotal = structuringFees.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let monitoringFees = cartItems.reduce(function (filtered, arr) {
    if (arr.monitoringFee) {
      let someNewValue = arr.monitoringFee;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  let monitoringTotal = monitoringFees.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let guaranteeFees = cartItems.reduce(function (filtered, arr) {
    if (arr.guaranteeFee) {
      let someNewValue = arr.guaranteeFee;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  let guaranteeTotal = guaranteeFees.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  const { filteredStore, addFtYear } = useContext(TitleContext);
  const [deals, setDeals] = useState([]);
  const [closedStatus, setClosedStatus] = useState("");
  const [staffFilter, setStaffFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [status, setStatus] = useState("");
  const dealsRef = useRef();
  dealsRef.current = deals;
  // ******************************************  useEffect hook *******************************************************
  useEffect(() => {
    retrieveDeals();
  }, [filteredStore]);

  useEffect(() => {
    if (closedStatus === "" && staffFilter === "All") {
      retrieveDeals();
    }
    if (closedStatus && staffFilter === "All") {
      retrieveDeals();
      filterData(closedStatus);
    }
    if (closedStatus === "" && staffFilter !== "All") {
      retrieveStaffDeals();
    }
    if (
      (closedStatus === "true" || closedStatus === "false") &&
      staffFilter !== "All"
    ) {
      retrieveStaffDeals();
    }
  }, [closedStatus, staffFilter, filteredStore]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // After 5 seconds set status value to empty
      setStatus("");
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  let filterTimeout;
  const filterData = (closedStatus) => {
    clearTimeout(filterTimeout);
    setLoading(true);

    filterTimeout = setTimeout(() => {
      if (closedStatus === "true") {
        setDeals(
          rawData.filter((item) => {
            return item.closed === true;
          })
        );
      } else if (closedStatus === "false") {
        setDeals(
          rawData.filter((item) => {
            return item.closed === false;
          })
        );
      }

      setLoading(false);
      return;
    }, 500);
  };

  const retrieveDeals = async () => {
    await Service.getPortfolioAllDeals(`${filteredStore}`)
      .then((response) => {
        setDeals(response.data.deals);
        setRawData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Get deals by staff email
  const retrieveStaffDeals = () => {
    setLoading(true);
    Service.getMyDealsByEmail(staffFilter, filteredStore)
      .then((res) => {
        setDeals(res.data.deals);
        setStaffData(res.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  };

  const openDeal = (rowIndex) => {
    history.push({
      pathname: "/budget",
      search: "?" + rowIndex,
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "-",
        accessor: "view",
        disableResizing: true,
        minWidth: 32,
        width: 32,
        maxWidth: 32,
        disableSortBy: true,
        Cell: (props) => {
          const rowIdx = props.row.original["transid"];
          return (
            <div>
              <span
                onClick={() => openDeal(rowIdx)}
                style={{ cursor: "pointer" }}
              >
                <GrView />
              </span>
            </div>
          );
        },
      },

      {
        Header: "Client ",
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
          return <div>{`${amount.toFixed(2)}`}</div>;
        },
      },

      {
        Header: <GrStatusDisabled />,
        accessor: "closed",
        disableResizing: true,
        minWidth: 20,
        width: 35,
        maxWidth: 35,
        Cell: (props) => {
          const status = props.row.original["closed"];
          return <div>{status ? <FaLock /> : <FaLockOpen />}</div>;
        },
      },
    ],
    []
  );

  const getTrProps = (row, i, page) => {
        if (row){
          if (`${deals[i].deal_category}` === "Yellow") {
            return {
              style: {
                color: "#FFBF00",
                borderColor: "transparent",
              }
            }
          }
          return {
            style: {
              color: `${deals[i].deal_category}`,
              borderColor: "transparent",
            }
          }
        }
    return {
      style: {},
    };
  };

  const {
    getTableProps,
    getTableBodyProps,
    getRowProps,
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
    state,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data: deals,
      initialState: { pageIndex: 0 },
      getRowProps: getTrProps(),
    },
    useGlobalFilter,
    useFilters,
    useResizeColumns,
    useFlexLayout,
    useSortBy,
    usePagination
  );
  return (
    <>
      <ContainerWrapper>
        {/* <Col sm={3}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </Col> */}

        <div>
          <div className="text-secondary" style={{fontSize: "14.5px"}}>
            <p className='text-success' style={{fontWeight:'bold'}}>Budget Fees</p>
            <p className="text-success">
              Structuring Fee (₦'BN): {structuringTotal}
            </p>
            <p className="text-success">Guarantee Fee (₦'BN): {guaranteeTotal}</p>
            <p className="text-success">Monitoring Fee (₦'BN): {monitoringTotal}</p>
            <Row>
              <Col sm={6}>
                <p className="text-sucess">
                  Grand Total(₦'BN) :
                  {structuringTotal + guaranteeTotal + monitoringTotal}
                </p>
              </Col>
              <Col sm={6}>
                {" "}
                {structuringTotal ||
                guaranteeTotal ||
                monitoringTotal &&
                props.id ? (
                  <>
                    <button
                      className="btn-secondary btn-md btn bg-success text-light"
                      style={{ padding: "1px 0.88rem" }}
                      onClick={() => removeItem(props.id)}
                    >
                      Remove All
                    </button>
                  </>
                ) : (
                  <>
                    <small className="text-success text-capitalize">
                      No budget Prepared yet
                    </small>
                  </>
                )}
              </Col>
            </Row>
          </div>
        </div>
        {loading ? (
          <Spinner animation="border" role="status" variant="secondary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          //  {/* ------------- Transaction Table ---------- */}
          <TableStyle>
            <div className="table-responsive mt-2 pt-2">
              <table
                className="table py-3 mt-3  table-hover table striped align-middle table-bordered"
                id="myTable"
                {...getTableProps()}
              >
                <thead>
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
                      <tr {...row.getRowProps(getTrProps(row, i, page))}>
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
          </TableStyle>
        )}

        {/* Set pagination for the  table */}
        <Pagination>
          <div className="pagination mt-1 pt-1">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
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
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
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

        {/* )} */}
      </ContainerWrapper>
    </>
  );
}
