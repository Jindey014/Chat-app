import React from 'react'
import Conversation from './Conversation'
import useConversation from '../../store/useConversation'
import useGetConversations from '../../hooks/useGetConversations'

const Conversations = () => {
  const { loading, conversations } = useGetConversations()
  console.log(conversations)
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastindex={index === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  )
}

export default Conversations

//STARTER CODE SNIPPET
// const Conversations = () => {
//   return (
//     <div className="py-2 flex flex-col overflow-hidden">
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//     </div>
//   )
// }
