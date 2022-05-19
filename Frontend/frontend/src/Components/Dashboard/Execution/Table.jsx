import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Row, Col, Form as Fm, Spinner} from 'react-bootstrap';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useSortBy } from "react-table";
import styled from 'styled-components';
import Service from "../../../Services/Service";
import * as XLSX from 'xlsx';
// import Filters from './Filters';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const ContainerWrapper = styled.div`
font-size:11px;
margin-top: 0.55rem;
padding: 1rem 2rem;
border-radius: 10px;
`;

const TableWrapper = styled.div`
  margin-top: 130px;
  padding: 0rem 1rem;
  background: white;
  border-radius: 10px;
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

const ButtonWrapper = styled.button`
  color:white;
  background: green;
  border: 1px solid white;
  padding: 2px 20px;
  font-size: 13px;
  margin-top: 35px;
  height: 30px;
  border-radius: 3px
`;

const DateWrapper = styled.button`
  display: flex;
  border: 1px solid grey;
  padding-bottom: 1rem;
  border-radius: 10px;
  justify-content: end;
  position: absolute;
  margin-right: 1.8rem;
  right: 25px;
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
const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block text-danger" >This field is required!</div>
    );
  }
};

const DealsTable = ({props, dealFilter, staffFilter}) => {
  const initialDateState = {
    start_date: "",
    end_date: "",
    client_name: ""
  };

  const [date, setDate] = useState(initialDateState);
  const [deals, setDeals] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(false);
  const dealsRef = useRef();
  const form = useRef();
  dealsRef.current = deals;

  useEffect(() => {
    if (dealFilter === "All" && staffFilter === "All") {
      retrieveDeals();
    } 
    if (dealFilter !== "All" && staffFilter === "All") {
      setLoading(true)
      filterData(dealFilter)
    }
    if (dealFilter === "All" && staffFilter !== "All") {
      retrieveStaffDeals()
    }
    if (dealFilter !== "All" && staffFilter !== "All") {
      retrieveStaffDeals()
      setLoading(true)
      filterStaffData(dealFilter)
    }
  }, [dealFilter, staffFilter]);

  // Filter Data by Deal Category
  const filterData = (dealFilter) => {    
    setLoading(true)  
    const filteredData = rawData.filter(item => {return item.deal_category === dealFilter})
      setDeals(filteredData)
      setLoading(false)
      return filteredData
  }

  // Filter Individual Staff Data by Deal Category
  let filterTimeout
  const filterStaffData = (dealFilter) => {  
    clearTimeout(filterTimeout)
    setLoading(true)

    filterTimeout = setTimeout(() => {
      const filteredData = staffData.filter(item => {return item.deal_category === dealFilter})
        setDeals(staffData.filter(item => {return item.deal_category === dealFilter}))
        setLoading(false)
       
      return filteredData
    }, 500)
  }

  // Get All Deals
  const retrieveDeals = () => {
    setLoading(true) 
    Service.getAllDeals()
      .then((response) => {
        setDeals(response.data.deals);
        setRawData(response.data.deals);
        setLoading(false)
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
        setDeals(res.data.deals)
        setStaffData(res.data.deals)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDate({...date, [name]: value});
    console.log(event.target.value)
  }

  const saveDate = (e) => {
    e.preventDefault()
    form.current.validateAll();

    let start_date = date.start_date
    let end_date = date.end_date
    let client_name = date.client_name ? date.client_name : "''" // i'd love to come back to this, as the output for when client name is not specified is inaccurate

    Service.getDealByDate(start_date, end_date, client_name)
      .then((response) => {
        setDeals(response.data.records);
      })
      .catch((e) => {
        setResponse("Please Fill All Required Fields")
        console.log("Invalid Dates");
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        maxWidth: 50,
        filterable: true,
        Cell: (props) => {
          const rowIdx = parseInt(props.row.id) 

          return (
            <div>
              {`${(rowIdx)+1}`}
            </div>
          )
        }
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
          const amount = parseInt(props.row.original['dealsize'])
          return (
            <div>
              {`${(amount).toFixed(1)}`}
            </div>
          )
        }
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
        Header: "Structuring Fee Amount(₦'MN)",
        accessor: "structuringfeeamount",
      },
      {
        Header: "Guarantee Fee(%)",
        accessor: "guaranteefee",
        Cell: ({ cell: { value } }) => value || "-"
      },
      {
        Header: "Monitoring Fee(₦'MN)",
        accessor: "monitoringfee",
      },
    ],
    []
  );

  const getTrProps = (row, i) => {
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
    // 
    return {
      style: {}
    };
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions, pageCount, gotoPage,
    nextPage, previousPage, setPageSize,
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
      useRowSelect,    
    );

    const downloadExcel = () =>{
      const newData = deals.map(row =>{
        delete row.tableData
        return row
      })
      const workSheet = XLSX.utils.json_to_sheet(newData)
      const workBook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workBook,workSheet,'Execution_Summary')
      //Buffer
      let buf =XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
      XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
      XLSX.writeFile(workBook,"Execution_Report.xlsx")
    }

  return (
    <React.Fragment>
      {loading ? (
        <Spinner animation="border" role="status" variant="secondary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (

        <ContainerWrapper className="bg-light">
          <DateWrapper className="bg-light">
            <Form ref={form}>
              <Row>
                <Col>
                  <Fm.Group className="mb-0 mt-2 pt-2 pb-1">
                    <Fm.Label style={{fontSize: "12px"}}>Start Date <span style={{color: "red"}}>*</span></Fm.Label>
                    <Input size="sm" type="date" value={date.start_date} max={date.end_date} onChange={handleInputChange} name='start_date' validations={[required]}/>
                  </Fm.Group>
                </Col>

                <Col>
                  <Fm.Group className="mb-0 mt-2 pt-2 pb-1">
                    <Fm.Label style={{fontSize: "12px"}}>End Date <span style={{color: "red"}}>*</span></Fm.Label>
                    <Input size="sm" type="date" value={date.end_date} min={date.start_date} onChange={handleInputChange} name='end_date' validations={[required]}/>
                  </Fm.Group>
                </Col>

                <Col>
                  <Fm.Group className="mb-0 mt-2 pt-2 pb-1">
                    <Fm.Label style={{fontSize: "12px"}}>Client Name</Fm.Label>
                    <Input size="sm" type="text" value={date.client_name} onChange={handleInputChange} name='client_name' />
                  </Fm.Group>
                </Col>

                <Col >
                  <ButtonWrapper onClick={saveDate} ref={form}>
                    Submit
                  </ButtonWrapper>
                  <div className='invalid-feedback d-block text-danger'>{response}</div>
                </Col>

                <Col >
                  <ButtonWrapper onClick={downloadExcel}>
                  Download
                  </ButtonWrapper>
                </Col>
                
              </Row>
            </Form>
          </DateWrapper>
          
          <TableWrapper>
            <div className="table-responsive mt-2 pt-2">
              <table
                className="table py-3 mt-3  table-hover table striped align-middle table-bordered"
                id='myTable'
                {...getTableProps()}
              >
                <thead className=''>
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
                        {...row.getRowProps(getTrProps(row, i))}
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
          </TableWrapper>

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
        </ContainerWrapper>
      )}
    </React.Fragment>
)}

export default DealsTable;
