import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom'
import {RootState} from '../../../app/store';
import {Dropdown, Menu} from 'antd';
import {logout} from '../../user/userSlice';
import { DownOutlined } from '@ant-design/icons';

export const AdminHeader = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state: RootState) => state.user);

    const menu = (
        <Menu className='menu'>
            <Menu.Item>
        <span onClick={e => history.push('/')}>
          返回主页
        </span>
            </Menu.Item>
            <Menu.Item>
        <span
            onClick={e => {
                dispatch(logout());
                history.push('/')
            }}>
          退出登录
        </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div>
                <span className='header-title'>Blog Manager</span>
                <Dropdown overlay={menu} className='header-dropdown'>
                    <a className='ant-dropdown-link'>
                        {user.username} <DownOutlined />
                    </a>
                </Dropdown>
            </div>
        </>
    )
};

export default AdminHeader;
