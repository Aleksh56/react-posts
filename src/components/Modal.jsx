import React from "react";

//cоздал открывашку модалки
export default function Modal() {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="bg-sky-500 rounded-lg p-2 text-white font-bold">
                Создать пост
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center absolute z-50 top-0 right-0 bg-slate-950/50 w-full h-full ">
                        <div className="relavite w-auto my-6 mx-auto max-w-3xl">
                            <div className="flex flex-col bg-white rounded-lg p-4 w-[600px] h-auto">
                                <div className="text-3xl flex font-semibold justify-between">
                                    <h3>Создать пост</h3>
                                    <button
                                    className="hover:text-sky-500 "
                                    onClick={() => setShowModal(false)}>
                                        x
                                    </button>
                                </div>
                                <div className="py-5">
                                    <form className="flex flex-col gap-5 justify-between border-sky-500">
                        
                                        <input className="" type="text" placeholder="Ссылка картинки поста" name="image" />
                                        <input type="text" placeholder="Заголовок поста" name="title" />
                                        <textarea name="text" id="" placeholder="Текст поста"  ></textarea>
                                        <input type="text" placeholder="Теги поста" name="tags" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )


}


