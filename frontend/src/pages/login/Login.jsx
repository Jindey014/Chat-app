import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loading, login } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full w-full bg-gray-100 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-700"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered w-full h-10"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full h-10"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Dont have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="spinner loading-spinner"></span>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

//STARTER CODE FOR LOGIN PAGE
// const Login = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="h-full w-full bg-gray-100 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 p-6">
//         <h1 className="text-3xl font-semibold text-center text-gray-300">
//           Login
//           <span className="text-blue-700"> ChatApp</span>
//         </h1>
//         <form>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Username"
//               className="input input-bordered w-full h-10"
//             />
//           </div>
//           <div>
//             <label className="label">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               className="input input-bordered w-full h-10"
//             />
//           </div>
//           <a
//             href="#"
//             className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
//           >
//             Dont have an account?
//           </a>
//           <div>
//             <button className="btn btn-block btn-sm mt-2">Login</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
