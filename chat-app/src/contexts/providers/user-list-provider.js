import React, { useEffect, useState } from "react";
import UserListContext from "../user-list-context";
import axios from "axios";

const UserListContextProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);

  const userListFetch = () => {
    var config = {
      method: "get",
      url: "http://localhost:3009/users/all",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        response.data.forEach((val, index, array) => {
          userList.push({ name: val.name, id: val._id });
          setUserList([...userList]);
        });
        console.log(userList);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // userListFetch();
  }, []);

  return (
    <UserListContext.Provider
      value={{
        userList,
        userListFetch
      }}
    >
      {" "}
      {children}{" "}
    </UserListContext.Provider>
  );
};

export default UserListContextProvider;
