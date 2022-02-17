import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Table, Stack, Form,Row,Col} from 'react-bootstrap';
import { useTable } from "react-table";
import styled from 'styled-components';
import Service from "../../Services/Service";

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

const DealsTable = (props) => {
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

  // const refreshList = () => {
  //   retrieveDeals();
  // };

  const columns = useMemo(
    () => [
      {
        Header: "CLIENT",
        accessor: "clientName",
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
        Header: "TRANSACTION LEGAL LEAD",
        accessor: "transactionLegalLead",
      },
      {
        Header: "INDUSTRY",
        accessor: "industry",
      },
      {
        Header: "DEAL SIZE",
        accessor: "dealSize",
      },
      {
        Header: "MANDATE LETTER",
        accessor: "mandateLetter",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: deals,
  });

  return (
    <React.Fragment>
      <ContainerWrapper>
        <Row>
          <Col sm={4}className='d-flex justify-content-between'  >
          <small style={{fontSize:'12px',paddingTop:'10px'}}>
            All (5)
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