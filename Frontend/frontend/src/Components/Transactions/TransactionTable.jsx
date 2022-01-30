import React from 'react';
import {Table} from 'react-bootstrap';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
font-size:10px;
margin-top: 0.55rem;
background:white;
padding:1rem;
border-radius: 20px;
`;
const IconStyle= styled.i`
position:fixed;
padding-left:2.33rem;
margin-top:0.40em;
padding-top:'30px';
margin-left:4rem;
`;
const DivStyle= styled.div`
display:grid;
grid-template-columns: 0.4fr 1fr 1fr ;
justify-content:between;
padding:2px;
`;


export default function TableView(){
    return(
        <React.Fragment>
            <ContainerWrapper>
                <DivStyle>
    {/*---------------------------------------- Div --------------------------------------------- */}
                    <div>
                        <small style={{fontSize:'9px', paddingRight:'0.66rem', fontWeight:'bold'}}>ALL | </small>
                        <small style={{fontSize:'9px', paddingRight:'0.66rem', fontWeight:'bold'}}>Trash (0) | </small>
                    </div>
    {/*--------------------------------------- End Div -------------------------------------------- */}
    {/*----------------------------------- Apply and Download --------------------------------------*/}
                    <div>
                    <form>
                            <input type='dropdown'style={{marginRight:'5px'}}/>
                            <input type='submit' default='Apply' value='Apply'  style={{borderRadius:'8px', paddingTop:'2px',marginRight:'3px', background:'green', color:'white',border:'none'}}/>
                            <span>
                                <input type='submit' value='Download'  style={{borderRadius:'8px', paddingTop:'2px', color:'white', background:'darkblue', border:'none'}}/>
                                </span>

                        </form>
                        
                    
                    </div>

    {/*---------------------------------- End Div --------------------------------------------- */}
    {/*---------------------------------- Search Div ------------------------------------------ */}
                    <div style={{ textAlign:'right'}}>
                    <form action='' method='post'>
                    <IconStyle>
                        <span class='bi-search'>
                            </span>
                    </IconStyle>
                    <input type='text' placeholder='Search' style={{borderRadius:'10px', paddingTop:'2px', border:'1px solid grey',outline:'none',padding:'3px 5px'}}/>

                </form>
                        
                    </div>
    {/*--------------------------------- End Div ------------------------------------------------- */}

                </DivStyle>
                
        {/*-------------------------------  Table --------------------------------------------- */}      
            <Table>
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