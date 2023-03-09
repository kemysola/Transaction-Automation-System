import { useState, useRef } from "react";
import SelfReferenceData from "./DataSource";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";

function createData(name, calories, fat, fy, anniversary) {
  return { name, calories, fat, fy, anniversary };
}

const rows = [
  createData("Cupcake", 305, 3.7, "Jan 21", 10000),
  createData("Donut", 452, 25.0, "Jan 21", 10000),
  createData("Eclair", 262, 16.0, "Jan 21", 10000),
  createData("Frozen yoghurt", 159, 6.0, "Jan 21", 10000),
  createData("Gingerbread", 356, 16.0, "Jan 21", 10000),
  createData("Honeycomb", 408, 3.2, "Jan 21", 10000),
  createData("Ice cream sandwich", 237, 9.0, "Jan 21", 10000),
  createData("Jelly Bean", 375, 0.0, "Jan 21", 10000),
  createData("KitKat", 518, 26.0, "Jan 21", 10000),
  createData("Lollipop", 392, 0.2, "Jan 21", 10000),
  createData("Marshmallow", 318, 0),
  "Jan 21",
  10000,
  createData("Nougat", 360, 19.0, "Jan 21", 10000),
  createData("Oreo", 437, 18.0, "Jan 21", 10000),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const blue = {
  200: "#A5D8FF",
  400: "#3399FF",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const Root = styled("div")(
  ({ theme }) => `
    table {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      text-align: left;
      padding: 6px;
    }
  
    th {
      background-color: ${
        theme.palette.mode === "dark" ? grey[900] : grey[100]
      };
    }
    `
);

const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.toolbar}  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.select}{
      padding: 2px;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      border-radius: 50px;
      background-color: transparent;
  
      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
      }
  
      &:focus {
        outline: 1px solid ${
          theme.palette.mode === "dark" ? blue[400] : blue[200]
        };
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      padding: 2px;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      border-radius: 50px;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 2px;
      background-color: transparent;
  
      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
      }
  
      &:focus {
        outline: 1px solid ${
          theme.palette.mode === "dark" ? blue[400] : blue[200]
        };
      }
    }
    `
);

export default function AmortizationSchedule() {
    const AmortData = localStorage.getItem('budget')
    console.log(AmortData,'amort')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const dataFy = [
    {
      fy: "feb 21",
      nganniversary: "1000",
    },
    {
      fy: "feb 11",
      nganniversary: "1000",
    },
    {
      fy: "feb 1",
      nganniversary: "1000",
    },
    {
      fy: "jan 1",
      nganniversary: "1000",
    },
    {
      fy: "Jan 21",
      nganniversary: "1000",
    },
    {
      fy: "Jan 11",
      nganniversary: "1000",
    },
    {
      fy: "Dec 11",
      nganniversary: "1000",
    },
    {
      fy: "Dec 31",
      nganniversary: "1000",
    },
    {
      fy: "Dec 21",
      nganniversary: "1000",
    },
  ];

  return (
    <>
    {AmortData}
      <Root>
        <table aria-label="custom pagination table">
          <thead>
            <th>Client Name </th>
            {dataFy.map((data) => (
              <th>{data?.fy}</th>
            ))}
          </thead>
          {/* <tbody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td style={{ width: 120 }} align="right">
                {row.calories}
              </td>
              <td style={{ width: 120 }} align="right">
                {row.fat}
              </td>
              <td style={{ width: 120 }} align="right">
                {row.fy}
                <tr>{row.fat}</tr>

              </td>
            </tr>
          ))}

          {emptyRows > 0 && (
            <tr style={{ height: 34 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody> */}
        <tbody>
            <tr>
                <td>Always</td>
            </tr>
            <tr>
                <td>Client</td>
            </tr>
        </tbody>
          <tbody>
            <tr>
                <td>Clients</td>
            </tr>
            <tr>
                <td>Annuity</td>
              {dataFy.map((data) => (
                <td>
                  {data.nganniversary}
                  <tr> {data.nganniversary}</tr>
                </td>
              ))}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </Root>
    </>
  );
}
