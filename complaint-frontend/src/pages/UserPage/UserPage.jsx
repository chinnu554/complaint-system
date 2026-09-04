import {useAuth} from "../../context/userAuth.jsx";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import ComplaintCard from "../../components/complaintCard/ComplaintCard.jsx";
import "./UserPage.css";
function UserPage(){
    const {user,getComplaintsById , deleteComplaint} = useAuth();
    console.log(user);
    const [userComplaints,setUserComplaints] = useState([]);
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    console.log(userComplaints);
    
    useEffect(()=>{
        if (!user) {
            return;
        }

        const fetchUserComplaints = async() =>{
            const data = await getComplaintsById(user.userId);
            if (!Array.isArray(data) || data.length === 0) {
                setMessage("No complaints registered by the user");
                return ;
            }
            setUserComplaints(data);
            
        }
        fetchUserComplaints();
    },[user, getComplaintsById])

    const handleDeleteComplaint = async (complaintId) => {
        const result = await deleteComplaint(complaintId);
        if (result?.success) {
            setUserComplaints((complaints) =>
                complaints.filter((complaint) => complaint._id !== complaintId)
            );
        }
    };

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return(
        <main className="page-shell">
        <h1>Profile Page</h1>
        <br/>
        <h2>Username : {user.username}</h2>
        <h2>Email : {user.email}</h2>
        <button onClick={()=>navigate("/")}>Back to Home</button>
        <div className="complaint-list">
             {userComplaints.length > 0 ? (
            userComplaints.map((complaint) => (
                <div className="profile-complaint" key={complaint._id}>
                <ComplaintCard complaint={complaint} />
                <button onClick={() => handleDeleteComplaint(complaint._id)}>Delete complaint</button>
                </div>
            ))
        ) : (
            <p>{message}</p>
        )}
        </div>
        </main>
    )
}
export default UserPage;
