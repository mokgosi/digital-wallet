import {
    BrowserRouter as Router, Routes, Route,
  } from "react-router-dom";

import { Wallets } from "./pages/Wallets";  
import { Transactions } from "./pages/Transactions";  

const Routing = () => {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Wallets />} />
                    <Route path="/transactions" element={<Transactions />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Routing