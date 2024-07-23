import React, { useState, useEffect, useContext, useRef } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { LuPhoneCall } from "react-icons/lu";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { FaEye } from "react-icons/fa6";
import RecordContext from "../context/Records/RecordContext";
import { IoClose } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Calls = () => {
  const refOpen = useRef(null);
  const navigate = useNavigate();
  const { records, recordsData, getRecords, deleteRecord } =
    useContext(RecordContext);
  const [video, setVideo] = useState({
    name: "",
    url: "",
  });
  const playVideo = (row) => {
    setVideo({ name: row.name, url: row.record });
    refOpen.current.click();
  };
  const closeVideo = () => {
    setVideo({ name: "", url: "" });
  };
  const recordsColumns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "Record",
      cell: (row) => (
        <>
          {row.status == "Completed" && (
            <div
              className="pt-1"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => playVideo(row)}
            >
              <iframe
                src={`https://player.cloudinary.com/embed/?cloud_name=dbthjxcj7&public_id=${row.record}&controls=false&autoplay=false`}
                width="640"
                height="360"
                style={{
                  height: "auto",
                  width: "100%",
                  aspectRatio: "640/360",
                }}
                allowFullScreen
              ></iframe>
              <IoPlayCircleOutline
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)", // Center the icon
                  background: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "6px",
                  fontSize: "30px",
                  color: "white",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0)",
                }}
              ></div>
            </div>
          )}
          {row.status != "Completed" && (
            <div className="mt-1 mb-1">
              <img
                src="/images/videoPoster.jpg"
                alt="video poster"
                width="640"
                height="360"
                style={{
                  height: "auto",
                  width: "100%",
                  aspectRatio: "640/360",
                }}
              />
            </div>
          )}
        </>
      ),
    },
    { name: "Type", selector: (row) => row.type, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Date", selector: (row) => row.date, sortable: true },
    { name: "Time", selector: (row) => row.time, sortable: true },
    {
      name: "Folder",
      selector: (row) => row.folder,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <FaEye
            style={{
              pointerEvents: row.status != "Completed" ? "none" : "auto",
              cursor: row.status != "Completed" ? "not-allowed" : "pointer",
            }}
            className={`mx-1 font-size-20 btn-action-items ${
              row.status != "Completed" ? "text-muted" : "text-theme"
            }`}
            onClick={() => handleRedirect(row.id)}
          />
          {row.action && (
            <MdDelete
              className="mx-1 font-size-20 text-theme btn-action-items"
              onClick={() => handleDelete(row.id)}
            />
          )}
        </>
      ),
    },
  ];
  useEffect(() => {
    const fetchRecordData = async () => {
      await getRecords();
    };
    fetchRecordData();

    console.log("callll");
  }, []);
  const data = [];
  // const [records, setRecords] = useState(data);
  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // setRecords(newData);
  };
  const handleRedirect = (id) => {
    // console.log(row);
    navigate(`/call-details/${id}`);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "linear-gradient(to right, #5670e1, #a72ee7) ",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        deleteRecord(id);
      }
    });
  };
  return (
    <>
      <div className="mt-3 card theme-foreground card-calls">
        <div className="card-body">
          <div className="tab-content" id="pills-tabContent">
            <div className="row pb-3">
              <div className="col-sm-8 d-flex justify-content-end">
                <ul
                  className="nav nav-pills mb-2"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      <LuPhoneCall />
                      <span className="ps-2">All Calls</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      <HiOutlinePhoneMissedCall />
                      <span className="ps-2">Failed Calls</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleFilter}
                  />
                </form>
              </div>
            </div>

            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabIndex="0"
              >
                <DataTable
                  columns={recordsColumns}
                  data={recordsData}
                  fixedHeader
                  pagination
                ></DataTable>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabIndex="0"
              >
                empty
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-8 d-none justify-content-end">
        <button
          type="button"
          className="btn btn-theme d-flex align-items-center"
          data-toggle="modal"
          data-target="#addUserModel"
          ref={refOpen}
        ></button>
      </div>
      <div
        className="modal fade text-dark"
        id="addUserModel"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addUserModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title" id="addUserModelLabel">
                {video.name}
              </h5>
              <button
                type="button"
                className="close border-0 bg-transparent"
                data-dismiss="modal"
                aria-label="Close"
              >
                <IoClose className="font-size-20" onClick={closeVideo} />
              </button>
            </div>
            <form>
              <div className="modal-body ">
                <iframe
                  src={`https://player.cloudinary.com/embed/?cloud_name=dbthjxcj7&public_id=${video.url}&autoplay=true`}
                  width="640"
                  height="360"
                  style={{
                    height: "auto",
                    width: "100%",
                    aspectRatio: "640/360",
                  }}
                ></iframe>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calls;
