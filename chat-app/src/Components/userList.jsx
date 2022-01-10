import "./userList.css";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function UserList(props) {
  const [userList, setUserList] = useState([]);
  const [myId, setMyId] = useState({});
  const { id } = useParams();

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
          if (val._id !== `${id}`) {
            userList.push({ name: val.name, id: val._id });
            setUserList([...userList]);
          } else {
            setMyId({
              name: val.name,
              id: id,
            });
          }
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
      <i>{myId.name}</i>
      <ul>
        {userList.map((item, i) => (
          <li
            key={i}
            className="userList"
            onClick={props.liClick}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
