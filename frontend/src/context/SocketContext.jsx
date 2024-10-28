import { createContext, useState, useEffect, useContext } from 'react'
import { useAuthContext } from './AuthContext'
import io from 'socket.io-client'

const SocketContext = createContext()

export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  const [onlineUsers, setOnlineUsers] = useState([])

  const { authUser } = useAuthContext()

  useEffect(() => {
    if (authUser) {
      const socket = io('https://chat-app-e6sy.onrender.com', {
        query: {
          userId: authUser._id,
        },
      }) //pass our backend url
      setSocket(socket) // authenticated user xa bhane socket ma mathi ko socket value set garne

      //socket.on() is used to listen to events . This can be used in both client and server side
      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users)
      })
      return () => socket.close() // this  is the cleanup function which cleans up the socket when component is unmounted
    } else {
      //auth user xaina bhane socket connection close garne
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }
  }, [authUser])
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}
