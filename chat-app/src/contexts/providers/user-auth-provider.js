import { useState } from "react";
import UserAuthContext from "../user-auth";

const UserAuthContextProvider = ({ children }) => {

    const [isLoggedIn, setLogin] = useState(false);

    const setLoginFn = (login_status)=>{

        setLogin(login_status);
    }


  return (
    <UserAuthContext.Provider
      value={{
       setLoginFn,
       isLoggedIn
      }}
    >
      {" "}
      {children}{" "}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;