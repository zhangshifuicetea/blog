import React, {ChangeEvent, KeyboardEventHandler, MouseEventHandler, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {Dropdown, Input, Menu} from 'antd';
import {HomeOutlined, FolderOutlined, EditOutlined, UserOutlined, SearchOutlined, MenuOutlined} from '@ant-design/icons';
import {HEADER_BLOG_NAME} from '../../../../app/config';

export const WebHeaderLeft = () => {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setKeyword(event.target.value);
    };

    const onPressEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
        event.currentTarget.blur();
    };

    const onSubmit = () => {
        history.push(`/?page=1&keyword=${keyword}`);
        setKeyword('');
    };

    const search: MouseEventHandler = (e) => {
        e.stopPropagation();
    };

    const menu = (
        <Menu className={'header-nav'}>
            <Menu.Item key={'home'}>
                    <Link to={'/'}><HomeOutlined style={{marginRight: 15}} /><span className='nav-text'>首页</span></Link>
            </Menu.Item>
            <Menu.Item key={'archives'}>
                <Link to={'/archives'}><EditOutlined style={{marginRight: 15}} /><span className='nav-text'>归档</span></Link>
            </Menu.Item>
            <Menu.Item key={'categories'}>
                <Link to={'/categories'}><FolderOutlined style={{marginRight: 15}} /><span className='nav-text'>分类</span></Link>
            </Menu.Item>
            <Menu.Item key={'about'}>
                <Link to={'/about'}><UserOutlined style={{marginRight: 15}} /><span className='nav-text'>关于</span></Link>
            </Menu.Item>
            <Menu.Item key={'search'}>
                <SearchOutlined/>
                <Input
                    className='search-input'
                    onClick={search}
                    value={keyword}
                    onChange={onInputChange}
                    onPressEnter={onPressEnter}
                    onBlur={onSubmit}
                />
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header-left">
            <Link className='blog-name' to={'/'}>{HEADER_BLOG_NAME}</Link>
            <Dropdown
                overlayClassName='header-dropdown'
                trigger={['click']}
                overlay={menu}
                getPopupContainer={() => document.querySelector('.app-header .header-left') as HTMLElement}>
                <MenuOutlined className={'header-dropdown-icon'} />
            </Dropdown>
        </div>
    )
};

export default WebHeaderLeft;
