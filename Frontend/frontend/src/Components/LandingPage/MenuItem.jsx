import React,{useState} from 'react';
import styled from 'styled-components';
import './MenuItem.css';
/*import * as Icon from 'react-bootstrap-icons';*/


const MenuItemsStyles= styled.div`
`

const MenuStyles = styled.div`
list-style:none;

`;

export default function MenuItem(props){

    //         ----------------------- Detructure Props Elements -----------------------------
    const {name,subMenus} = props;
    const subM = subMenus;
    const subM1 = subM[0];
    const { icon } = subM1;
    // console.log(icon)
    const[expand, setExpand] = useState(false)

    return(
        <React.Fragment>
            <MenuItemsStyles>
            <MenuStyles>
            <li>
{/*-------------------------------- Use React state to collapse sidebar submenus ---------------- */}
                <a onClick={() => setExpand(!expand)}>
                    <i class={ icon } ></i>
                    <span> {name} </span>
                    </a>

 {/*--------------------------- Bind  Items, Collapse Sidebar Menu  and Loop through------------- */}
                        {
                           subMenus && subMenus?.length > 0 ?(
                            <ul className={`sideMenuItems ${expand? 'active': ""}`} style={{listStyle:'none'}}>
                                {
                                    subMenus.map((menu, index) =>(
                                        <li key={index}>
                                            <small className='menuHover'>{menu.name}</small>
                                        </li>
                                    ))
                                }
                            </ul>
                            ): null
                        }
{/*        ----------------- End Loop --------------------------------------------- */}
            
            </li>
            </MenuStyles>
            </MenuItemsStyles>

        </React.Fragment>
    )
}