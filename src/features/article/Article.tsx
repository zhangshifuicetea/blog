import React, {useEffect, useState} from 'react';
import {useLocation, useParams, useHistory} from 'react-router-dom'
import './article.scss';
import {useMediaQuery} from 'react-responsive'
import {Drawer, Divider, Spin} from 'antd'
import {Article as IArticle, Comment as IComment} from '../../api/article';

import Discuss from './discuss';
import service from '../../utils/axios-config';
import {calcCommentsCount, translateMarkdown} from '../../utils';
import ArticleTag from '../common/ArticleTag';
import {CommentOutlined, EyeOutlined, FileOutlined, MenuOutlined} from '@ant-design/icons/lib';
import Navigation from '../common/Navigation';


export const Article = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const location = useLocation();
    const {id} = useParams();
    const history = useHistory();
    const [article, setArticle] = useState<IArticle>({
        id: -2,
        title: '',
        content: '',
        tags: [],
        categories: [],
        comments: [],
        createdAt: '',
        updatedAt: '',
        viewCount: 0,
    });

    useEffect(() => {
        setTimeout(() => {
            const hash = decodeURI(location.hash);
            const ele: HTMLAnchorElement | null = document.querySelector(`a[href="${hash}"]`);
            ele && hash && ele.click() // 挂载时路由跳转到指定位置
        }, 800)
    }, []);

    useEffect(() => {
        const fetchData = (id: string | undefined) => {
            setLoading(true);
            service
                .get(`/article/${id}`)
                .then(res => {
                    res.data.content = translateMarkdown(res.data.content);
                    setArticle(res.data);
                    setLoading(false);
                })
                .catch(e => {
                    history.push('/404')
                })
        };
        fetchData(id);
    }, [history, id]);

    function setCommentList(list: IComment[]) {
        setArticle({...article, comments: list});
    }

    const {title, content, tags, categories, comments, createdAt, viewCount} = article;
    const articleId = +(id || 0);
    const isFoldNavigation = useMediaQuery({query: '(max-width: 1300px)'});

    return (
        <Spin tip='Loading...' spinning={loading}>
            <div className='app-article' style={{paddingRight: isFoldNavigation ? 0 : 275}}>
                <div className='post-header'>
                    <h1 className='post-title'>{title}</h1>

                    <div className='article-desc'>
            <span className='post-time'>
              <FileOutlined/>
                &nbsp; Posted on &nbsp;
                <span>{createdAt.slice(0, 10)}</span>
            </span>
                        <ArticleTag articleTags={tags} articleCategories={categories}/>
                        <Divider type='vertical'/>
                        <a className='comment-count' href='#discuss' style={{color: 'inherit'}}>
                            <CommentOutlined/>
                            <span style={{marginRight: 5}}> {calcCommentsCount(comments)}</span>
                        </a>
                        <EyeOutlined style={{marginRight: 2}}/>
                        <span>{viewCount}</span>
                    </div>
                </div>

                <div className='article-detail' dangerouslySetInnerHTML={{__html: content}}/>

                {isFoldNavigation ? (
                        <>
                            <div className='drawer-btn' onClick={e => setDrawerVisible(true)}>
                                <MenuOutlined className='nav-phone-icon'/>
                            </div>
                            <Drawer
                                title={title}
                                placement='right'
                                closable={false}
                                onClose={e => setDrawerVisible(false)}
                                visible={drawerVisible}
                                getContainer={(): any => document.querySelector('.app-article')}>
                                <div className='right-navigation'>
                                    <Navigation content={content}/>
                                </div>
                            </Drawer>
                        </>
                    )
                    : (
                        <div className='article-navigation'>
                            <Navigation content={content}/>
                        </div>
                    )}

                <Discuss articleId={article.id} comments={article.comments || []} setComments={setCommentList}/>
            </div>
        </Spin>
    )
};

export default Article;
