import { useContext, useEffect, useState } from "react";
import {
  faAdd,
  faPaperPlane,
  faSmileWink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, InputBase } from "@mui/material";
import {
  getConversation,
  newMessage,
  uploadFile,
} from "../../../../service/api";
import { AccountContext } from "../../../../context/AccountProvider";

function ChatBoxFooter() {
  const acctx = useContext(AccountContext);
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [convoId, setConvoId] = useState<string>("");

  useEffect(() => {
    const getConvo = async () => {
      if (acctx?.account.sub && acctx.person.sub) {
        const response = await getConversation({
          senderId: acctx?.account.sub,
          receiverId: acctx?.person.sub,
        });
        setConvoId(response._id);
      }
    };
    getConvo();
  }, [acctx?.account.sub, acctx?.person.sub]);

  const sendMessage = async (value: string) => {
    let message;
    if (!file) {
      message = {
        senderId: acctx?.account.sub,
        receiverId: acctx?.person.sub,
        conversationId: convoId,
        type: "text",
        text: value,
      };
    } else {
      message = {
        senderId: acctx?.account.sub,
        receiverId: acctx?.person.sub,
        conversationId: convoId,
        type: "file",
        text: value,
      };
    }

    acctx?.socket?.current.emit("sendMessage",message);

    await newMessage(message);
  };


  const sendText = () => {
    if (img && file) {
      sendMessage(img);
    } else {
      sendMessage(text);
    }
    setText("");
    setImg("");
    setFile(null);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setText(e.target.files[0].name);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        const imgUrl = await uploadFile(data);
        setImg(imgUrl);
      }
    };
    getImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <Box display={"flex"} alignItems={"center"}>
      <IconButton>
        <FontAwesomeIcon icon={faSmileWink} />
      </IconButton>
      <IconButton>
        {" "}
        <label htmlFor="fileInput">
          <FontAwesomeIcon icon={faAdd} style={{ cursor: "pointer" }} />
        </label>
      </IconButton>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => onFileChange(e)}
      />
      <InputBase
        placeholder="Type a message"
        sx={{ width: "100%", backgroundColor: "#f0f2f5" }}
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendText();
          }
        }}
      />
      <IconButton onClick={sendText}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </IconButton>
    </Box>
  );
}

export default ChatBoxFooter;
