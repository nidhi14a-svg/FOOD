import React, { useEffect, useState } from "react";
import { getFoodList, completeFood } from "../services/api";
import Alert from "../components/Alert";
import FoodCard from "../components/FoodCard";

function FoodListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const loadFood = async () => {
    setError(null);
    try {
      const data = await getFoodList({ status: "Available", type: filterType, location: filterLocation });
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadFood();
  }, []);

  const handleComplete = async (foodId) => {
    try {
      await completeFood(foodId);
      loadFood();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="mb-12">
        <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Available Food Surplus</h2>
        <p className="text-gray-500 text-lg font-medium">Real-time listings of rescue-ready food from local providers.</p>
      </div>

      {error && (
        <div className="p-4 mb-8 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-pulse">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-gray-50 p-8 rounded-[2.5rem] mb-12 flex flex-wrap items-end gap-6 border border-gray-100">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Food Type</label>
          <input 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full bg-white border-none rounded-2xl py-4 px-6 text-gray-900 font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            placeholder="e.g. Veg, Non-Veg, Bakery"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Location</label>
          <input 
            value={filterLocation} 
            onChange={(e) => setFilterLocation(e.target.value)}
            className="w-full bg-white border-none rounded-2xl py-4 px-6 text-gray-900 font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            placeholder="e.g. Downtown, South Side"
          />
        </div>
        <button 
          onClick={loadFood}
          className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
        >
          Refresh List
        </button>
      </div>

      {items.length === 0 && !error && (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <p className="text-gray-400 text-xl font-bold">No available food found at the moment.</p>
          <p className="text-gray-300">Check back later or try adjusting your filters.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} onComplete={handleComplete} />
        ))}
      </div>
    </div>
  );
}

export default FoodListPage;
