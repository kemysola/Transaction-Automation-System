import {useContext} from 'react'
import { Table, Row, Col, } from "react-bootstrap";
import { TiWeatherSunny } from "react-icons/ti";
import CartContext from "../../../context/cart/CartContext";
import {MdAddCircle} from 'react-icons/md'

export default function CashTable(props) {
  const { addToCart } = useContext(CartContext);
  return (
    <>
      <div>
        <p
          style={{ fontWeight: "", fontSize: "15px" }}
          className="text-success mb-3 pb-1"
        >
          <span>
            <TiWeatherSunny size={35} />
          </span>
          Fee Forecast
        </p>
        <p
          style={{ fontWeight: "", fontSize: "14.5px" }}
          className="text-secondary mb-3 pb-1"
        >
          Cash Basis
        </p>
        <p
          style={{ fontWeight: "", fontSize: "14.5px" }}
          className="text-secondary mb-3 pb-1"
        >
         Financial Year : 2022
        </p>
      </div>

      <small className="mb-3 text-success pb-3 mt-3 pt-3">
        Client Name: {props.clientName}
      </small>
      <Row style={{ marginRight: "0.55rem", marginTop: "2.5rem" ,paddingTop:'1.2rem'}}>
        <Col>
          <Table responsive striped hover variant="light">
            <thead>
              <tr>
                <th className="text-secondary">Structuring Fee</th>
                <th className="text-secondary">Monitoring Fee</th>
                <th className="text-secondary">Guarantee Fee</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.structuringFee}</td>
                <td>{props.monitoringFee}</td>
                <td>{props.guaranteeFee}</td>
                <td className='text-success'> <MdAddCircle onClick={() => addToCart({
                  structuringFee:props.structuringFee,
                  guaranteeFee:props.guaranteeFee,
                  monitoringFee:props.monitoringFee
                })}/></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
