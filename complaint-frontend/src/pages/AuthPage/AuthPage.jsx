import { NavLink , useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/userAuth";

function AuthPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate();
    const {loginUser , registerUser } = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = await ( isLogin ? loginUser(email,password) : registerUser(username,email,password));
        if(data.user){
            navigate("/");
        }
    }
    return (
        <>
            <div>
                <h1>{isLogin ? "Login" : "Register"}</h1>
                <form>
                    {
                        isLogin ? null : <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" />
                    }
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                    <button type="submit" onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</button>
                </form>
                <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
                <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Register" : "Login"}</button>
                <button><NavLink to="/">Back to homepage</NavLink></button>
            </div>
        </>
    )
};
export default AuthPage;