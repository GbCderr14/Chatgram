import { Box, Typography } from "@mui/material";
import ChatBoxFooter from "./chatBoxFooter";
import ChatBoxHeader from "./chatBoxHeader";
import { useContext, useEffect, useState, useRef } from "react";
import pdfIcon from "./../../../../assets/pdf.png";
import {
  getConversation,
  // newMessage,
  getMessages,
} from "../../../../service/api";
import { AccountContext } from "../../../../context/AccountProvider";
import { message } from "../../../../interfaces/message";
import { extractFileNameFromUrl, formatDate, downloadMedia } from "../../../../utils/commonUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

function ChatBox() {
  const [convoId, setConvoId] = useState<string>("");
  const acctx = useContext(AccountContext);
  const [messages, setMessages] = useState<message[]>([]);
  const [convo, setConvo] = useState<{members?:string[];message?:string}>({});
  const [incomingMessage, setIncomingMessage] = useState<{
    senderId?: string,
    receiverId?: string,
    conversationId?:string,
    type?: string,
    text?: string,
  createdAt?:string}>({});
  // const [file, setFile] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>();
  useEffect(() => {
    const getConvo = async () => {
      if (acctx?.account.sub && acctx.person.sub) {
        const response = await getConversation({
          senderId: acctx?.account.sub,
          receiverId: acctx?.person.sub,
        });
        setConvo(response);
        setConvoId(response._id);
      }
    };
    getConvo();
  }, [acctx?.account.sub, acctx?.person.sub]);

  useEffect(() => {
    const getMessage = async () => {
      if (convoId) {
        const response = await getMessages(convoId);
        setMessages(response);
      }
    };
    getMessage();
  }, [convoId, acctx?.person.sub]);

  // const sendText = async (value: string) => {
  //   let message;
  //   console.log(file);
  //   if (!file) {
  //     message = {
  //       senderId: acctx?.account.sub,
  //       receiverId: acctx?.person.sub,
  //       conversationId: convoId,
  //       type: "text",
  //       text: value,
  //     };
  //   } else {
  //     console.log("here");
  //     message = {
  //       senderId: acctx?.account.sub,
  //       receiverId: acctx?.person.sub,
  //       conversationId: convoId,
  //       type: "file",
  //       text: value,
  //     };
  //   }
  //   await newMessage(message);
  // };

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

  }, [messages]);

  useEffect(() => {
    acctx?.socket?.current.emit('addUsers', acctx.account);
    acctx?.socket?.current.on("getUsers", users => {
      acctx.setActiveUsers(users);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acctx?.account, acctx?.person]);


  useEffect(() => {
    acctx?.socket?.current.on('getMessage', data => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now()
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  useEffect(() => {
    if(incomingMessage.senderId)
    incomingMessage && convo.members?.includes(incomingMessage.senderId) && setMessages(prev => [...prev, incomingMessage]);
  },[incomingMessage,convo]);

  return (
    <>
      <ChatBoxHeader />
      <Box
        style={{
          backgroundImage: `url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")`,
          height: "80vh",
          overflowY: "scroll",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "flex-end",
        }}
        ref={scrollRef}
      >
        {messages &&
          messages.map((message) =>
            message.type === "file" ? (
              <Box
                // key={message._id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.senderId === acctx?.account.sub
                      ? "flex-end"
                      : "flex-start",
                  padding: "0 5%",
                  marginTop: "0.5vh",
                  marginBottom: "0.5vh",
                }}
              >
                {message.text?.includes(".pdf") ? (
                  <>
                    <Box
                      style={{
                        //backgroundColor: "#f7e6ff",
                        background:
                          message.senderId === acctx?.account.sub
                            ? "#ffb599"
                            : "#ffffff",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        color: "black",
                        display: "inline-block",
                        minWidth: "100px",
                        maxWidth: "80%",
                        width: "fit-content",
                        wordWrap: "break-word",
                        textDecoration: "none",
                      }}
                    >
                      <img
                        src={pdfIcon}
                        alt="pdf icon"
                        height="30px"
                        style={{ padding: "8px" }}
                      />
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >

                        <a
                          href={message.text}
                          style={{
                            padding: "0px 6px", textDecoration: "none", color: "red"
                          }}
                          target="_blank"
                        >
                          Preview {extractFileNameFromUrl(message.text)}
                        </a>
                        <FontAwesomeIcon icon={faArrowDown} onClick={(e) => message.text && downloadMedia(e, message.text)} />
                        <Typography variant="subtitle2" fontSize={10}>
                          {message.createdAt && formatDate(message.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      style={{
                        //backgroundColor: "#f7e6ff",
                        background:
                          message.senderId === acctx?.account.sub
                            ? "#ffb599"
                            : "#ffffff",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        color: "black",
                        display: "inline-block",
                        minWidth: "100px",
                        maxWidth: "80%",
                        width: "fit-content",
                      }}
                    >
                      <img src={message.text} alt="image sent" width="100%" />
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <FontAwesomeIcon icon={faArrowDown}
                          onClick={(e) => message.text && downloadMedia(e, message.text)}
                        />
                        <Typography variant="subtitle2" fontSize={10}>
                          {message.createdAt && formatDate(message.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            ) : (
              <Box
                // key={message._id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.senderId === acctx?.account.sub
                      ? "flex-end"
                      : "flex-start",
                  padding: "0 5%",
                  marginTop: "0.5vh",
                  marginBottom: "0.5vh",
                }}
              > 
                <Box
                  style={{
                    background:
                      message.senderId === acctx?.account.sub
                        ? "#ffb599"
                        : "#ffffff",
                    borderRadius: "10px",
                    padding: "5px 10px",
                    color: "black",
                    display: "inline-block",
                    minWidth: "100px",
                    maxWidth: "80%",
                    width: "fit-content",
                    wordWrap: "break-word",
                  }}
                >
                  {message.text}
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="subtitle2" fontSize={10}>
                    {message.createdAt && formatDate(message.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ),
          )}
      </Box>
      <ChatBoxFooter />
    </>
  );
}

export default ChatBox;
