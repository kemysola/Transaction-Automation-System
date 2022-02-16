import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Table, Stack, Form} from 'react-bootstrap';
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
        Header: "Client",
        accessor: "clientName",
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
        Header: "TransactionLegalLead",
        accessor: "transactionLegalLead",
      },
      {
        Header: "Industry",
        accessor: "industry",
      },
      {
        Header: "Deal Size",
        accessor: "dealSize",
      },
      {
        Header: "Mandate Letter",
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

        <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered responsive"
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
        
        {/* <Table striped responsive hover>
          <thead>
            <tr>
              <th><input type='checkbox'/></th>
              <th>S/N</th>
              <th>Products</th>
              <th>Region</th>
              <th>Management Fees</th>
              <th>Mandate Fees</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><input type='checkbox'/></td>
              <td>1</td>
              <td>Product Name</td>
              <td>Oyo</td>
              <td>120,000,000,000</td>
              <td>120,000,000,000</td>
              <td>17-01-2022</td>
            </tr>

            <tr>
              <td><input type='checkbox'/></td>
              <td>2</td>
              <td>Product Name</td>
              <td>Ogun</td>
              <td>120,000,000,000</td>
              <td>120,000,000,000</td>
              <td>17-01-2022</td>
            </tr>

            <tr>
              <td><input type='checkbox'/></td>
              <td>3</td>
              <td>Product Name</td>
              <td>Osun</td>
              <td>120,000,000,000</td>
              <td>120,000,000,000</td>
              <td>17-01-2022</td>
            </tr>

            <tr>
              <td><input type='checkbox'/></td>
              <td>4</td>
              <td>Product Name</td>
              <td>Kano</td>
              <td>120,000,000,000</td>
              <td>120,000,000,000</td>
              <td>17-01-2022</td>
            </tr>
          </tbody>
        </Table> */}
      </ContainerWrapper>
    </React.Fragment>
)}

export default DealsTable;