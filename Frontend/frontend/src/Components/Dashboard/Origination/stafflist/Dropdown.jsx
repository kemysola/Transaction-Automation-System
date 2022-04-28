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
      <Dropdown.Toggle variant="bg-light" id="dropdown-basic" className="btn">
        Staff
      </Dropdown.Toggle>
      
    <Dropdown.Menu style = {{ height: '200px', overflowY: 'scroll'}}>
          <Dropdown.Item href="http://localhost:3000/org-dashboard"> All </Dropdown.Item>
          {staff.map((opt, i) => (
            <Dropdown.Item href={`http://trms01-server.azurewebsites.net/staff_transaction_report?${staff[i].email}`} key={staff[i].email} value={`${staff[i].firstname} {staff[i].lastname}`}>{staff[i].firstname} {staff[i].lastname}</Dropdown.Item >
            // <Dropdown.Item href={`http://localhost:3000/staff_transaction_report?${staff[i].email}`} key={staff[i].email} value={`${staff[i].firstname} {staff[i].lastname}`}>{staff[i].firstname} {staff[i].lastname}</Dropdown.Item >

             ))}
      </Dropdown.Menu>

    </Dropdown>
    
  </>
)
};
export default Dropdownmenu;
