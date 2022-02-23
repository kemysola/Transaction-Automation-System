import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Row, Col} from 'react-bootstrap';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination } from "react-table";
import { FiEdit } from "react-icons/fi";
import styled from 'styled-components';
import Service from "../../Services/Service";
import { useHistory } from 'react-router-dom';

const ContainerWrapper = styled.div`
font-size:10px;
margin-top: 0.55rem;
background:white;
padding: 1rem 2rem;
border-radius: 15px;
`;

const Pagination = styled.div`
  padding: 1em;

  // .pagination {
  //   padding: 0.5rem;
  // }

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

const Search = () => {
  return (
    <div>
      <form className="form-control rounded-pill">
        <input 
          type='text' 
          placeholder='Search' 
          style={{border:'none', outline:"none"}}
        />
        <button
          type="submit" 
          style={{background:'white', border:'none', position:'relative', left:'0.11px'}}>
            <i class="bi-search"></i>
        </button>   
      </form>                
    </div>
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
  const [uniqueDeal, setUniqueDeal] = useState([]);
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

  const refreshList = () => {
    retrieveDeals();
  };

  const openDeal = (rowIndex) => {
    history.push({
      pathname: "/update_transactions",
      search: "?" + rowIndex,
      state: uniqueDeal,
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
        Header: "ORIGINATOR",
        accessor: "originator",
      },
      {
        Header: "TRANSACTOR",
        accessor: "transactor",
      },
      {
        Header: "Transaction Legal Lead",
        accessor: "transactionlegallead",
      },
      {
        Header: "INDUSTRY",
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
        Header: "Deal Size",
        accessor: "dealsize",
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
      },
      {
        Header: "Credit Committee Approval Date",
        accessor: "creditapproval",
      },
      {
        Header: "Fee Letter Date",
        accessor: "feeletter",
      },
      {
        Header: "Expected Financial Close Date",
        accessor: "expectedclose",
      },
      {
        Header: "Actual Financial Close Date",
        accessor: "actualclose",
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
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow,
          page, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage,
          nextPage, previousPage, setPageSize, state: { pageIndex, pageSize}, } = useTable(
    {
      columns,
      data: deals,
      initialState: { pageIndex: 0 },
    },
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
          minWidth: 35,
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
    }
  );

  return (
    <React.Fragment>
      <ContainerWrapper>
        <Row>
          <Col sm={4}className='d-flex justify-content-between'  >
          <small style={{fontSize:'12px',paddingTop:'10px'}}>
            All ({deals.length})
            </small>
          <a className="vr" />
          <small style={{fontSize:'12px',paddingTop:'10px'}}>
            Trash (0) 
            </small>
          <div
          className="vr" />
          <small style={{fontSize:'12px',paddingTop:'10px'}}>
            Bulk Actions
            </small>
          </Col>
          <Col sm={12} lg={4} className='d-flex justify-content-center'>
          <Button className=' ' size='md' style={{backgroundColor: "green", border:'none', marginRight: '1em',padding:'5px'}}>           Apply
          </Button>
          <Button className='py-0' size='sm'>
            Download
          </Button>
          </Col>
          <Col sm={12} lg={4}>
          <form className='pt-1'>
          <input type="search" placeholder="Search" aria-label="Search" className='' style={{outline:'none',border:'1px solid black',padding:'4.5px', marginTop:'7px'}}/>
          <Button className='py-0 btn-outline-none text-dark btn-light' style={{border:'1px solid black',padding:'none'}} >Search</Button>
          </form>
          </Col>
        </Row>
        
        <div className="table-responsive mt-2 pt-2">
          <table
            className="table py-3 mt-3  table-hover table striped  align-middle table-bordered"
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
            <tbody {...getTableBodyProps()} className='table-bordered'>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
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