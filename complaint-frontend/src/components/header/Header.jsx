import { NavLink , useNavigate } from "react-router-dom";
import "./Header.css"
import { useAuth } from "../../context/userAuth.jsx";
function Header() {
    const {user , tokenValid , logout} = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <div className="header">
                <h1>College Complaint platform</h1>
                <div className="header-buttons">
                    {tokenValid && <h3>{user.username}</h3>}
                    {
                        tokenValid ? <div>
                            <button onClick={()=>navigate("/create-complaint")}>Create a complaint</button>
                            <button onClick={logout}>logout</button>
                        </div> : <button><NavLink to="/signup">sign up</NavLink></button>
                    }
                    
                </div>
            </div>
        </>
    );
}

export default Header;