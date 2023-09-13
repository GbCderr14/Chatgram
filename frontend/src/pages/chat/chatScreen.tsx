import { AppBar, Box, Dialog, Toolbar } from "@mui/material";
import ChatMenu from "./chatSections/chatMenu";
import EmptyChat from "./chatSections/emptyChat";
import ChatBox from "./chatSections/chatBox/chatBox";
import { AccountContext } from "../../context/AccountProvider";
import { useContext } from "react";
const dialogStyle = {
  height: "96%",
  width: "100%",
  marginTop: "2%",
  maxWidth: "100%",
  maxHeight: "100%",
  overflowY: "hidden",
};

function ChatScreen() {
  const acctx = useContext(AccountContext);
  return (
    <>
      <AppBar>
        <Toolbar sx={{ height: "70px", backgroundColor: "#ff6060" }}></Toolbar>
      </AppBar>
      <Dialog
        open={true}
        PaperProps={{ sx: dialogStyle }}
        maxWidth="md"
        hideBackdrop
        fullWidth
      >
        <Box display={"flex"}>
          <Box minWidth={"450px"} style={{ flex: 1 }}>
            <ChatMenu />
          </Box>
          <Box sx={{ minWidth: "1px" }} />
          <Box minWidth={"300px"} width="73%" height="100%">
            {!acctx?.person.sub ? <EmptyChat /> : <ChatBox />}
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default ChatScreen;
