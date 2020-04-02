import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Menu} from 'antd';
import { HomeOutlined, EditOutlined, FolderOutlined, UserOutlined } from '@ant-design/icons';

export const Navbar = () => {
    const location = useLocation();
    return (
        <Menu mode={'horizontal'} selectedKeys={[location.pathname]} className='header-nav'>
            <Menu.Item key={'/'}>
                <Link to={'/'}><HomeOutlined/><span className='nav-text'>首页</span></Link>
            </Menu.Item>
            <Menu.Item key={'/archives'}>
                <Link to={'/archives'}><EditOutlined/><span className='nav-text'>归档</span></Link>
            </Menu.Item>
            <Menu.Item key={'/categories'}>
                <Link to={'/categories'}><FolderOutlined/><span className='nav-text'>分类</span></Link>
            </Menu.Item>
            <Menu.Item key={'/about'}>
                <Link to={'/about'}><UserOutlined/><span className='nav-text'>关于</span></Link>
            </Menu.Item>
        </Menu>
    )
};

export default Navbar;
