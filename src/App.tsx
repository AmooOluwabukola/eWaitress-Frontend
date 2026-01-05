import  { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import type { UserRole, Order, CartItem, MenuItem, OrderStatus, Staff } from './app/types';
import { menuItems as initialMenuItems, initialOrders, staff as initialStaff} from './app/data/mockData';
import { RoleSelector } from './app/components/RoleSelector';
import { GuestMenu } from './app/pages/GuestMenu';
import { Checkout } from './app/pages/Checkout';
import { OrderStatus as OrderStatusPage } from './app/pages/OrderStatus';
import { AdminDashboard } from './app/pages/AdminDashboard';
import { AdminOrders } from './app/pages/AdminOrders';
import { AdminMenu } from './app/pages/AdminMenu';
import { AdminStaff } from './app/pages/AdminStaff';
import { AttendantOrders } from './app/pages/AttendantOrders';
import { KitchenOrders } from './app/pages/KitchenOrders';
import { toast } from 'sonner';
import RestaurantDashboard from './app/pages/RestaurantDashboard';
export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [checkoutCart, setCheckoutCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const handleSelectRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const handleBackToRoleSelector = () => {
    setCurrentRole(null);
    setCheckoutCart([]);
    setCurrentOrder(null);
  };

  const handleCheckout = (cartItems: CartItem[]) => {
    setCheckoutCart(cartItems);
  };

  const handlePlaceOrder = (orderData: {
    customerName: string;
    roomNumber?: string;
    tableNumber?: string;
    paymentMethod: 'room-charge' | 'online-payment' | 'cash';
    specialInstructions?: string;
  }) => {
    const newOrder: Order = {
      id: `ORD${String(orders.length + 1).padStart(3, '0')}`,
      items: checkoutCart,
      total: checkoutCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'pending',
      customerName: orderData.customerName,
      roomNumber: orderData.roomNumber,
      tableNumber: orderData.tableNumber,
      paymentMethod: orderData.paymentMethod,
      specialInstructions: orderData.specialInstructions,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setOrders([newOrder, ...orders]);
    setCurrentOrder(newOrder);
    toast.success('Order placed successfully!', {
      description: `Order #${newOrder.id} has been confirmed`
    });
    setCheckoutCart([]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date() }
        : order
    ));
    if (currentOrder?.id === orderId) {
      setCurrentOrder({ ...currentOrder, status, updatedAt: new Date() });
    }
  };

  const handleToggleMenuAvailability = (itemId: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === itemId
        ? { ...item, available: !item.available }
        : item
    ));
  };

  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(menuItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const handleToggleStaffStatus = (staffId: string) => {
    setStaff(staff.map(member =>
      member.id === staffId
        ? { ...member, active: !member.active }
        : member
    ));
  };

  if (!currentRole) {
    // Allow direct access to the QR dashboard without selecting a role first.
    // If the current URL matches the QR route, render a minimal Router that
    // serves the RestaurantDashboard; otherwise show the RoleSelector.
    if (typeof window !== 'undefined' && /^\/[^\/]+\/qr(\/|$)/.test(window.location.pathname)) {
      return (
        <BrowserRouter>
          <Toaster richColors position="top-center" />
          <Routes>
            <Route path="/:restaurantId/qr" element={<RestaurantDashboard />} />
            <Route path="*" element={<RoleSelector onSelectRole={handleSelectRole} />} />
          </Routes>
        </BrowserRouter>
      );
    }

    return (
      <>
        <Toaster richColors position="top-center" />
        <RoleSelector onSelectRole={handleSelectRole} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      


      <Routes>
                {/* <Route path="/:restaurantId/qr" element={<RestaurantDashboard />} /> */}

        {/* Guest Routes */}
{currentRole === "guest" && (
  <>
    {/* QR TARGET */}
    <Route
      path="/:restaurantId/menu"
      element={
        <GuestMenu
          menuItems={menuItems}
          onBack={handleBackToRoleSelector}
          onCheckout={handleCheckout}
        />
      }
    />

    {/* Checkout */}
    <Route
      path="/checkout"
      element={
        <Checkout
          cartItems={checkoutCart}
          onBack={() => window.history.back()}
          onPlaceOrder={handlePlaceOrder}
        />
      }
    />

    {/* Order Status */}
    <Route
      path="/order/:orderId"
      element={ 
                currentOrder ? (
                  <OrderStatusPage
                    order={currentOrder}
                    onBack={() => setCurrentOrder(null)}
                  />
                ) : checkoutCart.length > 0 ? (
                  <Checkout
                    cartItems={checkoutCart}
                    onBack={() => setCheckoutCart([])}
                    onPlaceOrder={handlePlaceOrder}
                  />
                ):checkoutCart.length > 0 ? (
                  <Checkout
                    cartItems={checkoutCart}
                    onBack={() => setCheckoutCart([])}
                    onPlaceOrder={handlePlaceOrder}
                  />
                ): (<Navigate to="/restaurant/1/menu" replace />)
              }
    />

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/restaurant/1/menu" replace />} />
  </>
)}

        {/* Guest Routes
        {currentRole === 'guest' && (
          <>
            <Route
              path="/"
              element={
                
                currentOrder ? (
                  <OrderStatusPage
                    order={currentOrder}
                    onBack={() => setCurrentOrder(null)}
                  />
                ) : checkoutCart.length > 0 ? (
                  <Checkout
                    cartItems={checkoutCart}
                    onBack={() => setCheckoutCart([])}
                    onPlaceOrder={handlePlaceOrder}
                  />
                ) : (
                  <GuestMenu
                    menuItems={menuItems}
                    onBack={handleBackToRoleSelector}
                    onCheckout={handleCheckout}
                  />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )} */}

        {/* Admin Routes */}
        {currentRole === 'admin' && (
          <>
            <Route
              path="/"
              element={
                <AdminDashboard
                  orders={orders}
                  menuItems={menuItems}
                  staff={staff}
                  onBack={handleBackToRoleSelector}
                />
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminOrders
                  orders={orders}
                  onBack={handleBackToRoleSelector}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                />
              }
            />
            <Route
              path="/admin/menu"
              element={
                <AdminMenu
                  menuItems={menuItems}
                  onBack={handleBackToRoleSelector}
                  onToggleAvailability={handleToggleMenuAvailability}
                  onUpdateItem={handleUpdateMenuItem}
                />
              }
            />
            <Route
              path="/admin/staff"
              element={
                <AdminStaff
                  staff={staff}
                  onBack={handleBackToRoleSelector}
                  onToggleStaffStatus={handleToggleStaffStatus}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* Attendant Routes */}
        {currentRole === 'attendant' && (
          <>
            <Route
              path="/"
              element={
                <AttendantOrders
                  orders={orders}
                  onBack={handleBackToRoleSelector}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* Kitchen Routes */}
        {currentRole === 'kitchen' && (
          <>
            <Route
              path="/"
              element={
                <KitchenOrders
                  orders={orders}
                  onBack={handleBackToRoleSelector}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}