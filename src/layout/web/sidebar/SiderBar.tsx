import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import {apiArticles, Article, ArticlesParam, newArticleParams} from '../../../api/article';
import {fetchCategories, fetchTags} from '../../../features/article/articleSlice';
import {SIDEBAR} from '../../../app/config';
import {Divider, message, Tag} from 'antd';
import {Link} from 'react-router-dom';
import {GithubOutlined} from '@ant-design/icons';
import {WechatOutlined} from '@ant-design/icons/lib';

export const SideBar = () => {
    const dispatch = useDispatch();
    const {tags} = useSelector((state: RootState) => state.article);
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        dispatch(fetchTags());
        dispatch(fetchCategories());
    }, []);

    useEffect(() => {
        const param: ArticlesParam = {
            ...(newArticleParams()),
            order: 'viewCount DESC',
            page: 1,
            pageSize: 6,
        };
        apiArticles(param).then((res) => {
            setArticles(res.data.rows || []);
        }).catch((error) => {
            message.error('获取热门文章失败');
        })
    }, []);

    return (
        <div className='app-sidebar'>
            <img src={'images/avatar.jpg'} className='sider-avatar' alt=''/>
            <h2 className='title'>{SIDEBAR.title}</h2>
            <h5 className='sub-title' style={{fontStyle: 'italic'}}>{SIDEBAR.subTitle}</h5>
            <ul className='home-pages'>
                <li key={'github'}>
                    <GithubOutlined/>
                    <a href={SIDEBAR.github.link} target={'_blank'} rel={'noreferrer noopener'}>{'Github'}</a>
                </li>
                <li key={'wechat'}>
                    <WechatOutlined style={{top: 2, position: 'relative'}}/>
                    <span>{' zcdenash'}</span>
                </li>
            </ul>

            <Divider orientation='left'>热门文章</Divider>
            <ul className='article-list'>
                {articles.map(d => (
                    <li key={d.id}>
                        <Link to={`/article/${d.id}`}>{d.title}</Link>
                    </li>
                ))}
            </ul>

            <Divider orientation='left'>标签</Divider>
            <div className='tag-list'>
                {tags.map((tag, i) => (
                    <Tag key={i} color={tag.color}>
                        <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
                    </Tag>
                ))}
            </div>
        </div>
    )
};

export default SideBar;
