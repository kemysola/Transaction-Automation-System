import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Table, Stack, Form} from 'react-bootstrap';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect } from "react-table";
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
    console.log("oyaaaaaa", rowIndex)
    const id = dealsRef.current[rowIndex].index;
    // console.log("transid", dealsRef.current[rowIndex].original.transid)
    console.log("rowid",  id)
    history.push("/update_transactions?" + id);
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
          const rowIdx = props.row.id;
          console.log("rowindex", rowIdx)
          return (
            <div>
              <span onClick={() => openDeal(rowIdx)}>
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = useTable(
    {
      columns,
      data: deals,
    },
    useResizeColumns,
    useFlexLayout,
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
        <Stack classname="d-flex justify-content-between" direction="horizontal" gap={3}>
          <div>All (5) </div>
          <div className="vr" />
          <div>Trash (0) </div>
          <div className="vr" />
          <div>
            Bulk Actions
            <Button className='rounded-pill' size='sm' style={{backgroundColor: "green", border:'none', marginLeft: '1em'}}>Apply</Button>
          </div>
          <Button className='rounded-pill' size='sm'>Download</Button>
          <Search />
        </Stack>

        <div className="col-md-12 mt-2 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
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
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              console.log(row)
              console.log(i)
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
        
      </ContainerWrapper>
    </React.Fragment>
)}

export default DealsTable;