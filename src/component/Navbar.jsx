import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserDropdown from "./UserDropdown";

function Navbar() {
    const { user } = useAuth();
    const linkClass = ({ isActive }) => (isActive ? "active" : "");

   return (
        <nav className="navbar">
            <div className="navbar-brand">Portofolio Saya</div>
            <ul className="navbar-menu">
                <li>
                    <NavLink to="/" end className={linkClass}>
                    Home
                    </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={linkClass}>
                        About
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to="/projects" className={linkClass}>
                        Projects 
                        </NavLink>
                        </li>
                        <li>
                        <NavLink
                        to="/contact"
                        className={linkClass}
                        >
                            Contact
                            </NavLink>
                            </li>
                            <li>
                                {user ? (
                                    <UserDropdown />
                                ) : (
                                    <NavLink to="/login" className={linkClass}>
                                        Login
                                    </NavLink>
                                )}
                            </li>
                            </ul>
                            </nav>

    );
}

export default Navbar;