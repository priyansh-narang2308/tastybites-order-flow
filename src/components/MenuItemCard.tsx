
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem, useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <Card className="overflow-hidden card-hover bg-white shadow-lg border-0">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-tasty-orange text-white px-2 py-1 rounded-full text-sm font-semibold">
          ${item.price.toFixed(2)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-tasty-charcoal mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        
        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-tasty-charcoal">Quantity:</span>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-8 h-8 p-0 rounded-full border-tasty-orange text-tasty-orange hover:bg-tasty-orange hover:text-white"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
                className="w-8 h-8 p-0 rounded-full border-tasty-orange text-tasty-orange hover:bg-tasty-orange hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-bold text-tasty-orange">
              ${(item.price * quantity).toFixed(2)}
            </p>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full btn-primary"
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default MenuItemCard;
