const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
  }));
app.use(session({
    secret: 'Lif7',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
    }
}));


// Rutas
app.use('/api', routes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/test', (req, res) => {
    res.send('Ruta de prueba funcionando');
});