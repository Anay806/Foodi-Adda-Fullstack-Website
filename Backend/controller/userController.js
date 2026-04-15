import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";
import { sendOTPMail } from "../emailVerify/sendOTPMail.js";
import cloudinary from "../Utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '24h' })
    verifyEmail(token, email) // send Email here
    newUser.token = token
    await newUser.save()
    return res.status(201).json({
      success: true,
      message: "User register successfully",
      user: newUser
    })


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authorization token is missing or Invalid"
      })
    }
    const token = authHeader.split(" ")[1] //["Bearer, dfhjdfjdhffjdh"]
    let decoded
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration token has expired. please register again"
        })
      }
      return res.status(400).json({
        success: false,
        message: "Token Verification failed"
      })

    }
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
    user.token = null
    user.isVerified = true
    await user.save()
    return res.status(200).json({
      success: true,
      message: "Email verified successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const reVerify = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: " User Not found"
      })
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' })
    verifyEmail(token, email) // send Email here
    user.token = token
    await user.save()
    return res.status(200).json({
      success: true,
      message: "Verification sent successfully, plase check your Email",
      token: user.token
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: " All Fields are required"
      })
    }
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not Exists"
      })
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credential"
      })
    }
    if (existingUser.isVerified === false) {
      return res.status(400).json({
        success: false,
        message: "Verify your account then login"
      })
    }

    //generate token
    const accessToken = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '10d' })
    const refreshToken = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '30d' })

    existingUser.isLoggedIn = true
    await existingUser.save()

    //check for existing session  and deleted
    const existingSession = await Session.findOne({ userId: existingUser._id })
    if (existingSession) {
      await Session.deleteOne({ userId: existingUser._id })
    }

    // new session created
    await Session.create({ userId: existingUser._id })
    return res.status(200).json({
      success: true,
      message: `Welcome Back ${existingUser.firstName} ${existingUser.lastName}`,
      user: existingUser,
      accessToken,
      refreshToken
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const logout = async (req, res) => {
  try {

    const userId = req.id
    await Session.deleteMany({ userId: userId })
    await User.findByIdAndUpdate(userId, { isLoggedIn: false })
    return res.status(200).json({
      success: true,
      message: "User Logged out Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minuts
    user.otp = otp
    user.otpExpiry = otpExpiry

    await user.save()
    await sendOTPMail(otp, email)

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email, please check your email"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.params.email
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required"
      })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP is not generated for this user"
      })
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired  please request a new One"
      })
    }
    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is Invalid"
      })
    }
    user.otp = null
    user.otpExpiry = null
    await user.save()
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required"
      })
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match"
      })
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()
    return res.status(200).json({
      success: true,
      message: "password chnaged successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

export const allUser = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json({
      success: true,
      users
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // extract userId from request params
    const user = await User.findById(userId).select("-password -otp -otpExpiry -token")
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
    res.status(200).json({
      success: true,
      user,
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.params.user.id;  //  the ID of the user we want to update
    const loggedInUser = req.user; // from is Authenticate middleware
    const { firstName, lastName, address, city, zipCode, phoneNo, role } = req.body;

    if (loggedInUser._id.toString() !== userIdToUpdate && loggedInUser.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile"
      })
    }

    let user = await User.findById(userIdToUpdate);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      })
    }

    let profilePicUrl = user.profilePic;
    let profilePicPublicId = user.profilePicPublicId;

    //if a new file is Uploaded

    if (req.file) {
      if (profilePicPublicId) {
        await cloudinary.uploader.destroy(profilePicPublicPic)
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        stream.end(req.file.buffer)
      })
      profilePicUrl = uploadResult.secure_url;
      profilePicPublicId = uploadResult.public_id
    }

    //Update fields

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.city = city || user.city;
    user.zipCode = zipCode || user.zipCode;
    user.phoneNo = phoneNo || user.phoneNo;
    user.role = role;
    user.profilePic = profilePicUrl;
    user.profilePicPublicId = profilePicPublicId;

    const updatedUser = await user.save()

    return res.status(200).json({
      success: true,
      message: "Profile updated successFully",
      user: updateUser
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Hello i m 500 errro something went wroung"
    })

  }
}

