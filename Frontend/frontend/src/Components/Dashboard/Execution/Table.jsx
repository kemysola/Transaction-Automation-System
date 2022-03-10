import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { useTable } from 'react-table'
import { useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

const ContainerWrapper = styled.div`
    font-size:10px;
    margin-top: 2rem;
    background:white;
    width:70vw;
    padding: 2rem;
    border-radius: 15px;`;

const StaffTable = () => {
  const history = useHistory();
  const [staff, setStaff] = useState([]);
  const [searchStaff, setSetSearch] = useState("")
  const staffRef = useRef();
  staffRef.current = staff;

//   useEffect(() => {
//     retrieveStaff();
//   }, []);

//   const retrieveStaff = () => {
//     Service.getAllStaff()
//       .then((response) => {
//         setStaff(response.data.staff);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const openStaff = (rowIndex) => {
//     const id = staffRef.current[rowIndex].id;
//     history.push("/staff/" + id)

//   };

//   const updateStaff = (rowIndex) => {
//     // const id = staffRef.current[rowIndex].id;
//     // history.push("/update/" + id)
//     history.push({
//       pathname: "/update",
//       search: "?" + rowIndex,
//     });
//   }

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        accessor: "id",
      },
      {
        Header: "Client Name",
        accessor: "clientname",
      },
      {
        Header: "Transaction",
        accessor: "level",
      },
      {
        Header: "Deal Size",
        accessor: "hasoriginationtarget",
      },
      {
        Header: "Industry",
        accessor: "feeletter",
      },
      {
        Header: "Product",
        accessor: "financialclose",
      },
      {
        Header: "Region",
        accessor: "originationamount",
      },
      {
        Header: "Tenor",
        accessor: "guaranteepipeline",
      },
      {
        Header: "Coupon",
        accessor: "greentransaction",
      },
      {
        Header: "Financial Close",
        accessor: "ambertransaction",
      },
      {
        Header: "Structuring Fee",
        accessor: "mandateletter",
      },
      {
        Header: "Gurantee Fee",
        accessor: "creditcommitteapproval",
      },
      {
        Header: "Edit",
        accessor: "edit",
        disableResizing: true,
        minWidth: 35,
        width: 35,
        maxWidth: 35,
        Cell: (props) => {
          //const rowIdx = props.row.original['email'];
          return (
            <div>
               <div>
              <span>
                <FiEdit/>
              </span>
            </div>
            </div>
          )
        }
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
    data: staff,
  });



  return (
    <React.Fragment>
      <ContainerWrapper>

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
      </ContainerWrapper>
    </React.Fragment>
  );
};

export default Table;

