import express from 'express';
import fileDb from '../fileDb';

const commentsRouter = express.Router();

commentsRouter.get('/:newsId', async (req, res) => {
    const { newsId } = req.params;
    const comments = (await fileDb.getComments()).filter(comment => comment.newsId === newsId);
    res.send(comments);
});

// @ts-ignore
commentsRouter.post('/', async (req, res) => {
    const { newsId, author, text } = req.body;

    const newComment = await fileDb.addComment({
        newsId,
        author: author || 'Anonymous',
        text,
    });
    res.status(201).send(newComment);
});


export default commentsRouter;
