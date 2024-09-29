import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Navbar } from '../components/Navbar';

export const Home = () => {
    // const [isLoggedIn, user] = useAuthStore((state) => [
    //     state.isLoggedIn,
    //     state.user,
    // ]);
    // // return (
    //     <div>
    //         {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
    //     </div>
    // );


    return (
        <div  className="account">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        <div className="float-right my-2">
                            <Navbar />
                        </div>

                        <div className="float-right my-2">
                            <h1 className="">Welcome</h1>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )    
};