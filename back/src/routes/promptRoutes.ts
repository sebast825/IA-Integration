


import {Router } from 'express';
import {promptService} from '../services/PromtService';
import PromptController from '../controller/promtController';


const router = Router();
const promptController = new  PromptController(promptService);

router.get('/generate', promptController.generateText);

module.exports = router; 