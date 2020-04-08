import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Article, ArticlesParam, newArticleParams} from '../../api/article';
import {ARCHIVES_PAGESIZE} from '../../app/config';
import {fetchArticles} from './articleSlice';
import {groupBy} from '../../utils';
import {Pagination, Timeline} from 'antd';
import {Link} from 'react-router-dom';
import { ClockCircleOutlined } from '@ant-design/icons';
import './archives.scss';

export const Archives = () => {
    const dispatch = useDispatch();
    const {articles, count, params} = useSelector((state: RootState) => state.article);

    function changePage(page: number) {
        document.querySelector('.app-main')!.scrollTop = 0;
        const params: ArticlesParam = {...(newArticleParams()), page, pageSize: ARCHIVES_PAGESIZE};
        dispatch(fetchArticles(params));
    }

    useEffect(() => {
        changePage(1);
    }, []);

    const list = groupBy<Article>(articles, (item) => {
        return item.createdAt.slice(0, 4);
    });

    return (
        <div className='app-archives' style={{padding: 20}}>
                <Timeline>
                    {list.map((d, i) => (
                        <React.Fragment key={i}>
                            {i === 0 && (
                                <Timeline.Item>
                                    <span className='desc'>{`Nice! ${count} posts in total. Keep on posting.`}</span>
                                    <br />
                                    <br />
                                </Timeline.Item>
                            )}

                            <Timeline.Item dot={<ClockCircleOutlined style={{fontSize: 16}} />} color='red'>
                                <div className='year'>
                                    {d[0]['createdAt'].slice(0, 4)}
                                    ...
                                </div>
                                <br />
                            </Timeline.Item>

                            {d.map(item => (
                                <Timeline.Item key={item.id}>
                                    <span style={{ fontSize: '13px', marginRight: '16px' }}>{item.createdAt.slice(5, 10)}</span>
                                    <Link to={`/article/${item.id}`}>{item.title}</Link>
                                </Timeline.Item>
                            ))}
                        </React.Fragment>
                    ))}
                </Timeline>

                <Pagination total={count} current={params.page} pageSize={params.pageSize} onChange={page => changePage(page)} />
        </div>
    );
};

export default Archives;
