import Table from "react-bootstrap/Table";
import { Divider } from "antd";

export default function Statistics(props) {
  return (
    <>
      <Divider dashed>
        Key Statistics on O & S Activity - Inception till Date:
      </Divider>
      <div>
        <Table style={{ background: "#D3D3D3", color: "#808000" }}>
          <thead>
            <tr>
              <th>Activity</th>
              <th>2017-2019</th>
              <th>2020</th>
              <th>2021</th>
              <th>2021</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((data) => (
              <tr>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
