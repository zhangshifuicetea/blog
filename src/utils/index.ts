import {getStorage} from './storage';
import marked from 'marked';
import xss from 'xss';

// 获取 token
export function getToken() {
    let token = '';
    const userInfo = getStorage('userInfo');

    if (userInfo && userInfo.token) {
        token = 'Bearer ' + userInfo.token
    }

    return token
}

// 转化 md 语法为 html
export const translateMarkdown = (plainText: string, isGuardXss = false) => {
    // @ts-ignore
    return marked(isGuardXss ? xss(plainText) : plainText, {
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        // tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: function(code) {
            // @ts-ignore
            return hljs.highlightAuto(code).value
        }
    })
};

// 获取 url query 参数
export const decodeQuery = (url: string) => {
    const params: {[key: string]: string} = {};
    const paramsStr = url.replace(/\.*\?/, ''); // a=1&b=2&c=&d=xxx&e
    paramsStr.split('&').forEach(v => {
        const d = v.split('=');
        if (d[1] && d[0]) params[d[0]] = d[1]
    });
    return params
};

// 计算 评论数
/*export const calcCommentsCount = commentList => {
    let count = commentList.length;
    commentList.forEach(item => {
        count += item.replies.length
    })
    return count
}*/

// 取数组中的随机数
export const randomIndex = (arr: unknown[]) => Math.floor(Math.random() * arr.length);

/**
 * 对数组进行分组
 */
export const groupBy = <T>(arr: T[], f: Function) => {
    const groups: {[key: string]: T[]} = {};
    arr.forEach(item => {
        const group = JSON.stringify(f(item));
        groups[group] = groups[group] || [];
        groups[group].push(item);
    });
    return Object.keys(groups).map(group => groups[group])
};

/**
 */
export function isExternal(path: string): boolean {
    return /^(https?:|mailto:|tel:|http:)/.test(path);
}

/**
 * 生成随机 ID
 */
export function RandomId(len: number): string {
    return Math.random()
        .toString(36)
        .substr(3, len);
}

/**
 * debounce
 */
export function debounce(func: Function, wait: number) {
    let timer: any;
    return (...args: any[]) => {
        console.log(this, 'debounced func this');
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, wait)
    }
}

// 生成 color
/*export function genertorColor(list = [], colorList = COLOR_LIST) {
    const _list = [...list];
    _list.forEach((l, i) => {
        l.color = colorList[i] || colorList[randomIndex(colorList)]
    });
    return _list;
}*/

