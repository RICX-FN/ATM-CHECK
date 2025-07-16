import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import LoginAdmin from "../pages/login-admin/login-admin";

export default function ATMRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
        </Routes>
    );
}
