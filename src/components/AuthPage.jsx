import React, { useState } from "react"
import "../index.css"

function AuthPage({ handleUserLogin }) {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [isLoginFormShown, setIsLoginFormShown] = useState(false)
  const [isResetFormShown, setIsResetFormShown] = useState(false)

  // Todo - запросы к API должны быть в отдельном классе API (папка для него уже создана)
  // Todo - вынести формы по отдельным файлам и ипортировать их сюда

  // Note - не могу вынести в отдельный файл формы. Туплю и не понимаю как менять стейты на 2 уровня выше, получаются костыли. Пока оставлю так, чтобы был рабочий прототип

  const handleResetPassword = (event) => {
    event.preventDefault()
    fetch("https://api.react-learning.ru/password-reset", {
      method: "POST",
      body: JSON.stringify({
        email: forgotPasswordEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    fetch("https://api.react-learning.ru/signin", {
      method: "POST",
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
    //handleUserLogin()
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    fetch("https://api.react-learning.ru/signup", {
      method: "POST",
      body: JSON.stringify({
        email: registerEmail,
        group: "ep",
        password: registerPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
    setIsLoginFormShown(true)
  }

  const toggleResetPassForm = () => {
    setIsResetFormShown(!isResetFormShown)
  }

  const toggleLoginAndRegForm = () => {
    setIsLoginFormShown(!isLoginFormShown)
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="w-1/3 h-screen flex-shrink-0">
        <div className="flex flex-col items-center justify-center h-full">
          {!isResetFormShown ? (
            isLoginFormShown ? (
              <>
                <h2 className="text-xl font-bold mb-4">Вход</h2>

                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="login-username"
                    >
                      Ваш E-mail
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="login-username"
                      type="text"
                      placeholder="Введите e-mail"
                      value={loginEmail}
                      onChange={(event) => setLoginEmail(event.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="login-password"
                    >
                      Пароль
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="login-password"
                      type="password"
                      placeholder="Введите пароль"
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3"
                      type="submit"
                    >
                      Войти
                    </button>
                    <a
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                      onClick={toggleResetPassForm}
                    >
                      Забыли пароль?
                    </a>
                  </div>
                </form>
                <p className="mt-4">
                  Новый пользователь?{" "}
                  <button
                    className="text-blue-500 hover:text-blue-800 cursor-pointer"
                    onClick={toggleLoginAndRegForm}
                  >
                    Зарегистрироваться
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Регистрация</h2>

                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="register-username"
                    >
                      Ваш E-mail
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="register-username"
                      type="text"
                      placeholder="Введите e-mail"
                      value={registerEmail}
                      onChange={(event) => setRegisterEmail(event.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="register-password"
                    >
                      Пароль
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="register-password"
                      type="password"
                      placeholder="Введите пароль"
                      value={registerPassword}
                      onChange={(event) =>
                        setRegisterPassword(event.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3"
                      type="submit"
                    >
                      Зарегистрироваться
                    </button>
                    <a
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                      onClick={() => console.log("Terms of Service clicked")}
                    >
                      Условия использования
                    </a>
                  </div>
                </form>
                <p className="mt-4">
                  Уже зарегистрированы?{" "}
                  <button
                    className="text-blue-500 hover:text-blue-800 cursor-pointer"
                    onClick={toggleLoginAndRegForm}
                  >
                    Войти
                  </button>
                </p>
              </>
            )
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Восстановление пароля</h2>

              <form onSubmit={handleResetPassword}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="forgot-password-email"
                  >
                    Ваш E-mail
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="forgot-password-email"
                    type="text"
                    placeholder="Введите e-mail"
                    value={forgotPasswordEmail}
                    onChange={(event) =>
                      setForgotPasswordEmail(event.target.value)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3"
                    type="submit"
                  >
                    Отправить
                  </button>
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                    onClick={toggleResetPassForm}
                  >
                    Вернуться к входу
                  </a>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
