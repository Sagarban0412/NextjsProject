import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ItemCard = () => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
      {foodItems.map((item) => (
        <div
          key={item._id}
          className="group relative aspect-square rounded-xl overflow-hidden bg-gray-200 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: item.image ? `url(${item.image})` : "none",
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
              {item.category?.name || 'Food'}
            </span>
          </div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="space-y-2">
              <h3 className="font-bold text-lg leading-tight line-clamp-2">
                {item.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-400">
                  ₹{item.price}
                </span>
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCard;
