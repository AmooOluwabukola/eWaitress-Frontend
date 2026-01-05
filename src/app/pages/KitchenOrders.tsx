import  type{ Order } from '../types';
import { ArrowLeft, Clock, ChefHat, CircleCheck } from 'lucide-react';
import { toast } from 'sonner';

interface KitchenOrdersProps {
  orders: Order[];
  onBack: () => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function KitchenOrders({ orders, onBack, onUpdateOrderStatus }: KitchenOrdersProps) {
  const kitchenOrders = orders.filter(o => 
    ['confirmed', 'preparing'].includes(o.status)
  ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const handleStartPreparing = (orderId: string) => {
    onUpdateOrderStatus(orderId, 'preparing');
    toast.success('Order moved to preparing');
  };

  const handleMarkReady = (orderId: string) => {
    onUpdateOrderStatus(orderId, 'ready');
    toast.success('Order marked as ready');
  };

  const getTimeSinceOrder = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 1000 / 60);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

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
                <ChefHat className="w-6 h-6 text-amber-600" />
                <h1 className="text-stone-800">Kitchen Orders</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-stone-600">Active Orders</p>
                <p className="text-amber-600">{kitchenOrders.length}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {kitchenOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <ChefHat className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">No orders to prepare</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {kitchenOrders.map((order) => {
              const maxPrepTime = order.items.reduce((max, item) => 
                Math.max(max, item.preparationTime), 0
              );
              
              return (
                <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className={`p-4 ${
                    order.status === 'confirmed' 
                      ? 'bg-yellow-50 border-l-4 border-yellow-500' 
                      : 'bg-blue-50 border-l-4 border-blue-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-stone-800">{order.id}</h3>
                        <p className="text-sm text-stone-600 mt-1">
                          {order.roomNumber ? `Room ${order.roomNumber}` : `Table ${order.tableNumber}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-stone-600">
                          <Clock className="w-4 h-4" />
                          {getTimeSinceOrder(order.createdAt)}
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Prep: {maxPrepTime} min
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                            <span className="text-sm text-amber-700">{item.quantity}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-stone-800">{item.name}</p>
                            <p className="text-xs text-stone-500 mt-1">
                              {item.preparationTime} min prep time
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.specialInstructions && (
                      <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs text-amber-700 mb-1">Special Instructions:</p>
                        <p className="text-sm text-amber-900">{order.specialInstructions}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      {order.status === 'confirmed' ? (
                        <button
                          onClick={() => handleStartPreparing(order.id)}
                          className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <ChefHat className="w-5 h-5" />
                          Start Preparing
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkReady(order.id)}
                          className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <CircleCheck className="w-5 h-5" />
                          Mark as Ready
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}