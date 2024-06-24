import React from "react";
import Bot from "./Bot";
import Folders from "./Folders";
import { RiRobot2Line } from "react-icons/ri";
import { LuFolderOpen } from "react-icons/lu";
import { Outlet, NavLink } from "react-router-dom";

function Settings() {
  return (
    <>
      <div className="card border-0 text-white bg-dark theme-background card-settings">
        <div className="card-body">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              {/* <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <RiRobot2Line className="font-size-20" />{" "}
                <span className="ps-2">Bot</span>
              </button> */}
              <NavLink className="nav-link" id="pills-home-tab" to="bot">
                <RiRobot2Line className="font-size-20" />
                <span className="ps-2">Bot</span>
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              {/* <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <LuFolderOpen className="font-size-20" />
                <span className="ps-2">Folders</span>
              </button> */}
              <NavLink className="nav-link" id="pills-profile-tab" to="folders">
                <LuFolderOpen className="font-size-20" />
                <span className="ps-2">Folders</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="mt-3 card   theme-foreground card-settings">
        <div className="card-body">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex="0"
            >
              <Bot />
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex="0"
            >
              <Folders />
            </div>
          </div>
        </div>
      </div> */}
      <div className="mt-3 card theme-foreground card-settings">
        <div className="card-body">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Settings;
