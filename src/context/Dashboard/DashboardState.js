import { useState } from "react";
import DashboardContext from "./DashboardContext";
import { toast } from "react-toastify";

const DashboardState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const dashboardInitial = [];

  const [dashboard, setDashboard] = useState(dashboardInitial);

  const getDashboard = async () => {
    const response = await fetch(`${host}/api/dashboard/getDashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      setDashboard(json);
    }
    // console.log("🚀 ~ file: DashboardState.js:23 ~ getDashboard ~ json:", json);
  };

  return (
    <>
      <DashboardContext.Provider value={{ dashboard, getDashboard }}>
        {props.children}
      </DashboardContext.Provider>
    </>
  );
};

export default DashboardState;
