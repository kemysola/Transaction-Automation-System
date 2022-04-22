import * as React from "react";
import {Link} from 'react-router-dom';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import authService from '../../Services/auth.Service';

export default function MenuOption() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <a href='/logout'><i class="bi bi-power" style={{ padding: "1px 5px", color: "red" }}></i></a>
      <i class="bi bi-bell" style={{ padding: "0 2px" }}></i> */}
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <i
          class="bi bi-person"
          style={{
            padding: "1px 5px",
            background: "green",
            color: "white",
            borderRadius: "20px",
          }}
        >
        </i>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} style={{color: 'black'}}>
          <Link to='/reset_password' style={{textDecoration:'none', color:'black'}}>
            Reset Password
          </Link>
        </MenuItem>
        <MenuItem onClick={authService.logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
