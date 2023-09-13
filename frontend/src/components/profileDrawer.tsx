import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Drawer, Typography } from "@mui/material";
import { AccountContext } from "../context/AccountProvider";
import { useContext } from "react";
function ProfileDrawer(props: { open: boolean; setClose: () => void }) {
  const acctx = useContext(AccountContext);
  const imgUrl = acctx?.account.picture;
  const handleClose = () => {
    props.setClose();
  };
  return (
    <>
      <Drawer
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "468px",
            height: "96%",
            backgroundColor: "#f0f2f5",
            margin: "13px",
          },
        }}
        style={{
          zIndex: "1500",
        }}
      >
        <Box
          display={"flex"}
          style={{ backgroundColor: "#ff6060", padding: "5%", height: "40px" }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ cursor: "pointer", padding: "3%" }}
            onClick={handleClose}
          />
          <Typography variant="h6" style={{ padding: "1%" }}>
            Profile
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            src={imgUrl}
            alt={"profile dp"}
            style={{ borderRadius: "100%", margin: "12%", height: "200px" }}
          />
          <Typography fontSize={14}>Your Name</Typography>
          <Typography color="silver">{acctx?.account.given_name}</Typography>
          <Typography fontSize={13} color={"grey"} padding={"2% 8%"}>
            This is not your username or pin.This name will be visible to your
            Chatgram Contacts.
          </Typography>
          <Typography fontSize={14}>About</Typography>
          <Typography color="silver">Eat-Sleep-Repeat </Typography>
        </Box>
      </Drawer>
    </>
  );
}

export default ProfileDrawer;
