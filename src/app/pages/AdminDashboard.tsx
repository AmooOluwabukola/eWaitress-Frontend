import React from 'react';
import type { Order, MenuItem, Staff } from '../types';
import { ArrowLeft, Package, DollarSign, Users, UtensilsCrossed, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminDashboardProps {
  orders: Order[];
  menuItems: MenuItem[];
  staff: Staff[];
  onBack: () => void;
}

export function AdminDashboard({ orders, menuItems, staff, onBack }: AdminDashboardProps) {
  const activeOrders = orders.filter(o => !['completed', 'cancelled'].includes(o.status));
  const todayRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);
  const activeStaff = staff.filter(s => s.active).length;

  const statusCount = {
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
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
            <h1 className="text-stone-800">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-sm text-stone-600 mb-1">Active Orders</p>
            <p className="text-stone-800">{activeOrders.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-stone-600 mb-1">Today's Revenue</p>
            <p className="text-stone-800">${todayRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-stone-600 mb-1">Active Staff</p>
            <p className="text-stone-800">{activeStaff}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <UtensilsCrossed className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-stone-600 mb-1">Menu Items</p>
            <p className="text-stone-800">{menuItems.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/orders"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="mb-2 text-stone-800">Manage Orders</h3>
            <p className="text-sm text-stone-600 mb-4">
              View and update order status
            </p>
            <div className="flex gap-4 text-sm">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                {statusCount.pending} Pending
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {statusCount.preparing} Preparing
              </span>
            </div>
          </Link>

          <Link
            to="/admin/menu"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="mb-2 text-stone-800">Menu Management</h3>
            <p className="text-sm text-stone-600">
              Edit items and availability
            </p>
          </Link>

          <Link
            to="/admin/staff"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="mb-2 text-stone-800">Staff Management</h3>
            <p className="text-sm text-stone-600">
              Manage team assignments
            </p>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="mb-6 text-stone-800">Recent Orders</h2>
          <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between py-4 border-b border-stone-200 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-stone-100 rounded-lg">
                    <Clock className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-800">{order.id}</p>
                    <p className="text-xs text-stone-500">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-stone-600">${order.total.toFixed(2)}</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'ready' ? 'bg-green-100 text-green-700' :
                    'bg-stone-100 text-stone-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
