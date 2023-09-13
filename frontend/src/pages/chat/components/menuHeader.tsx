import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import { useContext, useState, MouseEvent } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import ProfileDrawer from "../../../components/profileDrawer";
import {
  faUsers,
  faBars,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
function MenuHeader() {
  const acctx = useContext(AccountContext);
  const imgUrl: string | undefined = acctx?.account.picture;
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleClick = (event: MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onProfileClick = () => {
    setDrawerOpen(true);
  };
  const onProfileClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <Box display={"flex"} sx={{ backgroundColor: "#f4e1d8", padding: "2%" }}>
        <Box sx={{ width: "12px" }} />
        <Avatar>
          <img
            src={imgUrl}
            alt="profile"
            width="100%"
            style={{ cursor: "pointer" }}
            onClick={onProfileClick}
          />
        </Avatar>
        <ProfileDrawer open={drawerOpen} setClose={onProfileClose} />
        <Box sx={{ flexGrow: 1 }} />
        <FontAwesomeIcon
          icon={faUsers}
          size="sm"
          style={{ padding: "3%", color: "red", cursor: "pointer" }}
        />
        <FontAwesomeIcon
          icon={faCircleNotch}
          size="sm"
          style={{ padding: "3%", color: "red", cursor: "pointer" }}
        />
        <FontAwesomeIcon
          icon={faBars}
          size="sm"
          style={{ padding: "3%", color: "red", cursor: "pointer" }}
          onClick={handleClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={onProfileClick} sx={{ width: "150px" }}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default MenuHeader;
