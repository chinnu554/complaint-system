import { useContext } from "react";
import { UserContext } from "./contextValue.jsx";

export const useAuth = () => {
   return useContext(UserContext);
}
