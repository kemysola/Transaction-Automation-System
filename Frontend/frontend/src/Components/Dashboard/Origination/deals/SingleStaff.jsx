import React, { useRef, useState, useEffect ,useMemo} from 'react';
import { Form, Container, Row, Col, Alert } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styled from 'styled-components';
import Service from "../../../../Services/Service"
import { useLocation, Redirect } from "react-router-dom";
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters } from 'react-table'
import { FiEdit } from 'react-icons/fi';


import { useHistory } from 'react-router-dom';
const ContainerWrapper = styled.div`
    font-size:10px;
    margin-top: 2rem;
    padding: 2rem;
    border-radius: 15px;`;


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
                style={{ outline: 'none', border: '1px solid black', padding: '2px', marginTop: '2px', marginRight: '2px', width:'180px' }}
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


function SingleStaff() {
    const [staff, setStaff] = useState([]);
    const [status, setStatus] = useState(false);
    const history = useHistory();

    useEffect(() => {
        retrieveStaff();
      }, []);

      let user_email = window.location.search.split("?")[1]
      const retrieveStaff = async () => {
          Service.getMyDealsByEmail(
              user_email

          ).then((res) =>{
              console.log(res.data.deals)
              console.log(user_email)
              setStaff(res.data.deals)
          })
          console.log(staff)  
          
      } ;



      const columns = useMemo(
        () => [
          
          {
            Header: "Name",
            accessor: "firstname",
            Cell: ({row, value}) => (
              <span>{`${row.original.clientname}`}</span>
            )

          }, {
            Header: "clientname",
            accessor: "Client Name",
            Cell: ({row, value}) => (
              <span>{`${row.original.record_entry}`}</span>
            )
          },
          {
            Header: "originator",
            accessor: "Originator",
            Cell: ({row, value}) => (
              <span>{`${row.original.originator}`}</span>
            )
          },
          {
            Header: "legallead",
            accessor: "Legal Lead",
            Cell: ({row, value}) => (
              <span>{`${row.original.transactionlegallead}`}</span>
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
      useResizeColumns,
      useFlexLayout,
      );


      
    
  return (
      <React.Fragment>
         <ContainerWrapper>
        <Row>
          <Col sm={4}className='d-flex justify-content-between'  >
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                All ({staff.length})
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
          <Col sm={12} lg={4}>
            <form className='pt-1'>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </form>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
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
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
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
          
      </ContainerWrapper>

      </React.Fragment>
    
  )
}

export default SingleStaff