import { useState } from "react";
import { useAuth } from "../../context/userAuth.jsx";
function ComplaintCard({ complaint }){
    const {toggleLike} = useAuth();
    const [likes,setLikes] = useState(complaint.likes);
    const [liked,setLiked] = useState(complaint.likedByUser);

    async function makeLike(){
        toggleLike(complaint._id);
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
                    <div>
                        <br />
                        <br />
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
                       <div style={{display:"flex",flexDirection:"row",gap:"10px",justifyContent:"flex-start",alignItems:"center",width:"200px",margin:"10px"}}>
                            <p>{likes}</p>
                            <div>
                                <button onClick={makeLike}>{liked ? "liked" : "like"}</button>
                            </div>
                       </div>
                    </div>
                );
}
export default ComplaintCard
