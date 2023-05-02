import React from "react"
import AUTHORS from "../constants/Authors"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto w-full bg-green-300">
      <div className="footer__content flex items-center justify-center flex-col text-white py-3">
        <p>
          Авторы проекта:{" "}
          {AUTHORS.map((author, index) => (
            <React.Fragment key={index}>
              <a
                href={author.github}
                target="_blank"
                rel="noreferrer"
                className="text-sky-400"
              >
                {author.name}
              </a>
              {index < AUTHORS.length - 1 ? " и " : "."}
            </React.Fragment>
          ))}
        </p>
        <p>{currentYear} ©</p>
      </div>
    </footer>
  )
}

export default Footer
