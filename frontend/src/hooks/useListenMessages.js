import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../store/useConversation'
import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound)
            sound.play()

            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage") //clean up function so that when the component unmounts we dont listen to this
    }, [socket, setMessages, messages])
}

export default useListenMessages