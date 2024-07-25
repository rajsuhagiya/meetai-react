import { useState } from "react";
import RecordContext from "./RecordContext";
import { toast } from "react-toastify";

const RecordState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const recordsInitial = [];

  const [records, setRecords] = useState(recordsInitial);
  const [recordsData, setRecordsData] = useState([]);

  // const createBot = async (botName, meetingUrl) => {
  //   const response = await fetch(`${host}/api/records/createbot`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({ botName, meetingUrl }),
  //   });
  //   const json = await response.json();
  //   setRecords(json);
  // };

  const createRecord = async (meetingName, meetingUrl, folder) => {
    const response = await fetch(`${host}/api/records/createrecord`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ meetingName, meetingUrl, folder }),
    });
    const record = await response.json();
    setRecords(record);
    if (response.status === 200) {
      toast.success(record.success);
      setRecords(record);
    } else if (response.status === 400) {
      toast.error(record.errors[0]["msg"]);
    } else {
      toast.error(record.error);
    }
    return record;
  };

  const getRecords = async (status) => {
    const response = await fetch(`${host}/api/records/getRecords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ status }),
    });
    const json = await response.json();
    if (response.status === 200) {
      setRecordsData(json.records);
    }
  };

  const webhooks = async () => {
    const response = await fetch(`${host}/api/records/webhooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
  };

  const deleteRecord = async (id) => {
    const response = await fetch(`${host}/api/records/deleteRecord/${id}`, {
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
    getRecords();
  };

  const shareMeeting = async (recordId, folderId, pageStatus) => {
    const response = await fetch(`${host}/api/records/share-meeting`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ recordId, folderId }),
    });
    const json = await response.json();
    if (response.status === 200) {
      toast.success(json.message);
    } else {
      toast.error(json.error);
    }
    getRecords(pageStatus);
  };

  return (
    <>
      <RecordContext.Provider
        value={{
          records,
          recordsData,
          createRecord,
          getRecords,
          deleteRecord,
          webhooks,
          recordsData,
          shareMeeting,
        }}
      >
        {props.children}
      </RecordContext.Provider>
    </>
  );
};

export default RecordState;
