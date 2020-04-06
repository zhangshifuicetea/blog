import React, {MouseEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Breadcrumb} from 'antd';

interface IBread {
    link: string;
    name: string;
    goBack?: boolean;
}

export const BlogBreadCrumb = ({list}: {list: (IBread & string)[]}) => {
    const history = useHistory();
    const first: (IBread | string)[] = [{link: '/admin', name: '首页'}];
    const breadcrumbList = list?.length > 0 ? first.concat(list) : [];

    function handleClick(e: MouseEvent<HTMLAnchorElement>, goBack = false) {
        if (goBack) {
            e.preventDefault();
            history.go(-1)
        }
    }

    return (
        <Breadcrumb style={{margin: '16px 0'}}>
            {breadcrumbList.map((item, index) => (
                <Breadcrumb.Item key={index}>
                    {typeof item === 'string' ? item :
                        <Link to={item.link || '/'} onClick={e => handleClick(e, item.goBack)}>{item.name}</Link>}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
};

export default BlogBreadCrumb;
