const app = require('./app');
const PORT = process.env.PORT || 3001;
require('dotenv').config();


app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en ${PORT}`);
});