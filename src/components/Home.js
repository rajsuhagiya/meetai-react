import React, { useContext, useEffect } from "react";
import RecordMeeting from "./RecordMeeting";
import Dashboard from "./Dashboard";
import ApexChart from "./ApexChart";
import { LuFolderOpen } from "react-icons/lu";
import { PiWarningCircleBold } from "react-icons/pi";
import { RiTeamLine } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { BsPeople, BsPersonAdd } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import dashboardContext from "../context/Dashboard/DashboardContext";

const Home = () => {
  const { dashboard, getDashboard, getTallyChart } =
    useContext(dashboardContext);
  useEffect(() => {
    getDashboard();
    getTallyChart();
  }, []);
  return (
    <>
      <div className="card border-0 theme-background">
        <div className="card-body">
          <h5 className="card-title">
            Welcome,{" "}
            <span className="text-capitalize">
              {localStorage.getItem("username")}
            </span>
          </h5>
          <div className="row">
            <div className="col-12">
              <p className="card-text mb-3">
                Quick access to your calls, transcriptions, and action items can
                help you remain focused and organized.
              </p>
            </div>
          </div>
          <RecordMeeting />
        </div>
      </div>
      <div className="my-3">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="row">
              <Dashboard
                icon={BsPeople}
                name="All Calls"
                redirectUrl="calls/all-calls"
                count={dashboard.allCalls}
              />
              <Dashboard
                icon={BsPerson}
                name="Your Calls"
                redirectUrl="calls/your-calls"
                count={dashboard.yourCalls}
              />
              <Dashboard
                icon={BsPersonAdd}
                name="Team Calls"
                redirectUrl="calls/team-calls"
                count={dashboard.teamCalls}
              />
              <Dashboard
                icon={PiWarningCircleBold}
                name="Failed Calls"
                redirectUrl="calls/failed-calls"
                count={dashboard.failedCalls}
              />
              <Dashboard
                icon={LuFolderOpen}
                name="Folders"
                redirectUrl="settings/folders"
                count={dashboard.folderCount}
              />
              <Dashboard
                icon={BsPeople}
                name="Team Members"
                count={dashboard.team}
              />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card theme-foreground">
              <div className="card-header theme-background">Meeting Tally</div>
              <div className="card-body p-0">
                <ApexChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
