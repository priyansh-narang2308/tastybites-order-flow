
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-hero-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-tasty-charcoal">TastyBites</h1>
              <p className="text-xs text-gray-500 -mt-1">Delicious Food Delivered</p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            {location.pathname !== '/' && (
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-tasty-charcoal hover:text-tasty-orange"
              >
                Back to Menu
              </Button>
            )}
            
            {location.pathname !== '/cart' && (
              <Button
                onClick={() => navigate('/cart')}
                className="relative bg-tasty-orange hover:bg-tasty-orange-dark text-white"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-tasty-gold text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce-gentle">
                    {totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
