import { useState } from "react"
import { BiX } from "react-icons/bi"
import { api } from "../api/api"

const EditPost = ({ postInfo, closeModal }) => {
  const [postData, setPostData] = useState(postInfo)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.updatePostInfo(postData)
    closeModal(false)
  }

  return (
    <div className="flex justify-center items-center absolute z-50 top-0 right-0 bg-slate-950/50 w-full h-full overflow-x-hidden overflow-y-auto">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="flex flex-col bg-white rounded-lg p-4 w-[600px] h-auto">
          <div className="text-3xl flex font-semibold justify-between">
            <h3>Редактирование поста - {postData.title}</h3>
            <button
              type="button"
              className="hover:text-sky-500 "
              onClick={() => closeModal(false)}
            >
              <BiX />
            </button>
          </div>
          <div className="py-5">
            <form
              className="flex flex-col gap-5 justify-between"
              onSubmit={handleSubmit}
            >
              <input
                className="border-2 border-sky-500 rounded-lg p-2"
                value={postData.image}
                type="text"
                name="post image"
                onChange={(e) =>
                  setPostData({ ...postData, image: e.target.value })
                }
              />
              <img
                className="rounded-full w-[250px] h-[250px] self-center"
                src={postData.image}
                alt="Post"
              />
              <input
                className="border-2 border-sky-500 rounded-lg p-2"
                value={postData.title}
                type="text"
                name="title"
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
              />
              <input
                className="border-2 border-sky-500 rounded-lg p-2"
                value={postData.tags.join(", ")}
                type="text"
                name="tags"
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(", ") })
                }
              />
              <textarea
                className="border-2 border-sky-500 rounded-lg p-2"
                value={postData.text}
                name="content"
                onChange={(e) =>
                  setPostData({ ...postData, text: e.target.value })
                }
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="bg-sky-500 rounded-lg p-2 text-white font-bold hover:opacity-50"
                  onClick={() => closeModal(false)}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-sky-500 rounded-lg p-2 text-white font-bold hover:opacity-50"
                >
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPost
