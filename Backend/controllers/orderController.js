const Order = require('../models/Order');

// ─── @route  POST /api/orders ───────────────────────────────────────────────
// @desc   Place a new order (guest or authenticated)
// @access Public
const createOrder = async (req, res) => {
  try {
    const {
      customerEmail,
      items,
      subtotal,
      deliveryFee,
      total,
      deliveryMethod,
      shippingAddress,
    } = req.body;

    if (!customerEmail || !items?.length || !total) {
      return res.status(400).json({ message: 'customerEmail, items and total are required' });
    }

    const order = await Order.create({
      customerEmail,
      items,
      subtotal,
      deliveryFee: deliveryFee ?? 0,
      total,
      deliveryMethod: deliveryMethod ?? 'Delivery',
      shippingAddress: shippingAddress ?? null,
      // attach userId when request comes from a logged-in user (protect middleware)
      ...(req.user ? { userId: req.user._id } : {}),
    });

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── @route  GET /api/orders/my ────────────────────────────────────────────
// @desc   Get all orders for the authenticated user
// @access Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── @route  GET /api/orders/:id ───────────────────────────────────────────
// @desc   Get a single order by MongoDB _id or orderId string
// @access Private (owner) or Public (guest by orderId)
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      $or: [
        { _id: id.match(/^[a-f\d]{24}$/i) ? id : null },
        { orderId: id },
      ],
    });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── @route  PUT /api/orders/:id/cancel ─────────────────────────────────────
// @desc   Cancel a pending order
// @access Private
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id, userId: req.user._id });

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status !== 'pending') return res.status(400).json({ message: 'Only pending orders can be cancelled' });

    order.status = 'cancelled';
    await order.save();
    
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getOrderById, cancelOrder };
