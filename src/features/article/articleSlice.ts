import {createSlice} from '@reduxjs/toolkit';

interface ArticleSliceState {
    categories: Category[];
    tags: Tag[];
}

const initialState: ArticleSliceState = {
    categories: [],
    tags: [],
};

const article = createSlice({
    name: 'article',
    initialState,
    reducers: {

    }
});

export default article.reducer;

export interface Category {
    id: number;
    name: string;
}

export interface Tag {
    id: number;
    name: string;
}
