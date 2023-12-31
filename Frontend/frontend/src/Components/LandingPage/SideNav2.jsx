import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../Services/auth.Service";
//react pro sidebar components

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { ImUser, ImUsers } from "react-icons/im";
import { GoDashboard } from "react-icons/go";
import { HiOutlineCalculator } from "react-icons/hi";
import {
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiSettings,
} from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import "react-pro-sidebar/dist/css/styles.css";
import "./custom.scss";

const Sidenav = ({ toggled, handleToggleSidebar }) => {
  //menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  // ******************************************  get user from local storage   ****************************************

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.name;
  var name = username.substring(0, username.lastIndexOf("@"));
  const nameCase = name.toUpperCase();

  return (
    <>
      <div id="header" style={{zIndex: "100"}}>
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* Icon change using menucollapse state */}
              <p>{menuCollapse ? <ImUser /> : `HELLO, ${nameCase}`}</p>
            </div>

            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>

          {/* -------------------------------------- Transactions SideNav with React RouterLink ------------ */}

          <SidebarContent>
            <Menu iconShape="round">
              <SubMenu title="Projects" icon={<BsWallet2 />}>
                <MenuItem className="subMenu">
                  <Link to="/transaction" style={{ color: "#237cbf" }}>
                    Portfolio
                  </Link>
                </MenuItem>

                <MenuItem className="subMenu">
                  <Link
                    to="/all_transactions_portfolio"
                    style={{ color: "#237cbf" }}
                  >
                    Pipeline
                  </Link>
                </MenuItem>

                <MenuItem className="subMenu">
                  <Link to="/all_transactions" style={{ color: "#237cbf" }}>
                    Global Deals
                  </Link>
                </MenuItem>

                <MenuItem className="subMenu">
                  <Link to="/create_transaction" style={{ color: "#237cbf" }}>
                    Create Transaction
                  </Link>
                </MenuItem>
              </SubMenu>

              {/* -------------------------------- Users SideNav with React RouterLink -------------------- */}
              <SubMenu title="Users" icon={<ImUsers />}>
                <MenuItem className="subMenu">
                  <Link to="/all_users" style={{ color: "#237cbf" }}>
                    All Users
                  </Link>
                </MenuItem>

                <MenuItem className="subMenu">
                  <Link to="/deal_team" style={{ color: "#237cbf" }}>
                    Deal Team
                  </Link>
                </MenuItem>

                <MenuItem className="subMenu">
                  <Link to="/create_user" style={{ color: "#237cbf" }}>
                    Create User
                  </Link>
                </MenuItem>
              </SubMenu>

              {/* -------------------------------------- Dashboard SideNav with React RouterLink ------------ */}
              <SubMenu title="Dashboard" icon={<GoDashboard />}>
                <MenuItem className="subMenu">
                  <Link to="/dashboard" style={{ color: "#237cbf" }}>
                    Management Dashboard
                  </Link>
                </MenuItem>

                <MenuItem className="subMenu">
                  <Link to="/execution" style={{ color: "#237cbf" }}>
                    Execution Dashboard
                  </Link>
                </MenuItem>

                <MenuItem className="subMenu">
                  <Link to="/org_dashboard" style={{ color: "#237cbf" }}>
                    Origination Dashboard
                  </Link>
                </MenuItem>
              </SubMenu>

              {/* ------------ Report Menu --------------- */}
              <SubMenu title="Report" icon={<ImUsers />}>
                {/* <MenuItem className="subMenu">
                  <Link
                    to="/annual_and_quarterly_report_page"
                    style={{ color: "#237cbf" }}
                  >
                     Add Quarterly Report
                  </Link>
                </MenuItem>
                 <MenuItem className="subMenu">
                  <Link
                    to="/AllReport"
                    style={{ color: "#237cbf" }}
                  >
                      Quarterly Report
                  </Link>
                </MenuItem> */}

                <MenuItem className="subMenu">
                  <Link to="/cc_report" style={{ color: "#237cbf" }}>
                    CC Submission Report
                  </Link>
                </MenuItem>
                <MenuItem className="subMenu">
                  <Link
                    to="/closed_deals/inception_financial_year"
                    style={{ color: "#237cbf" }}
                  >
                    Closed Deals From Inception Report
                  </Link>
                </MenuItem>
                <MenuItem className="subMenu">
                  <Link to="/closed_deals/filter" style={{ color: "#237cbf" }}>
                    Closed Deals Filter Report
                  </Link>
                </MenuItem>
                <MenuItem className="subMenu">
                  <Link
                    to="/reimbursible/top/n/reimbursible/report"
                    style={{ color: "#237cbf" }}
                  >
                    Top Reimbursible Report
                  </Link>
                </MenuItem>
              </SubMenu>

              <SubMenu title="Budget" icon={<HiOutlineCalculator />}>
                {/* <MenuItem className="subMenu">
                  <Link to="/budget" style={{ color: "#237cbf" }}>
                    Prepare Budget
                  </Link>
                </MenuItem>

                <MenuItem className="subMenu">
                  <Link to="/amortization" style={{ color: "#237cbf" }}>
                  Budget Amortization
                  </Link>
                </MenuItem>

                <MenuItem className="subMenu">
                  <Link to="/dashboard" style={{ color: "#237cbf" }}>
                    Budget
                  </Link>
                </MenuItem> */}
              </SubMenu>

              {/* ------------ Budget Menu --------------- */}
              {/* <MenuItem icon={<HiOutlineCalculator />}>
                <Link to="/budget">Budget</Link>
              </MenuItem> */}

              {/* --------------- Settings Menu ----------------- */}
              <MenuItem icon={<FiSettings />}>
                <Link to="/settings" style={{ color: "#237cbf" }}>
                  Settings
                </Link>
              </MenuItem>

              <MenuItem icon={<FiLogOut />} onClick={authService.logout}>
                Logout
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};
export default Sidenav;
