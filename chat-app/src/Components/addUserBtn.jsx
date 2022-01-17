import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function AddUserBtn(){
    

    return(
        <div>
          <FontAwesomeIcon icon={faPlus} onClick={props.onClick}/>
        </div>
    )
}

export default AddUserBtn;