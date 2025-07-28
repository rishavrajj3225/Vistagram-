import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    }
});

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    if (!password || !this.password) {
        throw new Error("Password or hash is missing");
    }
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("users", userSchema);
export default User;
