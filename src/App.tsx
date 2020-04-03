import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import WebHeader from './layout/web/header';
import PageNotFound from './features/404';
import Home from './features/home';
import {BackTop, Col, Layout, Row} from 'antd';
import GithubLog from './features/user/GithubLog';
import SideBar from './layout/web/sidebar/SiderBar';
import Categories from './features/article/Categories';
import Archives from './features/article/Archives';

// 响应式
const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 };
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 };

function App() {
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
                                <Route exact path={'/'}><Home/></Route>
                                <Route path={'/archives'}><Archives/></Route>
                                <Route path={'/categories'}><Categories/></Route>
                                <Route path={'/github'}><GithubLog/></Route>
                                <Route path={'*'}><PageNotFound/></Route>
                            </Switch>
                        </div>
                    </Col>
                </Row>
                <BackTop target={(): any => (document.querySelector('.app-main'))} />
            </Layout>

        </React.Fragment>
    );
}

export default App;
