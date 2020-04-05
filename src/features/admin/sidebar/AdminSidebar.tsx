import React from 'react';
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom';
import {EditOutlined, FolderOutlined, HomeOutlined, SwitcherOutlined, UserOutlined} from '@ant-design/icons/lib';

export const AdminSidebar = ({selectedKeys}: { selectedKeys: string[] }) => {
    return (
        <Menu selectedKeys={selectedKeys} mode='inline'
              style={{height: '100%', borderRight: 0}}>
            <Menu.Item key={'/admin'}>
                <NavLink to={'/admin'}>
                    <HomeOutlined/>
                    <span>首页</span>
                </NavLink>
            </Menu.Item>
            <Menu.SubMenu key={'/admin/article'} title={<span><SwitcherOutlined/> 文章</span>}>
                <Menu.Item key={'/admin/article/manager'}>
                    <NavLink to={'/admin/article/manager'}>
                        <FolderOutlined/>
                        <span>管理</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={'/admin/article/add'}>
                    <NavLink to={'/admin/article/add'}>
                        <EditOutlined/>
                        <span>新增</span>
                    </NavLink>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key={'/admin/user'}>
                <NavLink to={'/admin/user'}>
                    <UserOutlined/>
                    <span>用户管理</span>
                </NavLink>
            </Menu.Item>
        </Menu>
    )
};

export default AdminSidebar;
