import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'

import NoChatSelected from './NoChatSelected'
import useConversation from '../../store/useConversation'

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  //INORDER TO CLEAN CONVERSATION AFTER WE LOG OUT
  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To: </span>
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullname}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer

//STARTER CODE SNIPPET
// const MessageContainer = () => {
//   const noChatSelected = true
//   return (
//     <div className="md:min-w-[450px] flex flex-col">
//       {noChatSelected ? (
//         <NoChatSelected />
//       ) : (
//         <>
//           <div className="bg-slate-500 px-4 py-2 mb-2">
//             <span className="label-text">To: </span>
//             <span className="text-gray-900 font-bold"> Jinish Shrestha</span>
//           </div>
//           <Messages />
//           <MessageInput />
//         </>
//       )}
//     </div>
//   )
// }
