import React,{useState} from "react";
import Table from "react-bootstrap/Table";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import { useQuery } from '@tanstack/react-query';
import Service from '../../../../Services/Service'

export default function TopReimbursible() {
  const [start_date, set_start_date] = useState("2022-01-01");
  const [end_date, set_end_date] = useState(`2022-10-01`);
  const [topn, set_topn] = useState(5);
  const { data:reimbursibleDData, isLoading ,error,isError,isSuccess} = useQuery(['reimbursible'], () => Service.getReimbursibles(`${topn}/${start_date}/${end_date}`), {
    staleTime: 0,
    onSuccess: (payload) => {
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  function GetTops() {
    const newData = reimbursibleDData?.data?.ccsubmissionReport.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Top_Reimbursable_Report");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Top_Reimbursable_Report.xlsx");
  }
  return (
    <>
      <Container>
        <h6 className='mb-2'>TOP REIMBURSIBLE REPORT</h6>
         <Row>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle>
                </Card.Subtitle>
                <Card.Text>
                  <Row>
                    <Form>
                        <Form.Label>Start Date:</Form.Label>
                      <Form.Control
                        inline
                        label="Count"
                        type="date"
                        name="start_date"
                        value={start_date}
                        onChange={(e) => set_start_date(e.target.value)}
                      />
                        <Form.Label>End Date:</Form.Label>

                      <Form.Control
                        inline
                        label="Count"
                        type="date"
                        name="end_date"
                        value={end_date}
                        
                        onChange={(e) => set_end_date(e.target.value)}
                      />
                      <Form.Label>Top Number</Form.Label>
                      <Form.Control
                     
                        inline
                        label="Count"
                        type="number"
                        name="topn"
                        value={topn}
                        onChange={(e) => set_topn(e.target.value)}
                      />
                      <Button onClick={GetTops} className='bg-dark mt-1' style={{border:'none'}}>Download</Button>
                    </Form>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row> 
        <br/>
        {isError ? (
          <div className="text-danger">
            {
            error === "undefined"
              ? null
              : 'Invalid Number Inputted.Kindly enter a number'}
          </div>
        ) : 
        isSuccess ? (
          <div>
            <Table striped="columns" bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Originator</th>
                  <th>Transactor</th>
                  <th>Deal Size</th>
                  <th>Reimbursible</th>
                </tr>
              </thead>
              {reimbursibleDData?.data?.ccsubmissionReport.map((data) => (
                <tbody>
                  <tr>
                    <td>{data.clientname}</td>
                    <td>{data.originator}</td>
                    <td>{data.transactor}</td>
                    <td>{data.dealsize}</td>
                    <td>{data.reimbursible}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </div>
        ) : isLoading ? (
          <p>.....</p>
        ) : null} 
      </Container>
    </>
  );
}
