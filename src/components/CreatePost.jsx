import { useState, useCallback, useMemo } from "react"
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
        console.log(formData)
        await api.addNewPost(formData)
        setShowModal(false)
        refreshFlagOnPage()
      } catch (error) {
        console.error(error)
      }
    },
    [formData, refreshFlagOnPage]
  )

  const modalAnimation = () =>
    useSpring({
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
      {showModal ? (
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
                      className={styles.Inputs}
                      type="text"
                      placeholder="Ссылка картинки поста"
                      name="image"
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                    />
                    <input
                      className={styles.Inputs}
                      type="text"
                      placeholder="Заголовок поста"
                      name="title"
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                    <textarea
                      className={styles.Inputs}
                      name="text"
                      rows="10"
                      placeholder="Текст поста"
                      onChange={(e) =>
                        setFormData({ ...formData, text: e.target.value })
                      }
                    ></textarea>
                    <input
                      className={styles.Inputs}
                      type="text"
                      placeholder="Теги поста"
                      name="tags"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tags: e.target.value.split(","),
                        })
                      }
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
