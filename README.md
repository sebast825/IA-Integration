# AI Integration

## Description
Full-stack application featuring a scalable backend with multiple endpoints for AI service integration, specialized in Gemini-Flash, paired with an intuitive frontend interface. Supports two interaction modes: single-prompt and conversational chat with configurable history.


## Features
- **Dual Mode API**: Separate endpoints for single-prompt and conversational chat
- **Configurable History**: Adjustable message limit in conversations
- **Multi-Model Support**: Architecture ready for different AI models
- **Interpreter Context**: Configurable role system for assistant behavior
- **Scalable Design**: Independent endpoints for different chat types
- **Manual History Management**: Full control over context optimization

## Key Endpoints

### Single-Prompt Service
`POST /generate`
- Individual prompt processing
- No history persistence
- Low latency

### Chat Service
`POST /chat`
- Conversations with history
- Configurable message limits
- Customizable role context

## Chat Architecture

### Manual History Management
- **Full control** over context sent to the API
- **Token optimization**: Selective sending of relevant messages
- **Intelligent filtering**: Automatic removal of non-essential messages
- **Priority preservation**: Maintenance of key messages (system prompts, recent instructions)

## Getting Started

### Backend Setup
1. Navigate to the backend directory
2. Configure your environment:
```bash
  cd back
  cp .env.example .env
  # Edit .env with your Gemini API key and settings
  npm install
  npm run dev
```

### Frontend Setup
1. Navigate to the frontend directory
2. Install and run the development server:
```bash
  cd front
  npm install
  npm run dev
```
