
import React, { useState } from 'react';
import Header from '../components/Header';
import MenuItemCard from '../components/MenuItemCard';
import { MenuItem } from '../contexts/CartContext';

// Mock menu data - ready for Firebase integration
const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Gourmet Burger',
    description: 'Juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop',
    category: 'Burgers'
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop',
    category: 'Pizza'
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan cheese and homemade croutons',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop',
    category: 'Salads'
  },
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon, served with vegetables',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=400&fit=crop',
    category: 'Seafood'
  },
  {
    id: '5',
    name: 'Chicken Tacos',
    description: 'Three soft tacos with grilled chicken, salsa, and fresh cilantro',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop',
    category: 'Mexican'
  },
  {
    id: '6',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with creamy frosting and chocolate chips',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
    category: 'Desserts'
  },
  {
    id: '7',
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&h=400&fit=crop',
    category: 'Pasta'
  },
  {
    id: '8',
    name: 'BBQ Ribs',
    description: 'Tender pork ribs with our signature BBQ sauce and coleslaw',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop',
    category: 'BBQ'
  }
];

const categories = ['All', 'Burgers', 'Pizza', 'Salads', 'Seafood', 'Mexican', 'Desserts', 'Pasta', 'BBQ'];

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredItems = selectedCategory === 'All' 
    ? mockMenuItems 
    : mockMenuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-tasty-cream to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-hero-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Welcome to TastyBites
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Delicious food delivered fresh to your door
          </p>
          <div className="glass-effect rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-lg">🚚 Free delivery on orders over $25</p>
            <p className="text-sm mt-2 opacity-80">⏱️ Average delivery time: 25-30 minutes</p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-tasty-orange text-white shadow-lg'
                    : 'bg-white text-tasty-charcoal hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-tasty-charcoal mb-8">
            Our Menu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MenuItemCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
