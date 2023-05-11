import { useState, useCallback } from "react";
<<<<<<< HEAD
import { useSpring, animated, config } from "react-spring";
import { BiX } from "react-icons/bi";
import { api } from "../api/api";
import styles from "../styles";
import { Modal, Form, Input, Button } from "antd";

const CreatePost = ({ refreshFlagOnPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    image: "",
    tags: [],
  });

  const handleSubmit = useCallback(
    async (values) => {
      try {
        console.log(formData);
        await api.addNewPost(formData);
        setShowModal(false);
        refreshFlagOnPage();
      } catch (error) {
        console.error(error);
      }
    },
    [formData, refreshFlagOnPage]
  );

  const modalAnimation = () =>
    useSpring({
      opacity: showModal ? 1 : 0,
      transform: showModal ? "translateY(0%)" : "translateY(-50%)",
      delay: 10,
      config: config.gentle,
    });

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  // A function that sets the form data when a field changes
  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
=======
import { Modal, Form, Input, Button } from "antd";
import { api } from "../api/api";
import { PlusOutlined } from "@ant-design/icons";

const CreatePost = ({ refreshFlagOnPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const handleOk = useCallback(async () => {
    try {
      const formData = form.getFieldsValue();
      console.log(formData);
      const response = await api.addNewPost(formData);
      console.log(response);
      setShowModal(false);
      refreshFlagOnPage();
    } catch (error) {
      console.error(error);
    }
  }, [form, refreshFlagOnPage]);

  const handleCancel = useCallback(() => {
    setShowModal(false);
  }, []);
>>>>>>> origin/master

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
