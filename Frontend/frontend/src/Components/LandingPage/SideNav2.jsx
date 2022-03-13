import React, { useState } from "react";
import {Link} from 'react-router-dom';
import authService from '../../Services/auth.Service';
//react pro sidebar components

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { ImUser, ImUsers } from "react-icons/im";
import { GoDashboard } from "react-icons/go";
import { HiOutlineCalculator } from "react-icons/hi";
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import "react-pro-sidebar/dist/css/styles.css";
import "./custom.scss";


const Sidenav = () => {
  //menuCollapse, menuToggle state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)
  const [menuToggle, setMenuToggle] = useState(false)

  //custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  // custom function that will change menuToggle state from false to true and true to false
  const sidebarToggle = () => {
    // condition checking to change state from true to false and vice versa
    menuToggle ? setMenuToggle(false) : setMenuToggle(true);
  }

  const user = JSON.parse(localStorage.getItem('user'))
  const username = user.name
        var name   = username.substring(0, username.lastIndexOf("@"));
        const nameCase = name.toUpperCase()

  return (
    <>
      <div id="header">

        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar
          collapsed={menuCollapse}
          toggled={menuToggle}
          breakPoint="md"
        // onToggle={handleToggleSidebar}
        >
          <SidebarHeader>
            <div
              className="logotext"
              onClick={sidebarToggle}
            >
              {/* Icon change using menucollapse state */}
              <p>{menuCollapse ? <ImUser /> : `Hi, ${nameCase}`}</p>
            </div>

            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle />
              ) : (
                <FiArrowLeftCircle />
              )}
            </div>
          </SidebarHeader>
          {/* -------------------------------------- Transactions SideNav with React RouterLink ------------ */}

          <SidebarContent >
            <Menu iconShape="round">
              <SubMenu title='Transactions' icon={<BsWallet2 />} >
                <MenuItem className="subMenu" >
                  <Link to='/transaction' style={{ color: '#237cbf' }}>
                    All Transactions</Link>
                </MenuItem>
                <MenuItem className="subMenu">
                  <Link to='/newPages' style={{ color: '#237cbf' }}
                  >New Transactions</Link>
                </MenuItem>
              </SubMenu>

              {/* -------------------------------- Staffs SideNav with React RouterLink -------------------- */}


              <SubMenu title='Staff' icon={<ImUsers />}>
                <MenuItem className="subMenu">
                  <Link to='/staffs' style={{ color: '#237cbf' }}>
                    All Staff
                  </Link>
                </MenuItem>
                <MenuItem className="subMenu">
                  <Link to='/staff' style={{ color: '#237cbf' }}>
                    New Staff
                  </Link>
                </MenuItem>
              </SubMenu>

              {/* -------------------------------------- Dashboard SideNav with React RouterLink ------------ */}
              <SubMenu title='Dashboard' icon={<GoDashboard/>}>
                <MenuItem className="subMenu">
                  <Link to='/dashboard' style={{ color:'#237cbf' }}>
                    Management Dashboard
                  </Link>
                </MenuItem> 

                <MenuItem className="subMenu">
                  <Link to ='/dashboard' style={{color:'#237cbf'}}>
                    Execution Dashboard
                  </Link>
                </MenuItem>

                <MenuItem className="subMenu">
                  <Link to ='/org-dashboard' style={{color:'#237cbf'}}>
                    Origination Dashboard
                  </Link>
                </MenuItem>
            </SubMenu>

            <MenuItem icon={<HiOutlineCalculator />}>Budget</MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="circle">
            <MenuItem icon={<FiLogOut />} onClick={authService.logout}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  </>
  );
}
export default Sidenav