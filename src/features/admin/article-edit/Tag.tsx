import React, {useState} from 'react';
import {Input, Tag, Tooltip} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface IProp {
    list: string[];
    selectedList: string[];
    setList: (list: string[]) => void;
    setSelectedList: (list: string[]) => void;
}

export const EditorTags = (
    {list, setList, selectedList, setSelectedList}: IProp
) => {
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    let inputRef: Input | null = null;

    function removeItem(item: string) {
        const newList = list.filter(l => l !== item);
        setList(newList);
    }

    function addItem() {
        if (inputValue && !list.find(d => d === inputValue)) {
            setList([...list, inputValue]);
            setSelectedList([...selectedList, inputValue]);
            setInputValue('');
        }

        setInputVisible(false)
    }

    function showInput() {
        setInputVisible(true);
        inputRef && inputRef.focus()
    }

    // 行点击选中事件
    function handleSelect(value: string, checked: boolean) {
        const newList = checked ? [...selectedList, value] : selectedList.filter(t => t !== value)
        setSelectedList(newList)
    }

    return (
        <>
            {list.map((item, index) => {
                const isLongTag = item.length > 20;
                const tagElem = (
                    <Tag.CheckableTag
                        key={item}
                        checked={selectedList.includes(item)}
                        onChange={checked => handleSelect(item, checked)}>
                        {isLongTag ? `${item.slice(0, 20)}...` : item}
                    </Tag.CheckableTag>
                );
                return isLongTag ? (
                    <Tooltip title={item} key={item}>
                        {tagElem}
                    </Tooltip>
                ) : (
                    tagElem
                )
            })}

            <Input
                style={{ width: 78, display: inputVisible ? 'inline' : 'none' }}
                ref={el => {
                    inputRef = el
                }}
                type='text'
                size='small'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onBlur={addItem}
                onPressEnter={addItem}
            />

            {!inputVisible && (
                <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                    <PlusOutlined /> New Tag
                </Tag>
            )}
        </>
    )
};

export default EditorTags;
