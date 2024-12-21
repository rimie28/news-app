import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store.ts';
import {getComments} from "../features/comments/commentsSlice.ts";


const OneNewsInfo: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const [commentForm, setCommentForm] = useState({author: '', text: ''});
    const newsItem = useSelector((state: RootState) => state.news.items.find((item) => item.id === id));

    useEffect(() => {
        if (id) dispatch(getComments(id));
    }, [dispatch, id]);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="container d-flex flex-column">
            <h1>{newsItem.title}</h1>
            <p>{new Date(newsItem.date).toLocaleDateString()}</p>
            <p>{newsItem.content}</p>
            {newsItem.image && <img src={newsItem.image} alt={newsItem.title}/>}
            <h3>Comments:</h3>
            <form className="d-flex flex-column gap-2" onSubmit={handleAddComment}>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Author"
                    value={commentForm.author}
                    onChange={(e) => setCommentForm({...commentForm, author: e.target.value})}
                />
                <textarea
                    className="form-control"
                    placeholder="Comment"
                    value={commentForm.text}
                    onChange={(e) => setCommentForm({...commentForm, text: e.target.value})}
                    required
                ></textarea>
                <button className="btn btn-primary" type="submit">Add Comment</button>
            </form>
        </div>
    )
}

export default OneNewsInfo;