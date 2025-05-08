// import mongoose from "mongoose";

// export const connectDB = async () => {
//   await mongoose
//     .connect(
//       "mongodb+srv://upadhyayansh11:nugLBKhWLuJ3QtkT@tomato.6owiiee.mongodb.net/FoodDel"
//     )
//     .then(() => {
//       console.log("DB connected");
//     });
// };
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://upadhyayansh11:nugLBKhWLuJ3QtkT@tomato.6owiiee.mongodb.net/FoodDel?retryWrites=true&w=majority"
    );
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1);
  }
};
