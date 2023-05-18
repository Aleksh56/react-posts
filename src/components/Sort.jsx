import React from 'react';
import { DownOutlined, CommentOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip, message } from 'antd';

const Sort = ({ postInfo, onSort }) => {

    const handleMenuClick = (e) => {
        switch (e.key) {
            case '1':
                onSort(postInfo);
                break;
            case '2':
                onSort([...postInfo].sort((a, b) => b.likes.length - a.likes.length));
                break;
            case '3':
                onSort([...postInfo].sort((a, b) => b.comments.length - a.comments.length));
                break;
            default:
                break;
        }
    };
    const items = [
        {
            label: 'Default',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: 'Likes',
            key: '2',
            icon: <HeartOutlined />,
        },
        {
            label: 'Comments',
            key: '3',
            icon: <CommentOutlined />,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Dropdown menu={menuProps}>
            <Button type='primary'>
                <Space>
                    Sort by
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    )
}

export default Sort;