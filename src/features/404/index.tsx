import React from 'react';
import {Button, Result} from 'antd';
import {useHistory } from 'react-router-dom';

export const PageNotFound = () => {
    const history = useHistory();

    return (
        <Result status={'404'} title={'404'} subTitle={'传送到了奇怪的地方 = ='}
        extra={
            <Button type={'primary'} onClick={() => history.push('/')}>回首页</Button>
        }>

        </Result>
    )
};

export default PageNotFound;
