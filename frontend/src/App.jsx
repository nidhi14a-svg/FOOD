import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import FoodListPage from "./pages/FoodListPage";
import AddFoodPage from "./pages/AddFoodPage";
import { Sidebar } from "./components/dashboard/sidebar";
import { DashboardNavbar } from "./components/dashboard/navbar";
import { getToken, clearToken } from "./services/api";

import ActiveDonationsPage from "./pages/ActiveDonationsPage";
import ShareImpactPage from "./pages/ShareImpactPage";
import RequestConfirmationPage from "./pages/RequestConfirmationPage";
import PostConfirmationPage from "./pages/PostConfirmationPage";

function App() {
  const [page, setPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lastPostedFood, setLastPostedFood] = useState(null);
  const token = getToken();

  // Handle initial page load and token state
  useEffect(() => {
    if (!token) {
      // If no token, we stay on the LoginPage which handles its own hash-based sub-routing
    } else {
      // Basic state-based navigation for demo
    }
  }, [token]);

  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="flex bg-white min-h-screen">
      {/* Premium Sidebar */}
      <Sidebar currentPage={page} setPage={setPage} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
        {/* Top Navbar */}
        <DashboardNavbar />

        {/* Main Content Area */}
        <main className="flex-1 pt-24 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {page === "dashboard" && <DashboardPage setPage={setPage} />}
              {page === "active-donations" && <ActiveDonationsPage />}
              {page === "food-list" && <FoodListPage />}
              {page === "add-food" && <AddFoodPage setPage={setPage} setLastPostedFood={setLastPostedFood} />}
              {page === "share-impact" && <ShareImpactPage setPage={setPage} />}
              {page === "request-confirmation" && <RequestConfirmationPage setPage={setPage} />}
              {page === "post-confirmation" && <PostConfirmationPage food={lastPostedFood} setPage={setPage} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
