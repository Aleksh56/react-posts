import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
// import EditProfile from "../EditProfile";
import { api } from "../../api/api";
import { LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

const Header = ({ handleLogout }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const handleUserDataUpdate = (newUserData) => {
    setUserData(newUserData);
  };

  return (
    <header className='bg-blue-300 px-4'>
      <div className='container mx-auto flex items-center justify-between py-4 w-full max-sm:flex-col max-sm:items-start'>
        <div className='header__logo flex items-center justify-center'>
          <Link to='/main'>
            <img
              src={Logo}
              alt='Main logo'
              className='max-w-[60px] max-h-[60px]'
              width='60px'
            />
          </Link>
          <Link to='/main'>
            <h1 className='ml-3'>Реактивные посты</h1>
          </Link>
        </div>
        <div className='header__signin flex items-center'>
          <div className='header__signin-info flex items-center justify-center'>
            <Link to={`/profile/${userData._id}`}>
              <div className='header__user-avatar flex flex-row items-center justify-center mr-5'>
                <img
                  src={userData.avatar}
                  alt='UserAvatar'
                  className='w-10 h-10 rounded-full mr-4 max-w-[40px] max-h-[40px]'
                />
                <p>{userData.name}</p>
              </div>
            </Link>
          </div>
          <Space size={8}>
            {/* <EditProfile
              refreshPostsOnPage={refreshPostsOnPage}
              userInfo={userInfo}
            /> */}
            <Button
              size='large'
              icon={<LogoutOutlined />}
              type='primary'
              href='/auth'
              onClick={handleLogout}></Button>
          </Space>
        </div>
      </div>
    </header>
  );
};

export default Header;
