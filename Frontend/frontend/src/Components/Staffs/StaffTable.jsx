import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters } from 'react-table'
import { useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import Service from '../../Services/Service';

const ContainerWrapper = styled.div`
    font-size:10px;
    margin-top: 2rem;
    padding: 2rem;
    border-radius: 15px;`;

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
          {/* Search:{' '} */}
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

const StaffTable = () => {
  const history = useHistory();
  const [staff, setStaff] = useState([]);
  const [searchStaff, setSetSearch] = useState("")
  const staffRef = useRef();
  staffRef.current = staff;

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

  console.log("staff data", staff)

  const openStaff = (rowIndex) => {
    const id = staffRef.current[rowIndex].id;
    history.push("/staff/" + id)
  };

  const updateStaff = (rowIndex) => {
    history.push({
      pathname: "/one_view",
      search: "?" + rowIndex,
    });
  }

  const columns = useMemo(
    () => [
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
        Header: "Has Target",
        accessor: "hasoriginationtarget",
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
        Header: "Green Transaction",
        accessor: "greentransaction",
      },
      {
        Header: "Amber Transaction",
        accessor: "ambertransaction",
      },
      {
        Header: "Mandate Letter",
        accessor: "mandateletter",
      },
      {
        Header: "Credit Committe Approval",
        accessor: "creditcommitteapproval",
      }

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
              <Col sm={3}>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                All ({staff.length})
              </small></Col>

              <Col sm={3}>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                Trash (0) 
                </small>
              </Col>
              <Col sm={3}>
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
              className="table py-3 mt-3  table-hover table striped  align-middle table-bordered"
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
        
      </ContainerWrapper>
    </React.Fragment>
  );
};

export default StaffTable;