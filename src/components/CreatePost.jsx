import { useState, useCallback} from "react"
import { useSpring, animated, config } from "react-spring"
import { BiX } from "react-icons/bi"
import { api } from "../api/api"
import styles from "../styles"

const CreatePost = ({ refreshFlagOnPage }) => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    image: "",
    tags: [],
  })

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        await api.addNewPost(formData)
        setShowModal(false)
        refreshFlagOnPage()
      } catch (error) {
        console.error(error)
      }
    },
    [formData, refreshFlagOnPage]
  )

  const modalAnimation =  useSpring({
      opacity: showModal ? 1 : 0,
      transform: showModal ? "translateY(0%)" : "translateY(-50%)",
      delay: 10,
      config: config.gentle,
    })
      

  // Todo -  Нужно вынести input'ы в отдельный компонент, так как он переиспользуется

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-sky-500 rounded-lg p-2 text-white font-bold"
      >
        Создать пост
      </button>
      {showModal && (
        <div
          className={`${styles.flexRowFullCenter} ${styles.createPostContainer}`}
        >
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
                      className={styles.createPostInput}
                      type="text"
                      placeholder="Ссылка картинки поста"
                      name="image"
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      value={formData.image}
                    />
                    <img className=" w-1/2 h-1/2 self-center" src={formData.image} alt="" />
                    <input
                      className={styles.createPostInput}
                      type="text"
                      placeholder="Заголовок поста"
                      name="title"
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      value={formData.title}
                    />
                    <textarea
                      className={styles.createPostInput}
                      name="text"
                      rows="10"
                      placeholder="Текст поста"
                      onChange={(e) =>
                        setFormData({ ...formData, text: e.target.value })
                      }
                      value={formData.text}
                    ></textarea>
                    <input
                      className={styles.createPostInput}
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
                    <div className="flex gap-2 justify-end">
                      <input
                        onClick={() => setShowModal(false)}
                        className="bg-sky-500 rounded-lg p-2 text-white font-bold hover:opacity-50"
                        type="submit"
                        value="Отмена"
                      />
                      <input
                        className="bg-sky-500 rounded-lg p-2 text-white font-bold hover:opacity-50"
                        type="submit"
                        value="Изменить"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      )}
    </>
  )
}

export default CreatePost
