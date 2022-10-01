import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import Service from '../../Services/Service';
import SearchDate from './SearchDate';
import SubCards from './SubCards';
import TitleContext from '../../context/TitleContext';

const SearchFY = () => {
  const { filteredStore, addFtYear} = useContext(TitleContext)
    const [characters, setCharacters] = useState([
        {
          label: "Select ...",
          value: "Select ..."
        },
        {
          label: "2022",
          value: "2022"
        },
        { label: "2021", value: "2021" },
        { label: "2020", value: "2020" }
      ]);
    
      
      // set dropdown value and have initial of none
      const [value, setValue] = useState("2022");
      const [currentYear, SetCurrentYear] = useState(true);

      const initialState = "initial state";
      const [state, changeState] = useState(initialState);

      useEffect(() => {
          addFtYear(value)
      }, [value]);
      


      const handleChange = async(e) => {
        setValue(e.currentTarget.value) 
      }

  return (
    <div>
        
        <select value={value} onChange={handleChange}>
            {characters.map((character) => (
            <option key={character.value} value={character.value}>
                {character.label}
            </option>
            ))}
        </select>
    </div>
  )
}

export default SearchFY
