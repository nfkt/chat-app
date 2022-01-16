import "./userList.css";
import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import UserListContext from "../contexts/user-list-context";

function UserList() {
  const [myId, setMyId] = useState({});

  const userListContext = useContext(UserListContext);

  useEffect(()=>{

  }, [userListContext.toId])



  return (
    <div>
      <i>{userListContext.fromId.name}</i>
      <ul>
        {userListContext.userList.map((item, i) => (
          <li
            key={i}
            className="userList"
            onClick={() => {
              userListContext.toId = item;
              userListContext.setToIdFn(userListContext.toId);
              console.log(userListContext.toId) 
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
