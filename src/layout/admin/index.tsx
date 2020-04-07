import React from 'react';
import {useLocation, useRouteMatch, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Layout} from 'antd'
import {Switch, Route} from 'react-router-dom';
import AdminHeader from '../../features/admin/header';
import BlogBreadCrumb from '../../features/admin/bread-crumb/BlogBreadCrumb';
import AdminSidebar from '../../features/admin/sidebar/AdminSidebar';
import PageNotFound from '../../features/404';
import ArticleManager from '../../features/admin/manager';
import ArticleEdit from '../../features/admin/article-edit/ArticleEdit';
import AdminUsers from '../../features/admin/users';

export const AdminLayout = () => {
    const match = useRouteMatch();
    const location = useLocation();
    const user = useSelector((state: RootState) => state.user);
    const { Sider, Header, Content } = Layout;

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
                    {/*<BlogBreadCrumb list={[]} />*/}
                    <Content className='admin-content'>
                        <Switch>
                            <Route exact path={match.path}><Redirect to={`${match.path}/article/manager`} /></Route>
                            <Route path={`${match.path}/article/manager`}><ArticleManager/></Route>
                            <Route path={`${match.path}/article/edit/:id`}><ArticleEdit/></Route>
                            <Route path={`${match.path}/article/add`}><ArticleEdit/></Route>
                            <Route path={`${match.path}/users`}><AdminUsers/></Route>
                            <Route path={'*'}><PageNotFound/></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );

    const content = user.role === 1 ? layout : layout;

    return content;
};

export default AdminLayout;
