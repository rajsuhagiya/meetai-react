import { useState } from "react";
import RecordContext from "./RecordContext";
import { toast } from "react-toastify";

const RecordState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const recordsInitial = [];

  const [records, setRecords] = useState(recordsInitial);

  const createBot = async (botName, meetingUrl) => {
    // console.log(name, url);
    const response = await fetch(`${host}/api/records/createbot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ botName, meetingUrl }),
    });
    const json = await response.json();
    setRecords(json);
  };

  const createRecord = async (meetingName, meetingUrl, folder) => {
    // console.log(name, url);
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

  const getRecords = async () => {
    const response = await fetch(`${host}/api/records/getrecords`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      setRecords(json);
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

  return (
    <>
      <RecordContext.Provider
        value={{ records, createRecord, getRecords, webhooks }}
      >
        {props.children}
      </RecordContext.Provider>
    </>
  );
};

export default RecordState;
