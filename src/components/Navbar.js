import React, { useContext, useRef } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecordMeeting from "./RecordMeeting";
import userContext from "../context/Users/UserContext";

const Navbar = () => {
  const refHide = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, clearUserData } = useContext(userContext);

  const handleLogout = () => {
    refHide.current.click();
    localStorage.removeItem("token");
    localStorage.clear();
    clearUserData();
    navigate("/login");
  };
  const handleClose = () => {
    refHide.current.click();
  };
  // Check if the current path is login or signup
  const isAuthPage = ["/login", "/signup", "*"].includes(location.pathname);
  return (
    <>
      <nav className="navbar navbar-expand-lg theme-background navbar-dark bg-dark">
        <div className="container">
          <NavLink
            className="navbar-brand d-flex justify-content-center align-items-center gap-1"
            to="/"
          >
            <img
              src="/images/meetai.png"
              alt="meetai logo"
              width="54px"
              height="50px"
            />
            <h1 className="m-0 font-600">Meet AI</h1>
          </NavLink>
          {!isAuthPage && (
            <>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                ref={refHide}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </>
          )}
          <div
            className="collapse navbar-collapse ps-4"
            id="navbarSupportedContent"
          >
            {!isAuthPage && (
              <>
                <ul className="navbar-nav me-auto  mb-lg-0 font-600">
                  <li className="nav-item">
                    <NavLink
                      aria-current="page"
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "active nav-link" : "nav-link"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      aria-current="page"
                      to="/calls"
                      className={({ isActive }) =>
                        isActive ? "active nav-link" : "nav-link"
                      }
                    >
                      Calls
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      aria-current="page"
                      to="/settings"
                      className={({ isActive }) =>
                        isActive ? "active nav-link" : "nav-link"
                      }
                    >
                      Settings
                    </NavLink>
                  </li>
                  {user.type === "company" && (
                    <li className="nav-item">
                      <NavLink
                        aria-current="page"
                        to="/users"
                        className={({ isActive }) =>
                          isActive ? "active nav-link" : "nav-link"
                        }
                      >
                        Users
                      </NavLink>
                    </li>
                  )}
                </ul>
                {location.pathname !== "/" && <RecordMeeting />}
                <ul className="navbar-nav  mb-lg-0 font-600">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="d-flex gap-3 align-items-center text-light">
                        <div className="avatar">
                          <img src="/images/avatar.jpeg" alt="avatar" />
                        </div>
                        <div className="text-capitalize">
                          {user.name
                            ? user.name
                            : localStorage.getItem("username")}
                        </div>
                      </div>
                    </a>
                    <ul className="dropdown-menu custom-dropdown-menu ">
                      <li>
                        <NavLink
                          aria-current="page"
                          to="/profile"
                          className="nav-link"
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          aria-current="page"
                          to="/change-password"
                          className="nav-link"
                        >
                          Change Password
                        </NavLink>
                      </li>
                      <li>
                        <a
                          className="dropdown-item nav-link btn-signout"
                          onClick={handleLogout}
                        >
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            )}
          </div>
          {isAuthPage && (
            <>
              <ul className="navbar-nav mb-lg-0 font-600">
                {location.pathname === "/login" && (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/signup"
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-outline-light  btn-block "
                      >
                        Create new
                      </Link>
                    </li>
                  </>
                )}
                {location.pathname === "/signup" && (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/login"
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-outline-light  btn-block "
                      >
                        Log in
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
