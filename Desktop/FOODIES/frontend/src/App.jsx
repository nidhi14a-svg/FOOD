import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import FoodListPage from "./pages/FoodListPage";
import AddFoodPage from "./pages/AddFoodPage";
import { getToken, clearToken } from "./services/api";

function App() {
  const [page, setPage] = useState("login");
  const token = getToken();

  if (!token && page !== "login" && page !== "register") {
    return <LoginPage onLogin={() => setPage("dashboard")} onSwitch={() => setPage("register")} />;
  }

  return (
    <div className="app-shell">
      <header className="header">
        <div className="brand">Food Waste Management</div>
        <nav>
          {token && (
            <>
              <button onClick={() => setPage("dashboard")}>Dashboard</button>
              <button onClick={() => setPage("food-list")}>Available Food</button>
              <button onClick={() => setPage("add-food")}>Add Food</button>
              <button onClick={() => { clearToken(); setPage("login"); }}>Logout</button>
            </>
          )}
          {!token && page === "login" && <button onClick={() => setPage("register")}>Register</button>}
          {!token && page === "register" && <button onClick={() => setPage("login")}>Login</button>}
        </nav>
      </header>

      <main className="content">
        {page === "login" && <LoginPage onLogin={() => setPage("dashboard")} onSwitch={() => setPage("register")} />}
        {page === "register" && <RegisterPage onRegistered={() => setPage("login")} />}
        {page === "dashboard" && <DashboardPage />}
        {page === "food-list" && <FoodListPage />}
        {page === "add-food" && <AddFoodPage />}
      </main>
    </div>
  );
}

export default App;
