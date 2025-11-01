const express = require('express');
const healthRoutes = require('./routes/healthRoutes');

const chatRoutes = require('./routes/chatRoutes');


const app = express();
app.use('/api', healthRoutes);
app.use('/api', chatRoutes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});