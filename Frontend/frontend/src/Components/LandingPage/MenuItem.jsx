import React,{useState} from 'react';
import styled from 'styled-components';
import './MenuItem.css';

const MenuStyles = styled.div`
text-decoration:none;
list-style:none;

`;

export default function MenuItem(props){
    const {name,subMenus, iconClassName} = props;
    const[expand, setExpand] = useState(false)

    return(
        <React.Fragment>
            <MenuStyles>
            <li>
                <a onClick={() => setExpand(!expand)}>
                    <div className='iconDiv'>
                        <i className={iconClassName}></i>
                    </div>
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

        </React.Fragment>
    )
}