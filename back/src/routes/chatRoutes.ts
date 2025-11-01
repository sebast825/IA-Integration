


import {Router } from 'express';
import ChatController from '../controller/chatController';
import {chatService} from '../services/ChatService';


const router = Router();
const chatController = new  ChatController(chatService);

router.get('/chat', chatController.generateText);
router.get('/generate', chatController.generateText);

module.exports = router; 