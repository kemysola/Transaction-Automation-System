import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
import {  Row, Col, Form, Spinner} from 'react-bootstrap';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters, useSortBy } from "react-table";
import { FiEdit } from "react-icons/fi";
import { FaLock, FaLockOpen } from "react-icons/fa"
import { MdOutlineRefresh } from "react-icons/md"
import { GrStatusDisabled } from "react-icons/gr"
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Service from "../../Services/Service";
import TransactionCards from './AllDealsCard';
import TitleContext from '../../context/TitleContext';
import * as XLSX from 'xlsx';


const ContainerWrapper = styled.div`
font-size:11px;
margin-top: 0.55rem;
background:white;
padding: 1rem 2rem;
border-radius: 15px;
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
`

const TableStyle = styled.div`
  padding: 1rem;
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
`
//Define a default UI for filtering
export const GlobalFilter =({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
  }, 200)

  return (
      <span className=''>

          <input 
              className="form-control "
              style={{ outline: 'none', border: '1px solid black', padding: '1px 10px', marginTop: '2px', marginRight: '2px' , width:'170px'}}
              value={value || ""}
              onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
              }}
              placeholder={`Search ${count} records`}
          />
      </span>
  )
}


const AllDealsTable = (props) => {
  // ****************************  use state hook to store state, useRef and useHistory for routing ***************
  
  const history = useHistory();
  const { filteredStore, addFtYear} = useContext(TitleContext)
  const [deals, setDeals] = useState([]);
  const [closedStatus, setClosedStatus] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [staffFilter, setStaffFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [status, setStatus] = useState("");
  const dealsRef = useRef();
  dealsRef.current = deals;

  const newStore = JSON.parse(filteredStore)
  // ******************************************  useEffect hook *******************************************************
  useEffect(() => {
    retrieveDeals();

    retrieveStaffList();
  }, [newStore]);

  useEffect(() => {
    if (closedStatus === "" && staffFilter === "All") {
      retrieveDeals();
    }
    if (closedStatus && staffFilter === "All") {
      retrieveDeals();
      filterData(closedStatus)
    }
    if (closedStatus === "" && staffFilter !== "All") {
      retrieveStaffDeals();
    }
    if ((closedStatus === "true" || closedStatus === "false") && staffFilter !== "All") {
      retrieveStaffDeals();
      filterStaffData(closedStatus);
    }

  }, [closedStatus, staffFilter, newStore]); 

  useEffect(() => {
    const timer = setTimeout(() => {
      // After 5 seconds set status value to empty
      setStatus("");
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  // Filter Data by Closed Status either True or False
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
    return
    }, 500);
  };
  
  // Filter Individual Staff Data by Closed Status
  const filterStaffData = (closedStatus) => {
    clearTimeout(filterTimeout);
    setLoading(true);
    
    if (status === "changed") {
      setClosedStatus("")
      retrieveStaffDeals()
    } 
    
    else if (closedStatus === "true" || closedStatus === "false") {
      filterTimeout = setTimeout(() => {
        if (closedStatus === "true") {
          setDeals(
            staffData.filter((item) => {
              return item.closed === true;
            })
          );
        } else if (closedStatus === "false") {
          setDeals(
            staffData.filter((item) => {
              return item.closed === false;
            })
          );
        }
    
      setLoading(false);
      return 
    }, 500)
  }};
  
  // ******************************************  Axios :Get Request  ***********************************************
  const retrieveDeals = async() => {
    await Service.getPortfolioAllDeals(newStore)
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
    Service.getMyDealsByEmail(staffFilter, newStore)
      .then((res) => {
        setDeals(res.data.deals);
        setStaffData(res.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
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

  const openDeal = (rowIndex) => {
    history.push({
      pathname: "/update_transactions",
      search: "?" + rowIndex,
    });
  };

  // clear filter values
  const resetFilterValues = () => {
    setClosedStatus("");
    setStaffFilter("All");
  }

  // handler for select input; sets the filter for staff data
  const handleInputChange = (e) => {
    setStaffFilter(e.target.value)
    setStatus("changed")
  }

  // ******************************************  Download Function  ****** ****************************************

  const downloadExcel = () =>{
    const newData = deals.map(row =>{
      delete row.tableData
      return row
    })
    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,'Transaction_report')
    //Buffer
    let buf =XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
    XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
    XLSX.writeFile(workBook,"Transaction_report.xlsx")
  }

  console.log('data', deals)

 // transaction table
  const columns = useMemo(
    () => [
      {
        Header: <GrStatusDisabled />,
        accessor: "closed",
        disableResizing: true,
        minWidth: 20,
        width: 35,
        maxWidth: 35,
        Cell: (props) => {
          const status = (props.row.original['closed'])
          return (
            <div>
              {status ? <FaLock /> : <FaLockOpen />} 
            </div>
          )
        }
      },
      {
        Header: "Edit",
        accessor: "edit",
        disableResizing: true,
        minWidth: 35,
        width: 35,
        maxWidth: 35,
        disableSortBy: true,
        Cell: (props) => {
          const rowIdx = props.row.original['transid']
          return (
            <div>
              <span onClick={() => openDeal(rowIdx)} style={{cursor: "pointer"}}>
                <FiEdit/>
              </span>
            </div>
          )
        }
      },
      {
        Header: "Client ",
        accessor: "clientname",
      },
      {
        Header: "Originator",
        accessor: "originator",
      },
      {
        Header: "Transactor",
        accessor: "transactor",
      },
      {
        Header: "Transaction Legal Lead",
        accessor: "transactionlegallead",
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
        Header: "Deal Size(₦'BN)",
        accessor: "dealsize",
        Cell: (props) => {
          const amount = parseInt(props.row.original['dealsize'])
          return (
            <div>
              {`${(amount).toFixed(2)}`}
            </div>
          )
        }
      },
      {
        Header: "Coupon(%)",
        accessor: "coupon",
      },
      {
        Header: "Tenor(yrs)",
        accessor: "tenor",
      },
      {
        Header: "Moratorium(yrs)",
        accessor: "moratorium",
      },
      {
        Header: "Repayment Frequency",
        accessor: "repaymentfrequency",
      },
      {
        Header: "Amortization Style",
        accessor: "amortizationstyle",
      },
      {
        Header: "Mandate Letter Date",
        accessor: "mandateletter",
        Cell: (props) => {
          const date = props.row.original['mandateletter']
          if (date !== null) {
            const expectedDate = new Date(date )
            return (
              <div>
                {`${expectedDate.toISOString().slice(0, 10)}`}
                
              </div>
            )
          }
          return (
            <div>-</div>
          )
        }
      },
      {
        Header: "Credit Committee Approval Date",
        accessor: "creditapproval",
        Cell: (props) => {
          const date = props.row.original['creditapproval']
          if (date !== null) {
            const expectedDate = new Date(date)
            return (
              <div>
                {`${expectedDate.toISOString().slice(0, 10)}`}
              </div>
            )
          }
          return (
            <div>-</div>
          )
        }
      },
      {
        Header: "Fee Letter Date",
        accessor: "feeletter",
        Cell: (props) => {
          const date = props.row.original['feeletter']
          if (date !== null) {
            const expectedDate = new Date(date)
            return (
              <div>
                {`${expectedDate.toISOString().slice(0, 10)}`}
              </div>
            )
          }
          return (
            <div>-</div>
          )
        }
      },
      {
        Header: "Expected Financial Close Date",
        accessor: "expectedclose",
        Cell: (props) => {
          const date = props.row.original['expectedclose']
          if (date !== null) {
            const expectedDate = new Date(date)
            return (
              <div>
                {`${expectedDate.toISOString().slice(0, 10)}`}
              </div>
            )
          }
          return (
            <div>-</div>
          )
        }
      },
      {
        Header: "Actual Financial Close Date",
        accessor: "actualclose",
        Cell: (props) => {
          const date = props.row.original['actualclose']
          if (date !== null) {
            const expectedDate = new Date(date)
            return (
              <div>
                {`${expectedDate.toISOString().slice(0, 10)}`}
              </div>
            )
          }
          return (
            <div>-</div>
          )
        }
      },
      {
        Header: "NBC Approval Date",
        accessor: "nbc_approval_date",
        Cell: (props) => {
          const date = props.row.original['nbc_approval_date']
          if (date !== null) {
            const expectedDate = new Date(date)
            return (
              <div>
                {`${expectedDate.toISOString().slice(0, 10)}`}
              </div>
            )
          }
          return (
            <div>-</div>
          )
        }
      },
      {
        Header: "NBC Submission Date",
        accessor: "nbc_submitted_date",
        Cell: (props) => {
          const date = props.row.original['nbc_submitted_date']
          if (date !== null) {

            const expectedDate = new Date(date)
            console.log(expectedDate.toISOString(),'i am testing')
            return (
              <div>
                {`${expectedDate.toISOString().slice(0, 10)}`}
              </div>
            )
          }
          return (
            <div>-</div>
          )
        }
      },
      {
        Header: "Structuring Fee Amount(₦'MN)",
        accessor: "structuringfeeamount",
        Cell: (props) => {
          const amount = parseInt(props.row.original['structuringfeeamount'])
          return (
            <div>
              {`${(amount).toFixed(2)}`}
            </div>
          )
        }
      },
      {
        Header: "Structuring Fee Advance(%)",
        accessor: "structuringfeeadvance",
        Cell: (props) => {
          const amount = parseInt(props.row.original['structuringfeeadvance'])
          return (
            <div>
              {`${(amount).toFixed(2)}`}
            </div>
          )
        }
      },
      {
        Header: "Structuring Fee Final(%)",
        accessor: "structuringfeefinal",
        Cell: (props) => {
          const amount = parseInt(props.row.original['structuringfeefinal'])
          return (
            <div>
              {`${(amount).toFixed(2)}`}
            </div>
          )
        }
      },
      {
        Header: "Guarantee Fee(%)",
        accessor: "guaranteefee",
        Cell: (props) => {
          const amount = parseInt(props.row.original['guaranteefee'])
          return (
            <div>
              {`${(amount).toFixed(2)}`}
            </div>
          )
        }
      },
      {
        Header: "Monitoring Fee(₦'MN)",
        accessor: "monitoringfee",
        Cell: (props) => {
          const amount = parseInt(props.row.original['monitoringfee'])
          return (
            <div>
              {`${(amount).toFixed(2)}`}
            </div>
          )
        }
      },
      {
        Header: "Reimbursible Expense(₦'MN)",
        accessor: "reimbursible",
        Cell: (props) => {
          const amount = parseInt(props.row.original['reimbursible'])
          return (
            <div>
              {`${(amount).toFixed(2)}`}
            </div>
          )
        }
      },
      {
        Header: "Notes",
        accessor: "notes",
      },
    ],
    []
  );

  const getTrProps = (row, i, page) => {
    if (row){
      // if deal category is yellow, return a warmer yellow color
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
      style: {}
    };
  }

  const {
    getTableProps,
    getTableBodyProps,
    getRowProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions, pageCount, gotoPage,
    nextPage, previousPage, setPageSize,
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
    usePagination,    
  );

    // useEffect(() => {
    //   getTrProps();
    // }, [nextPage])
  

  return (
    <React.Fragment>
      <TransactionCards closedStatus={closedStatus} staffFilter={staffFilter} status={status} /> 
      <ContainerWrapper>
        
        <Row className='d-flex justify-content-space-evenly'>
          <Col sm={2} className='d-sm-none d-lg-block d-md-block'>
            <small style={{fontSize:'12px',paddingTop:'10px'}}>
              All ({deals.length})
            </small>
          </Col>

          {/* <Col sm={2} className='d-sm-none d-lg-block d-md-block'>
            <small style={{fontSize:'12px',paddingTop:'10px'}}>
              Trash (0) 
            </small>
          </Col> */}
          
          {/* <Col sm={2} className='d-sm-none d-lg-block '>
            <small style={{fontSize:'12px',paddingTop:'10px'}}>
              Bulk Actions
            </small>
          </Col> */}

          {/* {!loading &&  */}
            <Col>
              <Form.Check label="Portfolio" type="radio" name="closedStatus" value={true} checked={closedStatus === "true"} onClick={(e) => setClosedStatus(e.target.value)} /> 
              <Form.Check label="Pipeline" type="radio" name="closedStatus" value={false} checked={closedStatus === "false"} onClick={(e) => setClosedStatus(e.target.value)} />
            </Col>
          {/*  } */}
          

          <Col>
            <Form.Select
              size="sm"
              name="staff"
              onChange={handleInputChange}
              value={staffFilter}
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

          <Col >
            <MdOutlineRefresh 
              onClick={resetFilterValues} 
              style={{ height: "1rem", width: "1rem", marginTop: "5px", cursor: "pointer"}}
            />
          </Col>

          <Col sm ={2} className='d-sm-none d-lg-block d-md-block'>
            <small style={{fontSize:'12px',paddingTop:'10px'}}>
              <button className='bg-success text-light py-1' onClick={downloadExcel}>Download</button>
            </small>
          </Col>

          <Col sm={3}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </Col>                
        </Row>

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
                id='myTable'
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render("Header")}
                          <span>
                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className='table-bordered' 
                >
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr 
                        {...row.getRowProps(getTrProps(row, i, page))}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td 
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    )
                  }
                  )}
                </tbody>
              </table>
            </div>
          </TableStyle>
        )}

          {/* Set pagination for the  table */}
        <Pagination>
          <div className='pagination mt-1 pt-1'>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>{' '}
            <span style={{paddingTop: "2.5px"}} >
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '30px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </Pagination>

    {/* )} */}
        
      </ContainerWrapper>
    </React.Fragment>
)}

export default AllDealsTable;
