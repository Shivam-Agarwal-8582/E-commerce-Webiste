import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, formatDate } from '../../utils/formatters';
import OrderStatusBadge, { PaymentStatusBadge } from './OrderStatusBadge';
import Button from '../common/Button';
import { HiOutlineArrowRight } from 'react-icons/hi2';

export const OrderCard = ({ order, isAdmin = false }) => {
  if (!order) return null;

  const {
    _id,
    orderNumber,
    createdAt,
    orderStatus,
    paymentStatus,
    total,
    items = [],
    customer,
  } = order;

  const displayId = orderNumber || _id;
  const linkPath = isAdmin ? `/admin/orders/${displayId}` : `/my-orders/${displayId}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow p-5 space-y-4">
      {/* Header: ID, Date, Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-extrabold text-slate-900 font-mono">
              #{displayId}
            </span>
            <OrderStatusBadge status={orderStatus} />
            <PaymentStatusBadge status={paymentStatus} />
          </div>
          <p className="text-xs text-slate-400 mt-1">Placed on {formatDate(createdAt)}</p>
          {isAdmin && customer && (
            <p className="text-xs text-indigo-600 font-semibold mt-0.5">
              Customer: {customer.name} ({customer.phone || customer.email})
            </p>
          )}
        </div>

        <div className="text-right">
          <span className="text-base font-black text-slate-900">{formatPrice(total)}</span>
          <p className="text-[11px] text-slate-400">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      {/* Products Preview */}
      <div className="flex items-center space-x-3 overflow-x-auto py-1 scrollbar-none">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 flex-shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <div className="h-12 w-12 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-slate-200/60">
              <img
                src={item.image || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="max-w-[140px] text-left">
              <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
              <p className="text-[10px] text-slate-500">Qty: {item.quantity} × {formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / CTA */}
      <div className="pt-2 flex justify-end">
        <Link to={linkPath}>
          <Button variant="secondary" size="sm" className="flex items-center space-x-1.5 text-xs">
            <span>View Full Details</span>
            <HiOutlineArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
