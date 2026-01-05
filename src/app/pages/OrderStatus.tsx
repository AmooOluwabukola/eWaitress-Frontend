import React from 'react';
import type { Order } from '../types';
import { ArrowLeft, Clock, CircleCheck, Package, Truck, ChefHat } from 'lucide-react';

interface OrderStatusProps {
  order: Order;
  onBack: () => void;
}

export function OrderStatus({ order, onBack }: OrderStatusProps) {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6" />;
      case 'confirmed':
        return <CircleCheck className="w-6 h-6" />;
      case 'preparing':
        return <ChefHat className="w-6 h-6" />;
      case 'ready':
        return <Package className="w-6 h-6" />;
      case 'delivered':
        return <Truck className="w-6 h-6" />;
      default:
        return <CircleCheck className="w-6 h-6" />;
    }
  };

  const statusSteps = [
    { key: 'pending', label: 'Order Received' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'preparing', label: 'Preparing' },
    { key: 'ready', label: 'Ready' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </button>
            <h1 className="text-stone-800">Order Status</h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Order Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-stone-800">Order #{order.id}</h2>
              <p className="text-sm text-stone-500 mt-1">
                {order.createdAt.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-stone-600">Total Amount</p>
              <p className="text-amber-600">${order.total.toFixed(2)}</p>
            </div>
          </div>

          {order.roomNumber && (
            <p className="text-sm text-stone-600">Room: {order.roomNumber}</p>
          )}
          {order.tableNumber && (
            <p className="text-sm text-stone-600">Table: {order.tableNumber}</p>
          )}
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="mb-6 text-stone-800">Order Progress</h2>
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.key} className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-stone-200 text-stone-400'
                  }`}>
                    {isCompleted ? (
                      <CircleCheck className="w-6 h-6" />
                    ) : (
                      <Clock className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`${
                      isCurrent ? 'text-amber-600' : isCompleted ? 'text-stone-800' : 'text-stone-400'
                    }`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-stone-500 mt-1">In progress...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="mb-4 text-stone-800">Order Items</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between py-3 border-b border-stone-200 last:border-0">
                <div>
                  <p className="text-sm text-stone-800">{item.name}</p>
                  <p className="text-xs text-stone-500 mt-1">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm text-stone-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {order.specialInstructions && (
            <div className="mt-4 pt-4 border-t border-stone-200">
              <p className="text-sm text-stone-600 mb-2">Special Instructions:</p>
              <p className="text-sm text-stone-800 bg-stone-50 p-3 rounded-lg">
                {order.specialInstructions}
              </p>
            </div>
          )}
        </div>

        {/* Estimated Time */}
        {order.status === 'preparing' && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
            <div className="flex items-center gap-3">
              <ChefHat className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-sm text-amber-900">Your order is being prepared</p>
                <p className="text-xs text-amber-700 mt-1">
                  Estimated time: {order.items.reduce((max, item) => Math.max(max, item.preparationTime), 0)} minutes
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}