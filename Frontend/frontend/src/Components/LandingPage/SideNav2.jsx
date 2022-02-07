import React, { useState } from "react";
//react pro sidebar components
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent} from "react-pro-sidebar";
//icons from react icons
import { ImUser, ImUsers } from "react-icons/im";
import { GoDashboard } from "react-icons/go";
import { HiOutlineCalculator } from "react-icons/hi";
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";

import { FaList, FaRegHeart } from "react-icons/fa";
// import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";
//sidebar css from react-pro-sidebar module
import "react-pro-sidebar/dist/css/styles.css";
// import "./Sidenav.css";
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
            <p>{menuCollapse ? <ImUser /> : 'Hi, User' }</p>
          </div>

          <div className="closemenu" onClick={menuIconClick}>
            {/* changing menu collapse icon on click */}
            {menuCollapse ? (
              <FiArrowRightCircle/>
            ) : (
              <FiArrowLeftCircle/>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="round">
            <SubMenu title='Transactions' icon={<BsWallet2 />}>
              <MenuItem className="subMenu" >All Transactions</MenuItem>
              <MenuItem className="subMenu">New Transactions</MenuItem>
            </SubMenu>

            <SubMenu title='Staff' icon={<ImUsers />}>
              <MenuItem className="subMenu">All Staff</MenuItem>
              <MenuItem className="subMenu">New Staff</MenuItem>
            </SubMenu>

            <SubMenu title='Dashboard' icon={<GoDashboard />}>
              <MenuItem className="subMenu">Management Dashboard</MenuItem>
              <MenuItem className="subMenu">Execution Dashboard</MenuItem>
              <MenuItem className="subMenu">Origination Dashboard</MenuItem>
            </SubMenu>

            <MenuItem icon={<HiOutlineCalculator />}>Budget</MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="circle">
            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  </>
  );
}
export default Sidenav