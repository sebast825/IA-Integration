


import {Router } from 'express';
import {promptService} from '../services/promtService';
import PromptController from '../controller/promtController';


const router = Router();
const promptController = new  PromptController(promptService);

router.get('/generate', promptController.generateText);

module.exports = router; 