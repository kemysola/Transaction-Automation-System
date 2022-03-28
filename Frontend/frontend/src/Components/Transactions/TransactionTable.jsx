import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Row, Col} from 'react-bootstrap';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters } from "react-table";
import { FiEdit } from "react-icons/fi";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Service from "../../Services/Service";

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

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const DealsTable = (props) => {
  const history = useHistory();
  const [deals, setDeals] = useState([]);
  // const [search, setSearch] = useState('');
  const dealsRef = useRef();
  dealsRef.current = deals;

  useEffect(() => {
    retrieveDeals();
  }, []); 

  const retrieveDeals = () => {
    Service.getMyDeals()
      .then((response) => {
        setDeals(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveDeals();
  };

  const openDeal = (rowIndex) => {
    history.push({
      pathname: "/update_transactions",
      search: "?" + rowIndex,
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Edit",
        accessor: "edit",
        disableResizing: true,
        minWidth: 35,
        width: 35,
        maxWidth: 35,
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
        Header: "Client",
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
        Header: "Structuring Fee Amount",
        accessor: "structuringfeeamount",
      },
      {
        Header: "Structuring Fee Advance",
        accessor: "structuringfeeadvance",
      },
      {
        Header: "Structuring Fee Final",
        accessor: "structuringfeefinal",
      },
      {
        Header: "Guarantee Fee",
        accessor: "guaranteefee",
      },
      {
        Header: "Monitoring Fee",
        accessor: "monitoringfee",
      },
      {
        Header: "Reimbursible Expense",
        accessor: "reimbursible",
      },
      {
        Header: "Notes",
        accessor: "notes",
      },
      {
        Header: "Closed",
        accessor: "closed",
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
      getRowProps: getTrProps()
    },
    useGlobalFilter,
    useFilters,
    useResizeColumns,
    useFlexLayout,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          disableResizing: true,
          minWidth: 20,
          width: 35,
          maxWidth: 35,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        // fix the parent group of the selection button to not be resizable
        const selectionGroupHeader = headerGroups[0].headers[0]
        selectionGroupHeader.canResize = false
      })
    },
    
    );
  

  return (
    <React.Fragment>
      <ContainerWrapper>
        <Row>
              <Col sm={3} className='d-none d-sm-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                All ({deals.length})
              </small></Col>

              <Col sm={3} className='d-none d-sm-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                Trash (0) 
                </small>
              </Col>
              <Col sm={3} className='d-none d-sm-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                Bulk Actions
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

        
        <div className="table-responsive mt-2 pt-2">
          <table
            className="table py-3 mt-3  table-hover table striped align-middle table-bordered"
            id='myTable'
            {...getTableProps()}
            // data={data}
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
