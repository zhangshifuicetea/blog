import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import {Comment} from '../../../api/article';
import List from './list';
import {apiCreateComment} from '../../../api/article';
import {Form, Avatar, Divider, message, Comment as CommentSection, Input, Button} from 'antd';
import {calcCommentsCount} from '../../../utils';
import {GithubOutlined, InfoCircleOutlined} from '@ant-design/icons/lib';
import './index.scss';

interface IProp {
    comments: Comment[];
    articleId: number;
    setComments: (list: Comment[]) => void;
}

export const Discuss = ({comments, articleId, setComments}: IProp) => {
    const user = useSelector((state: RootState) => state.user);
    const [value, setValue] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function submitForm() {
        if (!value) return;
        if (!user.username) return message.warn('没登录哦～');
        setSubmitting(true);
        apiCreateComment(articleId, value, user.userId).then((res) => {
            setComments(res.data.rows || []);
            setSubmitting(false);
        }, (error) => {
            setSubmitting(false);
            message.error('评论失败');
        })
    }

    return (
        <div id='discuss'>
            <div className='discuss-header'>
                <span className='discuss-count'>{calcCommentsCount(comments)}</span>
                {articleId !== -1 ? '条评论' : '条留言'}
                <Divider className='hr' />
            </div>

            <CommentSection
                avatar={
                    user.username ? (
                        <Avatar src={user.github?.avatar_url}>{user.username}</Avatar>
                    ) : (
                        <GithubOutlined style={{ fontSize: 40, margin: '5px 5px 0 0' }} />
                    )
                }
                content={
                    <div>
                        <Form.Item>
                            <Input.TextArea rows={3} placeholder={user.username ? 'let us talk...' : 'please login'}
                                            disabled={!user.username}
                                            onChange={(e) => setValue(e.target.value)} value={value} />
                        </Form.Item>
                        <Form.Item>
                            <div className='controls'>
                                <InfoCircleOutlined className='controls-tip-icon'  />
                                <span className='controls-tip'>支持 Markdown 语法</span>
                                <Button className='disscus-btn' htmlType='submit' loading={submitting} onClick={submitForm} type='primary'>
                                    {articleId !== -1 ? '添加评论' : '留言'}
                                </Button>
                            </div>
                        </Form.Item>
                    </div>
                }
            />

            <List comments={comments} articleId={articleId} userInfo={user} setComments={setComments} />
        </div>
    )
};

export default Discuss;
