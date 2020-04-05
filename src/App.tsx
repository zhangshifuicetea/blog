import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import WebLayout from './layout/web';
import AdminLayout from './layout/admin';
import PageNotFound from './features/404';

function App() {
    return (
        <Switch>
            <Route path={'/admin'}>
                <AdminLayout/>
            </Route>
            <Route path={'/'}>
                <WebLayout/>
            </Route>
        </Switch>
    );
}

export default App;
