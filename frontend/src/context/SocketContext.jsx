import { createContext, useState, useEffect } from 'react'
import { useAuthContext } from './AuthContext'

export const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  const [onlineUsers, setOnlineUsers] = useState([])

  const { authUser } = useAuthContext()

  useEffect(() => {}, [])
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
}
