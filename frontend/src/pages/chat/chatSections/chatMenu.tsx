import MenuHeader from "../components/menuHeader";
import SearchBar from "../components/searchBar";
import Conversations from "./conversations";
import { useState } from "react";
function ChatMenu() {
  const [text, setText] = useState<string>("");
  return (
    <>
      <MenuHeader />
      <SearchBar setText={setText} />
      <Conversations text={text} />
    </>
  );
}

export default ChatMenu;
