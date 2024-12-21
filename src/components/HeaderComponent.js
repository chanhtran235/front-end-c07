import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import {Link, NavLink, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/accountAction";

function HeaderComponent() {
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout());
        navigate('/home');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({isActive}) => `nav-link ${isActive ? 'active-link' : ''}`}
                                     to="/products">List</NavLink>
                        </li>
                        <li className="nav-item">
                            {!account &&
                            <NavLink className={({isActive}) => `nav-link ${isActive ? 'active-link' : ''}`}
                                     to="/login">Login</NavLink>}

                        </li>
                        <li className="nav-item">
                            {account && <NavLink className="nav-link active" onClick={handleLogout}>Logout</NavLink>}
                        </li>
                        <li className="nav-item">
                           <span className="nav-link active">{account && account.username}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

}

export default HeaderComponent;