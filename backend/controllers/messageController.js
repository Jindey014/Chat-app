import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params
        const senderId = req.user._id


        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
            // $all means both senderId and receiverId must be included
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        //SOCKET.IO FUNCTIONALITY WILL GO HERE
        await conversation.save()
        await newMessage.save()
        res.status(200).json(newMessage)

    } catch (error) {
        console.log("Error in sending message:", error.Message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}


export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages") //actual messages pathauxa as objects

        if (!conversation) {
            return res.status(200).json([])
        }

        const messages = conversation.messages
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getting the Message", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}