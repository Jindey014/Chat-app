import React from 'react'
import useConversation from '../../store/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime'

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()
  const fromMe = message.senderId === authUser._id
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : ''
  const formattedTime = extractTime(message.createdAt)
  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor}`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50">{formattedTime}</div>
      </div>
    </>
  )
}

export default Message

//STARTER CODE SNIPPET
// const Message = () => {
//   return (
//     <>
//       <div className="chat chat-start">
//         <div className="chat-image avatar">
//           <div className="w-10 rounded-full">
//             <img
//               alt="Tailwind CSS chat bubble component"
//               src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//             />
//           </div>
//         </div>
//         <div className="chat-bubble">You were the Chosen One!</div>
//         <div className="chat-footer opacity-50">Delivered</div>
//       </div>
//       <div className="chat chat-end">
//         <div className="chat-image avatar">
//           <div className="w-10 rounded-full">
//             <img
//               alt="Tailwind CSS chat bubble component"
//               src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//             />
//           </div>
//         </div>

//         <div className="chat-bubble text-white bg-blue-500">I hate you!</div>
//         <div className="chat-footer opacity-50 text-xs glex gap-1 items-center">
//           Seen at 12:46
//         </div>
//       </div>
//     </>
//   )
// }
