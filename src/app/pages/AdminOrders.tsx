import React, { useState } from 'react';
import type { Order, OrderStatus } from '../types';
import { ArrowLeft, Search, ListFilter } from 'lucide-react';
import { toast } from 'sonner';

interface AdminOrdersProps {
  orders: Order[];
  onBack: () => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export function AdminOrders({ orders, onBack, onUpdateOrderStatus }: AdminOrdersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    onUpdateOrderStatus(orderId, newStatus);
    toast.success('Order status updated');
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'preparing':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'ready':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'delivered':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'completed':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </button>
            <h1 className="text-stone-800">Order Management</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="relative">
              <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-stone-500">No orders found</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all ${
                    selectedOrder?.id === order.id ? 'ring-2 ring-amber-500' : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-stone-800 mb-1">{order.id}</h3>
                      <p className="text-sm text-stone-600">{order.customerName}</p>
                      <p className="text-xs text-stone-500 mt-1">
                        {order.createdAt.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-600">${order.total.toFixed(2)}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    {order.roomNumber && (
                      <span>Room: {order.roomNumber}</span>
                    )}
                    {order.tableNumber && (
                      <span>Table: {order.tableNumber}</span>
                    )}
                    <span>{order.items.length} items</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="mb-4 text-stone-800">Order Details</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-stone-600 mb-1">Customer</p>
                    <p className="text-stone-800">{selectedOrder.customerName}</p>
                  </div>

                  {selectedOrder.roomNumber && (
                    <div>
                      <p className="text-sm text-stone-600 mb-1">Room Number</p>
                      <p className="text-stone-800">{selectedOrder.roomNumber}</p>
                    </div>
                  )}

                  {selectedOrder.tableNumber && (
                    <div>
                      <p className="text-sm text-stone-600 mb-1">Table Number</p>
                      <p className="text-stone-800">{selectedOrder.tableNumber}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-stone-600 mb-1">Payment Method</p>
                    <p className="text-stone-800 capitalize">{selectedOrder.paymentMethod.replace('-', ' ')}</p>
                  </div>

                  {selectedOrder.assignedAttendant && (
                    <div>
                      <p className="text-sm text-stone-600 mb-1">Assigned To</p>
                      <p className="text-stone-800">{selectedOrder.assignedAttendant}</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-sm text-stone-600 mb-3">Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-stone-600">{item.quantity}x {item.name}</span>
                        <span className="text-stone-800">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.specialInstructions && (
                  <div className="mb-6 p-3 bg-stone-50 rounded-lg">
                    <p className="text-sm text-stone-600 mb-1">Special Instructions</p>
                    <p className="text-sm text-stone-800">{selectedOrder.specialInstructions}</p>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-sm text-stone-600 mb-2">Update Status</p>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Total</span>
                    <span className="text-amber-600">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-stone-500">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}