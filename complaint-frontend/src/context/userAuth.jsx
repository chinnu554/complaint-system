import { useContext } from "react";
import { UserContext } from "./userContext.jsx";

export const useAuth = () => {
   return useContext(UserContext);
}