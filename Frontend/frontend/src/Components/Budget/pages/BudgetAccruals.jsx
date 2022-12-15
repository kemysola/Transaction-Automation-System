import React, { useState, useMemo, useContext } from "react";
import CartContext from "../../../context/cart/CartContext";

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
} from "react-table";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Service from "../../../Services/Service";
import toast, { Toaster } from "react-hot-toast";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import PrepareAnnualBudget from "./PrepareBudget/PrepareAnnualBudget";

export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="">
      <input
        className="form-control "
        style={{
          outline: "none",
          border: "1px solid black",
          padding: "1px 10px",
          marginTop: "2px",
          marginRight: "2px",
          width: "170px",
        }}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} records`}
      />
    </span>
  );
};

export default function BudgetAccruals(props) {
  const { cartItems, removeItem, addToCart } = useContext(CartContext);
  const guaranteeFee = props.data.map((data) => data.original.guaranteefee);
  const structuringFee = props.data.map(
    (data) => data.original.structuringfeeamount
  );
  const monitoringFee = props.data.map((data) =>
    parseInt(data.original.monitoringfee)
  );
  const id = props.data.map((data) => {
    return data.original.transid;
  });
  const clientName = props.data.map((data) => {
    return data.original.transid;
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const postData = () => {};
  const addBudget = () => {
    setSubmitting(true);
    setSubmitted(false);
    // addToCart({
    //   guaranteeFee:guaranteeFees,
    //   structuringFee:structuringFees,
    //   monitoringFee:monitoringFees,
    //   transid:id,
    // });
    toast.success("Budget has been submitted successfully.", {
      duration: 4000,
      position: "bottom-right",
      // Styling
      style: {},
      className: "",
      icon: "👏",
      iconTheme: {
        primary: "green",
        secondary: "#fff",
      },
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
    setSubmitted(true);
    setSubmitting(false);
  };
  const columns = useMemo(
    () => [
      {
        Header: "Client ",
        accessor: "clientname",
      },
      {
        Header: "Guarantee",
        accessor: "guaranteefee",
        Cell: (props) => {
          const amount = parseInt(props.row.original["guaranteefee"]);
          return <div>{`${amount.toFixed(2)}`}</div>;
        },
      },
      {
        Header: "Monitoring",
        accessor: "monitoringfee",
        Cell: (props) => {
          const amount = parseInt(props.row.original["monitoringfee"]);
          return <div>{`${amount.toFixed(2)}`}</div>;
        },
      },
      {
        Header: "Structuring",
        accessor: "structuringfeeamount",
        Cell: (props) => {
          const amount = parseInt(props.row.original["structuringfeeamount"]);
          return <div>{`${amount.toFixed(2)}`}</div>;
        },
      },
    ],
    []
  );
  const structuringAmount = props.data.map((data) =>
    parseInt(data.original.structuringfeeamount)
  );
  const structuringFees = structuringAmount.reduce(function (
    accumVariable,
    curValue
  ) {
    return accumVariable + curValue;
  },
  0);

  const monitoringAmount = props.data.map((data) =>
    parseInt(data.original.monitoringfee)
  );
  const monitoringFees = monitoringAmount.reduce(function (
    accumVariable,
    curValue
  ) {
    return accumVariable + curValue;
  },
  0);
  const guaranteeAmount = props.data.map((data) =>
    parseInt(data.original.guaranteefee)
  );
  const guaranteeFees = guaranteeAmount.reduce(function (
    accumVariable,
    curValue
  ) {
    return accumVariable + curValue;
  },
  0);

  const grandTotal = structuringFees + monitoringFees + guaranteeFees;

  const cartRe = cartItems.map((data) => {
    return data.transid;
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: props.data,
    });

  return (
    <div className="table-responsive  pt-1">
      <div>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid green",
              padding: "8px",
              color: "green",
            },
          }}
        />
      </div>
      <div>
        <List
          sx={{
            width: "150%",
            maxWidth: 360,
            bgcolor: "",
            height: "50%",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className="text-success">
              Structuring Fee : ₦{structuringFees}
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className="text-success">
              Guarante Fee : ₦{guaranteeFees}
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className="text-success">
              Monitoring Fee : ₦{monitoringFees}
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className="text-success">
              Total: ₦{grandTotal}
            </ListItemText>
          </ListItem>
        </List>
      </div>
      <table
        {...getTableProps()}
        className="table py-1 mt-1  table-hover table striped align-middle table-bordered"
        id="myTable"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="table-bordered pt-2 mt-2">
          {props.data.map((row, i) => {
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

      <div>
        {guaranteeFees.length === 0 ||
        monitoringFees.length === 0 ||
        structuringFee.length === 0 ? (
          <small className="text-success">No budget yet</small>
        ) : (
          <Chip
            label="Submit"
            disabled={submitted}
            onClick={addBudget}
            className="py-3"
            color="success"
          />
        )}
      </div>
      {/* <PrepareAnnualBudget/> */}
    </div>
  );
}
