import React, {useEffect} from 'react';
import {Button, Form, Input} from 'antd';
import {useLocation} from 'react-router-dom';
import {userLogin, userRegister} from './userSlice'
import {useDispatch} from 'react-redux';
import {saveStorage} from '../../utils/storage';
import {OAUTH_CLIENT_ID, OAUTH_URL} from '../../app/config';
import { GithubOutlined } from '@ant-design/icons';
import {LoginData, RegisterData} from '../../api/user';

interface IProps {
    type: string;
    closeModal: () => void;
}

export const AuthForm = ({type, closeModal}: IProps) => {
    const dispatch = useDispatch();
    const location = useLocation(); // location
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    });

    const FormItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6}
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 18}
        }
    };

    const tailFormItemLayout = {
        wrapperCol: {
            span: 24
        },
    };

    function githubLogin() {
        const {pathname, search} = location;
        saveStorage('prevRouter', `${pathname}${search}`);
        window.location.href = `${OAUTH_URL}?client_id=${OAUTH_CLIENT_ID}`
    }

    const onFinish = (values: {[key: string]: string}) => {
        if (type === 'login') {
            const data: LoginData = {account: values.name, password: values.password};
            dispatch(userLogin(data));
        } else {
            const data: RegisterData = {username: values.name, password: values.password, email: values.email};
            dispatch(userRegister(data));
        }
        closeModal();
    };

    const registerSection = (
        <React.Fragment>
            <Form.Item label={'确认密码'} name={'confirm'} dependencies={['password']} rules={[
                {required: true},
                ({getFieldValue}) => {
                    return {
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('密码不一致');
                        }
                    }
                }
                ]}>
                <Input.Password autoComplete={'new-password'} />
            </Form.Item>
            <Form.Item label={'邮箱'} name={'email'} rules={[{required: true}, {type: 'email', message: '请输入有效的邮箱'}]}>
                <Input autoComplete={'email'}/>
            </Form.Item>
        </React.Fragment>
    );

    return (
        <Form layout={'horizontal'} {...FormItemLayout} scrollToFirstError onFinish={onFinish} form={form}>
            <Form.Item label={'用户名'} name={'name'} rules={[{required: true}]}>
                <Input autoComplete={'username'} />
            </Form.Item>
            <Form.Item label={'密码'} name={'password'} rules={[{required: true}]}>
                <Input.Password autoComplete={'new-password'} />
            </Form.Item>
            {type === 'register' && registerSection}
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" block htmlType="submit">
                    {type === 'login' ? '登录' : '注册'}
                </Button>
                <Button block icon={<GithubOutlined />} onClick={githubLogin} style={{ marginTop: 10 }}>
                    github login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AuthForm;
