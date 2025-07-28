import { asyncHandler } from "../utils/asynchandler.js";
import User from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";

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
        username,
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select("-password"); // Exclude password from the response
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

    const loggedInUser = await User.findOne(user._id).select(
        "-password"
    );

    if (!loggedInUser) {
        return res.status(500).json(new apiResponse(500, null, "Login failed"));
    }
    return res
        .status(200)
        .json(new apiResponse(200, loggedInUser, "Login successful"));
});

//logout 
const logoutUser = asyncHandler(async (req, res, next) => {
    // Implement logout logic if needed
    return res.status(200).json(new apiResponse(200, null, "Logout successful"));
});

export { registerUser, loginUser };
