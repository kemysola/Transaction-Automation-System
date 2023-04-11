import React, { useState } from 'react';
import { Table, Button, Row } from 'antd';
import dealData from './data.json';



const BudgetView = (props) => {
    
const columns = [
  {
    title: '',
    dataIndex: 'company',
    key: 'company',
    render: (text, record) => <div>{record.client.map((v, k) => <div style={{}}>{v.company}</div>)}</div>
  },
  { title: 'January', dataIndex: 'jan', key: 'jan',  render: (text, record) => <div>{record.client.map((v, k) => <div>{v.jan}</div>)}</div>},
  { title: 'Feburary', dataIndex: 'feb', key: 'feb',  render: (text, record) => <div>{record.client.map((v, k) => <div>{v.feb}</div>)}</div> },
  { title: 'March', dataIndex: 'mar', key: 'mar',  render: (text, record) => <div>{record.client.map((v, k) => <div>{v.mar}</div>)}</div> },
  { title: 'April', dataIndex: 'apr', key: 'apr',  render: (text, record) => <div>{record.client.map((v, k) => <div style={{}}>{v.apr}</div>)}</div> },
  { title: 'May', dataIndex: 'may', key: 'may',  render: (text, record) => <div>{record.client.map((v, k) => <div>{v.may}</div>)}</div> },
  { title: 'June', dataIndex: 'jun', key: 'jun',  render: (text, record) => <div>{record.client.map((v, k) => <div>{v.jun}</div>)}</div> },
  { title: 'July', dataIndex: 'jul', key: 'jul',  render: (text, record) => <div>{record.client.map((v, k) => <div>{v.jul}</div>)}</div> },
  { title: 'August', dataIndex: 'aug', key: 'aug',  render: (text, record) => <div>{record.client.map((v, k) => <div>{v.aug}</div>)}</div> },
  { title: 'September', dataIndex: 'sept', key: 'sept',  render: (text, record) => <div>{record.client.map((v, k) => <div>{v.sept}</div>)}</div> },
  { title: 'October', dataIndex: 'oct', key: 'oct',  render: (text, record) => <div>{record.client.map((v, k) => <div style={{}}>{v.oct}</div>)}</div> },
  { title: 'November', dataIndex: 'nov', key: 'nov' ,  render: (text, record) => <div>{record.client.map((v, k) => <div>{v.nov}</div>)}</div>},
  { title: 'December', dataIndex: 'dec', key: 'dec' ,  render: (text, record) => <div>{record.client.map((v, k) => <div>{v.dec}</div>)}</div>},
];
// // const flattenedArray = props.budgetData.flat();
// // console.log("I am flattened Array", flattenedArray)
// let budgetData = [dealData.deals[0]]

const flattenedArray = props.budgetData.flat();
console.log("I am flattened Array", flattenedArray)
let budgetData = [flattenedArray]

const calenderValueArr = []

const yearRange = budgetData.reduce(
  (acc, obj) => {
    
   const year = obj.flat().map(item => new Date(item.ddate).getFullYear())

   const yearMonth = obj.flat().map(item => ({
    year: new Date(item.ddate).getFullYear(),
    month: new Date(item.ddate).getMonth(),
    guaranteefees: item.nguaranteefees,
    clientName: item.sdealname
  }));

  calenderValueArr.push(yearMonth)

    return {
      minYear: Math.min(acc.minYear, ...year),
      maxYear: Math.max(acc.maxYear, ...year),
    };
  },
  { minYear: Infinity, maxYear: -Infinity }
);
 
const buttons = []
for (let year = yearRange.minYear; year <= yearRange.maxYear; year++) {
  buttons.push(year)
}


const dataInfo = calenderValueArr[0].map((value, k) => (
    // console.log("I am guranytee value", value.guaranteefees)
  {
    key: k,
    finance: 'Gurantee Fee',
    company: value.clientName,
    year: value.year,
    jan: value.month === 0 ? value.guaranteefees : null,
    feb: value.month === 1 ? value.guaranteefees : null,
    mar: value.month === 2 ? value.guaranteefees : null,
    apr: value.month === 3 ? value.guaranteefees : null,
    may: value.month === 4 ? value.guaranteefees : null,
    jun: value.month === 5 ? value.guaranteefees : null,
    jul: value.month === 6 ? value.guaranteefees : null,
    aug: value.month === 7 ? value.guaranteefees : null,
    sept:value.month === 8 ? value.guaranteefees : null,
    oct: value.month === 9 ? value.guaranteefees : null,
    nov: value.month === 10 ? value.guaranteefees : null,
    dec: value.month === 11 ? value.guaranteefees : null
  }
))

console.log("I am data info", dataInfo)

const checkDuplicateData = dataInfo


const gata = dataInfo

// const mergedData = checkDuplicateData.reduce((acc, item) => {
//   const { finance, company, year } = item;
//   const existingItem = acc.find(
//     (x) => x.finance === finance  && x.year === year
//   );
//   if (existingItem) {
//     Object.keys(item).forEach((key) => {
//       if (key !== 'key' && key !== 'finance' && key !== 'company' && key !== 'year') {
//         existingItem[key] = existingItem[key] === null ? item[key] : existingItem[key];
//       }
//     });
//   } else {
//     acc.push(item);
//   }
//   return acc;
// }, []);


// const groupedData = gata.reduce((acc, item) => {
//   const existingItem = acc.find(
//     (x) => x.company === item.company && x.year === item.year
//   );

//   if (existingItem) {
//     Object.keys(item).forEach((key) => {
//       if (key !== 'key' && key !== 'finance' && key !== 'company' && key !== 'year') {
//         existingItem[key] = existingItem[key] === '-' ? item[key] : existingItem[key];
//       }
//     });
//   } else {
//     acc.push(item);
//   }

//   return acc;
// }, []);




// console.log("I am grouped", mergedData);

const gdata = dataInfo


// console.log("I am grouped", data);

const newData = gdata.reduce((acc, item) => {
  const { finance, year, company } = item;
  const existingItem = acc.find((i) => i.finance === finance && i.year === year);

  if (existingItem) {
    const existingClient = existingItem.client.find((c) => c.company === company);
   
    if (existingClient) {
      Object.keys(item).forEach((key) => {
        console.log("key", key)
        console.log("item", item)
        console.log("Check item KEYS", item[key])
        console.log("Check existing client ITEMS", existingClient[key])
        if (key !== 'key' && key !== 'finance' && key !== 'company' && key !== 'year') {
          existingClient[key] = existingClient[key] == 0 ? item[key] : existingClient[key];
        }
      });
    } else {
      existingItem.client.push({
        company,
        ...item,
      });
    }
    console.log("I am here", existingClient)
  } else {
    acc.push({
      finance,
      year,
      client: [
        {
          company,
          ...item,
        },
      ],
    });
  }

  return acc;
}, []);


console.log("I am gdata", newData) 

const data = newData



// const dataMerged = newData.map((value, k) => (
//   {
//     key: k,
//     finance: value.finance,
//     company: value.client.map((v, i) => v.january) ,
//     // year: value.year,
//     // jan: value.month === 0 ? value.guaranteefees : null,
//     // feb: value.month === 1 ? value.guaranteefees : null,
//     // mar: value.month === 2 ? value.guaranteefees : null,
//     // apr: value.month === 3 ? value.guaranteefees : null,
//     // may: value.month === 4 ? value.guaranteefees : null,
//     // jun: value.month === 5 ? value.guaranteefees : null,
//     // jul: value.month === 6 ? value.guaranteefees : null,
//     // aug: value.month === 7 ? value.guaranteefees : null,
//     // sept:value.month === 8 ? value.guaranteefees : null,
//     // oct: value.month === 9 ? value.guaranteefees : null,
//     // nov: value.month === 10 ? value.guaranteefees : null,
//     // dec: value.month === 11 ? value.guaranteefees : null
//   }
// ))

// console.log("data meged %%%", dataMerged)

// const data = mergedData



// console.log("I am data", mergedData)



// const BudgetView = ({budgetData}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (current, size) => {
    setPageSize(size);
  };

  const handleYearChange = (year) => {
    setCurrentYear(year);
    setCurrentPage(1);
  };

  const yearPagination = {
    onChange: (page, pageSize) => handleChangePage(page, pageSize),
    onShowSizeChange: (current, size) => handleChangePageSize(current, size),
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    total: data.length,
    current: currentPage,
  };

  const yearData = data.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {});

  const currentYearData = yearData[currentYear];
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = currentYearData.slice(startIndex, endIndex);


  // reduce((acc, val) => acc + val, 0)

  const yearColumns = [
    {
      title: '',
      dataIndex: 'finance',
      key: 'finance',
    },
    // render: (text, record) => {
    //   const janSum = record.client.reduce((acc, v) => acc + Number(v.jan), 0);
    //   return <div>{janSum}</div>;
    // }
    // if (v.jan === null) {
    //   return acc;
    // } else {
    //   return acc + (+v.jan || 0);
    // }
    
    { title: 'January', dataIndex: 'jan', key: 'jan', render: (text, record) => {const janSum = record.client.reduce((acc, v) => v.jan === null ? acc : acc + (+v.jan || 0), 0); return <div>{janSum || null}</div>;}},
    { title: 'Feburary', dataIndex: 'feb', key: 'feb',  render: (text, record) => {const janSum = record.client.reduce((acc, v) => v.feb === null ? acc : acc + (+v.feb || 0), 0); return <div>{janSum || null}</div>;}},
    { title: 'March', dataIndex: 'mar', key: 'mar',  render: (text, record) => {const janSum = record.client.reduce((acc, v) => v.mar === null ? acc : acc + (+v.mar || 0), 0);return <div>{janSum || null}</div>;}},
    { title: 'April', dataIndex: 'apr', key: 'apr', render: (text, record) => {const janSum = record.client.reduce((acc, v) => v.apr === null ? acc : acc + (+v.apr || 0), 0); return <div>{janSum || null}</div>;}},
    { title: 'May', dataIndex: 'may', key: 'may', render: (text, record) => {const janSum = record.client.reduce((acc, v) => v.may === null ? acc : acc + (+v.may || 0), 0); return <div>{janSum || null}</div>;}},
    { title: 'June', dataIndex: 'jun', key: 'jun', render: (text, record) => {const janSum = record.client.reduce((acc, v) => v.jun === null ? acc : acc + (+v.jun || 0), 0); return <div>{janSum || null}</div>;} },
    { title: 'July', dataIndex: 'jul', key: 'jul', render: (text, record) => {const janSum = record.client.reduce((acc, v) =>v.jul === null ? acc : acc + (+v.jul || 0), 0); return <div>{janSum || null}</div>;} },
    { title: 'August', dataIndex: 'aug', key: 'aug', render: (text, record) => {const janSum = record.client.reduce((acc, v) => v.aug === null ? acc : acc + (+v.aug || 0), 0); return <div>{janSum || null}</div>;}},
    { title: 'September', dataIndex: 'sept', key: 'sept',render: (text, record) => {const janSum = record.client.reduce((acc, v) => v.sept === null ? acc : acc + (+v.sept || 0), 0); return <div>{janSum || null}</div>;}},
    { title: 'October', dataIndex: 'oct', key: 'oct', render: (text, record) => {const octSum = record.client.reduce((acc, v) => v.oct === null ? acc : acc + (+v.oct || 0), 0); return <div>{octSum === null ? null : octSum}</div>;} },
    { title: 'November', dataIndex: 'nov', key: 'nov',render: (text, record) => {const janSum = record.client.reduce((acc, v) => v.nov === null ? acc : acc + (+v.nov || 0), 0); return <div>{janSum || null}</div>;} },
    { title: 'December', dataIndex: 'dec', key: 'dec', render: (text, record) => {const janSum = record.client.reduce((acc, v) => v.dec === null ? acc : acc + (+v.dec || 0), 0); return <div>{janSum || null}</div>;}},
  ];

  // const nesteddata = [];
  // for (let i = 0; i < 3; ++i) {
  //   data.push({
  //     key: i.toString(),
  //     date: '2014-12-24 23:12:00',
  //     name: 'This is production name',
  //     upgradeNum: 'Upgraded: 56',
  //   });
  // }

  const expandedRowRender = (record) => {
    return (
      <Table
        columns={columns}
        dataSource={[record]}
        pagination={false}
        showHeader={false}
      />
    );
  };


  return (
    <>
      <Table
        columns={yearColumns}
        dataSource={paginatedData}
        expandedRowRender={expandedRowRender}
        pagination={false}
      />
      {/* <Table.Pagination {...yearPagination} /> */}
      <div style={{ textAlign: 'center' }}>
        {
            buttons.map((y, k)=>
                <Button onClick={() => handleYearChange(y)}>{y}</Button>
            )
        }
        {/* <Button onClick={() => handleYearChange(2021)}>2021</Button>
        <Button onClick={() => handleYearChange(2022)}>2022</Button>
         <Button onClick={() => handleYearChange(2023)}>2023</Button> */}
      </div>
    </>
   );
};
export default BudgetView;

