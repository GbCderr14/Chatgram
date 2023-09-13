import {
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  DialogTitle,
} from "@mui/material";
import loginQr from "./../../assets/loginQr.png";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";
interface AccountContextType {
  account: GoogleTokenPayload;
  setAccount: React.Dispatch<React.SetStateAction<GoogleTokenPayload>>;
}
interface credentialResponseType {
  credential?: string;
  clientId?: string;
  select_by?: string;
}
export interface GoogleTokenPayload {
  iss?: string;
  nbf?: number;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: boolean;
  azp?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

function LoginScreen() {
  const acctx: AccountContextType | undefined = useContext(AccountContext);
  const onLoginSuccess = async (credentialResponse: credentialResponseType) => {
    if (credentialResponse.credential != null) {
      const decoded: GoogleTokenPayload = jwt_decode(
        credentialResponse.credential,
      );
      acctx?.setAccount(decoded);
      await addUser(decoded);
    }
  };

  return (
    <div>
      <AppBar>
        <Toolbar sx={{ height: "180px", backgroundColor: "#ff6060" }}></Toolbar>
      </AppBar>
      <Dialog open={true} fullWidth={true} maxWidth="lg" hideBackdrop>
        <DialogTitle>
          <Box sx={{ height: "40px" }}></Box>
          <Typography
            variant="h4"
            style={{
              color: "#ff6060",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Use Chatgram on your PC.
          </Typography>
          <Box sx={{ height: "20px" }}></Box>
        </DialogTitle>
        <DialogContent sx={{ padding: "100px 50px" }}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item sm={12} md={6}>
              <List>
                <ListItem>
                  <ListItemText>
                    <Typography variant="h6">
                      1. Scan the QR code with your phone to log in.
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <Typography variant="h6">2. Login With Google.</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <Typography variant="h6">3. Enjoy The Chatting.</Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid item sm={12} md={6}>
              <Box sx={{ padding: "0 30%", position: "relative" }}>
                <img src={loginQr} alt="login Qr" />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <GoogleLogin
                    useOneTap
                    theme="filled_black"
                    text="continue_with"
                    shape="circle"
                    onSuccess={(credentialResponse: credentialResponseType) => {
                      onLoginSuccess(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoginScreen;
