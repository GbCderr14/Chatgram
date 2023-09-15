import React, { createContext, useState, ReactNode ,useRef ,useEffect, MutableRefObject} from "react";
import { GoogleTokenPayload } from "../pages/auth/login";
interface AccountContextType {
  account: GoogleTokenPayload;
  setAccount: React.Dispatch<React.SetStateAction<GoogleTokenPayload>>;
  person: GoogleTokenPayload;
  setPerson: React.Dispatch<React.SetStateAction<GoogleTokenPayload>>;
  activeUsers:GoogleTokenPayload[];
  setActiveUsers:React.Dispatch<React.SetStateAction<GoogleTokenPayload[]>>;
  socket:MutableRefObject<Socket | undefined>;
}
import {Socket, io} from 'socket.io-client';

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined,
);

interface AccountProviderProps {
  children: ReactNode;
}

const AccountProvider = ({ children }: AccountProviderProps) => {
  const [account, setAccount] = useState<GoogleTokenPayload>({});
  const [person, setPerson] = useState<GoogleTokenPayload>({});
  const [activeUsers,setActiveUsers]=useState<GoogleTokenPayload[]>([]);
  const socket=useRef<Socket | undefined>();
  useEffect(()=>{
    socket.current=io("http://localhost:9000");
    console.log(socket.current);
  },[]);
  const contextValue: AccountContextType = {
    account,
    setAccount,
    person,
    setPerson,
    socket,
    activeUsers,
    setActiveUsers
  };


  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
