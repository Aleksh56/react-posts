import React from "react"
import { Breadcrumb, Card } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import CreatePost from "./CreatePost"

const { Meta } = Card

const Hero = ({ refreshFlagOnPage }) => {
  return (
    <section className="hero py-10 px-4">
      <div className="container mx-auto">
        <Card className="welcome__block bg-white rounded-lg p-7">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Page</Breadcrumb.Item>
          </Breadcrumb>
          <div className="welcome__greeting text-3xl font-bold py-5">
            Добро пожаловать на страницу!
          </div>
          <div className="welcome__info flex items-center justify-between w-full">
            <p>Вы можете выкладывать что угодно!</p>
            <CreatePost refreshFlagOnPage={refreshFlagOnPage}>
              <Card bordered={false}>
                <Meta
                  avatar={<PlusOutlined />}
                  title="Create a new post"
                  description="Click to create a new post"
                />
              </Card>
            </CreatePost>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default Hero
