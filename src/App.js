import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import RecordState from "./context/Records/RecordState";
import UserState from "./context/Users/UserState";
import FolderState from "./context/Folders/FolderState";
import SettingState from "./context/Settings/SettingState";
import DashboardState from "./context/Dashboard/DashboardState";
import RecordDetailsState from "./context/RecordDetails/RecordDetailsState";
import Login from "./components/Login";
import ToastContainer from "./components/Toaster";
import Signup from "./components/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Calls from "./components/Calls";
import Settings from "./components/Settings";
import Bot from "./components/Bot";
import CallsTable from "./components/CallsTable";
import Folders from "./components/Folders";
import Users from "./components/Users";
import "./css/Style.css";
import "./css/DataTable.css";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import CallDetails from "./components/CallDetails";
import "react-tooltip/dist/react-tooltip.css";
import cloudinary from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";
import { useState, useEffect, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useLoading } from "./context/Loading/LoadingContext";
// Style for the loader container
const loaderContainerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
  zIndex: 9999, // Ensure it's in front of other content
};

const loaderStyle: CSSProperties = {
  display: "block",
};
function App() {
  const { loading } = useLoading();
  useEffect(() => {}, []);
  return (
    <>
      {loading && (
        <div style={loaderContainerStyle}>
          <ClipLoader
            color={"#a72ee7"}
            loading={loading}
            cssOverride={loaderStyle}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <UserState>
        <DashboardState>
          <FolderState>
            <SettingState>
              <RecordState>
                <RecordDetailsState>
                  <Router>
                    {/* <Navbar /> */}
                    <ConditionalNavbar />
                    <ToastContainer />
                    <div className="container">
                      <Routes>
                        <Route
                          element={
                            <ProtectedRoutes
                              allowedTypes={["company", "individual"]}
                            />
                          }
                        >
                          <Route exact path="/" element={<Home />}></Route>
                          <Route exact path="/calls" element={<Calls />}>
                            <Route path="all-calls" element={<CallsTable />} />
                            <Route path="your-calls" element={<CallsTable />} />
                            <Route path="team-calls" element={<CallsTable />} />
                            <Route
                              path="failed-calls"
                              element={<CallsTable />}
                            />
                            <Route
                              index
                              path="*"
                              element={<Navigate to="all-calls" />}
                            />
                          </Route>
                          <Route
                            exact
                            path="/call-details/:id"
                            element={<CallDetails />}
                          ></Route>
                          <Route exact path="/settings" element={<Settings />}>
                            <Route path="bot" element={<Bot />} />
                            <Route path="folders" element={<Folders />} />
                            <Route
                              index
                              path="*"
                              element={<Navigate to="bot" />}
                            />
                          </Route>
                          <Route
                            element={
                              <ProtectedRoutes allowedTypes={["company"]} />
                            }
                          >
                            <Route exact path="/users" element={<Users />} />
                          </Route>
                          <Route
                            exact
                            path="/profile"
                            element={<Profile />}
                          ></Route>
                          <Route
                            exact
                            path="/change-password"
                            element={<ChangePassword />}
                          ></Route>
                        </Route>
                        <Route exact path="/login" element={<Login />}></Route>
                        <Route
                          exact
                          path="/signup"
                          element={<Signup />}
                        ></Route>
                        <Route path="*" element={<Navigate to="/" />}></Route>
                      </Routes>
                    </div>
                  </Router>
                </RecordDetailsState>
              </RecordState>
            </SettingState>
          </FolderState>
        </DashboardState>
      </UserState>
    </>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  // const noNavbarPaths = ["/login", "/signup"];
  const noNavbarPaths = [];

  return !noNavbarPaths.includes(location.pathname) ? <Navbar /> : null;
}

export default App;
