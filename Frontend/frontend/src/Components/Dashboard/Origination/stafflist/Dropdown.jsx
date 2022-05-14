import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Table, Button, Row, Col, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters,    useSortBy
} from 'react-table'
import { useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import Service from '../../../../Services/Service'

const ContainerWrapper = styled.div`
    font-size:10px;
    margin: 1rem;
    padding: 2rem;
    border-radius: 15px;
    background:white;
    font-family:roboto;
    `;


const Dropdownmenu = () => {
  const history = useHistory();
  const [staff, setStaff] = useState([]);
  const [searchStaff, setSetSearch] = useState("")
  // const staffRef = useRef();
  // staffRef.current = staff;

  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  const [change, setChange] = useState(false)
  // const toggling = () => setIsOpen(!isOpen);

  // const onOptionClicked = value => () => {
  //   setSelectedOption(value);
  //   setIsOpen(false);
  //   console.log(selectedOption);
  // };
  const [selectedItem, setSelectedItem] = useState(localStorage.getItem('selectedItem'));
  const [onSelect, setOnSelect] = useState(false)

  useEffect(() => {
    if (onSelect === true) {
      localStorage.setItem('selectedItem', selectedItem)
    } else {
      localStorage.setItem('selectedItem', "All")
    }
  },[selectedItem]);

  useEffect(() => {
    retrieveStaff();
  }, []);

  const retrieveStaff = () => {
    Service.getAllStaff()
      .then((response) => {
        setStaff(response.data.staff);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  
return(
  <>
    <Dropdown className='py-1 mt-1'>
      <span>Filter: </span>
      <Dropdown.Toggle id="dropdown-basic" style={{backgroundColor: "#F8F9FA", outline:"none",  border:"none", boxShadow: "none", color:"black", borderBottom: "2px solid black"}}>
        {selectedItem || "All"}
      </Dropdown.Toggle>
      
      <Dropdown.Menu style={{ height: '200px', overflowY: 'scroll' }}>
        
         {/* <Dropdown.Item href="http://localhost:3000/org-dashboard" onClick={() => { setSelectedItem("All") }}> All </Dropdown.Item>  */}
            <Dropdown.Item href="https://trms01-server.azurewebsites.net/org-dashboard" onClick={() => { setSelectedItem("All") }}> All </Dropdown.Item>
          {staff.map((opt, i) => (
            <Dropdown.Item href={`https://trms01-server.azurewebsites.net/staff_transaction_report?${staff[i].email}`} key={staff[i].email} value={`${staff[i].firstname} {staff[i].lastname}`} onClick={() => { setSelectedItem(staff[i].firstname); setOnSelect(true) }}>{staff[i].firstname} {staff[i].lastname}</Dropdown.Item >
            
            // <Dropdown.Item href={`http://localhost:3000/staff_transaction_report?${staff[i].email}`} key={staff[i].email} value={`${staff[i].firstname} {staff[i].lastname}`} onClick={() => { setSelectedItem(staff[i].firstname); setOnSelect(true) }}>{staff[i].firstname} {staff[i].lastname}</Dropdown.Item >

             ))}
      </Dropdown.Menu>

    </Dropdown>
    
  </>
)
};
export default Dropdownmenu;
