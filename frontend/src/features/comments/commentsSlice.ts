import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from "../../axiosAPI.ts";

interface Comment {
    id: string;
    newsId: string;
    author: string;
    text: string;
}

interface CommentsState {
    items: Comment[];
}

const initialState: CommentsState = {
    items: [],
};

export const getComments = createAsyncThunk('comments/getComments', async (newsId: string) => {
    const response = await axiosAPI.get(`/news/${newsId}/comments`);
    return response.data;
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComments.fulfilled, (state, action) => {
                state.items = action.payload;
            })
    },
});

export const commentsReducer = commentsSlice.reducer;
