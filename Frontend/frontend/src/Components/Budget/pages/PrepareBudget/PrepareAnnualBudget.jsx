import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Editable from "react-x-editable";
import { useAsyncDebounce } from "react-table";

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
export default function PrepareAnnualBudget(props) {
  const data = props?.data || [];
  const newArr = data.map((arr) => {
    return arr.map((num) => {
      const dataDate = (num?.ddate).slice(0, 10);
      return <th>{dataDate}</th>;
    });
  });

  for (let i = 0; i < data?.length; i++) {
    const amortizationData = data[i]?.map((data) => data?.ddate);
    const ngGuarantee = data[i]?.map((data) => data?.nguaranteefees);
  }

  return (
    <>
      <div>
        <small>Financial Year</small>
      </div>
      <Container>
        <Box>
          <table>
            <thead>
              <tr>
                {newArr.map((data) => (
                  <th>{data}</th>
                ))}
              </tr>
            </thead>
          </table>
        </Box>
      </Container>
    </>
  );
}
