const app = require('./app');
const PORT = process.env.PORT || 9008;
require('dotenv').config();


app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});