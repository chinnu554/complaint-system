import { useState } from "react";
import { useAuth } from "../../context/userAuth.jsx";
import { useNavigate } from "react-router-dom"
function CreateComplaint() {
    const navigate = useNavigate();
    const { createComplaint, user } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [evidence, setEvidence] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [sucess, setSuccess] = useState(false);


    async function submitComplaint() {
        setSubmitting(true);
        if (!title || !description || !user) {
            alert("Please fill all the fields");
            setSubmitting(false);
            return;
        }
        const complaint = new FormData();
        complaint.append("title", title);
        complaint.append("description", description);
        complaint.append("userId", user.userId);
        complaint.append("evidenceImage", evidence);
        const result = await createComplaint(complaint);
        if (result?.success) {
            setSuccess(true);
        }
        setSubmitting(false);
    }

    return (
        <>
            <main className="form-page create-complaint-page">
                <h1>Create Complaint</h1>
                <div>
                    <label>Title : </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description : </label>
                    <textarea name="message" rows="1" cols="30" value={description} onChange={(e) => setDescription(e.target.value)}>
                        The cat was playing in the garden.
                    </textarea>
                </div>
                <div>
                    <input type="file" onChange={(e) => setEvidence(e.target.files[0])} />
                </div>
                <div className="form-actions">
                    <button onClick={submitComplaint} disabled={submitting}>
                        {submitting ? "Submitting..." : "submit complaint"}
                    </button>
                    <button onClick={() => navigate("/")}>Back to Home</button>
                </div>
                {sucess && <p>Complaint submitted successfully</p>}
            </main>
        </>
    );
}
export default CreateComplaint;
