import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import './index.scss';
import {Article, Category, Tag} from '../../../api/article';
import {useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import service from '../../../utils/axios-config';
import {BackTop, Button, Input, message, Modal} from 'antd';
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import EditorTags from './Tag';
import { SyncOutlined } from '@ant-design/icons';
import {PlusOutlined} from '@ant-design/icons/lib';

export const ArticleEdit = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [tagList, setTagList] = useState<string[]>([]);
    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [tagSelectedList, setTagSelectedList] = useState<string[]>([]);
    const [cateSelectedList, setCateSelectedList] = useState<string[]>([]);

    const {tags, categories} = useSelector((state: RootState) => state.article);
    const user = useSelector((state: RootState) => state.user);

    const {editId} = useParams();
    const history = useHistory();


    useEffect(() => {
        // did mounted
        console.log(editId, 'editId')
        if (editId) {
            fetchArticle(+editId)
        } else {
            const ts = tags.map(d => d.name).slice(0, 10);
            const cs = categories.map(d => d.name).slice(0, 10);
            setTagList(ts);
            setCategoryList(cs);
            ts[0] && setTagSelectedList([ts[0]]);
            cs[0] && setCateSelectedList([cs[0]]);
        }
    }, [editId, tags, categories]);

    function fetchArticle(id: number) {
        service.get<Article>(`/article/${id}?type=0`).then(res => {
            setTitle(res.data.title);
            setContent(res.data.content);
            const tags = res.data.tags?.map(d => d.name);
            const categories = res.data.categories?.map(d => d.name);
            setTagList(tags);
            setCategoryList(categories);
            setTagSelectedList(tags);
            setCateSelectedList(categories);
        })
    }

    function add() {
        if (!title) return message.warning('标题不能为空！');
        service
            .post<Article>('/article', {
                title,
                content,
                tagList: tagSelectedList,
                categoryList: cateSelectedList,
                authorId: user.userId,
            })
            .then(res => {
                Modal.confirm({
                    title: '文章创建成功！是否立即查看？',
                    onOk: () => history.push(`/article/${res.data.id}`)
                })
            })
    }

    function update() {
        service
            .put(`/article/${editId}`, {
                title,
                content,
                tags: tagSelectedList,
                categories: cateSelectedList
            })
            .then(() => {
                message.success('更新成功')
            })
    }

    return (
        <div className='admin-edit-article'>
            <ul className='form-list'>
                <li>
                    <span className='label'>标题：</span>
                    <span style={{flex: 1}}>
            <Input
                placeholder='请输入文章标题'
                className='title-input'
                name='title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
          </span>
                </li>
                <li>
                    <span className='label'>标签：</span>
                    <span>
            <EditorTags
                list={tagList}
                setList={setTagList}
                selectedList={tagSelectedList}
                setSelectedList={setTagSelectedList}
            />
          </span>
                </li>
                <li>
                    <span className='label'>分类：</span>
                    <span>
            <EditorTags
                list={categoryList}
                setList={setCategoryList}
                selectedList={cateSelectedList}
                setSelectedList={setCateSelectedList}
            />
          </span>
                </li>
            </ul>
            <SimpleMDE value={content} onChange={setContent}
                       options={
                           {
                               autofocus: true,
                               autosave: {enabled: true, uniqueId: 'article-editor'},
                           }
                       }
            />
            <Button
                type='primary'
                shape='circle'
                size='large'
                disabled={!title}
                className='action-icon'
                title={editId ? '更新' : '新增'}
                icon={editId ? <SyncOutlined /> : <PlusOutlined />}
                onClick={() => {
                    editId ? update() : add()
                }}
            />

            <BackTop target={(): any => document.querySelector('.admin-content-wrap')}/>
        </div>
    )
};

export default ArticleEdit;
