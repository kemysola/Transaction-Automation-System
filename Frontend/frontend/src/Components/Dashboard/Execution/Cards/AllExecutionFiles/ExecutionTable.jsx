import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Row, Col, Form as Fm, Spinner, Container } from "react-bootstrap";
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
  usePagination,
  useSortBy,
} from "react-table";
import styled from "styled-components";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Divider } from "@mui/material";
const ContainerWrapper = styled.div`
  font-size: 11px;
  margin-top: 0.55rem;
  padding: 1rem 1rem;
  border-radius: 5px;
`;

const TableWrapper = styled.div`
  padding: 0rem 1rem;
  background: white;
  border-radius: 5px;
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
`;

const ButtonWrapper = styled.button`
  color: white;
  background: green;
  border: 1px solid white;
  padding: 2px 15px;
  font-size: 13px;
  margin-top: 40px;
  height: 32px;
  border-radius: 3px;
`;

const DateWrapper = styled.button`
  // display: flex;
  // align-items: left;
  background: white;
  border: none;
  // justify-content: start;
  // position: absolute;
  // margin-right: 1.8rem;
  // right: 120px;
  // padding-bottom: 1rem;
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
`;
const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block text-danger">
        This field is required!
      </div>
    );
  }
};

export default function ExecutionTable({data}) {
    const columns = useMemo(
        () => [
          {
            Header: "SN",
            maxWidth: 50,
            filterable: true,
            Cell: (props) => {
              const rowIdx = parseInt(props.row.id);
    
              return <div>{`${rowIdx + 1}`}</div>;
            },
          },
          {
            Header: "Client",
            accessor: "clientname",
          },
          {
            Header: "Transactor",
            accessor: "transactor",
          },
          {
            Header: "Deal Size(₦'BN)",
            accessor: "dealsize",
            Cell: (props) => {
              const amount = parseInt(props.row.original["dealsize"]);
              return <div>{`${amount.toFixed(1)}`}</div>;
            },
          },
          {
            Header: "Industry",
            accessor: "industry",
          },
          {
            Header: "Product",
            accessor: "product",
          },
          {
            Header: "Region",
            accessor: "region",
          },
          {
            Header: "Tenor(yrs)",
            accessor: "tenor",
          },
          {
            Header: "Coupon(%)",
            accessor: "coupon",
          },
          {
            Header: "Expected Financial Close Date",
            accessor: "expectedclose",
            Cell: (props) => {
              const date = props.row.original["expectedclose"];
              if (date !== null) {
                const expectedDate = new Date(date);
                return <div>{`${expectedDate.toISOString().slice(0, 10)}`}</div>;
              }
              return <div>-</div>;
            },
          },
          {
            Header: "Structuring Fee Amount(₦'MN)",
            accessor: "structuringfeeamount",
          },
          {
            Header: "Guarantee Fee(%)",
            accessor: "guaranteefee",
            Cell: ({ cell: { value } }) => value || "-",
          },
          {
            Header: "Monitoring Fee(₦'MN)",
            accessor: "monitoringfee",
          },
        ],
        []
      );
    
      const getTrProps = (row, i) => {
        if (row) {
          // if deal category is yellow, return a warmer yellow color
          if (`${data[i].deal_category}` === "Yellow") {
            return {
              style: {
                color: "#FFBF00",
                borderColor: "transparent",
              },
            };
          }
          return {
            style: {
              color: `${data[i].deal_category}`,
              borderColor: "transparent",
            },
          };
        }
        //
        return {
          style: {},
        };
      };
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
      } = useTable(
        {
          columns,
          data: data,
          initialState: { pageIndex: 0 },
          getRowProps: getTrProps(),
        },
        useResizeColumns,
        useFlexLayout,
        useSortBy,
        usePagination,
        useRowSelect
      );
    
  return (
    <ContainerWrapper>
        <TableWrapper>
            <div className="table-responsive mt-2 pt-2">
              <table
                className="table py-3 mt-3  table-hover table striped align-middle table-bordered"
                id="myTable"
                {...getTableProps()}
              >
                <thead className="">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="table-bordered">
                  {page.map((row, i) => {
                    prepareRow(row);

                    return (
                      <tr {...row.getRowProps(getTrProps(row, i))}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TableWrapper>

          <Pagination>
            <div className="pagination mt-1 pt-1">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>{" "}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>{" "}
              <span style={{ paddingTop: "2.5px" }}>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "30px" }}
                />
              </span>{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </Pagination>
    </ContainerWrapper>
  )
}
