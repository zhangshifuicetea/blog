import service from '../utils/axios-config';

export function apiLogin(data: LoginData) {
    return service.post<UserInfo>('/login', data);
}

export function apiRegister(data: RegisterData) {
    return service.post<UserInfo>('/register', data);
}

export function apiGithubLogin(data: {code: string}) {
    return service.post<UserInfo>('/login', data);
}

export interface LoginData {
    account: string;
    password: string;
}

export interface RegisterData {
    username: string;
    password: string;
    email: string;
}

export interface UserInfo {
    username: string,
    role: number,
    userId: number,
    github: null | GithubInfo,
    token: string | null,
    type?: number,
    createdAt?: string,
}

export interface GithubInfo {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    name: string;
    blog: string;
    bio: string;
}
