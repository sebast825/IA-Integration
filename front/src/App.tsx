import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatWindow from "./pages/chatWindow";
import CardsGrid from "./pages/cardsGrid";
import { useState } from "react";
import type { ChatTypes } from "./types/chatTypes.types";

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
      {showChat ? (
        <ChatWindow selectChatType={aiSelected}></ChatWindow>
      ) : (
        <>
          <h1>Choose wich kind of chat you want to use!</h1>
          <CardsGrid
            getSelectedCardFn={(e: ChatTypes) => chatTypeIsSelected(e)}
          />
        </>
      )}
    </>
  );
}

export default App;
