import "./Navbar.css"
import { Link } from 'react-router-dom'

export default function Navbar( {currentUser, handleLogout} ) {
    const loggedIn = (
        <div className="logged-in">
            {/* if the user is logged out .. */}
            
            <Link to='/profile'>
                Profile
            </Link>
            <Link to='/txns'>My Transactions</Link>
            <Link to='/categories'>My Categories</Link>
            <Link to='/'>
                <span onClick={handleLogout}>Logout</span>
            </Link>
        </div>
    )

    const loggedOut = (
        <div className="logged-out">
            {/* if the user is not logged in  */}
            <Link to='/login'>Sign in</Link>
        </div>
    )
    return (
        <nav>
            <Link className="branding" to="/">
                <img src="/Surplus_Logo.png" />
                <span>Surplus</span>
            </Link>
            {
                currentUser ? 
                loggedIn: loggedOut
            }
        </nav>
    )
}