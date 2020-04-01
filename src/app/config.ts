// API_BASE_URL
export const API_BASE_URL = 'http://127.0.0.1:6060';

// project config
export const HEADER_BLOG_NAME = '张师傅的博客';

export const OAUTH_CLIENT_ID = '7664239766c2a91959ba';
export const OAUTH_URL = 'https://github.com/login/oauth/authorize';

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

// pageSize
export const ARCHIVES_PAGESIZE = 15; // archives pageSize
export const TAG_PAGESIZE = 15; // tag / category pageSize
export const HOME_PAGESIZE = 10; // home pageSize

// === sidebar
export const SIDEBAR = {
    // avatar: require('@/assets/images/avatar.jpeg'), // 侧边栏头像
    avatar: '',
    title: '张师傅', // 标题
    subTitle: '一个脱离了高级趣味的人', // 子标题
    // 个人主页
    homepages: {
        github: {
            link: 'https://github.com/zhangshifuicetea',
        }
    }
};
