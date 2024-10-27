import { create } from 'zustand'

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),//yo chai [selectedConversation , setSelectedConversation] =useState() gareko jastai ho
    messages: [],
    setMessages: (messages) => set({ messages })

}))

export default useConversation