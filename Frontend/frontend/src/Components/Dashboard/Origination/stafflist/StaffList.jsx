import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters,    useSortBy
} from 'react-table'
import { useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import Service from '../../../../Services/Service';


const ContainerWrapper = styled.div`
    font-size:10px;
    margin: 1rem;
    padding: 2rem;
    border-radius: 15px;
    background:white;
    font-family:roboto;
    `;

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
          <input 
              className="form-control"
              style={{ outline: 'none', border: '1px solid black', padding: '1px 13px', marginRight: '2px', width:'160px' }}
              value={value || ""}
              onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
              }}
              placeholder={`Search ${count} records`}
    
          />
  )
}

const StaffList = () => {
  const history = useHistory();
  const [staff, setStaff] = useState([]);
  const [searchStaff, setSetSearch] = useState("")
  const staffRef = useRef();
  staffRef.current = staff;

  useEffect(() => {
    const retrieveStaff = async() => {
      await Service.getAllStaff()
        .then((response) => {
          setStaff(response.data.staff);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
  }, []);

  
  

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
  );
  



  return (
    <React.Fragment>
      <ContainerWrapper>
        <Row className=''>
          <Col sm={12} className='  ' >
            <Row>
              <Col sm={2} className='d-sm-none d-lg-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                All ({staff.length})
              </small></Col>

              <Col sm={2} className='d-sm-none d-lg-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                Trash (0) 
                </small>
              </Col>
              <Col sm={2} className='d-sm-none d-lg-block '>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                Bulk Actions
                </small>
                </Col>
                
                

                <Col sm={2}>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </Col>

                
            </Row>
              
          </Col>
         
        </Row>
        <Row className='py-3'>
          <Col sm={12} className='bg-light mt-3 '>
          <div className=" mt-2 pt-2 d-flex justify-content-center">
            <table
              className="table py-3 mt-3  table-hover  "
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
              <tbody {...getTableBodyProps()} className=''>
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

         {/* <Col sm={6}>

              </Col>*/}
        </Row>
          
      </ContainerWrapper>
    </React.Fragment>
  );
};

export default StaffList;