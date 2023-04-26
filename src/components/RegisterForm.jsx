import React from "react"

const RegisterForm = () => {
  return (
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
            onChange={(event) => setRegisterPassword(event.target.value)}
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
  )
}

export default RegisterForm
