import React, { useEffect, useState } from "react";
import UserListContext from "../user-list-context";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserListContextProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [toId, setToId] = useState(userList ? {}:null);
  const [fromId, setFromId] = useState(userList ? {}:null);
  // const { id } =useParams();

  const userListFetch = (id) => {
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
          if (val._id !== id) {
            userList.push({ name: val.name, id: val._id });
            setUserList([...userList]);
          } else {
              setFromId({
                id: val._id,
                name: val.name,
              });
            
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("This is the id from params", id);
  };
  const setToIdFn = (id) => {
    setToId(id);
  };



  const clearUsers = () => {
    setUserList([]);
  };

  useEffect(()=>{
    setToId(toId);
  }, [toId])

  return (
    <UserListContext.Provider
      value={{
        userList,
        userListFetch,
        setToIdFn,
        toId,
        clearUsers,
        fromId,
      }}
    >
      {" "}
      {children}{" "}
    </UserListContext.Provider>
  );
};

export default UserListContextProvider;
