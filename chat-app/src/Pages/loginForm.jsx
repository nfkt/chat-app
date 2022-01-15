import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserListContext from "../contexts/user-list-context";


function LoginPage() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const userListContext = useContext(UserListContext);
  

  const handleLogin = () => {
    var config = {
      method: "post",
      url: "http://localhost:3009/users/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: inputs,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        if(response.data.name){
          userListContext.userListFetch(response.data._id);
          navigate(`/user/${response.data._id}`);
        }
        // 
        
      })
      .catch(function (error) {
        console.log(error);
      });

    // navigate("/user/1")
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    console.log("Page mounted");
    userListContext.clearUsers();
    console.log(userListContext.userList)
  }, []);
  return (
    <div>
      <div>This is login page</div>
      <input
        type="text"
        value={inputs.username || ""}
        onChange={handleChange}
        autoComplete="off"
        name="username"
      />
      <input
        type="password"
        value={inputs.password || ""}
        onChange={handleChange}
        autoComplete="off"
        name="password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
