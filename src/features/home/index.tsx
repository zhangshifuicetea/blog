import {Divider, Empty, Drawer, Pagination} from 'antd'
import {Article, ArticlesParam} from '../../api/article';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {translateMarkdown} from '../../utils';
import {useHistory} from 'react-router-dom';
import {MenuOutlined} from '@ant-design/icons';
import {CommentOutlined, EyeOutlined} from '@ant-design/icons/lib';
import {fetchArticles} from '../article/articleSlice';

function Preview({list, showTitle = true}: { list: Article[], showTitle: boolean }) {
    return (
        <ul className='preview'>
            {showTitle && <Divider>文章列表</Divider>}
            {list.map(item => (
                <li key={item.id}>
                    <Link to={`/article/${item.id}`}>{item.title}</Link>
                </li>
            ))}
        </ul>
    )
}

function NoDataDesc({keyword}: { keyword: string }) {
    return keyword ? (
        <span>
      不存在标题/内容中含有 <span className='keyword'>{keyword}</span> 的文章！
    </span>
    ) : (
        <span>暂无数据...</span>
    )
}

export const Home = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const {articles, count, params} = useSelector((state: RootState) => state.article);

    const list = articles.map((item) => {
        const index = item.content.indexOf('<!--more-->');
        item.content = translateMarkdown(item.content.slice(0, index));
        return item;
    });

    const isGreaterThan1300 = useMediaQuery({
        query: '(min-width: 1300px)'
    });

    function jumpTo(id: number) {
        history.push(`/article/${id}`)
    }

    function changePage(page: number) {
        document.querySelector('.app-main')!.scrollTop = 0;
        const params: ArticlesParam = {...(new ArticlesParam()), page};
        dispatch(fetchArticles(params));
    }

    return (
        <div className='app-home'>
            <ul className='app-home-list'>
                {list.map(item => (
                    <li key={item.id} className='app-home-list-item'>
                        <Divider orientation='left'>
                            <span className='title' onClick={() => jumpTo(item.id)}>
                              {item.title}
                            </span>
                            <span className='posted-time'>{item.createdAt.slice(0, 10)}</span>
                        </Divider>

                        <div
                            onClick={() => jumpTo(item.id)}
                            className='article-detail content'
                            dangerouslySetInnerHTML={{__html: item.content}}
                        />

                        <div className='list-item-others'>
                            <CommentOutlined />
                            <span style={{marginRight: 5}}> {item.comments?.length || 0}</span>

                            <EyeOutlined style={{marginRight: 5}} />
                            <span>{item.viewCount}</span>

                            {/*<ArticleTag tagList={item.tags} categoryList={item.categories}/>*/}
                        </div>
                    </li>
                ))}
            </ul>
            {list.length > 0 ? (
                <>
                    {isGreaterThan1300 ? (
                        <Preview list={list} showTitle={true}/>
                    ) : (
                        <>
                            <div className='drawer-btn' onClick={e => setDrawerVisible(true)}>
                                <MenuOutlined className='nav-phone-icon'/>
                            </div>
                            <Drawer
                                title='文章列表'
                                placement='right'
                                closable={false}
                                onClose={e => setDrawerVisible(false)}
                                visible={drawerVisible}
                                getContainer={(): any => document.querySelector('.app-home')}>
                                <Preview list={list} showTitle={false}/>
                            </Drawer>
                        </>
                    )}
                </>
            ) : (
                <>
                    {params.keyword && (
                        <div className='no-data'>
                            <Empty description={<NoDataDesc keyword={params.keyword}/>}/>
                        </div>
                    )}
                </>
            )}

            <Pagination total={count} current={params.page} pageSize={params.pageSize} onChange={page => changePage(page)}/>
        </div>
    )
};

export default Home;
