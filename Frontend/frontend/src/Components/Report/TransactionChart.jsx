import React, { useState, useEffect, useMemo, useRef } from 'react';
import Services from '../../Services/Service'
import {  Row, Col} from 'react-bootstrap';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters, useSortBy } from "react-table";
import { FiEdit } from "react-icons/fi";
import { FaLock, FaLockOpen } from "react-icons/fa"
import { GrStatusDisabled } from "react-icons/gr"
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
//Define a default UI for filtering


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
export default function TransactionChart(props) { // ****************************  use state hook to store state, useRef and useHistory for routing ***************

    const [deals, setDeals] = useState([]);
    const dealsRef = useRef();
    dealsRef.current = deals;
  
    // ******************************************  useEffect hook *******************************************************
  
  
    useEffect(() => {
      retrieveDeals();
    }, []); 
  
  console.log(deals)
    
      // ******************************************  Axios :Get Request  ***********************************************
  
  
    const retrieveDeals = async() => {
      await Services.getAllDeals()
        .then((response) => {
          setDeals(response.data.deals);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    
  
   
  // transaction table
  const columns = useMemo(
    () => [
     
      {
        Header: "Infrastructure Entity ",
        accessor: "clientname",
        Cell: (props) => {
            const amount = props.row.original['clientname']
            const products =props.row.original['deal_category']
            return (
              <div>
                {`${amount}`}
                <br/>
                <small style={{fontSize:'14px'}}>{`${products}`}</small>
              </div>
            )
          }
      },
      
      {
        Header: "Infrastructure Activity /Industry",
        accessor: "industry",
      },
      // {
      //   Header: "Notes",
      //   accessor: "notes",
      // },
      {
        Header: "Deal Size",
        accessor: "dealsize",
        Cell: (props) => {
          const amount = parseInt(props.row.original['dealsize'])
          const products =props.row.original['product']
          return (
            <div>
              {`₦${(amount).toFixed(2)} Billion`}
              <br/>
              <small style={{fontSize:'10px'}}>{`(${products})`}</small>

            </div>
          )
        }
      },
      {
        Header: "State /Region",
        accessor: "region",
      },
      
    
      {
        Header: "Closing Date",
        accessor: "expectedclose",
        Cell: (props) => {
          const date = props.row.original['expectedclose']
          if (date !== null) {
            const expectedDate = new Date(date)
            return (
              <div>
                {`${expectedDate.toUTCString().slice(0, 17)}`}
              </div>
            )
          }
          return (
            <div>-</div>
          )
        }
      },
    
    ],
    []
  );

  useEffect(() => {
    getTrProps();
  }, []);

  const getTrProps = (row, i, page) => {
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

  


    
  return (
   <>
   {/* ------------- Transaction Table ---------- */}
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

        {/* Set pagination for the  table */}

   </>
  )
}
