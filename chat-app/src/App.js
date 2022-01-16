import "./App.css";
import React from "react";
import RoutePaths from "./routes/routepaths";
import UserListContextProvider from "./contexts/providers/user-list-provider";
import UserAuthContextProvider from "./contexts/providers/user-auth-provider";
import UserAuthContext from "./contexts/user-auth";

function App() {
  return (
    <UserAuthContextProvider>
      <UserListContextProvider>
        <RoutePaths />
      </UserListContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
