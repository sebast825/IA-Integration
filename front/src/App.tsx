import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatWindow from "./pages/chatWindow";
import CardsGrid from "./pages/cardsGrid";
import { useState } from "react";

function App() {
  const [showChat, setShowChat] = useState<Boolean>(false);
  function chatTypeIsSelected(e : string) {
    console.log(e)
    setShowChat(!showChat)
  }
  return (
    <>
      {showChat ? (
        <ChatWindow></ChatWindow>
      ) : (
        <>
          {" "}
          <h1>Choose wich kind of chat you want to use!</h1>
          <CardsGrid getSelectedCardFn={(e: string) => chatTypeIsSelected(e)} />{" "}
        </>
      )}
    </>
  );
}

export default App;
