const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  quantity:  { type: Number, required: true, min: 1 },
}, { _id: false });

const shippingAddressSchema = new mongoose.Schema({
  street: { type: String },
  city:   { type: String },
  state:  { type: String },
  zip:    { type: String },
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: () => `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    },
    // Registered user (optional — guest checkout allowed)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: 'Order must contain at least one item',
      },
    },
    subtotal:     { type: Number, required: true },
    deliveryFee:  { type: Number, default: 0 },
    total:        { type: Number, required: true },
    deliveryMethod: {
      type: String,
      enum: ['Delivery', 'Pick-Up'],
      default: 'Delivery',
    },
    shippingAddress: { type: shippingAddressSchema, default: null },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
