import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/Signup'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const { authUser } = useAuthContext()
  const router = createBrowserRouter([
    {
      path: '/',
      element: authUser ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: '/login',
      element: authUser ? <Navigate to="/" /> : <Login />,
    },
    {
      path: '/signup',
      element: authUser ? <Navigate to="/" /> : <SignUp />,
    },
  ])

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </div>
    </>
  )
}

export default App
