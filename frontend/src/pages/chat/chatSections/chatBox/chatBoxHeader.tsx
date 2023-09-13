import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { useState, MouseEvent, useContext } from "react";
import { AccountContext } from "../../../../context/AccountProvider";

function ChatBoxHeader() {
  const acctx = useContext(AccountContext);
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);

  const handleClick = (event: MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        display={"flex"}
        sx={{ backgroundColor: "#f4e1d8", height: "48px", padding: "5px" }}
      >
        <Box sx={{ width: "12px" }} />
        <Avatar>
          <img
            src={acctx?.person.picture}
            alt="profile"
            width="100%"
            style={{ cursor: "pointer" }}
            // onClick={onProfileClick}
          />
        </Avatar>
        <Box sx={{ width: "12px" }} />
        <Box>
          <Typography
            style={{
              fontFamily: "monospace",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {acctx?.person.name}
          </Typography>
          <Typography
            style={{ fontFamily: "cursive", color: "black", fontSize: 12 }}
          >
           {acctx?.activeUsers.find(user=>user.sub===acctx.person.sub)?"Online":"Offline"}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <FontAwesomeIcon
          icon={faSearch}
          size="sm"
          style={{ padding: "16", color: "red", cursor: "pointer" }}
        />
        <FontAwesomeIcon
          icon={faBars}
          size="sm"
          style={{ padding: "16", color: "red", cursor: "pointer" }}
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
          <MenuItem sx={{ width: "150px" }}>Contact Info</MenuItem>
          <MenuItem>Select Messages</MenuItem>
          <MenuItem>Close Chat</MenuItem>
        </Menu>
      </Box>
    </>
  );
}
export default ChatBoxHeader;
