import React, { useState, useContext, useMemo} from 'react'
import { useEffect } from 'react';
import Service from '../../Services/Service';
import SearchDate from './SearchDate';
import SubCards from './SubCards';
import TitleContext from '../../context/TitleContext';
import Services from '../../Services/Service';
import Alert from 'react-bootstrap/Alert';


const SearchFY = () => {
    const { filteredStore, addFtYear} = useContext(TitleContext) 
      // set dropdown value and have initial of none
      const [value, setValue] = useState("2022");
      const [fy, setFY] = useState([]);
      const [show, setShow] = useState(true);

      useEffect(() => {
          addFtYear(value)
      }, [value]);
      
      useEffect(() => {
        retrieveFY();
      }, []);


      const retrieveFY = () => {
        Services.getFY("''")
        .then((response) => {
            setFY(response.data.financial_years);
          })
          .catch((e) => {
            console.log(e);
          });
      };
      const handleChange = async(e) => {
        setValue(e.currentTarget.value)
        setShow(true)
      }

      if(value != 2022 && show){
          return  <Alert variant="danger" onClose={() => setShow(false)} dismissible>You are accessing FY {value} </Alert>
      }

  //     {isValid 
  //       ? <Alert variant="success">Hurray! You're a genius.</Alert>
  //       : <Alert variant="danger">Oops! Try again</Alert>
  // }

  return (
    <div>
        <label style ={{marginRight: '1em'}}>FY: </label>
        <select value={value} onChange={handleChange}>
            {fy.map((fy) => (
            <option key={fy.fy} value={fy.fy}>
                {fy.fy}
            </option>
            ))}
        </select>
    </div>
  )
}

export default SearchFY
