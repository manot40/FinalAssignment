import { useState, useEffect, createContext } from "react";

export const UserContext = createContext({
  user: '',
  setUser(_arg: string) {},
});

export default function UserContextProvider({children}: {children: JSX.Element}) {
  const [user, setUser] = useState("");
  
  useEffect(() => {
    setUser(localStorage.getItem("user") || "");
  }, [])
  
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}