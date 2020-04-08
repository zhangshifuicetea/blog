import React, {ChangeEvent, KeyboardEventHandler, useEffect, useState} from 'react';
import {Input} from 'antd'
import {SearchOutlined} from '@ant-design/icons';
import {ArticlesParam, newArticleParams} from '../../../../api/article';
import {useDispatch} from 'react-redux';
import {fetchArticles} from '../../../../features/article/articleSlice';
import {useHistory } from 'react-router-dom';
import {HOME_PAGESIZE} from '../../../../app/config';

export const HeaderSearch = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [key, setKeyword] = useState('');

    const onSubmit = () => {
        const data: ArticlesParam = {...(newArticleParams()), keyword: key || undefined, page: 1, pageSize: HOME_PAGESIZE};
        dispatch(fetchArticles(data));
        history.push('/');
    };

    /*useEffect(() => {
        onSubmit();
    }, []);*/

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setKeyword(event.target.value);
    };

    const onPressEnter: KeyboardEventHandler<HTMLInputElement> = e => {
        e.currentTarget.blur();
    };

    return (
        <div id='search-box'>
            <SearchOutlined className='search-icon'
                            onClick={onSubmit}/>

            <Input
                type='text'
                value={key}
                onChange={onInputChange}
                onBlur={onSubmit}
                onPressEnter={onPressEnter}
                className='search-input'
                placeholder='搜索文章'
                style={{ width: 200 }}
            />
        </div>
    )
};

export default HeaderSearch;
