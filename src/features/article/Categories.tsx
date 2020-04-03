import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Badge, Tag} from 'antd';
import {Link} from 'react-router-dom';

export const Categories = () => {
    const {categories} = useSelector((state: RootState) => state.article);

    return (
        <div className='app-categories'>
            <h2 className='title'>Categories</h2>
            <p className='category-all-title'>{`${categories.length} categories in total`}</p>

            <div className='categories-list'>
                {categories.map((item, i) => (
                    <Badge count={item.count} key={item.name}>
                        <Tag color={item.color}>
                            <Link to={`/categories/${item.name}`}>{item.name}</Link>
                        </Tag>
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default Categories;
