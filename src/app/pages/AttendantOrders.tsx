import  { useState } from 'react';
import type { Order } from '../types';
import { ArrowLeft, Package, CircleCheck, Truck } from 'lucide-react';
import { toast } from 'sonner';

interface AttendantOrdersProps {
  orders: Order[];
  onBack: () => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function AttendantOrders({ orders, onBack, onUpdateOrderStatus }: AttendantOrdersProps) {
  const [selectedTab, setSelectedTab] = useState<'ready' | 'delivering'>('ready');

  const readyOrders = orders.filter(o => o.status === 'ready');
  const deliveringOrders = orders.filter(o => o.status === 'delivered');

  const handlePickup = (orderId: string) => {
    onUpdateOrderStatus(orderId, 'delivered');
    toast.success('Order picked up for delivery');
  };

  const handleComplete = (orderId: string) => {
    onUpdateOrderStatus(orderId, 'completed');
    toast.success('Order delivered successfully');
  };

  const displayOrders = selectedTab === 'ready' ? readyOrders : deliveringOrders;

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-stone-600" />
              </button>
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-amber-600" />
                <h1 className="text-stone-800">Order Queue</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedTab('ready')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              selectedTab === 'ready'
                ? 'bg-green-600 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <span>Ready ({readyOrders.length})</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedTab('delivering')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              selectedTab === 'delivering'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <span>Delivering ({deliveringOrders.length})</span>
            </div>
          </button>
        </div>

        {/* Orders List */}
        {displayOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            {selectedTab === 'ready' ? (
              <>
                <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-500">No orders ready for pickup</p>
              </>
            ) : (
              <>
                <Truck className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-500">No orders currently being delivered</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className={`p-4 ${
                  selectedTab === 'ready' 
                    ? 'bg-green-50 border-b-4 border-green-500' 
                    : 'bg-blue-50 border-b-4 border-blue-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-stone-800">{order.id}</h3>
                      <p className="text-sm text-stone-600 mt-1">
                        {order.customerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-600">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-600">Destination:</span>
                      <span className="text-stone-800">
                        {order.roomNumber ? `Room ${order.roomNumber}` : `Table ${order.tableNumber}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-600">Items:</span>
                      <span className="text-stone-800">{order.items.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-600">Payment:</span>
                      <span className="text-stone-800 capitalize">
                        {order.paymentMethod.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mb-6 p-3 bg-stone-50 rounded-lg max-h-40 overflow-y-auto">
                    <p className="text-xs text-stone-600 mb-2">Order Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-stone-600">{item.quantity}x {item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.specialInstructions && (
                    <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-xs text-amber-700 mb-1">Special Instructions:</p>
                      <p className="text-sm text-amber-900">{order.specialInstructions}</p>
                    </div>
                  )}

                  {/* Action Button */}
                  {selectedTab === 'ready' ? (
                    <button
                      onClick={() => handlePickup(order.id)}
                      className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Truck className="w-5 h-5" />
                      Pick Up Order
                    </button>
                  ) : (
                    <button
                      onClick={() => handleComplete(order.id)}
                      className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <CircleCheck className="w-5 h-5" />
                      Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}