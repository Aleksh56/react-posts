import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { api } from "../api/api";

const EditPost = ({ postInfo, closeModal }) => {
  const [postData, setPostData] = useState(postInfo);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      await api.updatePostInfo(values);
      closeModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    closeModal(false);
  };

  const handleSubmit = (values) => {
    setPostData({ ...postData, ...values });
  };

  return (
    <Modal
      title={`Редактирование поста - ${postData.title}`}
      open={true}
      onCancel={handleCancel}
      footer={[
        <Button key='cancel' onClick={handleCancel}>
          Отмена
        </Button>,
        <Button key='submit' type='primary' onClick={handleOk}>
          Сохранить изменения
        </Button>,
      ]}>
      <Form
        layout='vertical'
        onFinish={handleSubmit}
        initialValues={{ ...postData, tags: postData.tags.join(", ") }}
        form={form}>
        <Form.Item
          label='Ссылка картинки поста'
          name='image'
          rules={[{ required: true, message: "Введите ссылку на картинку" }]}>
          <Input placeholder='Ссылка картинки поста' />
        </Form.Item>
        <img
          className='rounded-full w-[250px] h-[250px] object-cover'
          src={postData.image}
          alt='Post'
        />
        <Form.Item
          label='Заголовок поста'
          name='title'
          rules={[{ required: true, message: "Введите заголовок" }]}>
          <Input placeholder='Заголовок поста' />
        </Form.Item>
        <Form.Item label='Теги поста' name='tags'>
          <Input placeholder='Теги поста (через запятую)' />
        </Form.Item>
        <Form.Item
          label='Текст поста'
          name='text'
          rules={[{ required: true, message: "Введите текст поста" }]}>
          <Input.TextArea placeholder='Текст поста' rows={6} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPost;
