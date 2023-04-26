import React, { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import "../index.css"

function AuthPage({ handleUserLogin }) {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [isLoginFormShown, setIsLoginFormShown] = useState(false)

  // Todo - запросы к API должны быть в отдельном классе API (папка для него уже создана)
  // Todo - вынести формы по отдельным файлам и ипортировать их сюда

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
    handleUserLogin()
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

  const toggleForm = () => {
    setIsLoginFormShown(!isLoginFormShown)
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="w-1/3 h-screen flex-shrink-0">
        <div className="flex flex-col items-center justify-center h-full">
          {isLoginFormShown ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
