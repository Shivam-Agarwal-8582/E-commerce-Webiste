import React from 'react';
import Badge from '../common/Badge';

export const OrderStatusBadge = ({ status }) => {
  switch (status) {
    case 'Pending':
      return <Badge variant="warning">Pending</Badge>;
    case 'Confirmed':
      return <Badge variant="info">Confirmed</Badge>;
    case 'Processing':
      return <Badge variant="primary">Processing</Badge>;
    case 'Shipped':
      return <Badge variant="info">Shipped</Badge>;
    case 'Out for Delivery':
      return <Badge variant="warning">Out for Delivery</Badge>;
    case 'Delivered':
      return <Badge variant="success">Delivered</Badge>;
    case 'Cancelled':
      return <Badge variant="danger">Cancelled</Badge>;
    default:
      return <Badge variant="default">{status || 'Unknown'}</Badge>;
  }
};

export const PaymentStatusBadge = ({ status }) => {
  switch (status) {
    case 'Paid':
      return <Badge variant="success">Paid</Badge>;
    case 'Pending':
      return <Badge variant="warning">Payment Pending</Badge>;
    case 'Failed':
      return <Badge variant="danger">Payment Failed</Badge>;
    default:
      return <Badge variant="default">{status || 'N/A'}</Badge>;
  }
};

export default OrderStatusBadge;
