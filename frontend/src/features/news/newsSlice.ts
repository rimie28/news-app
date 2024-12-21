import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from "../../axiosAPI.ts";

interface News {
    id: string;
    title: string;
    content: string;
    date: string;
    image?: string;
}

interface NewsState {
    items: News[];
}

const initialState: NewsState = {
    items: [],
};

export const getNews = createAsyncThunk('news/getNews', async () => {
    const response = await axiosAPI.get('/news');
    return response.data;
});

export const addNews = createAsyncThunk('news/addNews', async (formData: FormData) => {
    const response = await axiosAPI.post('/news', formData);
    return response.data;
});

export const deleteNews = createAsyncThunk('news/deleteNews', async (id: string) => {
    await axiosAPI.delete(`/news/${id}`);
    return id;
});

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNews.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addNews.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.items = state.items.filter((news) => news.id !== action.payload);
            });
    },
});

export const newsReducer =  newsSlice.reducer;
