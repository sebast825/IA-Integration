const express = require('express');
const healthRoutes = require('./routes/healthRoutes');



const app = express();
app.use('/api', healthRoutes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});