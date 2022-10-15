import React, { useState, useContext} from 'react'
import { useEffect } from 'react';
import Service from '../../Services/Service';
import TitleContext from '../../context/TitleContext';
import Services from '../../Services/Service';
import Alert from 'react-bootstrap/Alert';
import { useGetAllAdminFyQuery } from '../../Services/apiSlice';
export default function SearchFY() {
  const {data, isError, error, success, isSuccess, isLoading} = useGetAllAdminFyQuery("''") ;
  let checkActiveFy = ["FY2022","FY2021"];
  const [valueFy,setValueFy] = useState('FY2021')
  useEffect(() => searchFYDeals(), [checkActiveFy])
  const searchFYDeals = () => {
    for (checkActiveFy in data){
      return data?.financial_years.filter(fy => fy.fy_status === 'Active')
    }
  }
  const {filteredStore, addFtYear} = useContext(TitleContext) 
  const [dropdownValue, setDropdownValue] = useState(localStorage.getItem("fy"))
  return (
    <div>
    <label style ={{ marginRight: "1em", fontWeight: "bold", color: '#198754' }}> Current Financial Year </label>
  <select value={filteredStore} onChange={async (e) => await addFtYear(e.target.value)}> 
    {data?.financial_years?.map((fy) => (
      <option key={fy.id} value={fy.fy} >
        {fy.fy}
        </option>
    ))}
  </select>
</div>
  )
}
