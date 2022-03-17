import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Row, Col} from 'react-bootstrap';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters } from "react-table";
import { FiEdit } from "react-icons/fi";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Service from "../../../Services/Service";
import Filters from './Filters';

const ContainerWrapper = styled.div`
font-size:10px;
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

//Define a default UI for filtering
const GlobalFilter =({
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
      <span>
          {/* Search:{' '} */}
          <input 
              className="form-control"
              type="date"
              style={{ outline: 'none', border: '1px solid black', padding: '4.5px', marginTop: '7px', marginRight: '2px' }}
              value={value || ""}
              onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
              }}
              placeholder={`Search ${count} records`}
          />
          {' to '}
          <input 
              className="form-control"
              type="date"
              style={{ outline: 'none', border: '1px solid black', padding: '4.5px', marginTop: '7px', marginRight: '2px' }}
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

const DealsTable = (props) => {
  const [deals, setDeals] = useState([]);
  const dealsRef = useRef();
  dealsRef.current = deals;

  useEffect(() => {
    retrieveDeals();
  }, []); 

  const retrieveDeals = () => {
    Service.getAllDeals()
      .then((response) => {
        setDeals(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
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

  const filterTypes = useMemo(() => ({
    dateFilter: (rows, id, filterValue) => {
      return rows = rows.filter(row => {
        return new Date(row.values.data) >= filterValue[0] && new Date(rows.values.date) <= filterValue[1];
      })
    }
  }),
    []
  )

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
    state,
    setGlobalFilter,
    preGlobalFilteredRows,
    setFilter,
  } = useTable(
      {
        columns,
        data: deals,
        initialState: { pageIndex: 0 },
        getRowProps: getTrProps(),
        filterTypes,
      },
      useGlobalFilter,
      useFilters,
      useResizeColumns,
      useFlexLayout,
      usePagination,
      useRowSelect,    
    );
  

  return (
    <React.Fragment>
      <ContainerWrapper>
        <Row>
          <Col sm={12} lg={4}>
            {/* Filter by Date */}
            <Filters 
              setFilter={setFilter}
            />
            <form className='pt-1'>
              <label>Start Date:</label>
              <input type="date" name="startDate" id="startDate" />

              <label>End Date:</label>
              <input type="date" name="endDate" id="endDate" />
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </form>
          </Col>
        </Row>
        
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
