import { Stack, Container} from "react-bootstrap";
export default function OriginationActivities(props) {
  const reportFy = localStorage.getItem("currentFy");
  const currentFy = JSON.parse(reportFy);
  const reportQt = localStorage.getItem("currentQuarter");
  const currentFQt = JSON.parse(reportQt);
  return (
    <>
    <Container>
    <Stack gap={2}>
        <p className="" style={{ fontWeight: "bold" }}>
          Origination Activity – {currentFQt[0]} {currentFy[0]}
        </p>
      </Stack>
      <div>
        <p style={{ fontWeight: "bold" }}>
          NBC Submissions and Mandate Status – {currentFQt[0]} {currentFy[0]}{" "}
          Update
        </p>
        <p>Progress on Due Diligence</p>
        {props?.data ? (
          props?.data.map((data) => <li>{data}</li>)
        ) : (
          <p>No data</p>
        )}
      </div>

    </Container>
      
    </>
  );
}
