import React, { useRef, useState, useEffect ,useMemo} from 'react';
import { Form, Container, Row, Col, Alert } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styled from 'styled-components';
import Service from "../../../../Services/Service"
import { useLocation, Redirect } from "react-router-dom";
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters, useSortBy } from 'react-table'
import { FiEdit } from 'react-icons/fi';


import { useHistory } from 'react-router-dom';
const ContainerWrapper = styled.div`
    font-size:10px;
    margin-top: 2rem;
    padding: 2rem;
    border-radius: 10px;
    background: white;
    box-shadow:
    `;
    


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
            Header: "CLIENT NAME",
            accessor: "Client Name",
            Cell: ({row, value}) => (
              <span>{`${row.original.clientname}`}</span>
            )

          },
          {
            Header: "ORIGINATOR",
            accessor: "Originator",
            Cell: ({row, value}) => (
              <span>{`${row.original.originator}`}</span>
            )
          },
          {
            Header: "LEGAL LEAD",
            accessor: "Legal Lead",
            Cell: ({row, value}) => (
              <span>{`${row.original.transactionlegallead}`}</span>
            )
          },
          {
            Header: "INDUSTRY",
            accessor: "Industry",
            Cell: ({row, value}) => (
              <span>{`${row.original.industry}`}</span>
            )
          },
          {
            Header: "PRODUCT",
            accessor: "product",
            Cell: ({row, value}) => (
              <span>{`${row.original.product}`}</span>
            )
          },
          {
            Header: "REGION",
            accessor: "region",
            Cell: ({row, value}) => (
              <span>{`${row.original.region}`}</span>
            )
          },
          {
            Header: "DEAL SIZE (₦'BN)",
            accessor: "Deal Size",
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
            Header: "COUPON",
            accessor: "Coupon",
            Cell: ({row, value}) => (
              <span>{`${row.original.coupon} %`}</span>
            )
          },
          {
            Header: "TENOR",
            accessor: "Tenor",
            Cell: ({row, value}) => (
              <span>{`${row.original.tenor}`}</span>
            )
          },
          {
            Header: "MORATORIUM",
            accessor: "Moratorium",
            Cell: ({row, value}) => (
              <span>{`${row.original.moratorium}`}</span>
            )
          },
          {
            Header: "REPAYMENT FREQUENCY",
            accessor: "Repayment Frequency",
            Cell: ({row, value}) => (
              <span>{`${row.original.repaymentfrequency}`}</span>
            )
          },
          {
            Header: "AMORTIZATION STYLE",
            accessor: "amortizationstyle",
            Cell: ({row, value}) => (
              <span>{`${row.original.amortizationstyle}`}</span>
            )
          },
          {
            Header: "MANDATE LETTER",
            accessor: "Mandateletter",
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
            Header: "EXPECTED CLOSE",
            accessor: "Expected close",
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
        <Row>
        <Row className=''>
          <Col sm={12} className='  ' >
            <Row>
              <Col sm={3} className='d-sm-none d-lg-block d-md-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                All ({staff.length})
              </small></Col>

              <Col sm={3} className='d-sm-none d-lg-block d-md-block'>
              <small style={{fontSize:'12px',paddingTop:'10px'}}>
                Trash (0) 
                </small>
              </Col>
              <Col sm={3} className='d-sm-none d-lg-block'>
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
          
      </ContainerWrapper>

      </React.Fragment>
    
  )
}

export default SingleStaff