import "./userList.css";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";

function UserList() {
  const [userList, setUserList] = useState([]);
  const HandleClick = () => {};

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
          userList.push(val.name);
          setUserList([...userList]);
        });
        console.log(userList);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    userListFetch();
  }, []);

  return (
    <div>
      <ul>
        {userList.map((item, i) => (
          <li className="userList"> {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
