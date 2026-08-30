import { useState } from "react";
import { useAuth } from "../../context/userAuth.jsx";
import ComplaintPage from "../ComplaintPage/ComplaintPage.jsx";
function Home() {
    const {tokenValid} = useAuth();
    return (
        <main style={{minHeight:"100vh"}}>
            {
                tokenValid ? <ComplaintPage/> : <h1>Login to check the complaints</h1>
            }
            
        </main>
    )
}
export default Home;