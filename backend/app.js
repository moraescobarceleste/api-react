const express = require('express');
const cors = require('cors');

require('./db');
const rutas = require('./routesCrud');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.use('/clientes', rutas.clientes);
app.use('/productos', rutas.productos);
app.use('/ventas', rutas.ventas);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});