import { Request, Response, Router } from 'express';

const router = Router();

router.get('/health',(req : Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'API working correctly',
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 