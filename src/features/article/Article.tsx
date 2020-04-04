import React, {useState} from 'react';
import './article.scss';
import { useMediaQuery } from 'react-responsive'
import { Drawer, Divider, Spin } from 'antd'
import {Article as IArticle, Comment as IComment} from '../../api/article';
import Discuss from './discuss';


export const Article = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [article, setArticle] = useState<IArticle>({
        id: -2,
        title: '',
        content: '',
        tags: [],
        categories: [],
        comments: [],
        createdAt: '',
        updatedAt: '',
        viewCount: 0,
    });

    function setCommentList(list: IComment[]) {
        setArticle({ ...article, comments: list });
    }

    return (
        <Discuss articleId={article.id} comments={article.comments || []} setComments={setCommentList} />
    )
};

export default Article;
