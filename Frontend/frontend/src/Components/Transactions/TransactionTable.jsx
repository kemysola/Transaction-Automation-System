import React from 'react';
import {Table} from 'react-bootstrap';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
font-size:10px;
margin-top: 2rem;
background:white;
padding:2rem;
border-radius: 15px;
`;



export default function TableView(){
    return(
        <React.Fragment>
            <ContainerWrapper>
                <a>All (5) |  </a>
                <a>Trash (0) | </a>
                <button> Download</button>
                
            <Table>
                <thead>
                    <tr>
                        <th><input type='checkbox'/></th>
                        <th>S/N</th>
                        <th>Products</th>
                        <th>Region</th>
                        <th>Management Fees</th>
                        <th>Mandate Fess</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type='checkbox'/></td>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                         
                    </tr>
                    <tr>
                        <td><input type='checkbox'/></td>
                        <td>2</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        
                    </tr>
                    <tr>
                        <td><input type='checkbox'/></td>
                        <td>3</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        
                    </tr>
                    <tr>
                        <td><input type='checkbox'/></td>
                        <td>4</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        
                    </tr>
                </tbody>
        </Table>
        </ContainerWrapper>
        </React.Fragment>
    )
}