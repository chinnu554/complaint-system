import { useState } from "react";
import { useAuth } from "../../context/userAuth.jsx";
function ComplaintCard({ complaint }){
    const {toggleLike} = useAuth();
    const [likes,setLikes] = useState(complaint.likes);
    const [liked,setLiked] = useState(complaint.likedByUser);

    async function makeLike(){
        const result = await toggleLike(complaint._id);
        if (!result?.success) {
            return;
        }
        if(liked){
            setLiked(!liked);
            setLikes((prev)=>prev-1);
        }
        else{
            setLiked(!liked);
            setLikes((prev)=>prev+1);
        }
    }  
            return(
                    <article className="complaint-card">
                        <h3>{complaint.userId?.username}</h3>
                        <h2>{complaint.title}</h2>
                        <p>{complaint.description}</p>
                        {complaint.evidenceImage && (
                            <img
                                src={complaint.evidenceImage}
                                alt="Complaint evidence"
                                className="complaint-image"
                            />
                        )}
                       <div className="card-actions">
                            <p>{likes}</p>
                            <div>
                                <button onClick={makeLike}>{liked ? "liked" : "like"}</button>
                            </div>
                       </div>
                    </article>
                );
}
export default ComplaintCard
