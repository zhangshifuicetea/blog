import React, {ChangeEvent, KeyboardEventHandler, useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {Input} from 'antd'
import {decodeQuery} from '../../../../utils';
import {SearchOutlined} from '@ant-design/icons';

export const HeaderSearch = () => {
    const history = useHistory();
    const location = useLocation();
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const { keyword } = decodeQuery(location.search);
        keyword && setKeyword(keyword);
    }, [location.search]);

    const onSubmit = () => {
        if (keyword) {
            history.push(`/?page=1&keyword=${keyword}`);
        } else {
            history.push('/');
        }
    };

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
                value={keyword}
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
