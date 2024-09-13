import { Link } from "react-router-dom";

 export const Navbar = () => {
   return (
     <nav>
       <ul>
         <li>
           <Link to="/">Wallets</Link>
         </li>
         <li>
           <Link to="/transactions">Transactions</Link>
         </li>
       </ul>
     </nav>
   );
 }