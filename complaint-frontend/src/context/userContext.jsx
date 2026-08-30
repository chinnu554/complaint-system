import { createContext , useContext , useState , useEffect } from "react";
import { API_BASE_URL } from "../api.js";
import { Children } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [tokenValid , setTokenValid] = useState(false);
    const [userAction,setUserAction] = useState(false);
    const [token,setToken] = useState(()=> localStorage.getItem("token"));
    console.log(user);


    const registerUser = async(username, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        alert(data.message);
        setUserAction(!userAction);
        return data;
    }   
    catch(err){
        console.log(err);
        alert(err);
    }
};

    const loginUser = async(email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.user?.token) {
            localStorage.setItem("token", data.user.token);
            setToken(data.user.token);
        }
        alert(data.message);
        setUserAction(!userAction);
        return data;
    }
    catch(err){
        console.log(err);
        alert(err);
    }
};

    const logout = () =>{
        localStorage.removeItem("token");
        setToken(null);
        setUserAction(!userAction);
        return ;
    }

    const getComplaints = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/complaints/all`, {    
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
};

 const createComplaint = async(complaint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/complaints/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body:complaint, 
        });
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
};

 const deleteComplaint = async(complaintId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/complaints/${complaintId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }); 
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
};

 const getComplaintById = async(complaintId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/complaints/${complaintId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }   
    catch(err){
        console.log(err);
    }
};

  const toggleLike = async(complaintId) =>{
    try{
        const likeResult = await fetch(`${API_BASE_URL}/complaints/${complaintId}/like`,{
            method:"POST",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
       const data = await likeResult.json();
    }
    catch(err){
        console.log(err);
        alert(err);
    }
  }

     

    const getMe = async() =>{
        try{
            const token = localStorage.getItem("token");
            setToken(token);
            console.log(token);
            if(!token){
                setTokenValid(false);
                setUser(null);
            }
            const response = await fetch(`${API_BASE_URL}/auth/me`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    authorization : `Bearer ${token}`
                },
            })
            if(!response.ok){
                localStorage.removeItem("token");
                setTokenValid(false);
                setUser(null);
                return;
            }
            const data = await response.json();
            setUser(data.user);
            console.log(data.user);
            setTokenValid(true);
            return ;
        }
        catch(err){
            console.log(err);
            alert(err);
        }
    }
    useEffect(()=>{
        getMe();
    },[userAction])


    return(
        <UserContext.Provider value={{user,tokenValid,loginUser,registerUser , logout , createComplaint , deleteComplaint , getComplaints , getComplaintById , toggleLike}}>
            {children}
        </UserContext.Provider>
    );

    
}

export const useAuth = () =>{
        return useContext(UserContext);
    }
