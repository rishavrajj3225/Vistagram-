import { asyncHandler } from "../utils/asynchandler.js";
import User from "../models/user.model.js";
import JWT from "jsonwebtoken";
import { apiResponse } from "../utils/apiResponse.js";
const verifyJWT = asyncHandler(async (req, res, next) => {
    // yaha pe mere req ke pass user ka cookie ka access hai to uska use krte hai
    
    // yaha pe error aa rha tha kyunki mobile me cokie to hota nhi hai to wo to header bhejta hai to uss case me galat h jayega to usko req.header se krte hai and isko postman me check krte time key,value me
    // Authorization: Bearer <Token>  bhejte hai
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json(new apiResponse(401, null, "No token provided"));
        }

        const decodedToken = JWT.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );
        if (!user) {
            return res.status(400).json(new apiResponse(400, null, "User not found"));
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json(new apiResponse(400, null, "Something went wrong in Auth middleware"));
    }
});

export { verifyJWT };