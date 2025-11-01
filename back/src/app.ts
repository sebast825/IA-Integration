const express = require('express');
import cors from 'cors';

const healthRoutes = require('./routes/healthRoutes');
const chatRoutes = require('./routes/chatRoutes');
const promptRoutes = require('./routes/promptRoutes');


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // tu puerto de Vite
  credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']

}));
app.use('/api', healthRoutes);
app.use('/api', chatRoutes);
app.use('/api', promptRoutes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

