import { NavLink } from "react-router-dom";
import "./Header.css"
import { useAuth } from "../../context/userContext.jsx";
function Header() {
    const {user , tokenValid , logout} = useAuth();
    return (
        <>
            <div className="header">
                <h1>College Complaint platform</h1>
                <div className="header-buttons">
                    {tokenValid && <h3>{user.username}</h3>}
                    {
                        tokenValid ? <div>
                            <button>Create a complaint</button>
                            <button onClick={logout}>logout</button>
                        </div> : <button><NavLink to="/signup">sign up</NavLink></button>
                    }
                    
                </div>
            </div>
        </>
    );
}

export default Header;