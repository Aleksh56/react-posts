import CreatePost from "./CreatePost"

const Hero = ({ refreshFlagOnPage }) => {
  return (
    <section className="hero bg-slate-200 py-10">
      <div className="container mx-auto">
        <div className="welcome__block flex flex-col items-start bg-white rounded-lg p-7">
          <div className="welcome__breadcrumps">bread</div>
          <div className="welcome__greeting text-3xl font-bold py-5">
            Добро пожаловать на страницу с супер котиками !
          </div>
          <div className="welcome__info flex items-center justify-between w-full">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, id blanditiis. Minus eligendi ducimus ipsa?
            </p>
            <CreatePost refreshFlagOnPage={refreshFlagOnPage} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
