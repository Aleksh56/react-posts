import { useState } from "react"
import { useSpring, animated, config } from "react-spring"
import { BiX } from "react-icons/bi"
import { api } from "../api/api"

const CreatePost = ({ refreshFlagOnPage }) => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    image: "",
    tags: [],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    api.addNewPost(formData)
    setShowModal(false)
    refreshFlagOnPage()
  }

  const modalAnimation = useSpring({
    opacity: showModal ? 1 : 0,
    transform: showModal ? "translateY(0%)" : "translateY(-50%)",
    delay: 10,
    config: config.gentle,
  })

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-sky-500 rounded-lg p-2 text-white font-bold"
      >
        Создать пост
      </button>
      {showModal ? (
        <div className="flex justify-center items-center absolute z-50 top-0 right-0 bg-slate-950/50 w-full h-full overflow-x-hidden overflow-y-auto">
          <animated.div style={modalAnimation}>
            <div className="relavite w-auto my-6 mx-auto max-w-3xl">
              <div className="flex flex-col bg-white rounded-lg p-4 w-[600px] h-auto">
                <div className="text-3xl flex font-semibold justify-between">
                  <h3>Создать пост</h3>
                  <button
                    type="button"
                    className="hover:text-sky-500 "
                    onClick={() => setShowModal(false)}
                  >
                    <BiX />
                  </button>
                </div>
                <div className="py-5">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 justify-between"
                  >
                    <input
                      className=" border-2 border-sky-500 rounded-lg  p-2"
                      type="text"
                      placeholder="Ссылка картинки поста"
                      name="image"
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      value={formData.image}
                    />
                    <input
                      className="border-2 border-sky-500 rounded-lg  p-2"
                      type="text"
                      placeholder="Заголовок поста"
                      name="title"
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      value={formData.title}
                    />
                    <textarea
                      className="border-2 border-sky-500 rounded-lg  p-2"
                      name="text"
                      rows="10"
                      placeholder="Текст поста"
                      onChange={(e) =>
                        setFormData({ ...formData, text: e.target.value })
                      }
                      value={formData.text}
                    ></textarea>
                    <input
                      className="border-2 border-sky-500 rounded-lg p-2"
                      type="text"
                      placeholder="Теги поста"
                      name="tags"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tags: e.target.value.split(","),
                        })
                      }
                      value={formData.tags}
                    />
                    <input
                      className="bg-sky-500 rounded-lg p-2 text-white font-bold"
                      type="submit"
                      value="Создать"
                    />
                  </form>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  )
}

export default CreatePost
