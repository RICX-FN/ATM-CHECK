import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import loginadm from "../pages/loginadm/LoginAdm";

export default function Routes() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        </BrowserRouter>
    );
}
