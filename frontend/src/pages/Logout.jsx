import { useEffect } from 'react';
import { Navbar, LoggedOutView } from '../components/Navbar.jsx'
import { logout } from '../utils/auth';

export const Logout = () => {

    useEffect(() => {
        logout();
    }, []);
    // return <LoggedOutView title="You have been logged out" />;

    return (
        <div  className="wallets">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    {/* <div className="card p-3">
                        <div className="float-right my-2">
                            <Navbar />
                        </div>
                    </div> */}
                    <div className="card p-3">
                        <LoggedOutView title="You have been logged out" />
                    </div>
                </div>
            </div>
        </div>
                    
        ) 

};

// export default Logout;