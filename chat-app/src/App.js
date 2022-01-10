import "./App.css";
import React from "react";
import RoutePaths from "./routes/routepaths";
import UserListContextProvider from "./contexts/providers/user-list-provider";

function App() {
  return (
    <UserListContextProvider>
      <RoutePaths />
    </UserListContextProvider>
  );
}

export default App;
