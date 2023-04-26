import React from "react"

const LoginForm = () => {
  return (
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
  )
}

export default LoginForm
