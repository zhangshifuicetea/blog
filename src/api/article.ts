import service from '../utils/axios-config';
import {HOME_PAGESIZE} from '../app/config';

export function apiArticles(data: ArticlesParam) {
    return service.get<{rows: Article[], count: number}>('/article/list', {params: data});
}

export function apiTags() {
    return service.get<Tag[]>('/tag/list');
}

export function apiCategories() {
    return service.get<Category[]>('/category/list');
}

export class ArticlesParam {
    order?: string;
    page: number = 1;
    pageSize: number = HOME_PAGESIZE;
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
