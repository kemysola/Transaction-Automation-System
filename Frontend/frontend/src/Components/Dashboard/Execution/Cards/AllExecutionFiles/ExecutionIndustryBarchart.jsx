import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function ExecutionIndustryBarchart({data,indFilter}) {
    let option1 = data.reduce(function (filtered, arr) {
        if (arr.industry === "On-grid Power") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option2 = data.reduce(function (filtered, arr) {
        if (arr.industry === "Off-grid Power") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option3 = data.reduce(function (filtered, arr) {
        if (arr.deal_category === "Agric Infra.") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option4 = data.reduce(function (filtered, arr) {
        if (arr.industry === "Gas") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option5 = data.reduce(function (filtered, arr) {
        if (arr.industry === "Transportation") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option6 = data.reduce(function (filtered, arr) {
        if (arr.industry === "Inputs to Infra.") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option7 = data.reduce(function (filtered, arr) {
        if (arr.industry === "Affordable Housing") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option8 = data.reduce(function (filtered, arr) {
        if (arr.industry === "Education Infra.") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option9 = data.reduce(function (filtered, arr) {
        if (arr.industry === "Healthcare") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option10 = data.reduce(function (filtered, arr) {
        if (arr.industry === "Water/Waste") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option11 = data.reduce(function (filtered, arr) {
        if (arr.industry === "ICT/Telecoms") {
          let someNewValue = arr.dealsize;
    
          filtered.push(someNewValue);
        }
    
        return filtered;
      }, []);
    
      let option1Total = option1.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      let option2Total = option2.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      let option3Total = option3.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      let option4Total = option4.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      let option5Total = option5.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      let option6Total = option6.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      let option7Total = option7.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      let option8Total = option8.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      let option9Total = option9.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      let option10Total = option10.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      let option11Total = option11.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      // actual deal size
      var sumTotal = data.reduce(function (tot, arr) {
        return tot + parseFloat(arr.dealsize);
      }, 0);
      const chartData = [
        {
          name: `On-grid Power: ₦${option1Total.toFixed(1)}bn`,
          countName: `On-grid Power: ${option1.length}`,
          value: option1Total,
          count: option1.length,
          percent: !isFinite(option1Total / sumTotal)
            ? `0%`
            : `${((option1Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option1.length / data.length) * 100).toFixed(1)}%`,
        },
        {
          name: `Off-grid Power: ₦${option2Total.toFixed(1)}bn`,
          countName: `Off-grid Power: ${option2.length}`,
          value: option2Total,
          count: option2.length,
          percent: !isFinite(option2Total / sumTotal)
            ? `0%`
            : `${((option2Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option2.length / data.length) * 100).toFixed(1)}%`,
        },
        {
          name: `Agric infra: ₦${option3Total.toFixed(1)}bn`,
          countName: `Agric infra: ${option3.length}`,
          value: option3Total,
          count: option3.length,
          percent: !isFinite(option3Total / sumTotal)
            ? `0%`
            : `${((option3Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option3.length / data.length) * 100).toFixed(1)}%`,
        },
        {
          name: `Gas: ₦${option4Total.toFixed(1)}bn`,
          countName: `Gas: ${option4.length}`,
          value: option4Total,
          count: option4.length,
          percent: !isFinite(option4Total / sumTotal)
            ? `0%`
            : `${((option4Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option4.length / data.length) * 100).toFixed(1)}%`,
        },
        {
          name: `Transport: ₦${option5Total.toFixed(1)}bn`,
          countName: `Transport: ${option5.length}`,
          value: option5Total,
          count: option5.length,
          percent: !isFinite(option5Total / sumTotal)
            ? `0%`
            : `${((option5Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option5.length / data.length) * 100).toFixed(1)}%`,
        },
        {
          name: `Inputs to Infra: ₦${option6Total.toFixed(1)}bn`,
          countName: `Inputs to Infra: ${option6.length}`,
          value: option6Total,
          count: option6.length,
          percent: !isFinite(option6Total / sumTotal)
            ? `0%`
            : `${((option6Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option6.length / data.length) * 100).toFixed(1)}%`,
        },
        {
          name: `Affordable Housing: ₦${option7Total.toFixed(1)}bn`,
          countName: `Affordable Housing: ${option7.length}`,
          value: option7Total,
          count: option7.length,
          percent: !isFinite(option7Total / sumTotal)
            ? `0%`
            : `${((option7Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option7.length / data.length) * 100).toFixed(1)}%`,
        },
        {
          name: `Education Infra: ₦${option8Total.toFixed(1)}bn`,
          countName: `Education Infra: ${option8.length}`,
          value: option8Total,
          count: option8.length,
          percent: !isFinite(option8Total / sumTotal)
            ? `0%`
            : `${((option8Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option8.length / data.length) * 100).toFixed(1)}%`,
        },
        {
          name: `Healthcare: ₦${option9Total.toFixed(1)}bn`,
          countName: `Healthcare: ${option9.length}`,
          value: option9Total,
          count: option9.length,
          percent: !isFinite(option9Total / sumTotal)
            ? `0%`
            : `${((option9Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option9.length / data.length) * 100).toFixed(1)}%`,
        },
        {
          name: `Water/Waste: ₦${option10Total.toFixed(1)} bn`,
          countName: `Water/Waste: ${option10.length}`,
          value: option10Total,
          count: option10.length,
          percent: !isFinite(option10Total / sumTotal)
            ? `0%`
            : `${((option10Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option10.length / data.length) * 100).toFixed(1)}%`,
        },
        {
          name: `ICT/Telecoms: ₦${option11Total.toFixed(1)}bn`,
          countName: `ICT/Telecoms: ${option11.length}`,
          value: option11Total,
          count: option11.length,
          percent: !isFinite(option11Total / sumTotal)
            ? `0%`
            : `${((option11Total / sumTotal) * 100).toFixed(1)}%`,
          countPercent: `${((option11.length / data.length) * 100).toFixed(1)}%`,
        },
      ];
    return (
        <div  className="my-1" style={{ borderRadius: "10px" }}>
            <p className="pb-2"
              style={{
                color: "black",
                fontWeight: "bold",
                paddingLeft: "1px",
                paddingTop: "5px",
              }}
            >Industry</p>
            {indFilter === "Value" ? (
                    <BarChart
                      width={250}
                      height={340}
                      data={chartData}
                      barSize={15}
                      margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 2,
                      }}
                      layout="vertical"
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        yAxisId={0}
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: "0.5rem", fontFamily: "Arial" }}
                      />
                      <YAxis
                        orientation="right"
                        yAxisId={1}
                        dataKey="percent"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: "0.5rem", fontFamily: "Arial" }}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#82ca9d"
                        minPointSize={1}
                        background={{ fill: "#eee" }}
                      />
                    </BarChart>
                  ) : (
                    <BarChart
                      width={250}
                      height={340}
                      data={chartData}
                      barSize={15}
                      margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 2,
                      }}
                      layout="vertical"
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="countName"
                        yAxisId={0}
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: "0.5rem", fontFamily: "Arial" }}
                      />
                      <YAxis
                        orientation="right"
                        yAxisId={1}
                        dataKey="countPercent"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: "0.5rem", fontFamily: "Arial" }}
                      />
                      <Bar
                        dataKey="count"
                        fill="#82ca9d"
                        minPointSize={1}
                        background={{ fill: "#eee" }}
                      />
                    </BarChart>
                  )}

        </div>
        
    )
}

export default ExecutionIndustryBarchart
