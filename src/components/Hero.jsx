import Modal from "./Modal"

const Hero = () => {
  return (
    <section className="hero bg-green-200 py-10">
      <div className="container mx-auto">
        <div className="welcome__block flex flex-col items-start bg-white rounded-lg p-7">
          <div className="welcome__breadcrumps">bread</div>
          <div className="welcome__greeting text-3xl font-bold py-5">
            Добро пожаловать на какую-то страницу
          </div>
          <div className="welcome__info flex items-center justify-between w-full">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, id blanditiis. Minus eligendi ducimus ipsa?
            </p>
            <Modal />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
