import express from 'express';
import multer from 'multer';
import fileDb from '../fileDb';

const newsRouter = express.Router();
const upload = multer({ dest: 'public/images/' });

newsRouter.get('/', async (req, res) => {
    const news = await fileDb.getNews();
    res.send(news);
});

// @ts-ignore
newsRouter.post('/', upload.single('image'), async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send({ error: 'Title and content are required!' });
    }

    const imagePath = req.file ? `/images/${req.file.filename}` : null;

    const newNews = await fileDb.addNews({ title, content, image: imagePath });
    res.status(201).send(newNews);
});

export default newsRouter;
