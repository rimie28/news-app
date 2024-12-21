import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store.ts';
import { Link } from 'react-router-dom';
import {deleteNews, getNews} from "../features/news/newsSlice.ts";

const NewsList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const news = useSelector((state: RootState) => state.news.items);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    const deleteItem = (id: string) => {
        dispatch(deleteNews(id));
    };

    return (
        <div>
            {news.map((item) => (
                <div key={item.id} className="d-flex flex-column gap-2">
                    <h3>{item.title}</h3>
                    <p>{new Date(item.date).toLocaleDateString()}</p>
                    <div className="d-flex gap-2">
                        <Link to={`/news/${item.id}`}>Read Full Post</Link>
                        <button className="btn btn-primary" onClick={() => deleteItem(item.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsList;