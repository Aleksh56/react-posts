import React from "react";
import GreetingImage from "../../assets/greeting.png";
import GitHubMark from "../../assets/github-mark-white.png";

const Greeting = () => {
  return (
    <div className='flex items-center justify-between py-[100px]'>
      <div className='greeting__info max-w-[55%]'>
        <h2 className='text-[#D05270] text-[50px] tracking-tight font-bold mb-[30px]'>
          React Posts
        </h2>
        <p className='mb-[60px]'>
          React Posts - это проект, который позволяет пользователям создавать,
          просматривать, лайкать и комментировать посты. Пользователи могут
          зарегистрироваться, чтобы создавать свои собственные посты, добавлять
          комментарии и ставить лайки другим пользователям. Проект напоминает
          небольшой форум, где люди могут обсуждать различные темы, делиться
          своим мнением и получать обратную связь от других пользователей. Наш
          проект использует технологии React и Redux, что позволяет создавать
          масштабируемое и легко поддерживаемое приложение.
        </p>
        <div className='flex items-center gap-6'>
          <a
            href='#'
            className='w-[240px] h-[60px] bg-black text-white font-bold flex items-center justify-center gap-3'>
            <img
              src={GitHubMark}
              alt=''
              className='max-w-[20px] max-h-[20px]'
            />
            GitHub(Александр)
          </a>
          <a
            href='#'
            className='w-[240px] h-[60px] bg-black text-white font-bold flex items-center justify-center gap-3'>
            <img
              src={GitHubMark}
              alt=''
              className='max-w-[20px] max-h-[20px]'
            />
            GitHub(Никита)
          </a>
        </div>
      </div>
      <div className='greeting__img'>
        <img src={GreetingImage} alt='' />
      </div>
    </div>
  );
};

export default Greeting;
