import LoginScreen from "./pages/auth/login";
import ChatScreen from "./pages/chat/chatScreen";
import { useContext } from "react";
import { AccountContext } from "./context/AccountProvider";
function App() {
  const acctx = useContext(AccountContext);
  return (
    <>
      {!acctx?.account.email ? (
        <LoginScreen />
      ) : (
        <>
          <ChatScreen />
        </>
      )}
    </>
  );
}

export default App;
