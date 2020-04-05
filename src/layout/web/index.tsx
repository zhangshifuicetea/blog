import React from 'react';
import {BackTop, Col, Layout, Row} from 'antd';
import WebHeader from './header';
import SideBar from './sidebar/SiderBar';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import Home from '../../features/home';
import Archives from '../../features/article/Archives';
import Categories from '../../features/article/Categories';
import ArticleList from '../../features/article/ArticleList';
import Article from '../../features/article/Article';
import About from '../../features/about/About';
import GithubLog from '../../features/user/GithubLog';
import AdminLayout from '../admin';
import PageNotFound from '../../features/404';

// 响应式
const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 };
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 };

export const WebLayout = () => {
    const match = useRouteMatch();

    return (
        <React.Fragment>
            <Layout className={'app-container'}>
                <WebHeader/>
                <Row className={'app-wrapper'}>
                    <Col {...siderLayout}>
                        <SideBar/>
                    </Col>

                    <Col {...contentLayout}>
                        <div className='app-main'>
                            <Switch>
                                <Route exact path={`/`}><Home/></Route>
                                <Route path={`/archives`}><Archives/></Route>
                                <Route path={`/categories`}><Categories/></Route>
                                <Route path={`/categories/:name`}><ArticleList type={'category'}/></Route>
                                <Route path={`/tags/:name`}><ArticleList type={'tag'}/></Route>
                                <Route path={`/categories`}><Categories/></Route>
                                <Route path={`/article/:id`}><Article/></Route>
                                <Route path={`/about`}><About/></Route>
                                <Route path={`/github`}><GithubLog/></Route>
                                <Route path={'*'}><PageNotFound/></Route>
                            </Switch>
                        </div>
                    </Col>
                </Row>
                <BackTop target={(): any => (document.querySelector('.app-main'))} />
            </Layout>

        </React.Fragment>
    );
};

export default WebLayout;
