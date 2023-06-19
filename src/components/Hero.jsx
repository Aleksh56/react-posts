import React from "react";
import { Breadcrumb, Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreatePost from "./Posts/CreatePost";

const Hero = ({ refreshFlagOnPage }) => {
  return (
    <section className='hero py-10 px-4'>
      <div className='container mx-auto '>
        <Card className='welcome__block bg-red-400 rounded-lg p-7'>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className='welcome__greeting text-3xl font-bold py-5'>
            Добро пожаловать на страницу!
          </div>
          <div className='welcome__info flex items-center justify-between w-full'>
            <p>Вы можете выкладывать что угодно!</p>
            <CreatePost refreshFlagOnPage={refreshFlagOnPage}>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                className='bg-sky-700'>
                Create a new post
              </Button>
            </CreatePost>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Hero;
