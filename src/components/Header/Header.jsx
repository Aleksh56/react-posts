import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Header = ({ handleLogout }) => {
  const userData = useSelector((state) => state.profile.data);
  // const dispatch = useDispatch();

  return (
    <header className='bg-blue-300 px-4 py-3'>
      <div className='container mx-auto flex items-center justify-center gap-5 md:gap-0 md:justify-between flex-col md:flex-row py-4 w-full max-sm:flex-col'>
        <div className='header__logo flex items-center justify-center'>
      <div className='container mx-auto flex flex-col sm:flex-row items-center justify-between py-4'>
        <div className='header__logo flex items-center justify-center mb-4 sm:mb-0'>
          <Link to='/main'>
            <h1 className='ml-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter'>
              Реактивные посты
            </h1>
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
          <Button
            size='large'
            icon={<LogoutOutlined />}
            type='primary'
            href='/auth'
            className='flex items-center justify-center'
            onClick={handleLogout}></Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
