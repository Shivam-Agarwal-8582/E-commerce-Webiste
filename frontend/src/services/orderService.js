import api, { getMockDb } from '../api/axios';

export const orderService = {
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch {
      const db = getMockDb();
      const orderNumber = 'ORD-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      const newOrder = {
        _id: orderNumber,
        orderNumber,
        ...orderData,
        createdAt: new Date().toISOString(),
        orderStatus: 'Pending',
        timeline: [
          {
            status: 'Pending',
            timestamp: new Date().toISOString(),
            note: 'Order placed by customer',
          },
        ],
      };

      // If paid online via Razorpay, mark as Confirmed
      if (orderData.paymentStatus === 'Paid') {
        newOrder.orderStatus = 'Confirmed';
        newOrder.timeline.push({
          status: 'Confirmed',
          timestamp: new Date().toISOString(),
          note: 'Payment verified successfully via Razorpay',
        });
      }

      db.orders.unshift(newOrder);
      db.saveOrders(db.orders);
      return { success: true, order: newOrder };
    }
  },

  async getMyOrders() {
    try {
      const response = await api.get('/orders/my-orders');
      return response.data;
    } catch {
      const db = getMockDb();
      return { success: true, orders: db.orders };
    }
  },

  async getOrderById(id) {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch {
      const db = getMockDb();
      const order = db.orders.find((o) => o._id === id || o.orderNumber === id);
      if (!order) throw new Error('Order not found');
      return { success: true, order };
    }
  },
};

export default orderService;
