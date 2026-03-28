const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema({
  label: { type: String, default: 'Home' },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  zip: { type: String },
}, { _id: false });

const userSchema = new mongoose.Schema(
  {
    // Matches UserProfile from AuthContext.tsx
    uid: {
      type: String,
      unique: true,
      sparse: true, // allows null (only set for Firebase-synced users)
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never returned by default in queries
    },
    displayName: {
      type: String,
      trim: true,
    },
    photoURL: {
      type: String,
      default: '',
    },
    addresses: {
      type: [addressSchema],
      default: [],
    },
    wishlist: {
      type: [String],
      default: [],
    },
    provider: {
      type: String,
      enum: ['email', 'google'],
      default: 'email',
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

// Hash password before saving (only when password is modified)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method: compare candidate password with stored hash
userSchema.methods.matchPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
