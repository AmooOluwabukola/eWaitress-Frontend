import React, { useState } from 'react';
import type { CartItem, PaymentMethod } from '../types';
import { ArrowLeft, Smartphone, House, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onPlaceOrder: (orderData: {
    customerName: string;
    roomNumber?: string;
    tableNumber?: string;
    paymentMethod: PaymentMethod;
    specialInstructions?: string;
  }) => void;
}

export function Checkout({ cartItems, onBack, onPlaceOrder }: CheckoutProps) {
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState<'lodge' | 'bar-lounge' | ''>('');
  const [roomNumber, setRoomNumber] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('room-charge');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName) {
      toast.error('Please enter your name');
      return;
    }

    if (!location) {
      toast.error('Please select your location');
      return;
    }

    if (location === 'lodge' && !roomNumber) {
      toast.error('Please enter your room number');
      return;
    }

    if (location === 'bar-lounge' && !tableNumber) {
      toast.error('Please enter your table number');
      return;
    }

    onPlaceOrder({
      customerName,
      roomNumber: location === 'lodge' ? roomNumber : undefined,
      tableNumber: location === 'bar-lounge' ? tableNumber : undefined,
      paymentMethod,
      specialInstructions: specialInstructions || undefined
    });
  };

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
            <h1 className="text-stone-800">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="mb-4 text-stone-800">Order Summary</h2>
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-stone-600">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-stone-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="pt-3 border-t border-stone-200 flex justify-between">
                <span className="text-stone-800">Total</span>
                <span className="text-amber-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="mb-4 text-stone-800">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-stone-700">Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-stone-700">Location *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setLocation('lodge');
                      setTableNumber('');
                    }}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      location === 'lodge'
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <House className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                    <span className="text-sm text-stone-800">Lodge</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLocation('bar-lounge');
                      setRoomNumber('');
                    }}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      location === 'bar-lounge'
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <svg className="w-5 h-5 text-amber-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M5 21V7l8-4v18M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1M19 21V10h-6" />
                    </svg>
                    <span className="text-sm text-stone-800">Bar/Lounge</span>
                  </button>
                </div>
              </div>

              {location === 'lodge' && (
                <div>
                  <label className="block text-sm mb-2 text-stone-700">Room Number *</label>
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., 305"
                    required
                  />
                </div>
              )}

              {location === 'bar-lounge' && (
                <div>
                  <label className="block text-sm mb-2 text-stone-700">Table Number *</label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., 12"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="mb-4 text-stone-800">Payment Method</h2>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('room-charge')}
                className={`w-full p-4 rounded-lg border-2 transition-colors flex items-center gap-3 ${
                  paymentMethod === 'room-charge'
                    ? 'border-amber-600 bg-amber-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <House className="w-5 h-5 text-amber-600" />
                <span className="text-stone-800">Charge to Room</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('online-payment')}
                className={`w-full p-4 rounded-lg border-2 transition-colors flex items-center gap-3 ${
                  paymentMethod === 'online-payment'
                    ? 'border-amber-600 bg-amber-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <Smartphone className="w-5 h-5 text-amber-600" />
                <span className="text-stone-800">Online Payment</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`w-full p-4 rounded-lg border-2 transition-colors flex items-center gap-3 ${
                  paymentMethod === 'cash'
                    ? 'border-amber-600 bg-amber-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <DollarSign className="w-5 h-5 text-amber-600" />
                <span className="text-stone-800">Cash on Delivery</span>
              </button>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="mb-4 text-stone-800">Special Instructions</h2>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              placeholder="Any special requests or dietary requirements..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg transition-colors"
          >
            Place Order - ${total.toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
}
