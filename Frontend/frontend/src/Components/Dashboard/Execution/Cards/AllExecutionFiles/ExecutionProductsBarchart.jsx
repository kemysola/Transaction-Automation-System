import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
function ExecutionProductsBarchart({ data, prdFilter }) {
  var sumTotal = data.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);
  let productOption1 = data.reduce(function (filtered, arr) {
    if (arr.product === "Public Bond") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);
  let productOption2 = data.reduce(function (filtered, arr) {
    if (arr.product === "Blended Finance") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption3 = data.reduce(function (filtered, arr) {
    if (arr.product === "Contigent Refi. Gte") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption4 = data.reduce(function (filtered, arr) {
    if (arr.product === "Private Bond (Clean Energy)") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption5 = data.reduce(function (filtered, arr) {
    if (arr.product === "Private Bond (Other)") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption6 = data.reduce(function (filtered, arr) {
    if (arr.product === "Annuity PPP") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption1Total = productOption1.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption2Total = productOption2.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption3Total = productOption3.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption4Total = productOption4.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption5Total = productOption5.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption6Total = productOption6.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);
  const productChartData = [
    {
      name: `Public Bond: ₦${productOption1Total.toFixed(1)}bn`,
      countName: `Public Bond: ${productOption1.length}`,
      value: productOption1Total,
      count: productOption1.length,
      percent: !isFinite(productOption1Total / sumTotal)
        ? `0%`
        : `${((productOption1Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption1.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Blended Finance: ₦${productOption2Total.toFixed(1)}bn`,
      countName: `Blended Finance: ${productOption2.length}`,
      value: productOption2Total,
      count: productOption2.length,
      percent: !isFinite(productOption2Total / sumTotal)
        ? `0%`
        : `${((productOption2Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption2.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Contigent Refi. Gte.: ₦${productOption3Total.toFixed(1)}bn`,
      countName: `Contigent Refi. Gte.: ${productOption3.length}`,
      value: productOption3Total,
      count: productOption3.length,
      percent: !isFinite(productOption3Total / sumTotal)
        ? `0%`
        : `${((productOption3Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption3.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Private Bond (Clean Energy): ₦${productOption4Total.toFixed(1)}bn`,
      countName: `Private Bond (Clean Energy): ${productOption4.length}`,
      value: productOption4Total,
      count: productOption4.length,
      percent: !isFinite(productOption4Total / sumTotal)
        ? `0%`
        : `${((productOption4Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption4.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Private Bond (Other): ₦${productOption5Total.toFixed(1)}bn`,
      countName: `Private Bond (Other): ${productOption5.length}`,
      value: productOption5Total,
      count: productOption5.length,
      percent: !isFinite(productOption5Total / sumTotal)
        ? `0%`
        : `${((productOption5Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption5.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Annuity PPP: ₦${productOption6Total.toFixed(1)}bn`,
      countName: `Annuity PPP: ${productOption6.length}`,
      value: productOption6Total,
      count: productOption6.length,
      percent: !isFinite(productOption6Total / sumTotal)
        ? `0%`
        : `${((productOption6Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption6.length / data.length) * 100).toFixed(
        1
      )}%`,
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
              }}>Products</p>
      {prdFilter === "Value" ? (
        <BarChart
          width={260}
          height={250}
          data={productChartData}
          barSize={15}
          margin={{
            top: 25,
            right: 5,
            left: 5,
            bottom: 22,
          }}
          style={{
            paddingTop: 20,
          }}
          layout="vertical"
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            yAxisId={0}
            dataKey="name"
            tickLine={false}
            axisLine={false}
            style={{
              fontSize: "0.52rem",
              fontFamily: "Arial",
            }}
          />
          <YAxis
            orientation="right"
            yAxisId={1}
            dataKey="percent"
            type="category"
            axisLine={false}
            tickLine={false}
            style={{
              fontSize: "0.52rem",
              fontFamily: "Arial",
              padding: "15px",
            }}
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
          width={260}
          height={250}
          data={productChartData}
          barSize={15}
          margin={{
            top: 25,
            right: 5,
            left: 5,
            bottom: 22,
          }}
          style={{
            paddingTop: 20,
          }}
          layout="vertical"
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            yAxisId={0}
            dataKey="countName"
            tickLine={false}
            axisLine={false}
            style={{
              fontSize: "0.52rem",
              fontFamily: "Arial",
            }}
          />
          <YAxis
            orientation="right"
            yAxisId={1}
            dataKey="countPercent"
            type="category"
            axisLine={false}
            tickLine={false}
            style={{
              fontSize: "0.52rem",
              fontFamily: "Arial",
              padding: "15px",
            }}
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
  );
}

export default ExecutionProductsBarchart;
