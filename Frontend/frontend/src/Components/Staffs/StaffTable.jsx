import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Table, Button, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
  useSortBy
} from 'react-table'
import { useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import Service from '../../Services/Service';

const ContainerWrapper = styled.div`
    font-size:10px;
    margin-top: 1rem;
    padding: 2rem;
    //border-radius: 15px;
    @media screen and (max-width: 768px) {
     .small{
       margin-left: 1em;
     }
}
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
  @media screen and (max-width: 768px) {
    button {
    margin: 1px;
    border-radius: 2px;
    border: 1px solid black;
  }

  span {
    font-size: 10px;
    margin: 1px;
  }

  select {
    margin: 1px;
    width: 40px;
    font-size: 10px;
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
      <span className=''>
    
          <input 
              className="form-control"
              style={{ outline: 'none', border: '1px solid black', padding: '1px 10px', marginTop: '2px', marginRight: '2px', width:'180px' }}
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

const StaffTable = () => {

// ******************************* use state hook to store state, useRef to retrieve current index and value **************

  const history = useHistory();
  const [staff, setStaff] = useState([]);
  const staffRef = useRef();
  staffRef.current = staff;


// ****************************** useEffect : componentDidMount and ComponentWllReceive  ********************************


  useEffect(() => {
    retrieveStaff();
  }, []);


  // ******************************************  Axios call : get all staff *********************************************

  const retrieveStaff = async() => {
    await Service.getAllStaff()
      .then((response) => {
        setStaff(response.data.staff);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateStaff = (rowIndex) => {
    history.push({
      pathname: "/update_users",
      search: "?" + rowIndex,
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: 'S/N',
        disableResizing: true,
        width: 42,
        Cell: (row) => {
          return <div>{Number(row.row.id) + 1}</div>;
        }
      },
      {
        Header: "Edit",
        accessor: "edit",
        disableResizing: true,
        width: 42,
        Cell: (props) => {
          const rowIdx = props.row.original['email'];
          return (
            <div>
               <div>
              <span onClick={() =>  updateStaff(rowIdx)} style={{cursor: "pointer"}}>
                <FiEdit/>
              </span>
            </div>
            </div>
          )
        }
      },
      {
        Header: "Name",
        accessor: "firstname",
        Cell: ({row, value}) => (
          <span>{`${row.original.firstname} ${row.original.lastname}`}</span>
        )
      },
      {
        Header: "lastname",
        accessor: "lastname",
        show: false
      },
      {
        Header: "Level",
        accessor: "level",
      },
      {
        id: "hasoriginationtarget",
        Header: "Has Target",
        accessor: d => d.hasoriginationtarget ? "Yes" : "No",
      },
      {
        Header: "Fee Letter",
        accessor: "feeletter",
      },
      {
        Header: "Financial Close",
        accessor: "financialclose",
      },
      {
        Header: "Origination Amount",
        accessor: "originationamount",
      },
      {
        Header: "Guarantee Pipeline",
        accessor: "guaranteepipeline",
      },
      {
        Header: "Mandate Letter",
        accessor: "mandateletter",
      },
      {
        id: "creditcommitteapproval",
        Header: "Credit Committe Approval",
        accessor: "creditcommitteapproval",
      },
      {
        Header: "Status",
        accessor: "status",
      }

    ],
    []
  );

  // ******************************************  React Table initial state *******************************************

  const initialState = { hiddenColumns: ['lastname'] };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
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
  } = useTable({
    columns,
    data: staff,
    initialState
  },
  useGlobalFilter,
  useFilters,
  useSortBy,
  useResizeColumns,
  useFlexLayout,
  usePagination,
  useRowSelect,
    // hooks => {
    //   hooks.allColumns.push(columns => [
    //     // Let's make a column for selection
    //     {
    //       id: 'selection',
    //       disableResizing: true,
    //       minWidth: 20,
    //       width: 35,
    //       maxWidth: 35,
    //       // The header can use the table's getToggleAllRowsSelectedProps method
    //       // to render a checkbox
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ])
    //   hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    //     // fix the parent group of the selection button to not be resizable
    //     const selectionGroupHeader = headerGroups[0].headers[0]
    //     selectionGroupHeader.canResize = false
    //   })
    // },
  );



  return (
    <React.Fragment>
      <ContainerWrapper  className='bg-light'>
        <Row>
          <Col
            sm={3}
            lg={4}
            md={12}
            className='d-flex justify-content-end'
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Card style={{ width: "10rem", flex: 1, background: "white" }}>
              <Card.Body>
                <Card.Title>Total No of Team: {staff.length}</Card.Title>
                {/* <Card.Text>No of Deal Team</Card.Text> */}
              </Card.Body>
            </Card>
          </Col>

          <Col className='d-flex justify-content-end' style={{marginTop: "10px"}}>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
          </Col>
        </Row>

            {/* ------------ Staff Table ------- */}
        <TableStyle>
          <div className="table-responsive mt-2 pt-2">
            <table
              className="table py-3 mt-3  table-hover table striped  align-middle table-bordered"
              id='myTable'
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                         {/* Add a sort direction indicator */}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                              : ''}
                          </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className='table-bordered'>
                {rows.map((row, i) => {
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
        </TableStyle>
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
    </React.Fragment>
  );
};

export default StaffTable;
