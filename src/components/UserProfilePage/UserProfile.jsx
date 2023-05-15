import { useState } from "react";
import { Input, Button, Divider, Image } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import Header from "../Header/Header";

const UserProfile = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [newName, setNewName] = useState(userData.name);
  const [newEmail, setNewEmail] = useState(userData.email);

  // Изменение аватара допилить
  // Сделать запрос на сервер - изменение данных
  return (
    <>
      <Header />
      <div className='container mx-auto h-screen flex items-center justify-center'>
        <div className='user__info flex flex-col items-start p-5 border-2 border-black rounded-xl gap-8'>
          <h2 className='font-bold text-3xl'>Profile</h2>
          <div className='user__avatar flex items-center gap-4'>
            <div className='user__avatar-container flex flex-col items-center'>
              <p>Avatar</p>
              <Image
                width={150}
                height={150}
                className='rounded-full'
                src={userData.avatar}
                alt='User Avatar'
              />
            </div>
            <div className='user__avatar-buttons flex gap-3'>
              <Button type='primary'>Primary Button</Button>
              <Button danger>Remove</Button>
            </div>
          </div>
          <Divider />
          <div className='user__about-container flex gap-7'>
            <div>
              <label htmlFor='name'>Имя</label>
              <Input
                id='name'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder='Имя'
                prefix={<UserOutlined />}
                className='w-full'
              />
            </div>
            <div>
              <label htmlFor='email'>Почта</label>
              <Input
                id='email'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder='Почта'
                prefix={<MailOutlined />}
                className='w-full'
              />
            </div>
          </div>
          <Button type='primary' className='self-center'>
            Сохранить
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
