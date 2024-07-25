import React from "react";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { RiTeamLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { BsPersonAdd } from "react-icons/bs";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const Calls = () => {
  const location = useLocation();

  // Determine the status based on the current location
  const getStatus = () => {
    switch (location.pathname) {
      case "/calls/all-calls":
        return "all-calls";
      case "/calls/your-calls":
        return "your-calls";
      case "/calls/team-calls":
        return "team-calls";
      case "/calls/failed-calls":
        return "failed-calls";
      default:
        return "all-calls";
    }
  };

  const status = getStatus();
  console.log("Current Status:", status);
  return (
    <>
      <div className="mt-3 card theme-foreground card-calls">
        <div className="card-body">
          <div className="tab-content" id="pills-tabContent">
            <div className="row pb-3">
              <div className="col-sm-8 d-flex ">
                <ul
                  className="nav nav-pills mb-2"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <NavLink
                      className="nav-link"
                      id="pills-home-tab"
                      to="all-calls"
                    >
                      <RiTeamLine className="font-size-20" />
                      <span className="ps-2">All Calls</span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink
                      className="nav-link"
                      id="pills-home-tab"
                      to="your-calls"
                    >
                      <BsPerson className="font-size-20" />
                      <span className="ps-2">Your Calls</span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink
                      className="nav-link"
                      id="pills-home-tab"
                      to="team-calls"
                    >
                      <BsPersonAdd className="font-size-20" />
                      <span className="ps-2">Team Calls</span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink
                      className="nav-link"
                      id="pills-home-tab"
                      to="failed-calls"
                    >
                      <HiOutlinePhoneMissedCall className="font-size-20" />
                      <span className="ps-2">Failed Calls</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <Outlet context={status} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calls;
