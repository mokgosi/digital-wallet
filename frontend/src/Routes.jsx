import {
    BrowserRouter as Router, Routes, Route,
  } from "react-router-dom";

import { Wallets } from "./pages/Wallets";  
import { Transactions } from "./pages/Transactions";  
import { Account } from "./pages/Account";  
import { Login } from "./pages/Login";  
import { Register } from "./pages/Register";  

const Routing = () => {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Wallets />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/accounts/:account_number"  element={<Account />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                </Routes>
            </Router>
        </div>
    )
}

export default Routing