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


mongoose.connect('mongodb+srv://kondratovdanil25042003:3m97nPYkz471f381@cluster0.bi7n1pj.mongodb.net/create-cart?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB подключен'))
    .catch(err => console.error('Ошибка подключения :', err));



// Middleware для парсинга JSON
app.use(express.json());

app.use(cors());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

