import { useState } from "react";
function CreateComplaint() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <>
            <div>
                <h1>Create Complaint</h1>
                <div>
                    <label>Title : </label>
                    <input type="text" />
                </div>
                <div>
                    <label>Description : </label>
                    <textarea name="message" rows="10" cols="30">
                        The cat was playing in the garden.
                    </textarea>
                </div>
                <div>

                </div>
            </div>
        </>
    );
}
export default CreateComplaint;