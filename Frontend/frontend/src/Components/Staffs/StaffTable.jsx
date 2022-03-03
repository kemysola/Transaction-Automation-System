import React from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { useTable } from 'react-table'

const ContainerWrapper = styled.div`
    font-size:10px;
    margin-top: 2rem;
    background:white;
    padding:2rem;
    border-radius: 15px;`;

const StaffTable = () => {
  const [staff, setStaff] = useState([]);
  const [searchStaff, setSetSearch] = useState("")
  const staffRef = useRef();
  staffRef.current = staff;

  useEffect(() => {
    retrieveStaff();
  }, []);

  const retrieveStaff = () => {
    Service.getAllStaff()
      .then((response) => {
        setStaff(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openStaff = (rowIndex) => {
    const id = staffRef.current[rowIndex].id;
    props.history.push("/staff/" + id)

  };

  const updateStaff = (rowIndex) => {
    const id = staffRef.current[rowIndex].id;
    props.history.push("/update/" + id)
  }

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Product",
        accessor: "Product",
      },
      {
        Header: "Region",
        accessor: "Region",
      },
      {
        Header: "Management Fee",
        accessor: "Management Fee",
      },
      {
        Header: "Mandate Fee",
        accessor: "Mandate Fee",
      },
      {
        Header: "Actions",
        accessor: "dealSize",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openStaff(rowIdx)}>Open</span>
              <span onClick={() => deleteStaff(rowIdx)}>Delete</span>
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
    data: deals,
  });

  return (
    <React.Fragment>
      <ContainerWrapper>
        <a>All (5) |  </a>
        <a>Trash (0) | </a>
        <button> Download</button>

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

export default StaffTable;