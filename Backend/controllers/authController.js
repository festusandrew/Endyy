const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ─── Helper ────────────────────────────────────────────────────────────────
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const formatUser = (user) => ({
  _id: user._id,
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  addresses: user.addresses,
  wishlist: user.wishlist,
  provider: user.provider,
  createdAt: user.createdAt,
});

// ─── @route  POST /api/auth/register ───────────────────────────────────────
// @desc   Register with email + password (mirrors registerWithEmail in firebase.ts)
// @access Public
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are all required' });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: 'An account with that email already exists' });
  }

  const user = await User.create({
    displayName: name.trim(),
    email,
    password,
    provider: 'email',
  });

  res.status(201).json({
    token: generateToken(user._id),
    user: formatUser(user),
  });
};

// ─── @route  POST /api/auth/login ──────────────────────────────────────────
// @desc   Login with email + password (mirrors loginWithEmail in firebase.ts)
// @access Public
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Explicitly select password because the schema excludes it by default
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({
    token: generateToken(user._id),
    user: formatUser(user),
  });
};

// ─── @route  POST /api/auth/google ─────────────────────────────────────────
// @desc   Upsert a user that authenticated via Google (mirrors loginWithGoogle)
//         Called from the frontend after Firebase returns the Google user.
// @access Public
const googleAuth = async (req, res) => {
  const { uid, email, displayName, photoURL } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ message: 'uid and email are required' });
  }

  // Find by Firebase uid OR email so we never duplicate
  let user = await User.findOne({ $or: [{ uid }, { email }] });

  if (!user) {
    user = await User.create({
      uid,
      email,
      displayName: displayName || '',
      photoURL: photoURL || '',
      provider: 'google',
    });
  } else {
    // Keep profile up to date with latest Google data
    user.uid = uid;
    user.displayName = displayName || user.displayName;
    user.photoURL = photoURL || user.photoURL;
    user.provider = 'google';
    await user.save();
  }

  res.status(200).json({
    token: generateToken(user._id),
    user: formatUser(user),
  });
};

// ─── @route  GET /api/auth/me ──────────────────────────────────────────────
// @desc   Return the currently-logged-in user's profile
// @access Private (requires JWT)
const getMe = async (req, res) => {
  // req.user is populated by the protect middleware
  res.status(200).json({ user: formatUser(req.user) });
};

// ─── @route  PUT /api/auth/me ──────────────────────────────────────────────
// @desc   Update profile (displayName, photoURL, addresses, wishlist)
// @access Private
const updateMe = async (req, res) => {
  const allowed = ['displayName', 'photoURL', 'addresses', 'wishlist'];
  const updates = {};
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ user: formatUser(user) });
};

module.exports = { register, login, googleAuth, getMe, updateMe };
