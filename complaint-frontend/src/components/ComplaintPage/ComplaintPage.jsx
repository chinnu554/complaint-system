import { useAuth } from "../../context/userAuth.jsx";
import { useEffect, useState } from "react";
import ComplaintCard from "../complaintCard/ComplaintCard.jsx";
function ComplaintPage() {

    const { getComplaints } = useAuth();
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            const data = await getComplaints();
            console.log(data);
            if (!Array.isArray(data) || data.length === 0) {
                return alert("No complaints found");
            }
            setComplaints(data);
        }
        fetchComplaints();
    }, [getComplaints])

    return (
        <main className="page-shell complaint-list">
            {
                complaints.map((complaint) => (
                    <ComplaintCard key={complaint._id} complaint={complaint} />
                ))
            }
        </main>
    )
}
export default ComplaintPage;

