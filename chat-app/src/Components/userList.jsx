import "./userList.css";
import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserListContext from "../contexts/user-list-context";

function UserList() {
  const [myId, setMyId] = useState({});
  const { id } = useParams();
  const userListContext = useContext(UserListContext);

  



  return (
    <div>
      <i>{userListContext.fromId.name}</i>
      <ul>
        {userListContext.userList.map((item, i) => (
          <li
            key={i}
            className="userList"
            onClick={() => {
              userListContext.setToIdFn(item.id);
              console.log(userListContext.toId);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
