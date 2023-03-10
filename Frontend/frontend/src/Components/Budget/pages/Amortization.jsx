import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
import { Button, Row, Col} from 'react-bootstrap';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters, useSortBy } from "react-table";
import { FiEdit } from "react-icons/fi";
import { FaLock, FaLockOpen } from "react-icons/fa"
import { GrStatusDisabled } from "react-icons/gr"
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Service from "../../../Services/Service";
// import TitleContext from '../../context/TitleContext';

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

const Amortization = (props) => {
  const history = useHistory();
//   const { filteredStore, addFtYear} = useContext(TitleContext)
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerAlert, setCustomerAlert] = useState(false);
  const dealsRef = useRef();
  dealsRef.current = deals;

  let filteredStore = 1002

//   useEffect(() => {
//     retrieveDeals();
//   }, [filteredStore]); 

//   const retrieveDeals = async () => {
//     await Service.getAmortization(filteredStore)
//       .then((response) => {
//         setDeals(response.data.amortization_schedule);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

  const handleSearch  = async (event) => {
    event.preventDefault();
    await Service.getAmortization(searchTerm)
      .then((response) => {
        setDeals(response.data.amortization_schedule);
        setCustomerAlert(false)
        if (response.data.amortization_schedule.length < 1) {
          setCustomerAlert(true)
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

//   const refreshList = () => {
//     retrieveDeals();
//   };

  const openDeal = (rowIndex) => {
    history.push({
      pathname: "/update_transactions",
      search: "?" + rowIndex,
    });
  };

  // transaction table
  const columns = useMemo(
    () => [
    {
        Header: "Create Date",
        accessor: "recordcreatedate",
        Cell: (props) => {
          const date = props.row.original['recordcreatedate']
          if (date !== null) {
            const expectedDate = new Date(date)
            return (
              <div>
                {`${expectedDate.toISOString().slice(0, 10)}`}
              </div>
            )
          }
        }
      },
      {
        Header: "Deal Id",
        accessor: "dealid",
      },
      {
        Header: "Deal Name",
        accessor: "dealname",
      },
      {
        Header: "Period Date",
        accessor: "period_date",
        Cell: (props) => {
            const date = props.row.original['period_date']
            if (date !== null) {
              const expectedDate = new Date(date)
              return (
                <div>
                  {`${expectedDate.toISOString().slice(0, 10)}`}
                </div>
              )
            }
          }
      },
      {
        Header: "Period",
        accessor: "Period",
      },
      {
        Header: "Principal Repayment",
        accessor: "principalrepayment",
        Cell: (props) => {
            const value = props.row.original['principalrepayment']
            // if (date !== null) {
            //   const expectedDate = new Date(date)
              return (
                <div>
                  {value.toLocaleString("en")}
                </div>
              )
            // }
          }
      },
      {
        Header: "Interest Payment",
        accessor: "interestpayment",
      },
      {
        Header: "Total Payment",
        accessor: "totalpayment",
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
    return {
      style: {}
    };
  }
  const downloadExcel = () =>{
    const newData = deals.map(row =>{
      delete row.tableData
      return row
    })
    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,'Transaction_Summary')
    //Buffer
    let buf =XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
    XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
    XLSX.writeFile(workBook,"Transaction_summary.xlsx")
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
  

  return (
    <React.Fragment>
      <ContainerWrapper>
        <Row>
              <Col sm={2} className='d-sm-none d-lg-block d-md-block'>
                <small style={{fontSize:'12px',paddingTop:'10px'}}>
                  All ({deals.length})
                </small>
              </Col>

{/*            
              <Col sm ={2} className='d-sm-none d-lg-block d-md-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
              <button className='bg-success text-light py-1' onClick={downloadExcel}>Download</button>
              </small>
              </Col> */}


                <Col sm={6}>
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder='Enter account id' className='py-1' style={{marginRight: '1em'}} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                        <button className='bg-success text-light py-1' type="submit">Search</button>
                    </form>
                    {
                      customerAlert ? <div style={{color: 'red'}}>please check the id is correct</div> : null
                    }
            </Col>                
        </Row>

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
        </TableStyle>

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
        
      </ContainerWrapper>
    </React.Fragment>
)}

export default Amortization;
