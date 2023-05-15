import React from "react";
import { Result, Button } from "antd";

const ErrorPage = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Result
        status='404'
        title='404'
        subTitle='Извините, страница не найдена.'
        extra={
          <Button type='primary' href='/'>
            Вернуться на главную страницу
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
