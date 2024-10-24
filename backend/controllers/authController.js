import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateTokens.js"

export const signup = async (req, res) => {
    try {
        const { username, fullname, password, confirmPassword, gender } = req.body
        if (password !== confirmPassword) {
            res.status(400).json({ error: "Passwords do not match" })
        }
        const user = await User.findOne({ username })
        if (user) {
            res.status(400).json({ error: "User already exists" })
        }

        //HASHED PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender == 'male' ? boyProfile : girlProfile
        })

        if (newUser) {

            //GENERATE JWT TOKENS 
            generateTokenAndSetCookie(newUser._id, res)

            await newUser.save()
            res.status(200).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                password: newUser.password,
                profilePic: newUser.profilePic,

            })
        } else {
            res.status(400).json({ error: "Invalid user Data" })
        }

    } catch (error) {
        res.status(500).json({
            error: "Error in internal Server"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" })
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        })

    } catch (error) {
        res.status(500).json({
            error: "Error in internal Server"
        })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged Out Sucessfully" })
    } catch (error) {
        res.status(500).json({
            error: "Error in internal Server"
        })
    }
}

