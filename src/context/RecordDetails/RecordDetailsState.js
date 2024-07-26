import { useState } from "react";
import RecordDetailsContect from "./RecordDetailsContext";
import { toast } from "react-toastify";

const RecordDetailsState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const [recordDetails, setRecordDetails] = useState([]);
  const [notes, setNotes] = useState([]);

  const getRecordDetails = async (id) => {
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
      setNotes(json.notes);
    }
  };

  const addNotes = async (recordId, notes, accessType) => {
    const response = await fetch(`${host}/api/records-details/add-notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ recordId, notes, accessType }),
    });
    const json = await response.json();
    if (response.status === 200) {
      toast.success(json.success);
      getRecordDetails(recordId);
    }
  };

  // const updateFolder = async (id, folderName, accessType) => {
  //   const response = await fetch(`${host}/api/folders/update-folder/${id}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({ folderName, accessType }),
  //   });
  //   const json = await response.json();
  //   if (response.status === 200) {
  //     toast.success(json.success);
  //   }
  //   return json;
  // };

  return (
    <>
      <RecordDetailsContect.Provider
        value={{ recordDetails, getRecordDetails, notes, addNotes }}
      >
        {props.children}
      </RecordDetailsContect.Provider>
    </>
  );
};

export default RecordDetailsState;
