import { useAuth } from "../../context/userContext.jsx";
import { useEffect, useState } from "react";

function ComplaintPage(){

    const {getComplaints , likeComplaint , dislikeComplaint} = useAuth();
    const [complaints,setComplaints] = useState([]);
    const [likes,setLikes] = useState(0);

    useEffect(()=>{
        const fetchComplaints = async() =>{
            const data = await getComplaints();
            setComplaints(data);
            setLikes(data.likes);
        }
        fetchComplaints();
    },[getComplaints])

    return(
        <div>
            {
                complaints.map((complaint)=>(
                    <div key={complaint._id}>
                        <hr />
                        <h3>{complaint.userId?.username}</h3>
                        <h2>{complaint.title}</h2>
                        <p>{complaint.description}</p>
                        {complaint.evidenceImage && (
                            <img
                                src={complaint.evidenceImage}
                                alt="Complaint evidence"
                                width={700}
                                height={450}
                            />
                        )}
                        <p>{complaint.likes}</p>
                        <button onClick={()=>likeComplaint(complaint._id)}>like</button>
                    </div>
                ))
            }
        </div>
    )
}
export default ComplaintPage;

