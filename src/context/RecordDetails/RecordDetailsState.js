import { useState } from "react";
import RecordDetailsContect from "./RecordDetailsContext";
import { toast } from "react-toastify";

const RecordDetailsState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const [recordDetails, setRecordDetails] = useState([]);

  const getRecordDetails = async (id) => {
    // console.log(id);
    const response = await fetch(
      `${host}/api/records-details/get-record-details/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    if (response.status === 200) {
      setRecordDetails(json.recordDetails);
    }
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
      <RecordDetailsContect.Provider
        value={{ recordDetails, getRecordDetails }}
      >
        {props.children}
      </RecordDetailsContect.Provider>
    </>
  );
};

export default RecordDetailsState;
