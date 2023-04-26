import React from "react"

const Footer = () => {
  return (
    <footer className="flex items-center justify-center py-3 bg-slate-600">
      <div className="footer__content flex items-center flex-col text-white">
        <p>
          Авторы проекта:{" "}
          <a
            href="https://github.com/Aleksh56"
            target="_blank"
            className="text-sky-400"
          >
            Аверьянов Александр
          </a>{" "}
          и{" "}
          <a href="https://github.com/VasyaRns" target="_blank" className="text-sky-400">
            Родин Никита
          </a>
          .
        </p>
        <p>{new Date().getFullYear()} ©</p>
      </div>
    </footer>
  )
}

export default Footer
