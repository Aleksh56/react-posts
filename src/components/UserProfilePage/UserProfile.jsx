import { useState, useEffect, useCallback } from "react";
import { Input, Button, Divider, Image, Form, Spin } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import Header from "../Header/Header";
import { api } from "../../api/api";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(window.localStorage.getItem("userData")) || {}
  );
  const [avatarUrl, setAvatarUrl] = useState(userInfo.avatar || "");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: userInfo.name,
      about: userInfo.about,
      avatar: userInfo.avatar,
      email: userInfo.email,
    });
  }, [form, userInfo]);

  const handleSubmit = useCallback(
    async (values) => {
      setLoading(true);
      try {
        const formData = {
          name: values.name || userInfo.name,
          about: values.about || userInfo.about,
        };
        await api.updateUserAvatar({ avatar: avatarUrl });
        const updatedUserData = await api.updateUserInfo(formData);
        console.log(updatedUserData);
        setUserInfo(updatedUserData);
        window.localStorage.setItem(
          "userData",
          JSON.stringify(updatedUserData)
        );
        setAvatarUrl(updatedUserData.avatar);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [avatarUrl, userInfo]
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
                src={avatarUrl}
                alt='User Avatar'
              />
            </div>
            <div className='user__avatar-buttons flex gap-3'></div>
          </div>
          <Divider />
          <div className='user__about-container flex gap-7'>
            <Form
              id='edit-profile-form'
              form={form}
              onFinish={handleSubmit}
              layout='horizontal'>
              <Form.Item label='Фото профиля' name='avatar'>
                <Input
                  placeholder='Ссылка на фото профиля'
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </Form.Item>
              <Form.Item label='Имя' name='name'>
                <Input placeholder='Имя' />
              </Form.Item>
              <Form.Item label='Email' name='email'>
                <Input placeholder='Email' disabled prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item label='О себе' name='about'>
                <Input.TextArea
                  placeholder='Информация о себе'
                  rows={6}
                  cols={40}
                />
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
          {loading && (
            <div className='spinner-container'>
              <Spin size='large' />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
