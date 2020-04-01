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
    const [authType, setAuthType] = useState('');
    const [modalOpen, showModal] = useState(false);
    const closeModal = () => {
        showModal(false);
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
                            onClick={(event) => {
                                setAuthType('login');
                                showModal(true);
                            }}>
                            登录
                        </Button>
                        <Button ghost type='danger' size='small' onClick={(event) => {
                            setAuthType('register');
                            showModal(true);
                        }}>
                            注册
                        </Button>
                    </>
                )}
            <Modal
                width={420}
                title={authType === 'login' ? '登录' : '注册'}
                visible={modalOpen}
                onCancel={e => closeModal()}
                footer={null}>
                <AuthForm type={authType} closeModal={() => closeModal()}/>
            </Modal>
        </div>
    )
};

export default UserInfo;
