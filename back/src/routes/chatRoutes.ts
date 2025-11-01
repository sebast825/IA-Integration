


import {Router } from 'express';
import ChatController from '../controller/chatController';
import {chatService} from '../services/chatService';


const router = Router();
const chatController = new  ChatController(chatService);

router.post('/chat', chatController.generateText);

module.exports = router; 