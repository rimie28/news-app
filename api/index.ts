import express from 'express';
import cors from 'cors';
import path from 'path';
import newsRouter from './routers/newsRouter';
import commentsRouter from './routers/commentsRouter';
import fileDb from './fileDb';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
    await fileDb.init();
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch(console.error);
