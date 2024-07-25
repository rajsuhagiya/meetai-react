import React, { useState, useEffect, useContext, useRef } from "react";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import RecordContext from "../context/Records/RecordContext";
import folderContext from "../context/Folders/FolderContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import { TfiSharethis } from "react-icons/tfi";
import { ShareFolderSchema } from "../schemas";

const CallsTable = () => {
  const status = useOutletContext();
  const refOpen = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();
  const { records, recordsData, getRecords, deleteRecord, shareMeeting } =
    useContext(RecordContext);
  const { folders, getFolder } = useContext(folderContext);
  const [filterData, setFilterData] = useState(recordsData);
  const [video, setVideo] = useState({
    name: "",
    url: "",
  });
  const [editShareData, setEditShareData] = useState({
    id: "",
    folder: "",
  });
  const playVideo = (row) => {
    setVideo({ name: row.name, url: row.record });
    refOpen.current.click();
  };
  const closeVideo = () => {
    setVideo({ name: "", url: "" });
  };
  useEffect(() => {
    const fetchRecordData = async () => {
      await getRecords(status);
    };
    fetchRecordData();
  }, [status]);
  useEffect(() => {
    if (recordsData) {
      setFilterData(recordsData);
    }
  }, [recordsData]);
  useEffect(() => {
    getFolder();
  }, []);
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
      name: "Meeting Platform",
      selector: (row) => row.platform,
      sortable: true,
      width: "200px",
    },
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
            <TfiSharethis
              className="mx-1 font-size-20 text-theme btn-action-items"
              data-toggle="modal"
              data-target="#shareFolderModel"
              alt="model"
              onClick={() => handleShareMeeting(row)}
            />
          )}
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
  const handleFilter = (e) => {
    const newData = recordsData.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterData(newData);
  };

  const handleRedirect = (id) => {
    navigate(`/call-details/${id}`);
  };
  const handleShareMeeting = (row) => {
    console.log(row);
    setEditShareData({
      id: row.id,
      folder: row.folderId,
    });
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
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: editShareData,
      validationSchema: ShareFolderSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(values.id, values.folder);
        // const response = await shareMeeting(values.id, values.folderId);
        shareMeeting(values.id, values.folder);
        refClose.current.click();
        action.resetForm();
      },
    });
  return (
    <>
      <div className="row justify-content-end pb-3">
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
            data={filterData}
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
      <div
        className="modal fade text-dark"
        id="shareFolderModel"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="shareFolderModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title" id="ashareFolderModelLabel">
                Share Meeting
              </h5>
              <button
                type="button"
                className="close border-0 bg-transparent"
                data-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              >
                <IoClose className="font-size-20" />
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label htmlFor="name">Folder</label>
                  <select
                    className="form-control"
                    id="folder"
                    name="folder"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select a folder</option>
                    {folders.map((folder) => (
                      <option
                        key={folder._id}
                        value={folder._id}
                        selected={values.folder == folder._id}
                      >
                        {folder.folderName}
                      </option>
                    ))}
                  </select>
                  {errors.folder && touched.folder ? (
                    <small className="form-text text-danger">
                      {errors.folder}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-theme"
                  onClick={handleSubmit}
                >
                  Share Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallsTable;
