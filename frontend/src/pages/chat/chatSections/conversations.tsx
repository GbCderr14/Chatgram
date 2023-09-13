import { useEffect, useState } from "react";
import { getUsers, } from "../../../service/api";
import { GoogleTokenPayload } from "../../../interfaces/googleToken";
import {  Box } from "@mui/material";
import { AccountContext } from "../../../context/AccountProvider";
import { useContext } from "react";
import IndividualConvo from "./individualConvo";
function Conversations(props: { text: string }) {
  const [users, setUsers] = useState<GoogleTokenPayload[]>([]);
  const acctx = useContext(AccountContext);

  // const onConversationClick = async (user: GoogleTokenPayload) => {
  //   acctx?.setPerson(user);
  //   if (acctx?.account.sub && acctx.person.sub)
  //     await setConversation({
  //       senderId: acctx?.account.sub,
  //       receiverId: acctx?.person.sub,
  //     });
  // };

  useEffect(() => {
    const getData = async () => {
      const response = await getUsers();
      const filteredData = response.filter(
        (user: GoogleTokenPayload) =>
          user.name?.toLowerCase().includes(props.text.toLowerCase()),
      );
      setUsers(filteredData);
    };
    getData();
  }, [props.text]);


  return (
    <>
      <Box
        style={{
          height: "80vh",
          overflowY: "scroll",
          maxHeight: "75vh",
        }}
      >
        {users.map((user) => {
          return (
            <>
              {user.sub !== acctx?.account.sub && (
                <>
                  {/* <MenuItem
                    style={{
                      margin: "2%",
                      border: "1px solid #ffeece",
                      borderRadius: "6px ",
                    }}
                    onClick={() => onConversationClick(user)}
                  >
                    <Box display={"flex"}>
                      <Box>
                        <Avatar>
                          <img
                            src={user.picture}
                            alt="sfs"
                            width="40px"
                            style={{ margin: "4%" }}
                          />
                        </Avatar>
                      </Box>
                      <Box sx={{ width: "10px" }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ padding: "5%" }}>
                          {user.name}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem> */}
                  <IndividualConvo user={user} />
                </>
              )}
            </>
          );
        })}
      </Box>
    </>
  );
}

export default Conversations;
