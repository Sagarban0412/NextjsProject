import axios from "axios";
import React, { useState, useEffect, memo } from "react";
import { toast } from "react-toastify";
import { Plus, Minus } from "lucide-react";

const ItemCard = memo(({ onAddItem, orders = [] }) => {
  const [foodItems, setFoodItems] = useState([]);

  const fetchFoodItems = async () => {
    try {
      const res = await axios.get("/api/foodItems");
      setFoodItems(res.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {foodItems.map((item) => {
        const orderItem = orders.find(order => order._id === item._id);
        const quantity = orderItem?.quantity || 0;
        
        return (
          <div
            key={item._id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
          >
            {/* Image Container */}
            <div className="relative h-32 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage: item.image ? `url(${item.image})` : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  {item.category?.name || 'Food'}
                </span>
              </div>
              
              {/* Quantity Badge */}
              {quantity > 0 && (
                <div className="absolute top-3 right-3">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {quantity}
                  </span>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  ₹{item.price}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                {quantity === 0 ? (
                  <button 
                    onClick={() => onAddItem && onAddItem(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <button 
                      onClick={() => onAddItem && onAddItem({ ...item, quantity: -1 })}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200 shadow-md"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <button 
                      onClick={() => onAddItem && onAddItem(item)}
                      className="flex-1 mx-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition-colors duration-200"
                    >
                      {quantity} in Cart
                    </button>
                    
                    <button 
                      onClick={() => onAddItem && onAddItem(item)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200 shadow-md"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

ItemCard.displayName = 'ItemCard';
export default ItemCard;
