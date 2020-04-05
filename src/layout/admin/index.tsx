import React, {useEffect} from 'react';
import {useLocation, useRouteMatch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Layout} from 'antd'
import {Switch, Route} from 'react-router-dom';
import AdminHome from '../../features/admin/home';
import AdminHeader from '../../features/admin/header';
import BlogBreadCrumb from '../../features/admin/bread-crumb/BlogBreadCrumb';
import AdminSidebar from '../../features/admin/sidebar/AdminSidebar';
import PageNotFound from '../../features/404';

export const AdminLayout = () => {
    const match = useRouteMatch();
    const location = useLocation();
    const user = useSelector((state: RootState) => state.user);
    const { Sider, Header, Content, Footer } = Layout;

    const layout = (
        <Layout className='admin-container'>

            <Header className='admin-header'>
                <AdminHeader />
            </Header>

            <Layout>
                <Sider width={200} className='admin-sider' >
                    <AdminSidebar selectedKeys={[location.pathname]} />
                </Sider>
                <Layout className='admin-content-wrap'>
                    <BlogBreadCrumb list={[]} />
                    <Content className='admin-content'>
                        <Switch>
                            <Route path={`${match.path}/home`}><AdminHome/></Route>
                        </Switch>
                        <Route path={'*'}><PageNotFound/></Route>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );

    const content = user.role === 1 ? layout : layout;

    return content;
};

export default AdminLayout;
