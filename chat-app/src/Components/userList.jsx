import "./userList.css";
import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import UserListContext from "../contexts/user-list-context";

function UserList() {
  const userListContext = useContext(UserListContext);
  const [myId, setMyId] = useState({});
  const [check, setCheck] = useState({});

  // const userListContext = useContext(UserListContext);

  // const clickUserListEvent = (check, i) => {
  //   if (check.i === true) {
  //     document
  //       .querySelector(`.userList:nth-child(${i})`)
  //       .classList.remove("open");
  //     setCheck((prevInputs) => ({ ...prevInputs, [i]: false }));
  //     console.log(check);
  //   } else {
  //     document.querySelector(`.userList:nth-child(${i})`).classList.add("open");
  //     setCheck((prevInputs) => ({ ...prevInputs, [check.i]: true }));
  //   }
  // };

  useEffect(() => {
    
  }, [userListContext.toId, userListContext.userList]);

  return (
    <div>
      <i>{userListContext.fromId.name}</i>
      <ul>
        {userListContext.userList.map((item, i) => (
          <li
            key={i}
            className="userList"
            onClick={() => {
              // clickUserListEvent(check, i + 1);
              userListContext.toId = item;
              userListContext.setToIdFn(userListContext.toId);
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
