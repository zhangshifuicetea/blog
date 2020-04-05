import React from 'react';
import {Link} from 'react-router-dom';
import {Anchor} from 'antd';


interface IAnchor {
    tag: string, // 标签类型
    title: string,
    href: string,
    children: IAnchor[]
}

// 根据 article 来生成锚点列表
function getAnchorList(str: string) {
    const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g;
    const list: IAnchor[] = [];
    function pushItem(arr: IAnchor[], item: IAnchor) {
        const len = arr.length;
        const matchItem = arr[len - 1];
        if (matchItem && matchItem.tag !== item.tag) {
            pushItem(matchItem.children, item)
        } else {
            arr.push(item)
        }
    }
    str.replace(pattern, ($0, $1) => {
        const title = $0.replace(/.*?>/, '');
        const startIndex = $0.indexOf('"');
        const endIndex = $0.indexOf('">');

        const href = `#${$0.slice(startIndex + 1, endIndex)}`;
        const currentItem = {
            tag: $1, // 标签类型
            title,
            href,
            children: []
        };
        pushItem(list, currentItem);
        return '';
    });
    return list
}

export const Navigation = ({content}: {content: string}) => {
    const list = getAnchorList(content);
    function renderLink({ href, title, children }: IAnchor) {
        return (
            <Link key={href} to={href} title={title}>
                {children?.length > 0 && children.map(sub => renderLink(sub))}
            </Link>
        )
    }
    return <Anchor affix={false}>{list.map(renderLink)}</Anchor>
};

export default Navigation;
