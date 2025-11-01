const express = require('express');
const healthRoutes = require('./routes/healthRoutes');

const chatRoutes = require('./routes/chatRoutes');
const promptRoutes = require('./routes/promptRoutes');


const app = express();
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api', chatRoutes);
app.use('/api', promptRoutes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});