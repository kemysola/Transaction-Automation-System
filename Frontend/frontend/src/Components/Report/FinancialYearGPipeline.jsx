import React from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

export default function FinancialYearGPipeline() {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    // { name: "Group C", value: 300 },
    // { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <React.Fragment>
      <Container className="my-3 pt-2">
        <Stack gap={1}>
          <p style={{ fontWeight: "bold" }}>FY2021-2022 Guarantee Pipeline*</p>
        </Stack>
        <div>
          The Origination & Structuring team is actively engaged in assessing
          new credit enhancement opportunities and diversifying the guarantee
          portfolio, which are at various stages of evaluation. As at 31
          December 2021, InfraCredit’s pipeline of potential guarantee
          transactions totaled N311.5 Billion from 35 transactions, composed of
          N255.0 Billion of standard guarantees and N56.5 Billion of contingent
          refinancing guarantees. Of the 35 transactions, 34 are first-time
          clients with executed Mandate Letters and one (1) transaction involves
          follow-on debt instruments for LFZC.
        </div>
        <Row>
          <Col sm="6" className="my-3">
            The N311.5 Billion pipeline, consisting of 35 potential transactions
            for the next two (2) years, can be split into eleven (11) industry
            sectors, with no individual sector comprising more than 36.3%, as
            shown in the adjacent pie chart. Of these transactions, eleven (11)
            totaling N103.4 Billion are projected to reach financial close in
            FY2022, including N14.1 Billion in Q1 2022. The remaining pipeline
            transactions (including contingent refinancings) are expected to
            roll over into 2023
          </Col>
          <Col sm="6" className="my-3">
            <Stack gap={1}>
              <p
                className="text-success"
                style={{ fontWeight: "bold", textAlign: "center" }}
              >
                Pipeline By Sector
              </p>
            </Stack>

            <ResponsiveContainer width="100%" height="75%">
              <PieChart width={400} height={200}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
        <div>
          In addition, the pipeline can be broken down by products and
          geographical distribution. We have categorised the pipeline into six
          (6) credit enhancement products, with the guaranteed public bond
          accounting for the largest share (63.0%) of potential guarantee
          transactions, as shown in the chart below. The guarantee pipeline
          appears to be weighted to the South West region, given that the
          commercial, financial and maritime nerve-centre of Nigeria is situated
          in the region (Lagos State), which accounts for over 60% of industrial
          and commercial activities in the nation.
        </div>
        <Row>
          <Col sm="6" className="my-1 pt-2">
            <Stack
              gap={1}
              className="text-primary"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Pipeline Distribution By Region
            </Stack>
            <br />
            {/*pie */}
            <ResponsiveContainer width="100%" height="75%">
              <PieChart width={400} height={200}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col sm="6" className="my-1 pt-2">
            <Stack
              gap={1}
              className="text-success"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Pipeline Distribution By Product
            </Stack>
            <br />
            {/*pie */}
            <ResponsiveContainer width="100%" height="80%">
              <PieChart width={400} height={200}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
        <div className='mt-2'>
          <small>
            * NB: All pipeline figures and charts exclude our existing guarantee
            portfolio of Viathan, North South Power, GEL Utility, TSL, LFZC and
            GPC. We have also excluded three mandated transactions which no
            longer qualify for the pipeline due to prolonged inactivity.
          </small>
        </div>
      </Container>
    </React.Fragment>
  );
}
