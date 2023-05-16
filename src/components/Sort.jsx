import React from 'react';
import { DownOutlined, CommentOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip, message } from 'antd';


const Sort = (postInfo) => {

    const handleMenuClick = (e) => {
        console.log(e);
    };


postInfo.postInfo.map((post) => {
    post.likes.sort((a,b) => {
        return b.length - a.length 
    });
})


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
        <>
            <Dropdown menu={menuProps}>
                <Button type='primary'>
                    <Space>
                        Sort by
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </>

    )
}

export default Sort;