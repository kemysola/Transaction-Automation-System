
import Table from "react-bootstrap/Table";
import styled from 'styled-components'

const TableStyle = styled.div `

td{
  text-align: center;
  vertical-align: bottom;
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
};


overflow-x:auto

`
export default function Statistics(props) {
  return (
    <>
      <p style={{ fontWeight: "bold" }}>
        Key Statistics on O & S Activity - Inception till Date:
      </p>
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
                {/* <td style={{padding:'20px'}}>{props.data}</td> */}
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
