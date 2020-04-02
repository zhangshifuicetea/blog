import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getStorage} from '../../utils/storage';
import {useHistory } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {decodeQuery} from '../../utils';
import {apiGithubLogin} from '../../api/user';
import {login} from './userSlice';
import {message} from 'antd';

export const GithubLog = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // github loading
    useEffect(() => {
        function jumpToBefore() {
            const url = getStorage('prevRouter') || '/';
            if (url.includes('?code=')) {
                history.push('/')
            } else {
                history.push(url)
            }
        }

        const params = decodeQuery(location.search);
        if (params.code) {
            // github callback code
            apiGithubLogin({code: params.code}).then((res) => {
                dispatch(login(res.data));
                message.success('登录成功');
                jumpToBefore();
            }).catch((error) => {
                jumpToBefore();
                message.error('登录失败');
            })
        }
    }, [dispatch, location.search, history]);

    return (
        <div className='github-loading-container'>
            <div>
                <img
                    src='https://github.githubassets.com/images/spinners/octocat-spinner-64.gif'
                    alt='loading'
                    className='github-loading-img'
                />
            </div>
            <div className='text'>Loading activity...</div>
        </div>
    )
};

export default GithubLog;
