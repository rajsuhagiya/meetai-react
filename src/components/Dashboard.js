import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
  return (
    <>
      <div className="col-6 col-sm-6 col-md-6 col-lg-6 mb-3">
        <NavLink to={props.redirectUrl}>
          <div className="card border-0 theme-background card-dashboard pointer">
            <div className="card-body">
              <props.icon className="font-size-40 mb-3" />
              <div className="dash-head">{props.name}</div>
              <div className="dash-body">
                <span>Count:</span>
                <span className="ps-1">{props.count}</span>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default Dashboard;
