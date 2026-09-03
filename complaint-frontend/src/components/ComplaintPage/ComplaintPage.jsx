import { useAuth } from "../../context/userAuth.jsx";
import { useEffect, useState } from "react";
import ComplaintCard from "../complaintCard/ComplaintCard.jsx";
function ComplaintPage(){

    const {getComplaints} = useAuth();
    const [complaints,setComplaints] = useState([]);

    useEffect(()=>{
        const fetchComplaints = async() =>{
            const data = await getComplaints();
            console.log(data);
            if(data.length == 0){
               return alert("No complaints found");
            }
            setComplaints(data);
        }
        fetchComplaints();
    },[getComplaints])

    return(
        <div>
            {
                complaints.map((complaint)=>(
                    <ComplaintCard key={complaint._id} complaint={complaint}/>
                ))
            }
        </div>
    )
}
export default ComplaintPage;

