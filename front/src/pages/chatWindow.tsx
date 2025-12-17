import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useSendMessage } from "../hooks/useSendMessage";
import ReactMarkdown from "react-markdown";
import { useChatWithHistory } from "../hooks/useChatWithHistory";
import { useGenerateSinglePrompt } from "../hooks/useGenerateSinglePrompt";
import type { ChatTypes } from "../types/chatTypes.types";

export default function ChatWindow(props: { selectChatType: ChatTypes }) {
  const { selectChatType } = props;

  const chatType = {
    singlePrompt: useGenerateSinglePrompt,
    chatWithHistory: useChatWithHistory,
  };
  const { postPromt } = chatType[selectChatType]();

  const { messages, isSending, sendMessage } = useSendMessage(postPromt);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column vh-100 vw-100 bg-light margin-top"
    >
      <Row className=" overflow-auto mb-3 h-100">
        <Col xs={12} md={{ span: 8, offset: 2 }}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`d-flex mb-2 ${
                m.role === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <Card
                bg={m.role === "user" ? "primary" : "white"}
                text={m.role === "user" ? "white" : "dark"}
                className="p-2 shadow-sm rounded-3"
                style={{ maxWidth: "75%" }}
              >
                <div
                  className="mb-1 text-start"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
                <small
                  className={` d-block text-end ${
                    m.role === "user" ? "text-light" : "text-dark"
                  }`}
                  style={{ fontSize: "0.7rem" }}
                >
                  {m.time}
                </small>
              </Card>
            </div>
          ))}
          <div ref={bottomRef} />
        </Col>
      </Row>

      <Row className="border-top bg-white py-3">
        <Col xs={12} md={{ span: 8, offset: 2 }} className="d-flex gap-2">
          <Form.Control
            as="textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí un mensaje..."
            style={{ minHeight: "44px", maxHeight: "120px", resize: "none" }}
          />
          <Button
            variant="primary"
            disabled={isSending || !input.trim()}
            onClick={handleSendMessage}
          >
            {isSending ? "Enviando..." : "Enviar"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
