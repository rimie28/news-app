import { promises as fs } from 'fs';
import { News, Comment } from './types';
import * as crypto from 'crypto';

const fileName = './db.json';
let data: { news: News[]; comments: Comment[] } = { news: [], comments: [] };

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = JSON.parse(fileContent.toString());
        } catch (error) {
            await this.save();
            console.error(error);
        }
    },
    async save() {
        await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    },
    async getNews() {
        return data.news;
    },
    async getComments() {
        return data.comments;
    },
    async addNews(newsItem: Omit<News, 'id' | 'date'>) {
        const id = crypto.randomUUID();
        const newNews = { id, ...newsItem, date: new Date().toISOString() };
        data.news.push(newNews);
        await this.save();
        return newNews;
    },
    async addComment(commentItem: Omit<Comment, 'id'>) {
        const id = crypto.randomUUID();
        const newComment = { id, ...commentItem };
        data.comments.push(newComment);
        await this.save();
        return newComment;
    },
};

export default fileDb;
