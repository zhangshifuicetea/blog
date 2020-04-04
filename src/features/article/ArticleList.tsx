import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {ArticlesParam} from '../../api/article';
import {TAG_PAGESIZE} from '../../app/config';
import {fetchArticles} from './articleSlice';
import {Link, useParams} from 'react-router-dom';
import {Pagination, Timeline} from 'antd';
import './article-list.scss'

interface IProp {
    type: 'tag' | 'category';
}

export const ArticleList = ({type}: IProp) => {
    const dispatch = useDispatch();
    const {name} = useParams();
    const {articles, count, params} = useSelector((state: RootState) => state.article);

    function changePage(page: number) {
        document.querySelector('.app-main')!.scrollTop = 0;
        const params: ArticlesParam = {
            ...(new ArticlesParam()), page, pageSize: TAG_PAGESIZE,
            tag: type === 'tag' ? name : undefined,
            category: type === 'category' ? name : undefined,
        };
        dispatch(fetchArticles(params));
    }

    useEffect(() => {
        changePage(1);
    }, []);

    return (
        <div className='app-tags'>
            <div className='timeline'>
                <Timeline>
                    <Timeline.Item>
                        <h1 className='list-title'>
                            {name}
                            <small className='type-name'> {type.toUpperCase()}</small>
                        </h1>
                        <br/>
                    </Timeline.Item>
                    {articles.map(item => (
                        <Timeline.Item key={item.id}>
                            <span style={{fontSize: '13px', marginRight: '16px'}}>{item.createdAt.slice(5, 10)}</span>
                            <Link to={`/article/${item.id}`}>{item.title}</Link>
                        </Timeline.Item>
                    ))}
                </Timeline>
            </div>
            <Pagination total={count} current={params.page} pageSize={params.pageSize}
                        onChange={page => changePage(page)}
                        style={{float: 'initial', marginTop: 10}}
            />
        </div>
    );
};

export default ArticleList;
