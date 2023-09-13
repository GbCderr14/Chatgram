import { Box, Typography } from "@mui/material";
import emptyChat from "./../../../assets/emptyChat.png";
function EmptyChat() {
  return (
    <>
      <Box
        textAlign={"center"}
        style={{ backgroundColor: "#f2f2f2", height: "100vh" }}
      >
        <img src={emptyChat} alt="sfs" width="500px" style={{ margin: "4%" }} />
        <Typography variant="h5">Start a New Chat on ChatGram!!!!</Typography>
      </Box>
    </>
  );
}

export default EmptyChat;
