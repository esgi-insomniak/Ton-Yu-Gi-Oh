import { get } from "http"
import React from "react"
import toast, { Toast } from "react-hot-toast"
import { VscLoading } from "react-icons/vsc"

interface TextOptionsToastsCustom {
    t: Toast
    text: string
    getDismiss?: boolean
}

export const AlertCustom = ({ t, text, getDismiss }: TextOptionsToastsCustom) => {

    React.useEffect(() => {
        if (getDismiss) toast.dismiss(t.id)
    }, [getDismiss])

    return (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex justify-start items-center space-x-3">
                    <VscLoading className='animate-spin' />
                    <b>{text}</b>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Annuler
                </button>
            </div>
        </div>
    )
}