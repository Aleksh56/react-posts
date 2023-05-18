// import { useState, useCallback } from "react";
// import { Modal, Form, Input, Button } from "antd";
// import { useSpring, animated, config } from "react-spring";
// import { api } from "../api/api";
// import { EditOutlined } from "@ant-design/icons";

// const EditProfile = ({ refreshPostsOnPage, userInfo }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [avatarUrl, setAvatarUrl] = useState({ avatar: "" });
//   const [form] = Form.useForm();

//   const handleSubmit = useCallback(
//     async (values) => {
//       try {
//         const formData = {
//           name: values.name || userInfo.name,
//           about: values.about || userInfo.about,
//         };
//         await api.updateUserAvatar(avatarUrl);
//         await api.updateUserInfo(formData);
//         setShowModal(false);
//         refreshPostsOnPage();
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     [avatarUrl, refreshPostsOnPage, userInfo]
//   );

//   const modalAnimation = useSpring({
//     opacity: showModal ? 1 : 0,
//     transform: showModal ? "translateY(0%)" : "translateY(-50%)",
//     delay: 10,
//     config: config.gentle,
//   });

//   const handleCancel = useCallback(() => {
//     setShowModal(false);
//   }, []);

//   return (
//     <>
//       <Button
//         size='large'
//         type='primary'
//         icon={<EditOutlined />}
//         onClick={() => setShowModal(true)}
//         className='header__logout-btn ml-2 rounded-lg bg-sky-500 py-2 px-3 text-white font-bold'></Button>
//       <Modal
//         title='Редактировать профиль'
//         open={showModal}
//         onCancel={handleCancel}
//         footer={[
//           <Button key='cancel' onClick={handleCancel}>
//             Отмена
//           </Button>,
//           <Button
//             key='submit'
//             type='primary'
//             form='edit-profile-form'
//             htmlType='submit'>
//             Изменить
//           </Button>,
//         ]}>
//         <animated.div style={modalAnimation}>
//           <Form
//             id='edit-profile-form'
//             form={form}
//             onFinish={handleSubmit}
//             layout='vertical'
//             initialValues={{
//               name: userInfo.name,
//               about: userInfo.about,
//               avatar: userInfo.avatar,
//               email: userInfo.email,
//             }}>
//             <Form.Item label='Фото профиля' name='avatar'>
//               <Input
//                 placeholder='Ссылка на фото профиля'
//                 onChange={(e) =>
//                   setAvatarUrl({ ...avatarUrl, avatar: e.target.value })
//                 }
//               />
//             </Form.Item>
//             <Form.Item
//               label='Имя'
//               name='name'
//               rules={[{ required: true, message: "Введите имя" }]}>
//               <Input placeholder='Имя' />
//             </Form.Item>
//             <Form.Item label='Email' name='email'>
//               <Input placeholder='Email' disabled />
//             </Form.Item>
//             <Form.Item
//               label='О себе'
//               name='about'
//               rules={[
//                 { required: true, message: "Введите информацию о себе" },
//               ]}>
//               <Input.TextArea placeholder='Информация о себе' rows={6} />
//             </Form.Item>
//           </Form>
//         </animated.div>
//       </Modal>
//     </>
//   );
// };

// export default EditProfile;
