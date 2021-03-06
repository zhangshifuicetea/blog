import service from '../utils/axios-config';
import {HOME_PAGESIZE} from '../app/config';
import {UserInfo} from './user';

export function apiArticles(data: ArticlesParam) {
    return service.get<{rows: Article[], count: number}>('/article/list', {params: data});
}

export function apiTags() {
    return service.get<Tag[]>('/tag/list');
}

export function apiCategories() {
    return service.get<Category[]>('/category/list');
}

export function apiCreateComment(id: number, content: string, userId: number) {
    const data = {articleId: id, content, userId};
    return service.post<{rows: Comment[]}>('/discuss', data);
}

export function apiCreateReply(userId: number, articleId: number, commentId: number, content: string) {
    const data = {articleId, userId, commentId, content};
    return service.post<{rows: Comment[]}>('/discuss', data);
}

export function newArticleParams() {
    return <ArticlesParam>({page: 1, pageSize: HOME_PAGESIZE});
}

export interface ArticlesParam {
    order?: string;
    page: number;
    pageSize: number;
    keyword?: string;
    category?: string;
    tag?: string;
    preview?: number;
}

export interface Article {
    id: number;
    title: string;
    content: string;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    comments: any[];
    tags: Tag[];
    categories: Category[];
}


export interface Category {
    name: string;
    color?: string;
    count: number;
}

export interface Tag {
    color?: string;
    name: string;
    count: number;
}

export interface Comment {
    createdAt: string;
    id: number;
    content: string;
    replies: Comment[];
    user: UserInfo;
}
