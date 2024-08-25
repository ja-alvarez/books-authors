import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import db from './database/config.js';
import { create } from 'express-handlebars';


import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;


const app = express();
const log = console.log;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

// Configuracion handlebars
const hbs = create({
    partialsDir: [
        path.resolve(__dirname, './views/partials/'),
    ],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));



// Vistas públicas
app.get('/', (req, res) => {
    try {
        res.render('home', {
            homeView: true
        })
    } catch (error) {
        res.status(500).render('error', {
            error: 'No fue posible mostrar la página, intente más tarde.'
        })
    }
});



// Respuestas Not Found
app.all('/api/*', (req, res) => {
    res.status(404).json({
        message: 'Recurso no encontrado.'
    })
});

app.get('/*', (req, res) => {
    res.send(`La ruta '${req.url}' no existe o no se encuentra disponible.`)
});