import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatWindow from "./pages/chatWindow";
import CardsGrid from "./pages/cardsGrid";
import { useState } from "react";
import type { ChatTypes } from "./types/chatTypes.types";
import { NavBar } from "./components/navBar";
import { Container } from "react-bootstrap";

function App() {
  const [showChat, setShowChat] = useState<Boolean>(false);
  const [aiSelected, setAiSelected] = useState<ChatTypes>("chatWithHistory");

  function chatTypeIsSelected(e: ChatTypes) {
    console.log(e);
    setAiSelected(e);
    setShowChat(!showChat);
  }
  return (
    <>
      <NavBar
        callBack={() => {
          setShowChat(!showChat);
        }}
      ></NavBar>

      {showChat ? (
        
        <ChatWindow selectChatType={aiSelected}></ChatWindow>
      ) : (
        <>


          <CardsGrid
            getSelectedCardFn={(e: ChatTypes) => chatTypeIsSelected(e)}
          />
      
        </>
      )}
 
    </>
  );
}

export default App;
