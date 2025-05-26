
import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem, useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card className="p-4 bg-white shadow-md border-0 mb-4">
      <div className="flex items-center space-x-4">
        {/* Item Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        
        {/* Item Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-tasty-charcoal">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
          <p className="text-tasty-orange font-bold">${item.price.toFixed(2)} each</p>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuantityChange(-1)}
            className="w-8 h-8 p-0 rounded-full border-tasty-orange text-tasty-orange hover:bg-tasty-orange hover:text-white"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuantityChange(1)}
            className="w-8 h-8 p-0 rounded-full border-tasty-orange text-tasty-orange hover:bg-tasty-orange hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Subtotal and Remove */}
        <div className="text-right">
          <p className="text-lg font-bold text-tasty-charcoal mb-2">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;
