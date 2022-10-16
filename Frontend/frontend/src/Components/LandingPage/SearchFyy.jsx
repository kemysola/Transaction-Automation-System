import React, { useState, useContext} from 'react'
import { useEffect } from 'react';
import Service from '../../Services/Service';
import TitleContext from '../../context/TitleContext';
import Services from '../../Services/Service';
import Alert from 'react-bootstrap/Alert';

// using custom hook: this gets the active FY before the component renders
function useLocalStorage(key) {
  const [state, setState] = useState(localStorage.getItem(key));
  useEffect(() => {
    retrieveFY();
  }, [state]);
  
 
  const retrieveFY = async (item) => {
    await Services.getFY("''")
    .then((response) => {
        response?.data?.financial_years.filter((fy) => {
          fy?.fy?.status === 'Active'? setState(fy.fy):setState('FY2020');
          if(fy.fy_status === 'Active'){
            item = fy.fy
            localStorage.setItem(key, JSON.stringify(item))
          }
        })

      })
      .catch((e) => {
        console.log(e);
      });
  };
  return [state, retrieveFY];
}

const SearchFYY = (props) => {
    const { filteredStore, addFtYear} = useContext(TitleContext) 
    console.log(filteredStore)
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

 

      const retrieveFY = async() => {
        await Services.getFY("''")
        .then((response) => {
            setFY(response?.data?.financial_years);
          })
          .catch((e) => {
            console.log(e);
          });
      };
      const handleChange = async(e) => {
        setValue(e.currentTarget.value)
        setShow(true)
      }

      // if(value !== item && show){
      //     return  <Alert variant="danger" onClose={() => setShow(false)} dismissible>You are accessing FY {value} </Alert>
      // }
  return (
    <div>
        <label style ={{ marginRight: "1em", fontWeight: "bold", color: '#198754' }}> Current Financial Year </label>
        <select style ={{ fontWeight: "bold", color: '#1184C2' }} value={value} onChange={handleChange}>
          {/* <option >Select</option> */}
            {fy.map((fy) => (
            <option key={fy.id} value={fy.fy}>
                {fy.fy}
            </option>
            ))}
        </select>

    </div>
  )
}

export default SearchFYY

