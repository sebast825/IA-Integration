import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  text: string
  time?: string
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: 'Hola — ¿en qué puedo ayudarte hoy?', time: '11:00' },
    { id: '2', role: 'user', text: 'Quiero crear una app con Vite + React + TS', time: '11:01' },
    { id: '3', role: 'assistant', text: 'Perfecto. Te dejo los pasos básicos cuando quieras.', time: '11:02' },
  ])

  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const newMsg: Message = {
      id: String(Date.now()),
      role: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((m) => [...m, newMsg])
    setInput('')

    setIsSending(true)
    setTimeout(() => {
      const reply: Message = {
        id: String(Date.now() + 1),
        role: 'assistant',
        text: 'Respuesta de ejemplo — aquí vendría la respuesta generada por el backend.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((m) => [...m, reply])
      setIsSending(false)
    }, 650)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
<Container fluid className="d-flex flex-column vh-100 vw-100 bg-light p-3">
        <Row className="flex-grow-1 overflow-auto mb-3">
        <Col xs={12} md={{ span: 8, offset: 2 }}>
          {messages.map((m) => (
            <div key={m.id} className={`d-flex mb-2 ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              <Card
                bg={m.role === 'user' ? 'primary' : 'white'}
                text={m.role === 'user' ? 'white' : 'dark'}
                className="p-2 shadow-sm rounded-3"
                style={{ maxWidth: '75%' }}
              >
                <Card.Text className="mb-1" style={{ whiteSpace: 'pre-wrap' }}>{m.text}</Card.Text>
                <small className="text-muted d-block text-end" style={{ fontSize: '0.7rem' }}>{m.time}</small>
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
            style={{ minHeight: '44px', maxHeight: '120px', resize: 'none' }}
          />
          <Button
            variant="primary"
            disabled={isSending || !input.trim()}
            onClick={sendMessage}
          >
            {isSending ? 'Enviando...' : 'Enviar'}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}