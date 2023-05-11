import { useState, useCallback } from "react";
import { Modal, Form, Input, Button } from "antd";
import { api } from "../api/api";
import { PlusOutlined } from "@ant-design/icons";

const CreatePost = ({ refreshFlagOnPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();


  const handleOk = useCallback(async () => {
    try {
      const formData = await form.validateFields();
      const tags = formData.tags
      ? formData.tags
          .split(/[\s,]+/)
          .filter((tag) => tag !== "")
          .map((tag) => tag.trim())
      : [];  
      const response = await api.addNewPost({ ...formData, tags });
      setShowModal(false);
      refreshFlagOnPage();
    } catch (error) {
      console.error(error);
    }
  }, [form, refreshFlagOnPage]);

  const handleCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <Button
        type='primary'
        icon={<PlusOutlined />}
        onClick={() => setShowModal(true)}
        className='rounded-lg text-white font-bold'>
        Создать пост
      </Button>
      <Modal
        title='Создать пост'
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Отмена
          </Button>,
          <Button key='submit' type='primary' onClick={handleOk}>
            Создать
          </Button>,
        ]}>
        <Form form={form} layout='vertical'>
          <Form.Item
            label='Ссылка картинки поста'
            name='image'
            rules={[{ required: true, message: "Введите ссылку на картинку" }]}>
            <Input placeholder='Ссылка картинки поста' />
          </Form.Item>
          <Form.Item
            label='Заголовок поста'
            name='title'
            rules={[{ required: true, message: "Введите заголовок" }]}>
            <Input placeholder='Заголовок поста' />
          </Form.Item>
          <Form.Item
            label='Текст поста'
            name='text'
            rules={[{ required: true, message: "Введите текст поста" }]}>
            <Input.TextArea placeholder='Текст поста' rows={6} />
          </Form.Item>
          <Form.Item label='Теги поста' name='tags'>
            <Input placeholder='Теги поста (через запятую)' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePost;
