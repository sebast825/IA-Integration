import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useSendMessage } from "../hooks/useSendMessage";

export default function ChatWindow() {
  
  const { messages, isSending, sendMessage } = useSendMessage();
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
    <Container fluid className="d-flex flex-column vh-100 vw-100 bg-light p-3">
      <Row className="flex-grow-1 overflow-auto mb-3">
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
                <Card.Text className="mb-1" style={{ whiteSpace: "pre-wrap" }}>
                  {m.text}
                </Card.Text>
                <small
                  className="text-muted d-block text-end"
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
