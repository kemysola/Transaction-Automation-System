import React, { useState, useMemo, useContext } from "react";
import CartContext from "../../../context/cart/CartContext";
import AmortizationSchedule from './AmortizationSchedule';

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

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];
function createData(
  name,
  code,
  population,
  size,
) {
  const density = population / size;
  return { name, code, population, size, density };
}
const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];


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
  const history = useHistory()
  const { cartItems} = useContext(CartContext);
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
  const [dataResult, setDataResult] =useState([])
  const postData = () => {};
  const addBudget = () => {
    setSubmitting(true);
    setSubmitted(false);
    const clientName = props.data.map((data) => {
      return data.original.transid;
    });
    const propsData = props?.data.map((data) => data?.original)
    // console.log(props?.data,'dataiu')
    // console.log(propsData,'clientName')
    Service.postAccruals(propsData).then((res) => {
      const data = res?.data?.deals
      if(res?.data.status === 200){
        localStorage.setItem('budget', JSON.stringify(res?.data?.deals))
        setDataResult(res?.data.deals)
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
      }
      else{
        console.log('no')
      }

      console.log(res,'res')
    })
    
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
      {
        Header: "Coupon(%)",
        accessor: "coupon",
      },
      {
        Header: "Tenor(yrs)",
        accessor: "tenor",
      },
      {
        Header: "Moratorium(yrs)",
        accessor: "moratorium",
      },
      {
        Header: "Repayment Frequency",
        accessor: "repaymentfrequency",
      },
      {
        Header: "Amortization Style",
        accessor: "amortizationstyle",
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
      <PrepareAnnualBudget data={dataResult}/>
    </div>
  );
}


