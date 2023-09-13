import { Avatar, Box, MenuItem, Typography } from "@mui/material";
import { GoogleTokenPayload } from "../../../interfaces/googleToken";
import { AccountContext } from "../../../context/AccountProvider";
import { useContext, useEffect, useState } from 'react';
import { setConversation, getConversation } from "../../../service/api";
import { extractFileNameFromUrl } from "../../../utils/commonUtils";

function IndividualConvo(props: { user: GoogleTokenPayload }) {
    const acctx = useContext(AccountContext);
    const [message, setMessage] = useState<{ text?: string, timestamp?: string }>({});
    const onConversationClick = async (user: GoogleTokenPayload) => {
        acctx?.setPerson(user);
        if (acctx?.account.sub && acctx.person.sub)
            await setConversation({
                senderId: acctx?.account.sub,
                receiverId: acctx?.person.sub,
            });
    };

    useEffect(() => {
        const getConversationDetails = async () => {
            if (acctx?.account.sub && props.user.sub) {
                const data = await getConversation({ senderId: acctx?.account.sub, receiverId: props.user.sub })
                // console.log(data);
                setMessage({ text: data?.messages, timestamp: data?.updatedAt });
            }
        }
        getConversationDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MenuItem
            style={{
                margin: "2%",
                border: "1px solid #ffeece",
                borderRadius: "6px ",
            }}
            onClick={() => onConversationClick(props.user)}
        >
            <Box display={"flex"} >
                <Box>
                    <Avatar>
                        <img
                            src={props.user.picture}
                            alt="sfs"
                            width="40px"
                            style={{ margin: "4%" }}
                        />
                    </Avatar>
                </Box>
                <Box sx={{ width: "10px" }} />
                <Box >
                    <Typography variant="subtitle2" sx={{ padding: "5%" }}>
                        {props.user.name}
                        <Typography fontSize={13}>
                            {message?.text?.includes('localhost') ? extractFileNameFromUrl(message?.text) : message?.text}
                        </Typography>
                    </Typography>
                    {/* <Box display={"flex"} justifyContent={"space-between"} style={{color:"grey"}}> */}
                </Box>
                    {/* </Box> */}
            </Box>
        </MenuItem>
    )

}

export default IndividualConvo;