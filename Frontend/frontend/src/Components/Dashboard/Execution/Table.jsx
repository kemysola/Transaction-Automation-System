import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Row, Col, Form} from 'react-bootstrap';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters } from "react-table";
import styled from 'styled-components';
import Service from "../../../Services/Service";

const ContainerWrapper = styled.div`
font-size:11px;
margin-top: 0.55rem;
background:white;
padding: 1rem 2rem;
border-radius: 10px;
`;

const TableWrapper = styled.div`
  margin-top: 90px
`

const ButtonWrapper = styled.button`
  color:white;
  background: green;
  border: 1px solid white;
  padding: 2px 20px;
  font-size:13px;
  margin: 40px;
  height: 30px;
  border-radius: 3px
`;

const DateWrapper = styled.button`
  display: flex;
  align-items: center;
  background: white;
  border: none;
  justify-content: center;
  position: absolute;
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

const DealsTable = (props) => {
  const initialDateState = {
    start_date: "",
    end_date: "",
    client_name: ""
  };

  const [date, setDate] = useState(initialDateState);
  const [deals, setDeals] = useState([]);
  const dealsRef = useRef();
  dealsRef.current = deals;

  useEffect(() => {
    retrieveDeals();
  }, []); 

  const retrieveDeals = () => {
    let start_date = "2022-02-17"
    let end_date = "2022-02-17"
    let client_name = "''"
    Service.getDealByDate(start_date, end_date, client_name)
      .then((response) => {
        setDeals(response.data.records);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDate({...date, [name]: value});
  }

  const saveDate = (e) => {
    e.preventDefault()
    let start_date = date.start_date
    let end_date = date.end_date

    Service.getDealByDate(start_date, end_date)
      .then((response) => {
        setDeals(response.data.records);
      })
      .catch((e) => {
        console.log("Invalid Dates");
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        maxWidth: 50,
        filterable: false,
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
        Header: "Deal Size(₦'bn)",
        accessor: "dealsize",
        Cell: (props) => {
          const amount = parseInt(props.row.original['dealsize'])
          return (
            <div>
              {`${(amount / 1000000).toFixed(1)}`}
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
        Header: "Structuring Fee Amount",
        accessor: "structuringfeeamount",
      },
      {
        Header: "Guarantee Fee",
        accessor: "guaranteefee",
        Cell: ({ cell: { value } }) => value || "-"
      },
      {
        Header: "Monitoring Fee",
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
            color: "#FFBF00"
          }
        }
      }
      return {
        style: {
          color: `${deals[i].deal_category}`
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
      usePagination,
      useRowSelect,    
    );
  

  return (
    <React.Fragment>
      <ContainerWrapper>
        <DateWrapper>
          <Row>
            <Col>
              <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                <Form.Label style={{fontSize: "12px"}}>Start Date</Form.Label>
                <Form.Control size="sm" type="date" value={date.start_date} onChange={handleInputChange} name='start_date' />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                <Form.Label style={{fontSize: "12px"}}>End Date</Form.Label>
                <Form.Control size="sm" type="date" value={date.end_date} onChange={handleInputChange} name='end_date' />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                <Form.Label style={{fontSize: "12px"}}>Client Name</Form.Label>
                <Form.Control size="sm" type="text" value={date.client_name} onChange={handleInputChange} name='client_name' />
              </Form.Group>
            </Col>

            <Col >
              <ButtonWrapper onClick={saveDate}>
                Submit
              </ButtonWrapper>
              {/* <button onClick={saveDate}>Submit</button> */}
            </Col>
          </Row>
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
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
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
                style={{ width: '100px' }}
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
    </React.Fragment>
)}

export default DealsTable;
