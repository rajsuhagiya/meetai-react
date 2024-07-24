import { useState } from "react";
import FolderContext from "./FolderContext";
import { toast } from "react-toastify";

const FolderState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const foldersInitial = [];

  const [folders, setFolders] = useState(foldersInitial);

  const getFolder = async () => {
    const response = await fetch(`${host}/api/folders/getfolders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      setFolders(json);
    }
  };

  const createFolder = async (folderName, accessType) => {
    const response = await fetch(`${host}/api/folders/createfolder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ folderName, accessType }),
    });
    const folder = await response.json();
    if (response.status === 200) {
      toast.success(folder.success);
      setFolders(folders.concat(folder));
    } else if (response.status === 400) {
      toast.error(folder.errors[0]["msg"]);
    }
    return folder;
  };

  const updateFolder = async (id, folderName, accessType) => {
    const response = await fetch(`${host}/api/folders/update-folder/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ folderName, accessType }),
    });
    const json = await response.json();
    if (response.status === 200) {
      toast.success(json.success);
    }
    return json;
  };

  return (
    <>
      <FolderContext.Provider
        value={{ folders, getFolder, createFolder, updateFolder }}
      >
        {props.children}
      </FolderContext.Provider>
    </>
  );
};

export default FolderState;
