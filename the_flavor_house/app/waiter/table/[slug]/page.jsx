"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { UtensilsCrossed, X, ArrowLeft, Plus, Minus } from "lucide-react";
import ItemCard from "@/components/ItemCard";

const page = () => {
  const params = useParams();
  const router = useRouter();
  const table = params.slug;
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem(`table-${table}-orders`);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders([]); // Clear orders if no saved data for this table
    }
  }, [table]);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem(`table-${table}-orders`, JSON.stringify(orders));
    } else {
      localStorage.removeItem(`table-${table}-orders`);
    }
  }, [orders, table]);
  
  const total = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
  }, [orders]);
  
  const removeItem = useCallback((id) => {
    setOrders(prev => prev.filter(order => order._id !== id));
  }, []);
  
  const updateQuantity = useCallback((id, change) => {
    setOrders(prev => 
      prev.map(order => {
        if (order._id === id) {
          const newQuantity = order.quantity + change;
          return newQuantity > 0 ? { ...order, quantity: newQuantity } : null;
        }
        return order;
      }).filter(Boolean)
    );
  }, []);

  const addToOrder = useCallback((item) => {
    setOrders((prev) => {
      const existing = prev.find((order) => order._id === item._id);
      const change = item.quantity || 1;
      
      let newOrders;
      if (existing) {
        const newQuantity = existing.quantity + change;
        if (newQuantity <= 0) {
          newOrders = prev.filter((order) => order._id !== item._id);
        } else {
          newOrders = prev.map((order) =>
            order._id === item._id
              ? { ...order, quantity: newQuantity }
              : order
          );
        }
      } else if (change > 0) {
        newOrders = [...prev, { ...item, quantity: change }];
      } else {
        newOrders = prev;
      }
      
      return newOrders;
    });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl">
              <UtensilsCrossed size={24} className="text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">Table {table}</h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-green-600">₹{total}</p>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Menu Section */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <ItemCard onAddItem={addToOrder} orders={orders} />
          </div>
        </div>

        {/* Checkout Section */}
        <div className="w-96 bg-white shadow-lg border-l">
          <div className="p-6 border-b bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>
            <p className="text-sm text-gray-500">{orders.length} items selected</p>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-300px)]">
            {orders.length === 0 ? (
              <div className="p-6 text-center">
                <UtensilsCrossed size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No items added yet</p>
                <p className="text-sm text-gray-400">Start adding items from the menu</p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {orders.map((order) => (
                  <div key={order._id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{order.name}</h4>
                        <p className="text-sm text-gray-500">₹{order.price} each</p>
                      </div>
                      <button 
                        onClick={() => removeItem(order._id)}
                        className="p-1 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(order._id, -1)}
                          className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold text-black">{order.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(order._id, 1)}
                          className="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">₹{order.price * order.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {orders.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">₹{total}</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-colors duration-200">
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
