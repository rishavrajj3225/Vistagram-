import { asyncHandler } from "../utils/asynchandler.js";
import User from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";


// Generate access and refresh tokens
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { status: 404, message: "User not found" };
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        // console.log("Refresh token saved successfully:", refreshToken, accessToken);
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        return { status: 500, message: "Internal server error" };
    }
};


// register
const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json(new apiResponse(400, null, "All fields are required"));
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existedUser) {
        return res.status(409).json(new apiResponse(409, null, "User already exists"));
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken"); // Exclude password from the response
    if (!createdUser) {
        return res.status(500).json(new apiResponse(500, null, "User creation failed"));
    }

    return res
        .status(201)
        .json(new apiResponse(201, createdUser, "User created successfully"));
});


// login
const loginUser = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json(new apiResponse(400, null, "Email and password are required"));
    }


    const user = await User.findOne({
        email: email.toLowerCase(),
    });

    if (!user) {
        return res.status(404).json(new apiResponse(404, null, "User not found"));
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        return res.status(401).json(new apiResponse(401, null, "Incorrect password"));
    }

    // Generate access and refresh tokens
    const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(
        user._id
    );
    // console.log("Access Token:", accessToken);
    // console.log("Refresh Token:", refreshToken);
    const loggedInUser = await User.findOne(user._id).select(
        "-password -refreshToken"
    );

    if (!loggedInUser) {
        return res.status(500).json(new apiResponse(500, null, "Login failed"));
    }

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User loggedIn successfully"
            )
        );
});

//logout 
const logoutUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    );
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(200, "User Logout");
});


// current user 
const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
        message: "Current User Fetched Successfully",
    });
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
