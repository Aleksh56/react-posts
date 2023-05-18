import { useState, useEffect,useCallback } from "react";
import { Input, Button, Divider, Image, Form } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import Header from "../Header/Header";
import EditProfile from "../EditProfile";
import {api} from "../../api/api";

const UserProfile = ({refreshPostsOnPage, handleUserDataUpdate}) => {
  const [avatarUrl, setAvatarUrl] = useState({avatar:""});
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await api.getUserInfo();
      setUserInfo(userData);
      window.localStorage.setItem("userData", JSON.stringify(userData));
      form.setFieldsValue({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
        email: userData.email,
      });
    };
    fetchUserData();
  }, [form, refreshPostsOnPage]);
  

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const formData = {
          name: values.name || userInfo.name,
          about: values.about || userInfo.about,
        };
        await api.updateUserAvatar(avatarUrl);
        const updatedUserData = await api.updateUserInfo(formData);
        await api.getUserInfo().then((data) => setUserInfo(data));
        handleUserDataUpdate(updatedUserData);
        refreshPostsOnPage();
      } catch (error) {
        console.error(error);
      }
    },
    [avatarUrl, handleUserDataUpdate, refreshPostsOnPage, userInfo]
  );

  return (
    <>
      <Header />
      <div className='container mx-auto h-screen flex items-center justify-center w-full'>
        <div className='user__info flex flex-col items-center p-5 border-2 border-black rounded-xl gap-8 w-1/2'>
          <h2 className='font-bold text-3xl'>Profile</h2>
          <div className='user__avatar flex items-center gap-4'>
            <div className='user__avatar-container flex flex-col items-center'>
              <p>Avatar</p>
              <Image
                width={150}
                height={150}
                className='rounded-full'
                src={userInfo.avatar}
                alt='User Avatar'
              />
            </div>
            <div className='user__avatar-buttons flex gap-3'>
            </div>
          </div>
          <Divider />
          <div className='user__about-container flex gap-7'>
          <Form
            id='edit-profile-form'
            form={form}
            onFinish={handleSubmit}
            layout='horizontal'
            initialValues={{
              name: userInfo.name,
              about: userInfo.about,
              avatar: userInfo.avatar,
              email: userInfo.email,
            }}>
            <Form.Item label='Фото профиля' name='avatar'>
              <Input
                placeholder='Ссылка на фото профиля'
                onChange={(e) => setAvatarUrl({...avatarUrl, avatar:e.target.value})}
              />
            </Form.Item>
            <Form.Item
              label='Имя'
              name='name'>
              <Input placeholder='Имя' />
            </Form.Item>
            <Form.Item label='Email' name='email'>
              <Input placeholder='Email' disabled />
            </Form.Item>
            <Form.Item
              label='О себе'
              name='about'>
              <Input.TextArea placeholder='Информация о себе' rows={6}  cols={40}/>
            </Form.Item>
          </Form>
          </div>
          <Button 
            key='submit'
            type='primary'
            form='edit-profile-form'
            htmlType='submit'
            className='self-center'>
            Сохранить
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
