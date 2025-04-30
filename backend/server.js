import router from './router.js';
import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";

const app = express();
const port = 5000;

import path from 'path';
import { fileURLToPath } from 'url';

// Эти две строки нужны, если ты используешь ES-модули и нет `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Подключаем папку public как статическую
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost/create-cart')
    .then(() => console.log('MongoDB подключен'))
    .catch(err => console.error('Ошибка подключения :', err));

const pizzaSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    img: {type: String, required: true}
});

const Pizza = mongoose.model('pizza', pizzaSchema, 'pizza');

// Middleware для парсинга JSON
app.use(express.json());

export  {Pizza};

app.use(cors());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

