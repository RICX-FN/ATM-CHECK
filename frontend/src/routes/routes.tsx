import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import LoginAdmin from "../pages/login-admin/login-admin";
import LoginAgent from "../pages/login-agent/login-agent";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Agent from "../pages/agent/Agent";

export default function ATMRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/login-agent" element={<LoginAgent />} />

      {/* Rotas protegidas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/agent"
        element={
          <PrivateRoute>
            <Agent />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
