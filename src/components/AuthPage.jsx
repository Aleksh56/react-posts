import React, { useState } from "react"
import "../index.css"

function AuthPage({ handleUserLogin }) {
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [isLoginFormShown, setIsLoginFormShown] = useState(false)

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    // Todo: send login request to server
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    // Todo: send registration request to server
    setIsLoginFormShown(true)
  }

  const toggleForm = () => {
    setIsLoginFormShown(!isLoginFormShown)
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="w-1/3 h-screen flex-shrink-0">
        <div className="flex flex-col items-center justify-center h-full">
          {isLoginFormShown ? (
            <>
              <h2 className="text-xl font-bold mb-4">Вход</h2>

              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="login-username"
                  >
                    Имя пользователя
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="login-username"
                    type="text"
                    placeholder="Введите имя пользователя"
                    value={loginUsername}
                    onChange={(event) => setLoginUsername(event.target.value)}
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
                    onClick={handleUserLogin}
                  >
                    Войти
                  </button>
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                    onClick={() => console.log("Forgot password clicked")}
                  >
                    Забыли пароль?
                  </a>
                </div>
              </form>
              <p className="mt-4">
                Новый пользователь?{" "}
                <button
                  className="text-blue-500 hover:text-blue-800 cursor-pointer"
                  onClick={toggleForm}
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
                    Имя пользователя
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="register-username"
                    type="text"
                    placeholder="Введите имя пользователя"
                    value={registerUsername}
                    onChange={(event) =>
                      setRegisterUsername(event.target.value)
                    }
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
                  onClick={toggleForm}
                >
                  Войти
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
