
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import CartItemCard from '../components/CartItemCard';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getTotalItems } = useCart();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-tasty-cream to-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-8 text-center bg-white shadow-lg border-0">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold text-tasty-charcoal mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any delicious items yet!</p>
            <Button
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Browse Our Menu
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tasty-cream to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Cart Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-tasty-charcoal mb-2">Your Cart</h1>
            <p className="text-gray-600">
              {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="animate-fade-in">
                    <CartItemCard item={item} />
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-white shadow-lg border-0 sticky top-24">
                <h3 className="text-xl font-bold text-tasty-charcoal mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      {totalPrice >= 25 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        '$3.99'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-tasty-orange">
                      ${(totalPrice + (totalPrice >= 25 ? 0 : 3.99) + (totalPrice * 0.08)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {totalPrice < 25 && (
                  <div className="mb-4 p-3 bg-tasty-orange/10 rounded-lg border border-tasty-orange/20">
                    <p className="text-sm text-tasty-orange-dark">
                      Add ${(25 - totalPrice).toFixed(2)} more for free delivery!
                    </p>
                  </div>
                )}

                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary mb-3"
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full btn-secondary"
                >
                  Continue Shopping
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
