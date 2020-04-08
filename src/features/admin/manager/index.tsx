import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment'
import {download} from '../../../utils/download';
import {Button, Form, Input, message, Popconfirm, Select, Switch, Table, Tag} from 'antd';
import {Article, ArticlesParam, Category, Tag as ITag, newArticleParams} from '../../../api/article';
import {useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import service from '../../../utils/axios-config';

export const ArticleManager = () => {

    const [form] = Form.useForm();
    const [queryParams, setQueryParams] = useState<ArticlesParam>((newArticleParams()));
    const [batch, setBatch] = useState<boolean>(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [total, setTotal] = useState(0);

    const {tags, categories} = useSelector((state: RootState) => state.article);

    useEffect(() => {
        getArticles();
    }, []);

    function getArticles() {
        service.get<{ rows: Article[], count: number }>('/article/list', {params: queryParams})
            .then((res) => {
                setArticles(res.data.rows || []);
                setTotal(res.data.count || 0);
            })
    }

    function renderColor(name: string, list: ITag[]) {
        const target = list.find(l => l.name === name);
        return target && target.color;
    }

    const columns = [
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            title: '标签',
            dataIndex: 'tags',
            render: (text: ITag[], record: Article) => {
                return text.map(d => (
                    <Tag color={renderColor(d.name, tags)} key={d.name}>
                        <Link to={`/tags/${d.name}`}>{d.name}</Link>
                    </Tag>
                ))
            }
        },
        {
            title: '分类',
            dataIndex: 'categories',
            render: (text: Category[], record: Article) => {
                return text.map(d => (
                    <Tag color='#2db7f5' key={d.name}>
                        <Link to={`/categories/${d.name}`}>{d.name}</Link>
                    </Tag>
                ))
            }
        },
        {
            title: '浏览数',
            dataIndex: 'viewCount',
            sorter: (a: Article, b: Article) => b.viewCount - a.viewCount,
        },
        {
            title: '发布时间',
            dataIndex: 'createdAt',
            sorter: (a: Article, b: Article) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
        },
        {
            title: '修改时间',
            dataIndex: 'updatedAt',
            sorter: (a: Article, b: Article) => (moment(a.updatedAt).isBefore(b.updatedAt) ? 1 : -1)
        },
        {
            dataIndex: 'id',
            title: '操作',
            render: (articleId: number, record: Article) => {
                return (
                    <ul className='action-list'>
                        <li>
                            <Link to={`/article/${articleId}`}>查看</Link>
                        </li>
                        <li>
                            <Link to={{pathname: `/admin/article/edit/${record.id}`, state: {articleId}}}>编辑</Link>
                        </li>
                        <li>
                            <a onClick={e => output(record.id, record.title)}>导出</a>
                        </li>
                        <li>
                            <Popconfirm title='Are you sure？' cancelText='No' onConfirm={e => deleteArticle(articleId)}>
                                <a className='delete-text'>删除</a>
                            </Popconfirm>
                        </li>
                    </ul>
                )
            }
        }
    ];

    function deleteArticle(id: number) {
        service.delete(`/article/${id}`)
            .then(() => {
                const list = articles.filter(a => a.id !== id);
                setArticles(list);
            })
            .catch(error => message.error('删除失败'));
    }

    function output(articleId: number, title: string) {
        download(`/article/output/${articleId}`)
    }

    function outputSelected() {
        download(`/article/output/list/${selectedRowKeys}`)
    }

    function outputAll() {
        download('/article/output/all')
    }

    function delList() {
        service.delete(`/article/list/${selectedRowKeys}`).then(() => {
            getArticles();
            setSelectedRowKeys([]);
        })
    }

    function handleSubmit(values: { [key: string]: string }) {
        setQueryParams({...queryParams, ...values});
        getArticles();
    }

    const rowSelection = batch ? {
        selectedRowKeys,
        onChange: (selectList: (string | number)[]) => setSelectedRowKeys(selectList)
    } : {};

    return (
        <div className='admin-article-manager'>
            {/* 检索 */}
            <Form layout='inline' onFinish={handleSubmit} style={{marginBottom: 20}} form={form}>
                <Form.Item label='关键词' name={'keyword'}>
                    <Input placeholder='请输入文章关键词' allowClear/>
                </Form.Item>
                <Form.Item label='标签' name={'tag'}>
                    <Select style={{width: 200}} allowClear>
                        {tags.map(item => (
                            <Select.Option key={item.name} value={item.name}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label='分类' name={'category'}>
                    <Select style={{width: 200}} allowClear>
                        {categories.map(item => (
                            <Select.Option key={item.name} value={item.name}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' style={{marginRight: 8}}>检索</Button>
                    <Button type='primary' htmlType={'button'} onClick={outputAll} style={{marginRight: 8}}>
                        导出全部文章
                    </Button>
                </Form.Item>
            </Form>

            <Table columns={columns} dataSource={articles || []}
                   className={'admin-table'} rowKey={'id'}
                   rowSelection={rowSelection}
                   pagination={{
                       current: queryParams.page, pageSize: queryParams.pageSize, total: total,
                       showTotal: total => `共${total}条`
                   }}
                   footer={() => (
                       <>
                           批量操作 <Switch checked={batch} onChange={e => setBatch(prev => !prev)}
                                        style={{marginRight: 8}}/>

                           {
                               batch && (
                                   <>
                                       <Button type='primary' size='small' style={{marginRight: 8}}
                                               disabled={selectedRowKeys.length === 0}
                                               onClick={outputSelected}>导出选中项</Button>
                                       <Popconfirm
                                           title='Are you sure delete the articles?'
                                           onConfirm={delList}
                                           okText='Yes'
                                           cancelText='No'
                                       >
                                           <Button type='danger' size='small'
                                                   disabled={selectedRowKeys.length === 0}>批量删除</Button>
                                       </Popconfirm>

                                   </>
                               )
                           }
                       </>
                   )}/>
        </div>
    )
};

export default ArticleManager;
