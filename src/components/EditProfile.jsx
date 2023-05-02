import { useState, useCallback } from "react"
import { useSpring, animated, config, update } from "react-spring"
import { BiX } from "react-icons/bi"
import { api } from "../api/api"
import { BiEditAlt } from "react-icons/bi"

const EditProfile = ({ refreshPostsOnPage, userInfo }) => {
  const [showModal, setShowModal] = useState(false)
  const [avatar, setAvatar] = useState({ avatar: "" })
  const [formData, setFormData] = useState({
    name: "",
    about: "",
  });
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        await api.updateUserAvatar(avatar)
        await api.updateUserInfo(formData)
        setShowModal(false)
        refreshPostsOnPage()
      } catch (error) {
        console.error(error)
      }
    },
    [formData, refreshPostsOnPage, avatar]
  )


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
        className="header__logout-btn ml-2 rounded-lg bg-sky-500 py-3 px-3 text-white font-bold"
      >
        <BiEditAlt />
      </button>
      {showModal && (
        <div
          className="flex justify-center items-center absolute z-50 top-0 right-0 bg-slate-950/50 w-full h-full
         overflow-x-hidden overflow-y-auto"
        >
          <animated.div style={modalAnimation}>
            <div className="relavite w-auto my-6 mx-auto max-w-3xl">
              <div className="flex flex-col bg-white rounded-lg p-4 w-[600px] h-auto">
                <div className="text-3xl flex font-semibold justify-between">
                  <h3>Профиль</h3>
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
                    className="flex flex-col gap-5 justify-between "
                  >
                    <input
                      className=" border-2 border-sky-500 rounded-lg  p-2"
                      type="text"
                      placeholder={userInfo.avatar}
                      name="avatar"
                      onChange={(e) => setAvatar({ ...avatar, avatar: e.target.value })}
                      value={avatar.avatar}
                    />
                    <img className="rounded-full w-[250px] h-[250px] self-center " src={avatar.avatar ? avatar.avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt="" />
                    <input
                      className=" border-2 border-sky-500 rounded-lg  p-2"
                      type="text"
                      placeholder={userInfo.name}
                      name="name"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      value={formData.name}
                    />
                    <input
                      disabled
                      className="border-2 border-sky-500 rounded-lg p-2 disabled: bg-gray-600/20"
                      type="text"
                      name="email"
                      value={userInfo.email}
                    />
                    <input
                      id="about"
                      className="border-2 border-sky-500 rounded-lg p-2"
                      type="text"
                      placeholder={userInfo.about}
                      name="about"
                      onChange={(e) =>
                        setFormData({ ...formData, about: e.target.value })
                      }
                      value={formData.about}
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

export default EditProfile
