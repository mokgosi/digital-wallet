import {
    BrowserRouter as Router, Routes, Route,
  } from "react-router-dom";

import { Home } from "./pages/Home";  
import { Wallets } from "./pages/Wallets";  
import { Transactions } from "./pages/Transactions";  
import { Account } from "./pages/Account";  
import { Login } from "./pages/Login";  
import { Logout } from "./pages/Logout";  
import { Register } from "./pages/Register";  

const Routing = () => {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/wallets" element={<Wallets />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/accounts/:account_number"  element={<Account />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Routing