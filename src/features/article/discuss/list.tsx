import React, {
    ChangeEvent,
    KeyboardEventHandler, PropsWithChildren,
    useEffect,
    useState
} from 'react';
import {apiCreateReply, Comment as IComment} from '../../../api/article';
import {UserInfo} from '../../../api/user';
import {message, Comment, Popconfirm, Avatar, Tooltip, Input, Button} from 'antd';
import service from '../../../utils/axios-config';
import {translateMarkdown} from '../../../utils';
import moment from 'moment';

export interface IProp {
    comment: IComment;
    userInfo: UserInfo;
    comments: IComment[];
    articleId: number;
    commentId: number;
    replyId?: number;
    replyVisible: boolean;
    onReply: ({commentId, replyId}: { commentId: number, replyId?: number }) => void;
    setComments: (list: IComment[]) => void;
}

const CommentItem = (props: PropsWithChildren<IProp>) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        props.replyVisible && setValue('')
    }, [props.replyVisible]);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value);
    }

    const handleKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.ctrlKey && e.keyCode === 13) {
            onSubmit()
        }
    };

    function onSubmit() {
        apiCreateReply(props.userInfo.userId, props.articleId, props.commentId, value.trim())
            .then(res => {
                props.onReply({commentId: 0, replyId: 0});
                props.setComments(res.data.rows);
            }).catch((error) => {
            message.error('回复失败')
        })
    }

    // delete discuss
    const onDelete = () => {
        if (props.replyId) {
            service.delete(`/discuss/reply/${props.replyId}`).then(() => {
                const commentList: IComment[] = [...props.comments];
                const targetComment = commentList.find(c => c.id === props.commentId);
                if (targetComment) {
                    targetComment.replies = targetComment.replies.filter(r => r.id !== props.replyId);
                    props.setComments(commentList);
                }
            })
        } else {
            service.delete(`/discuss/comment/${props.commentId}`).then(() => {
                let commentList = [...props.comments];
                commentList = commentList.filter(c => c.id !== props.commentId);
                props.setComments(commentList)
            })
        }
    }

    function handleReply() {
        props.onReply({commentId: props.commentId, replyId: props.replyId});
    }

    return (
        <Comment
            actions={[
                <span onClick={handleReply}>Reply to</span>,
                <>
                    {props.userInfo.role === 1 && (
                        <Popconfirm title={'是否删除该留言？'} cancelText='取消' okText='确认' onConfirm={onDelete}>
                            <span className='icon-delete'>Delete</span>
                        </Popconfirm>
                    )}
                </>
            ]}
            author={<span>{props.comment?.user?.username}</span>}
            avatar={<Avatar src={props.comment?.user?.github?.avatar_url}>{props.comment?.user?.username}</Avatar>}
            content={
                <div className='article-detail'
                     dangerouslySetInnerHTML={{__html: translateMarkdown(props.comment?.content, true)}}/>
            }
            datetime={
                <Tooltip title={props.comment.createdAt}>
                    <span>{moment(props.comment.createdAt).fromNow()}</span>
                </Tooltip>
            }>
            {props.replyVisible && (
                <div className='reply-form'>
                    <Input.TextArea
                        placeholder={`回复${props.comment?.user?.username}...`}
                        value={value}
                        disabled={!props.userInfo?.username}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                    />
                    <div className='reply-form-controls'>
                        <span className='tip'>Ctrl or ⌘ + Enter</span>
                        <Button htmlType='submit' type='primary' disabled={!value.trim()} onClick={onSubmit}>
                            回复
                        </Button>
                    </div>
                </div>
            )}
            {props.children}
        </Comment>
    )
};

export const CommentList = ({
                                comments,
                                userInfo,
                                articleId,
                                setComments,
                            }: { comments: IComment[], userInfo: UserInfo, articleId: number, setComments: (list: IComment[]) => void }) => {
    const [replyTarget, setReply] = useState<{ commentId: number, replyId?: number }>({commentId: 0, replyId: 0});

    return (
        <div className='discuss-list'>
            {comments.map(comment => (
                <CommentItem
                    comment={comment}
                    key={comment.id}
                    articleId={articleId}
                    userInfo={userInfo}
                    commentId={comment.id}
                    setComments={setComments}
                    comments={comments}
                    onReply={setReply}
                    replyVisible={replyTarget.commentId === comment.id && !replyTarget.replyId}>
                    {comment.replies.map(reply => (
                        <CommentItem
                            comment={reply}
                            key={reply.id}
                            articleId={articleId}
                            userInfo={userInfo}
                            commentId={comment.id}
                            replyId={reply.id}
                            setComments={setComments}
                            comments={comments}
                            onReply={setReply}
                            replyVisible={replyTarget.commentId === comment.id && replyTarget.replyId === reply.id}
                        />
                    ))}
                </CommentItem>
            ))}
        </div>
    )
};

export default CommentList;
