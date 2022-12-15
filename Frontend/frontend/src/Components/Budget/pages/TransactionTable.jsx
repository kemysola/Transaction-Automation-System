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
import { FaLock, FaLockOpen } from "react-icons/fa";
import { GrStatusDisabled } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Service from "../../../Services/Service";
import TitleContext from "../../../context/TitleContext";
import BudgetAccruals from './BudgetAccruals';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';

const ContainerWrapper = styled.div`
`;

const Pagination = styled.div`
`;

const TableStyle = styled.div`
 
`;
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
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;
      React.useEffect(() => {
          resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);
      return (
          <>
              <input type="checkbox" ref={resolvedRef} {...rest}  />
          </>
      );
  }
);

const style = {
  width: '150%',
  maxWidth: 360,
  bgcolor: '',
  fontWeight:'bold',
};

export default function TransactionTable(props) {
   const history = useHistory();
  const {cartItems, removeItem } =
    useContext(CartContext);

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
    await Service.getBudgetDeals()
      .then((response) => {
        setDeals(response.data.deals);
        setRawData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log('budget deals',deals)
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
const columns = useMemo(
    () => [
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
        // if (row){
        //   if (`${deals[i].deal_category}` === "Yellow") {
        //     return {
        //       style: {
        //         color: "#FFBF00",
        //         borderColor: "transparent",
        //       }
        //     }
        //   }
        //   return {
        //     style: {
        //       color: `${deals[i].deal_category}`,
        //       borderColor: "transparent",
        //     }
        //   }
        // }
    return {
      style: {
        width:'10x'
      },
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
    selectedFlatRows,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize},
    state,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data: deals,
      initialState: { pageIndex: 0 },
      getRowProps: getTrProps(),
      getSubRows: (row, relativeIndex) => {
        return row.subRows;
      },
    },
    useFilters,
    useGlobalFilter,
    useResizeColumns,
    useFlexLayout,
    useSortBy,
    usePagination,
    useRowSelect,
            hooks => {
                hooks.visibleColumns.push(columns => [
                    {
                      id: 'selection',
                      Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                      ),
                      Cell: ({ row }) => (
                        <div>
                          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()}
 />
                        </div>
                      ),
                    },
                    ...columns,
                ]);
            },
    
  );
  return (
    <>
    <Row>
      <Col lg={6} sm={12}>
      <ContainerWrapper>
        <div >
        <List sx={style} component="nav" aria-label="mailbox folders" style={{fontWeight:"bold"}}>
  <ListItem button>
    <br/>
    <ListItemText >Budget Fees</ListItemText>
  </ListItem>
  <ListItem button>
    <br/>
    <ListItemText>Fee Forecast</ListItemText>
  </ListItem>
  <ListItem button>
    <br/>
    <ListItemText>Prepare Buget  </ListItemText>
  </ListItem>
  <br/>
  <ListItem button>
<br/>
<GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />  </ListItem> 
</List>
          {/* <div className="text-secondary" style={{fontSize: "15.5px"}}>
            <pre className='text-success' style={{fontWeight:'bold'}}>Budget Fees</pre>
            <pre className='text-success' style={{fontWeight:'bold'}}>Fee Forecast</pre>
            <pre className='text-success' style={{fontWeight:'bold'}}>Financial Year </pre>


            <small className="text-success"><GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            </small>
          </div> */}
        </div>
        {loading ? (
          <Spinner animation="border" role="status" variant="secondary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          //  {/* ------------- Transaction Table ---------- */}
          <TableStyle>
            <div className="table-responsive ">
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
      </Col>
      <Col lg={6} sm={12}>
      <BudgetAccruals data={ selectedFlatRows}/>

      </Col>

    </Row>
      
    </>
  );
}
