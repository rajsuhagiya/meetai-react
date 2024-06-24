import { useState } from "react";
import UserContext from "./UserContext";
import { toast } from "react-toastify";

const UserState = (props) => {
  const host = process.env.REACT_APP_HOST;

  const [user, setUser] = useState({
    id: "",
    name: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    mobileNumber: "",
  });
  // const [individualUsersColumns, setIndividualUsersColumns] = useState([]);

  const [individualUsersData, setIndividualUsersData] = useState([]);

  const clearUserData = () => {
    setUser({
      id: "",
      name: "",
      email: "",
      mobileNumber: "",
    });
  };

  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUser(json);
  };

  const addUser = async (name, email, password) => {
    const response = await fetch(`${host}/api/auth/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(name, email, password),
    });
    const json = await response.json();
    if (response.status === 200) {
      toast.success("User Added Successfully");
    } else if (response.status === 400) {
      toast.error(json.error);
    } else {
      toast.error("Internal Server Error");
    }
    setUser(json);
    return response;
  };

  const deleteUser = async (id) => {
    const response = await fetch(`${host}/api/auth/deleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      toast.success(json.message);
    } else if (response.status === 400) {
      toast.error(json.error);
    } else {
      toast.error(json.error);
    }
    getIndividualUser();
  };

  const getIndividualUser = async () => {
    const response = await fetch(`${host}/api/auth/getIndividualUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      setIndividualUsersData(json.users);
    }
  };
  const editUser = async (id, name, email, mobileNumber) => {
    // console.log(id, name, email, mobileNumber);
    const response = await fetch(`${host}/api/auth/editUser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, email, mobileNumber }),
    });
    const json = await response.json();
    if (response.status === 200) {
      toast.success("Profile Updated Successful");
      localStorage.setItem("username", json.user.name);
      localStorage.setItem("email", json.user.email);
    }
    setUser(json);
  };

  const chnagePassword = async (password, npassword, cpassword) => {
    const response = await fetch(`${host}/api/auth/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ password, npassword, cpassword }),
    });
    const user = await response.json();
    if (response.status === 200) {
      toast.success(user.message);
    } else {
      toast.error(user.error);
    }
  };

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          individualUsersData,
          clearUserData,
          getUser,
          addUser,
          deleteUser,
          getIndividualUser,
          editUser,
          chnagePassword,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserState;
