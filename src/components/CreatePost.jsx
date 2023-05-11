import { useState, useCallback } from "react";
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

  return (
    <>
      <Button
        onClick={showModal}
      >
        Создать пост
      </Button>
      <Modal
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        open={isModalOpen}
      >
        <animated.div style={modalAnimation}>
              <div className="text-3xl flex font-semibold justify-between">
                <h3>Создать пост</h3>
              </div>
              <div className="py-5">
                <Form
                  {...layout}
                  initialValues={formData}
                  onValuesChange={handleFormChange}
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="image"
                    label="Ссылка картинки поста"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите ссылку на картинку",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="title"
                    label="Заголовок поста"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите заголовок",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="text"
                    label="Текст поста"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите текст",
                      },
                    ]}
                  >
                    <Input.TextArea rows={10} />
                  </Form.Item>
                  <Form.Item
                    name="tags"
                    label="Теги поста"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите теги",                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">
                  Создать
                </Button>
              </Form.Item>
            </Form>
          </div>
    </animated.div>
  </Modal>
</>); };
export default CreatePost;