import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: {type: String, required: true },
  photo: { type: String, required: true },
  role: { type: String, required: true, enum: ['Instructor', 'Student', 'Admin'] },
})

const User = models.User || model('User', UserSchema);

export default User;