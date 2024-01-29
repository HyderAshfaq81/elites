import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    lowercase: true, // Converts email to lowercase
    trim: true, // Trims whitespace
    validate: {
      validator: (value) => {
        // Custom email validation (you can use a library for this)
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'expert'], // Allows only 'student', expert'' or 'admin' as role
    default: 'student', //set student as default
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Use Mongoose middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10); // Hash the password
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
export default mongoose.models.User || mongoose.model('User', userSchema);
