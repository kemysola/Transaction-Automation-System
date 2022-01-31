import React from 'react';
import { Button, Table, Stack, Form} from 'react-bootstrap';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
font-size:10px;
margin-top: 2rem;
background:white;
padding: 1rem 2rem;
border-radius: 15px;
`;

const Search = () => {
  return (
    <div>
      <form className="form-control rounded-pill">
        <input 
          type='text' 
          placeholder='Search' 
          style={{border:'none', outline:"none"}}
        />
        <button
          type="submit" 
          style={{background:'white', border:'none', position:'relative', left:'0.11px'}}>
            <i class="bi-search"></i>
        </button>   
      </form>                
    </div>
  )
}

export default function TableView() {
  return (
    <React.Fragment>
      <ContainerWrapper>
        <Stack classname="d-flex justify-content-between" direction="horizontal" gap={3} responsive >
          <div>All (5) </div>
          <div className="vr" />
          <div>Trash (0) </div>
          <div className="vr" />
          <div>
            Bulk Actions
            <Button className='rounded-pill' size='sm' style={{backgroundColor: "green", border:'none'}}>Apply</Button>
          </div>
          <Button className='rounded-pill' size='sm'>Download</Button>
          <Search />
        </Stack>
        
        <Table striped responsive hover>
          <thead>
            <tr>
              <th><input type='checkbox'/></th>
              <th>S/N</th>
              <th>Products</th>
              <th>Region</th>
              <th>Management Fees</th>
              <th>Mandate Fees</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><input type='checkbox'/></td>
              <td>1</td>
              <td>Product Name</td>
              <td>Oyo</td>
              <td>120,000,000,000</td>
              <td>120,000,000,000</td>
              <td>17-01-2022</td>
            </tr>

            <tr>
              <td><input type='checkbox'/></td>
              <td>2</td>
              <td>Product Name</td>
              <td>Ogun</td>
              <td>120,000,000,000</td>
              <td>120,000,000,000</td>
              <td>17-01-2022</td>
            </tr>

            <tr>
              <td><input type='checkbox'/></td>
              <td>3</td>
              <td>Product Name</td>
              <td>Osun</td>
              <td>120,000,000,000</td>
              <td>120,000,000,000</td>
              <td>17-01-2022</td>
            </tr>

            <tr>
              <td><input type='checkbox'/></td>
              <td>4</td>
              <td>Product Name</td>
              <td>Kano</td>
              <td>120,000,000,000</td>
              <td>120,000,000,000</td>
              <td>17-01-2022</td>
            </tr>
          </tbody>
        </Table>
      </ContainerWrapper>
    </React.Fragment>
)}