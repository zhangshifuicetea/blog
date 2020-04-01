import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from 'antd';
import {Provider} from 'react-redux';
import App from './App';
import {store} from './app/store';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {BrowserRouter} from 'react-router-dom';

// styles
import './styles/index.scss';

moment.locale('zh-ch');

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
