import React, { useState } from "react";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import { addProfileData, setLoggedIn } from "../store/actions/ProfileActions";
import "../index.css";
import styles from "../styles";
import { handleRegisterCheck } from "../utils/RegisterCheck";

function AuthPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isLoginFormShown, setIsLoginFormShown] = useState(false);
  const [isResetFormShown, setIsResetFormShown] = useState(false);
  const dispatch = useDispatch();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const ProfileData = await api.handleLoginSubmit(event);
      if (ProfileData.success === 1) {
        dispatch(addProfileData(ProfileData.data));
        dispatch(setLoggedIn(true));
        dispatch(getAllPosts());
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Ошибка - ", error);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (handleRegisterCheck(registerPassword)) {
      try {
        const regResult = await api.handleRegisterSubmit(event);
        console.log(regResult);
        regResult === 1
          ? setIsLoginFormShown(true)
          : setIsLoginFormShown(false);
      } catch (error) {
        console.log("Ошибка - ", error);
      }
    } else {
      console.log(1);
    }
  };

  const toggleResetPassForm = () => {
    setIsResetFormShown(!isResetFormShown);
  };

  const toggleLoginAndRegForm = () => {
    setIsLoginFormShown(!isLoginFormShown);
  };

  return (
    <div className={`h-screen ${styles.flexRowItemsCenter}`}>
      <div className='w-1/3 h-screen flex-shrink-0'>
        <div className={`h-full ${styles.flexColFullCenter}`}>
          {!isResetFormShown ? (
            isLoginFormShown ? (
              <>
                <h2 className='text-xl font-bold mb-4'>Вход</h2>

                <form onSubmit={handleLoginSubmit}>
                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 font-bold mb-2'
                      htmlFor='login-username'>
                      Ваш E-mail
                    </label>
                    <input
                      className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='login-username'
                      type='email'
                      placeholder='Введите e-mail'
                      value={loginEmail}
                      onChange={(event) => setLoginEmail(event.target.value)}
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      className='block text-gray-700 font-bold mb-2'
                      htmlFor='login-password'>
                      Пароль
                    </label>
                    <input
                      className='appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                      id='login-password'
                      type='password'
                      placeholder='Введите пароль'
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                    />
                  </div>
                  <div className='flex items-center justify-between'>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3'
                      type='submit'>
                      Войти
                    </button>
                    <a
                      className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer'
                      onClick={toggleResetPassForm}>
                      Забыли пароль?
                    </a>
                  </div>
                </form>
                <p className='mt-4'>
                  Новый пользователь?{" "}
                  <button
                    className='text-blue-500 hover:text-blue-800 cursor-pointer'
                    onClick={toggleLoginAndRegForm}>
                    Зарегистрироваться
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className='text-xl font-bold mb-4'>Регистрация</h2>

                <form onSubmit={handleRegisterSubmit}>
                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 font-bold mb-2'
                      htmlFor='register-username'>
                      Ваш E-mail
                    </label>
                    <input
                      className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='register-username'
                      type='email'
                      placeholder='Введите e-mail'
                      value={registerEmail}
                      onChange={(event) => setRegisterEmail(event.target.value)}
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      className='block text-gray-700 font-bold mb-2'
                      htmlFor='register-password'>
                      Пароль
                    </label>
                    <input
                      className='appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                      id='register-password'
                      type='password'
                      placeholder='Введите пароль'
                      value={registerPassword}
                      onChange={(event) =>
                        setRegisterPassword(event.target.value)
                      }
                    />
                  </div>
                  <div className='flex items-center justify-between'>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3'
                      type='submit'>
                      Зарегистрироваться
                    </button>
                    <a
                      className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer'
                      onClick={() => console.log("Terms of Service clicked")}>
                      Условия использования
                    </a>
                  </div>
                </form>
                <p className='mt-4'>
                  Уже зарегистрированы?{" "}
                  <button
                    className='text-blue-500 hover:text-blue-800 cursor-pointer'
                    onClick={toggleLoginAndRegForm}>
                    Войти
                  </button>
                </p>
              </>
            )
          ) : (
            <>
              <h2 className='text-xl font-bold mb-4'>Восстановление пароля</h2>

              <form onSubmit={api.handleResetPassword}>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 font-bold mb-2'
                    htmlFor='forgot-password-email'>
                    Ваш E-mail
                  </label>
                  <input
                    className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='forgot-password-email'
                    type='text'
                    placeholder='Введите e-mail'
                    value={forgotPasswordEmail}
                    onChange={(event) =>
                      setForgotPasswordEmail(event.target.value)
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3'
                    type='submit'>
                    Отправить
                  </button>
                  <a
                    className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer'
                    onClick={toggleResetPassForm}>
                    Вернуться к входу
                  </a>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
