import React from 'react';
import styled from 'styled-components';
import {Table} from 'react-bootstrap';

const ContainerDiv = styled.div`
font-size:10px;
margin-top: 2rem;
background:white;
padding:2rem;
border-radius: 15px;
height:70vh;
`

export default function Databases(){
    return(
        <React.Fragment>
            <ContainerDiv>
            <a>All (5) |  </a>
                <a>Trash (0) | </a>
                <button> Download</button>
                
            <Table>
                <thead>
                    <tr>
                        <th><input type='checkbox'/></th>
                        <th>S/N</th>
                        <th>Staff</th>
                        <th>Level</th>
                        <th>Target</th>
                        <th>Performance</th>
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
                        <td>90%</td>
                        <td>2017-12-20</td>
                         
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
            </ContainerDiv>
        </React.Fragment>
    )
}