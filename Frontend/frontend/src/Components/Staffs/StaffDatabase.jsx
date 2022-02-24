import React from 'react';
import styled from 'styled-components';
import { Table, Row, Col } from 'react-bootstrap';
import Sidenav from '../LandingPage/Sidenav';
import Navbar from '../LandingPage/Navbar';

const ContainerDiv = styled.div`
font-size:10px;
margin-top: 1.2rem;
background:white;
padding:1rem;
border-radius: 15px;
`;
const DivStyle = styled.div`
display:grid;
grid-template-columns: 0.4fr 1fr 1fr ;
justify-content:between;
padding:2px;
`;
const IconStyle = styled.i`
position:fixed;
padding-left:2.33rem;
margin-top:0.40em;
padding-top:'30px';
margin-left:4rem;
`;

export default function StaffDatabase() {
    return (
        <React.Fragment>
            <p style={{ color: 'darkblue', fontWeight: 'bold', paddingLeft: '1rem' }}>Staff Database</p>

            <ContainerDiv>
                <DivStyle>
                    {/*---------------------------------------- Div --------------------------------------------- */}
                    <div>
                        <small style={{ fontSize: '9px', paddingRight: '0.66rem', fontWeight: 'bold' }}>ALL | </small>
                        <small style={{ fontSize: '9px', paddingRight: '0.66rem', fontWeight: 'bold' }}>Trash (0) | </small>
                    </div>
                    {/*--------------------------------------- End Div -------------------------------------------- */}
                    {/*----------------------------------- Apply and Download --------------------------------------*/}
                    <div>
                        <form>
                            <select style={{ marginRight: '5px' }}>
                                <option selected>Bulk Actions</option>
                                <option value="1">Bulk Action</option>
                                <option value="2">Bulk Action</option>
                            </select>
                            {/* <input type='dropdown' style={{marginRight:'5px'}}/> */}
                            <input type='submit' default='Apply' value='Apply'
                                style={{ borderRadius: '8px', paddingTop: '2px', marginRight: '3px', background: 'green', color: 'white', border: 'none' }}
                            />
                            <span>
                                <input type='submit' value='Download'
                                    style={{ borderRadius: '8px', paddingTop: '2px', color: 'white', background: 'darkblue', border: 'none' }}
                                />
                            </span>
                        </form>
                    </div>

                    {/*---------------------------------- End Div --------------------------------------------- */}
                    {/*---------------------------------- Search Div ------------------------------------------ */}
                    <div style={{ textAlign: 'right' }}>
                        <form action='' method='post'>
                            <IconStyle>
                                <span class='bi-search'></span>
                            </IconStyle>
                            <input type='text' placeholder='Search'
                                style={{ borderRadius: '10px', paddingTop: '2px', border: '1px solid grey', outline: 'none', padding: '3px 5px' }}
                            />
                        </form>
                    </div>
                    {/*--------------------------------- End Div ------------------------------------------------- */}

                </DivStyle>

                <Table striped responsive hover>
                    <thead>
                        <tr>
                            <th><input type='checkbox' /></th>
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
                            <td><input type='checkbox' /></td>
                            <td>1</td>
                            <td>Mark Otto</td>
                            <td>3</td>
                            <td>120,000,000,000</td>
                            <td>90%</td>
                            <td>17-01-2022</td>
                        </tr>

                        <tr>
                            <td><input type='checkbox' /></td>
                            <td>2</td>
                            <td>Mark Otto</td>
                            <td>2</td>
                            <td>120,000,000,000</td>
                            <td>50%</td>
                            <td>17-01-2022</td>
                        </tr>

                        <tr>
                            <td><input type='checkbox' /></td>
                            <td>3</td>
                            <td>Mark Otto</td>
                            <td>1</td>
                            <td>120,000,000,000</td>
                            <td>60%</td>
                            <td>17-01-2022</td>
                        </tr>

                        <tr>
                            <td><input type='checkbox' /></td>
                            <td>4</td>
                            <td>Mark Otto</td>
                            <td>5</td>
                            <td>120,000,000,000</td>
                            <td>70%</td>
                            <td>17-01-2022</td>
                        </tr>
                    </tbody>
                </Table>
            </ContainerDiv>
        </React.Fragment>
    )
}