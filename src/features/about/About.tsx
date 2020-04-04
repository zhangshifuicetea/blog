import React from 'react';
import { useMediaQuery } from 'react-responsive'
import {Avatar, Divider} from 'antd';
import './about.scss';
import {SIDEBAR} from '../../app/config';
import {MailOutlined, WechatOutlined} from '@ant-design/icons/lib';

export const About = () => {
    const iphoneScreen = useMediaQuery({ query: '(max-width: 576px)' });

    return (
        <div className='app-about' style={{ paddingRight: iphoneScreen ? 0 : 20 }}>
            <Avatar src={'images/avatar.jpg'}>张师傅</Avatar>
            <span style={{ paddingLeft: 10, fontStyle: 'italic' }}>{'Nothing is true, everything is permitted'}</span>
            <Divider orientation='left'>博客简述</Divider>
            <p>本博客使用的技术为 Typescript + React Hooks + Redux + antd + koa2 + mysql</p>
            <p>
                源码地址：
                <a href={SIDEBAR.github.link} target={'_blank'} rel={'noreferrer noopener'}>{'Github'}</a>
            </p>

            <Divider orientation='left'>可以公开的情报</Divider>

            <ul className='about-list'>
                <li>
                    联系方式：
                    <WechatOutlined/> <a>zcdenash</a>
                    <Divider type='vertical' />
                    <MailOutlined style={{ marginRight: 5, transform: 'translateY(0px)' }} />
                    <a href='mailto:tiejiayrz@outlook.com'>tiejiayrz@outlook.com</a>
                </li>
                <li>
                    技能
                    <ul>
                        <li>HTML CSS JavaScript TypeScript Node.js</li>
                        <li>Angular React Vue</li>
                        <li>antd ng-zorro material等 UI库</li>
                        <li>RxJS</li>
                        <li>Vscode、WebStorm、git 等开发工具</li>
                    </ul>
                </li>

                <li>
                    个人
                    <ul>
                        <li>爱好： 探寻有趣的事物，</li>
                        <li>欢迎交流！</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
};

export default About;
