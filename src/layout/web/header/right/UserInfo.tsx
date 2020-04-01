import React, {useState} from 'react';
import {Button, Dropdown, Menu, Avatar, Modal} from 'antd'
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../app/store';
import {useHistory} from 'react-router-dom';
import {logout} from '../../../../features/user/userSlice';
import AuthForm from '../../../../features/user/AuthForm';

export const UserInfo = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [isLogging, showLogin] = useState(false);
    const [isRegistering, showRegister] = useState(false);
    const closeModal = () => {
      showLogin(false);
      showRegister(false);
    };

    const MenuOverlay = (
        <Menu>
            {user.role === 1 && (
                <React.Fragment>
                    <Menu.Item>
                        <span>导入文章</span>
                    </Menu.Item>
                    <Menu.Item>
                        <span onClick={e => history.push('/admin')}>后台管理</span>
                    </Menu.Item>
                </React.Fragment>
            )}
            <Menu.Item>
                <span className='user-logout' onClick={e => dispatch(logout())}>
                  退出登录
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='header-userInfo'>
            {user.username ? (
                    <Dropdown placement='bottomCenter' overlay={MenuOverlay} trigger={['click', 'hover']}>
                        <div style={{height: 55}}>
                            <Avatar src={user.github?.avatar_url}>{user.username}</Avatar>
                        </div>
                    </Dropdown>
                )
                : (
                    <>
                        <Button
                            ghost
                            type='primary'
                            size='small'
                            style={{marginRight: 20}}
                            onClick={e => showLogin(true)}>
                            登录
                        </Button>
                        <Button ghost type='danger' size='small' onClick={e => showRegister(true)}>
                            注册
                        </Button>
                    </>
                )}
            <Modal
                width={420}
                title={isLogging ? '登录' : '注册'}
                visible={isLogging || isRegistering}
                onCancel={e => closeModal()}
                footer={null}>
                <AuthForm type={isLogging ? 'login' : 'register'} closeModal={() => closeModal()}/>
            </Modal>
        </div>
    )
};

export default UserInfo;
