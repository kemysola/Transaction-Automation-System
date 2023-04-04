import React, { useState, useContext} from 'react'
import { useEffect } from 'react';
import Service from '../../Services/Service';
import TitleContext from '../../context/TitleContext';
import Services from '../../Services/Service';
import Alert from 'react-bootstrap/Alert';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
export default function SearchFY() {
  const { data, isLoading ,error} = useQuery(['user'], Services.getFY, {
    staleTime: Infinity,
  });
  let checkActiveFy = ["FY2022","FY2021"];
  const [valueFy,setValueFy] = useState('FY2021')
  const {filteredStore, addFtYear} = useContext(TitleContext) 
  return (
    <div>
    <label style ={{ marginRight: "1em", fontWeight: "bold", color: '#198754' }}> Current Financial Year </label>
    {isLoading?'....':null}
    {error? <div>An error occurred</div>:null}
  <select value={filteredStore} onChange={async (e) => await addFtYear(e.target.value)}> 
    {data?.data.financial_years?.map((fy) => (
      <option key={fy.id} value={fy.fy} >
        {fy.fy}
        </option>
    ))}
  </select>
</div>
  )
}
