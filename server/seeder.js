import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./models/post.model.js"; 

dotenv.config();

const samplePosts = [
    {
        user: "64b8c0a5f7e29b02d5a9a0a1",
        imageUrl: "https://picsum.photos/seed/vintage1/400/300",
        caption: "Throwback to my solo trip in the Himalayas 🏔️",
        timestamp: new Date("2024-11-10T14:45:00Z")
    },
    {
        user: "64b8c0a5f7e29b02d5a9a0a2",
        imageUrl: "https://picsum.photos/seed/city2/400/300",
        caption: "Caught golden hour in NYC 🌇",
        timestamp: new Date("2025-02-15T18:20:00Z")
    },
    {
        user: "64b8c0a5f7e29b02d5a9a0a3",
        imageUrl: "https://picsum.photos/seed/foodie3/400/300",
        caption: "Best ramen I’ve ever had 🍜 #TokyoEats",
        timestamp: new Date("2025-01-03T12:10:00Z")
    },
    {
        user: "64b8c0a5f7e29b02d5a9a0a4",
        imageUrl: "https://picsum.photos/seed/retro4/400/300",
        caption: "Found this retro camera at a flea market 📷",
        timestamp: new Date("2024-12-22T10:05:00Z")
    },
    {
        user: "64b8c0a5f7e29b02d5a9a0a5",
        imageUrl: "https://picsum.photos/seed/nature5/400/300",
        caption: "Camping under the stars ✨🌲",
        timestamp: new Date("2025-03-01T21:30:00Z")
    }
];

const seedDB = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        await Post.insertMany(samplePosts);
        console.log(" Seed data inserted successfully!");
        process.exit();
    } catch (err) {
        console.error(" Seeding failed:", err);
        process.exit(1);
    }
};

seedDB();
