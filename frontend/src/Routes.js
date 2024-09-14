import {
    BrowserRouter as Router, Routes, Route,
  } from "react-router-dom";

import { Wallets } from "./pages/Wallets";  
import { Transactions } from "./pages/Transactions";  
import { Account } from "./pages/Account";  

const Routing = () => {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Wallets />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/accounts/:account_number"  element={<Account />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Routing