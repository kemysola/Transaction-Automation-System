import React,{useState} from 'react';
import styled from 'styled-components';
import './MenuItem.css';

const MenuItemsStyles= styled.div`
`

const MenuStyles = styled.div`
list-style:none;


`;

export default function MenuItem(props){
    const {name,subMenus, iconClassName} = props;
    const[expand, setExpand] = useState(false)

    return(
        <React.Fragment>
            <MenuItemsStyles>
            <MenuStyles>
            <li>
                <a onClick={() => setExpand(!expand)}>
                    <span className={iconClassName}></span>
                    <span>{name}</span>
                    </a>
                   
                        {
                           subMenus && subMenus?.length > 0 ?(
                            <ul className={`sideMenuItems ${expand? 'active': ""}`} style={{listStyle:'none'}}>
                                {
                                    subMenus.map((menu, index) =>(
                                        <li key={index}>
                                            <small>{menu.name}</small>
                                        </li>
                                    ))
                                }
                            </ul>
                            ): null
                        }
            
            </li>
            </MenuStyles>
            </MenuItemsStyles>

        </React.Fragment>
    )
}