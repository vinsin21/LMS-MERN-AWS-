import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { DB_NAME } from '../constants.js';
import dotenv from 'dotenv';

dotenv.config();

const COMMON_PASSWORD = "123456789qw"; // Same password for all test users

const seedUsers = async () => {
    try {
        // Connect to MongoDB with DB_NAME from constants
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`📦 Connected to MongoDB - Database: ${DB_NAME}`);

        // Clear existing users (CAUTION: This deletes all users!)
        await User.deleteMany({});
        console.log("🗑️  Cleared existing users");

        // ===== CREATE SUPER ADMIN (Owner) =====
        const superAdmin = await User.create({
            username: "owner",
            email: "owner@coaching.com",
            password: COMMON_PASSWORD,
            fullName: "Coaching Owner",
            avatar: "public/temp/default-avatar.jpg",
            isEmailVerified: true,
            role: "admin",
            isSuperAdmin: true,
            isActive: true
        });
        console.log("✅ Created Super Admin (Owner):", superAdmin.email);

        // ===== CREATE INSTRUCTORS (Teachers) =====
        const instructors = [
            { username: "teacher1", email: "teacher1@coaching.com", fullName: "Sarah Johnson" },
            { username: "teacher2", email: "teacher2@coaching.com", fullName: "Michael Chen" },
            { username: "teacher3", email: "teacher3@coaching.com", fullName: "Priya Sharma" }
        ];

        for (const instructor of instructors) {
            await User.create({
                ...instructor,
                password: COMMON_PASSWORD,
                avatar: "public/temp/default-avatar.jpg",
                isEmailVerified: true,
                role: "instructor",
                isSuperAdmin: false,
                isActive: true
            });
            console.log("✅ Created Instructor:", instructor.email);
        }

        // ===== CREATE STUDENTS (Users) =====
        for (let i = 1; i <= 10; i++) {
            await User.create({
                username: `student${i}`,
                email: `student${i}@example.com`,
                password: COMMON_PASSWORD,
                fullName: `Student ${i}`,
                avatar: "public/temp/default-avatar.jpg",
                isEmailVerified: true,
                role: "user",
                isSuperAdmin: false,
                isActive: true
            });
        }
        console.log("✅ Created 10 Students (student1@example.com to student10@example.com)");

        // Summary
        console.log("\n🎉 Seed completed successfully!");
        console.log("\n📊 Summary:");
        console.log("- 1 Super Admin (owner@coaching.com)");
        console.log("- 3 Instructors (teacher1-3@coaching.com)");
        console.log("- 10 Students (student1-10@example.com)");
        console.log(`\n🔑 Password for ALL users: ${COMMON_PASSWORD}`);
        console.log("\n💡 You can now login with any of these accounts!");

        process.exit(0);
    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    }
};

seedUsers();
