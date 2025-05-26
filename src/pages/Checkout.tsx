
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, CreditCard, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    phone: '',
    notes: ''
  });

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice >= 25 ? 0 : 3.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + deliveryFee + tax;

  const handleInputChange = (field: string, value: string) => {
    setDeliveryInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = () => {
    // Here you would normally integrate with your backend/Firebase
    console.log('Order placed:', { cartItems, deliveryInfo, total: finalTotal });
    setOrderPlaced(true);
    clearCart();
    
    // Redirect to menu after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-tasty-cream to-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-lg mx-auto p-8 text-center bg-white shadow-lg border-0 animate-scale-in">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold text-tasty-charcoal mb-4">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order! Your delicious food is being prepared and will be delivered soon.
            </p>
            <div className="bg-tasty-orange/10 rounded-lg p-4 mb-6">
              <p className="text-tasty-orange-dark font-semibold">Estimated Delivery Time</p>
              <p className="text-2xl font-bold text-tasty-orange">25-30 minutes</p>
            </div>
            <p className="text-sm text-gray-500">
              Redirecting to menu in a few seconds...
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tasty-cream to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-tasty-charcoal mb-2">Checkout</h1>
            <p className="text-gray-600">Review your order and delivery details</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary & Delivery Info */}
            <div className="space-y-6">
              {/* Delivery Information */}
              <Card className="p-6 bg-white shadow-lg border-0">
                <h3 className="text-xl font-bold text-tasty-charcoal mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-tasty-orange" />
                  Delivery Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      value={deliveryInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Your City"
                      value={deliveryInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      value={deliveryInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                    <Input
                      id="notes"
                      placeholder="Ring doorbell, leave at door, etc."
                      value={deliveryInfo.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>

              {/* Estimated Delivery Time */}
              <Card className="p-6 bg-gradient-to-r from-tasty-orange to-tasty-orange-light text-white">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Estimated Delivery Time
                </h3>
                <p className="text-2xl font-bold">25-30 minutes</p>
                <p className="text-sm opacity-90 mt-1">From order confirmation</p>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 bg-white shadow-lg border-0">
                <h3 className="text-xl font-bold text-tasty-charcoal mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-tasty-orange" />
                  Order Summary
                </h3>
                
                {/* Order Items */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-tasty-orange">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-tasty-orange">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.phone}
                  className="w-full btn-primary mb-3"
                >
                  Place Order - ${finalTotal.toFixed(2)}
                </Button>
                
                <Button
                  onClick={() => navigate('/cart')}
                  variant="outline"
                  className="w-full btn-secondary"
                >
                  Back to Cart
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
