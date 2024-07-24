import { useState } from "react";
import DashboardContext from "./DashboardContext";
import { toast } from "react-toastify";

const DashboardState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const dashboardInitial = {
    folderCount: 0,
    yourCalls: 0,
    teamCalls: 0,
    failedCalls: 0,
  };

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
