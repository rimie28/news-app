import React, { useState, ChangeEvent } from 'react';
import FileInput from '../FileInput.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store.ts';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {addNews} from "../features/news/newsSlice.ts";

const AddNewsForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        content: '',
        image: null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('content', form.content);
        if (form.image) {
            formData.append('image', form.image);
        }
        dispatch(addNews(formData))
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Error adding news:', error);
            });
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm({...form,
            [name]: value});
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0] || null
            }));
        }
    };

    return (
        <form className="container d-flex flex-column gap-2" onSubmit={handleSubmit}>
            <input
                className="form-control"
                type="text"
                name="title"
                placeholder="Title"
                onChange={inputChangeHandler}
                required
            />
            <textarea
                className="form-control"
                name="content"
                placeholder="Content"
                onChange={inputChangeHandler}
                required
            ></textarea>
            <FileInput onChange={fileChangeHandler} name="image" label="Upload Image" />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default AddNewsForm;
