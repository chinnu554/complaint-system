import { useAuth } from "../../context/userAuth.jsx";
import ComplaintPage from "../ComplaintPage/ComplaintPage.jsx";
import "./Home.css"
function Home() {
    const { tokenValid } = useAuth();
    return (
        <main className="home-page">
            {
                tokenValid ? <ComplaintPage /> : <div className="landing-page">
                    <h1>Login to check the complaints</h1>
                </div>
            }

        </main>
    )
}
export default Home;
