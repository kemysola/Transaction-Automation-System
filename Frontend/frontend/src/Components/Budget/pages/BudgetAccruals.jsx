import React, { useState, useMemo, useContext } from "react";
import CartContext from "../../../context/cart/CartContext";
import { useTable, useAsyncDebounce } from "react-table";
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
import BudgetView from "./BudgetView";
import {Modal} from "antd";
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
  const { cartItems } = useContext(CartContext);
  const structuringFee = props.data.map(
    (data) => data.original.structuringfeeamount
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [fyStartDate, setFyStartData] = useState(null);
  const [fyEndDate, setFyEndData] = useState(null);
  const [displayBudgetData, setDisplayBudgetData] = useState(false)
  const [rawBudgetData, setRawBudgetData] = useState([])
  const [open, setOpen] = useState(false);

  const addBudget = () => {
    setSubmitting(true);
    setSubmitted(true);
//     console.log("I am data",  props?.data)
//     const multipliedData = data.map(obj => ({...obj, a: obj.a * 300}));
// console.log(multipliedData);
// Output: [{a: 3000, b: 'joy'}]

   
    const propsData = props?.data.map(data => ({...data.original, principal: data.original.principal * 1000000000}));

    console.log("I am props data", propsData)
    const formattedStartDate = fyStartDate.replace(/-/g, "");
    const formattedEndDate = fyEndDate.replace(/-/g, "");
    Service.postAccruals(formattedStartDate, formattedEndDate, propsData).then(
      (res) => {
        if (res?.data.status === 200) {
          localStorage.setItem("budget", JSON.stringify(res?.data?.deals));
          setDataResult(res?.data.deals);
          setRawBudgetData(res?.data)
          setDisplayBudgetData(true)
          setOpen(true)
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
        } else {
          setSubmitted(false);
          setSubmitting(false);
        }
      }
    );

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
      {
        Header: "Discount Factor",
        accessor: "discountfactor",
      },
      {
        Header: "Issue Date",
        accessor: "issuedate",
      },
      {
        Header: "Taking First Interest",
        accessor: "takingfirstinterestearly",
      },
      {
        Header: "Principal",
        accessor: "principal",
      },
      {
        Header: "First Coupon Date",
        accessor: "firstcoupondate",
      },
      {
        Header: "Guarantee Fee Rate",
        accessor: "guaranteefeerate",
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
     {displayBudgetData && 
     
  //    <Button type="primary" onClick={() => setOpen(true)}>
  //    Open Modal of 1000px width
  //  </Button>
   <Modal
     title="Budget Summary View"
     centered
     open={open}
     onOk={() => setOpen(false)}
     onCancel={() => setOpen(false)}
     width={1100}
     style={{zIndex: '1000'}}
   >
     <BudgetView budgetData={dataResult} budgetRaw={rawBudgetData}/>
   </Modal>
    //  <BudgetView budgetData={dataResult} budgetRaw={rawBudgetData}/>
     
     } 
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
        <form>
          <label style={{ paddingRight: "1rem",fontWeight:'bold' }}>Start Date: </label>
          <input
            type="date"
            placeholder="Start Date"
            className="py-1"
            style={{ marginRight: "1em",border:'1px dashed #E2E2E2' }}
            value={fyStartDate}
            onChange={(event) => setFyStartData(event.target.value)}
          />
          <label style={{ paddingRight: "0.44rem",fontWeight:'bold' }}> - End Date </label>
          <input
            type="date"
            placeholder="End Date"
            className="py-1"
            style={{ marginRight: "1em" ,border:'1px dashed #E2E2E2'}}
            value={fyEndDate}
            onChange={(event) => setFyEndData(event.target.value)}
          />
        </form>
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
            // disabled={submitted}
            onClick={addBudget}
            className="py-3"
            color="success"
          />
        )}
      </div>
    </div>
  );
}
