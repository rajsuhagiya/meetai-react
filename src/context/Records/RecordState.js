import { useState } from "react";
import RecordContext from "./RecordContext";

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

  const createRecord = async (botName, meetingUrl) => {
    // console.log(name, url);
    const response = await fetch(`${host}/api/records/createrecord`, {
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

  return (
    <>
      <RecordContext.Provider value={{ createRecord }}>
        {props.children}
      </RecordContext.Provider>
    </>
  );
};

export default RecordState;
