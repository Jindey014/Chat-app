import User from "../models/userModel.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password") // no equal to logged in user ie logged in user bahek sab user 
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log('Error in getUserForSidebar', error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }

}

