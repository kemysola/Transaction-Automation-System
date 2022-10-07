import React, { useState, useContext, useMemo} from 'react'
import { useEffect } from 'react';
import Service from '../../Services/Service';
import SearchDate from './SearchDate';
import SubCards from './SubCards';
import TitleContext from '../../context/TitleContext';
import Services from '../../Services/Service';
import Alert from 'react-bootstrap/Alert';

// using custom hook: this gets the active FY before the component renders
function useLocalStorage(key) {
  const [state, setState] = useState(localStorage.getItem(key));

  useEffect(() => {
    retrieveFY();
  }, []);

  const retrieveFY = (item) => {
    Services.getFY("''")
    .then((response) => {
        response.data.financial_years.map(fy => {
          if(fy.fy_status == 'Active') {
            item = fy.fy
            localStorage.setItem(key, JSON.stringify(item))
            setState(item)
          }
        })
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return [state, retrieveFY];
}


const SearchFY = (props) => {
    const { filteredStore, addFtYear} = useContext(TitleContext) 
      // set dropdown value and have initial of none
      const [item, setItem] = useLocalStorage("fy")
      const [value, setValue] = useState(localStorage.getItem("fy"));
      // const [value, setValue] = (localStorage.getItem("fy"))
      const [fy, setFY] = useState([]);
      const [show, setShow] = useState(true);
  
      useEffect(() => {
          addFtYear(value)
      }, [value]);
      
      useEffect(() => {
        setValue(item)
        retrieveFY();
      }, [item]);

 

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

      if(value != item && show){
          return  <Alert variant="danger" onClose={() => setShow(false)} dismissible>You are accessing FY {value} </Alert>
      }

    

  return (
    <div>
        <label style ={{ marginRight: "1em", fontWeight: "bold", color: '#198754' }}> Current Financial Year </label>
        <select style ={{ fontWeight: "bold", color: '#1184C2' }} value={value} onChange={handleChange}>
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
