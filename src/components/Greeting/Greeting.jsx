import React from "react";
import GreetingImage from "../../assets/greeting.png";
import GitHubMark from "../../assets/github-mark-white.png";

const Greeting = () => {
  return (
    <div className='flex items-center justify-between flex-col-reverse md:flex-row py-[100px] px-4'>
      <div className='greeting__info max-w-[55%]'>
        <h2 className='text-[#D05270] text-[50px] tracking-tight font-bold mb-[30px]'>
          React Posts
        </h2>
        <p className='mb-12'>
          React Posts - это проект, который позволяет пользователям создавать,
          просматривать, лайкать и комментировать посты. Пользователи могут
          зарегистрироваться, чтобы создавать свои собственные посты, добавлять
          комментарии и ставить лайки другим пользователям. Проект напоминает
          небольшой форум, где люди могут обсуждать различные темы, делиться
          своим мнением и получать обратную связь от других пользователей. Наш
          проект использует технологии React и Redux, что позволяет создавать
          масштабируемое и легко поддерживаемое приложение.
        </p>
        <div className='flex items-center gap-6 md:flex-row flex-col'>
          <a
            href='#'
            className='bg-black rounded-lg text-white font-bold flex items-center justify-center gap-3 p-4 flex-col md:flex-row'>
            <img
              src={GitHubMark}
              alt=''
              className='max-w-[20px] max-h-[20px]'
            />
            <span>GitHub(Александр)</span>
          </a>
          <a
            href='#'
            className='bg-black rounded-lg text-white font-bold flex items-center justify-center gap-3 p-4 flex-col md:flex-row'>
            <img
              src={GitHubMark}
              alt=''
              className='max-w-[20px] max-h-[20px] '
            />
            <span>GitHub(Никита)</span>
          </a>
        </div>
      </div>
      <div className='greeting__img mx-auto w-[30%] max-sm:hidden'>
        <img
          src={GreetingImage}
          alt=''
          className=' sm:max-w-full md:w-full md:max-w-full'
        />
      </div>
    </div>
  );
};

export default Greeting;
