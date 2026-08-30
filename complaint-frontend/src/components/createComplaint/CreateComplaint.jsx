import { useState } from "react";
import { useAuth } from "../../context/userContext.jsx";
import {useNavigate} from "react-router-dom"
function CreateComplaint() {
    const navigate = useNavigate();
    const {createComplaint , user} = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [evidence,setEvidence] = useState(null);
    

    async function  submitComplaint(){
        const complaint = new FormData();
        complaint.append("title",title);
        complaint.append("description",description);
        complaint.append("userId",user.userId);
        complaint.append("evidenceImage",evidence);
        const result = await createComplaint(complaint);
    }

    return (
        <>
            <div>
                <h1>Create Complaint</h1>
                <div>
                    <label>Title : </label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Description : </label>
                    <textarea name="message" rows="1" cols="30" value={description} onChange={(e)=>setDescription(e.target.value)}>
                        The cat was playing in the garden.
                    </textarea>
                </div>
                <div>
                    <input type="file" onChange={(e)=>setEvidence(e.target.files[0])}/>
                </div>
                <button onClick={submitComplaint}>submit complaint</button>
                <button onClick={()=>navigate("/")}>Back to Home</button>
            </div>
        </>
    );
}
export default CreateComplaint;