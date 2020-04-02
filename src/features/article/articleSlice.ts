import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Article, Category, Tag, apiArticles, ArticlesParam, apiTags, apiCategories} from '../../api/article';
import {AppThunk} from '../../app/store';
import {message} from 'antd';
import {randomIndex} from '../../utils';

interface ArticleSliceState {
    categories: Category[];
    tags: Tag[];
    articles: Article[];
    count: number;
    params: ArticlesParam;
}

const initialState: ArticleSliceState = {
    categories: [],
    tags: [],
    articles: [],
    count: 0,
    params: new ArticlesParam(),
};

export interface ArticlePayload {
    articles: Article[];
    count: number;
    params: ArticlesParam;
}

const article = createSlice({
    name: 'article',
    initialState,
    reducers: {
        storeArticles(state, action: PayloadAction<ArticlePayload>) {
            state.articles = action.payload.articles || [];
            state.count = action.payload.count || 0;
            state.params = action.payload.params;
        },
        storeTags(state, action: PayloadAction<Tag[]>) {
            state.tags = generateColor(action.payload);
        },
        storeCategories(state, action: PayloadAction<Category[]>) {
            state.categories = generateColor(action.payload);
        }
    }
});

export const {storeArticles, storeTags, storeCategories} = article.actions;
export default article.reducer;


export const fetchArticles = (params: ArticlesParam): AppThunk => {
    return async (dispatch) => {
        try {
            const {rows, count} = (await apiArticles(params)).data;
            const payload: ArticlePayload = {articles: rows, count, params};
            dispatch(storeArticles(payload));
        } catch (error) {
            message.error('获取文章列表失败');
        }

    }
};

export const fetchTags = (): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await apiTags();
            dispatch(storeTags(res.data));
        } catch (error) {
            message.error('标签列表出错');
        }
    }
};

export const fetchCategories = (): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await apiCategories();
            dispatch(storeCategories(res.data));
        } catch (error) {
            message.error('分类列表出错');
        }
    }
};

// 生成 color
export function generateColor(list: (Tag | Category)[], colorList = COLOR_LIST): (Tag | Category)[] {
    const _list: (Tag | Category)[] = [...list];
    _list.forEach((l, i) => {
        l.color = colorList[i] || colorList[randomIndex(colorList)]
    });
    return _list;
}

// color List colr
export const COLOR_LIST: string[] = [
    'magenta',
    'blue',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'geekblue',
    'purple'
];
