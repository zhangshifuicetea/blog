import React from 'react';
import {useSelector} from 'react-redux'
import {Tag, Divider} from 'antd'
import {Category, Tag as ITag} from '../../api/article';
import {RootState} from '../../app/store';
import {Link} from 'react-router-dom';
import {FolderOutlined, TagsOutlined} from '@ant-design/icons/lib';

function getColor(name: string, colorList: ITag[]) {
    const target = colorList.find(c => c.name === name);
    return target ? target.color : '';
}

interface IProp {
    articleTags: ITag[];
    articleCategories: Category[];
}

export const ArticleTag = ({articleTags, articleCategories}: IProp) => {
    const {tags, categories} = useSelector((state: RootState) => state.article);
    return (
        <>
            {articleTags?.length > 0 && (
                <>
                    <Divider type='vertical' style={{ marginRight: 7 }} />
                    <TagsOutlined style={{ marginRight: 7 }} />
                    {articleTags.map((tag, i) => (
                        <Tag key={i} color={getColor(tag.name, tags)}>
                            <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
                        </Tag>
                    ))}
                </>
            )}
            {articleCategories?.length > 0 && (
                <>
                    <Divider type='vertical' style={{ marginRight: 7 }} />
                    <FolderOutlined style={{ marginRight: 7 }} />
                    {articleCategories.map((cate, i) => (
                        <Tag key={i} color={getColor(cate.name, categories)}>
                            <Link to={`/categories/${cate.name}`}>{cate.name}</Link>
                        </Tag>
                    ))}
                </>
            )}
        </>
    );
};

export default ArticleTag;
