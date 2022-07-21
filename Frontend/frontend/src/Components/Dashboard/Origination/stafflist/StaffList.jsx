import React, { useRef, useState, useEffect ,useMemo} from 'react';
import { Form, Container, Row, Col, Alert } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styled from 'styled-components';
import Service from "../../../../Services/Service"
import { useLocation, Redirect } from "react-router-dom";
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters, useSortBy } from 'react-table'
import { FiEdit } from 'react-icons/fi';
import * as XLSX from 'xlsx';


import { useHistory } from 'react-router-dom';
const ContainerWrapper = styled.div`
    font-size:10px;
    margin-top: 2rem;
    padding: 2rem;
    border-radius: 10px;
    background: white;
    box-shadow:
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
             <input 
              className="form-control"
              style={{ outline: 'none', border: '1px solid black', padding: '1px 13px', marginRight: '2px', width:'160px' }}
              value={value || ""}
              onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
              }}
              placeholder={`Search ${count} ....`}
    
          />
    )
  }


function StaffList() {
    const [staff, setStaff] = useState([]);
    const [status, setStatus] = useState(false);
    const history = useHistory();
   useEffect(() => {
     retrieveStaff();
   }, []);

   const retrieveStaff = () => {
    Service.getAllStaff()
      .then((response) => {

         setStaff(response.data.staff);
       })
       .catch((e) => {
         console.log(e);
       });
   };

  const openStaff = (rowIndex) => {
     history.push({
       pathname:'/staff_transaction_report',
       search:"?" + rowIndex
     })

   };

      const columns = useMemo(
        () => [
          {
         Header: "VIEW",
          accessor: "View",
          disableResizing: true,
          width: 42,
          Cell: (props) => {
            const rowIdx = props.row.original['email'];
            return (
              <div>
                 <div>
                <span onClick={() =>  openStaff(rowIdx)} style={{cursor: "pointer"}}>
                  <FiEdit/>
                </span>
              </div>
              </div>
            )
          }
        },
            
          
        {
         Header: "NAME",
         accessor: "firstname",
         Cell: ({row, value}) => (
           <span>{`${row.original.firstname} ${row.original.lastname}`}</span>
         )
       },
       {
         Header: "LEVEL",
         accessor: "level",
         Cell: ({row, value}) => (
           <span>{`${row.original.level} `}</span>
         )
       },
     ],
    []
      );
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
      );
      const downloadExcel = () =>{
        const newData = staff.map(row =>{
          delete row.tableData
        
          return(
            row

          )
        })
        const workSheet = XLSX.utils.json_to_sheet(newData)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook,workSheet,'Single_Staff_Report')
        //Buffer
        let buf =XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
        XLSX.writeFile(workBook,"Single_Staff_Transaction_Report.xlsx")
      }
    
    


      
    
  return (
      <React.Fragment>
         <ContainerWrapper>
        <Row>
        <Row className=''>
          <Col sm={12} className='  ' >
            <Row>
              <Col sm={2} className='d-sm-none d-lg-block d-md-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                All ({staff.length})
              </small></Col>

              <Col sm={2} className='d-sm-none d-lg-block d-md-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                Trash (0) 
                </small>
              </Col>
              <Col sm={2} className='d-sm-none d-lg-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                Bulk Actions
                </small>
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
            </Col>
            </Row>


         
        </Row>
        <Row>
          <Col sm={12} className=' py-1 mt-1'>
          <div className="table-responsive mt-2 pt-2">
            <table
              className="table py-3 mt-3  table-hover table striped  align-middle "
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
        

          </Col>

          <Col sm={6}>

          </Col>
        </Row>

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
    
  )
}

export default StaffList
