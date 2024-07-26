import React, { useContext, useState, useEffect, useRef } from "react";
import recordContext from "../context/Records/RecordContext";
import folderContext from "../context/Folders/FolderContext";
import { FiVideo } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import { RecordSchema } from "../schemas";
import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";

const RecordMeeting = () => {
  const refClose = useRef(null);
  const { createRecord } = useContext(recordContext);
  const { getFolder, folders } = useContext(folderContext);
  // const [bot, setBot] = useState({
  //   meetingName: "",
  //   meetingUrl: "",
  //   folder: "",
  // });
  const initialValues = {
    meetingName: "",
    meetingUrl: "",
    folder: "",
  };
  useEffect(() => {
    getFolder();
  }, []);
  // const onChange = (e) => {
  //   setBot({ ...bot, [e.target.name]: e.target.value });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   createRecord(bot.meetingName, bot.meetingUrl, bot.folder);
  // };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RecordSchema,
      onSubmit: async (values, action) => {
        const response = await createRecord(
          values.meetingName,
          values.meetingUrl,
          values.folder
        );
        if (response.status === 200) {
          refClose.current.click();
        }
        action.resetForm();
      },
    });
  return (
    <>
      {/* <Link to="#" className="btn btn-primary">
            Record a meeting now
          </Link> */}
      {/* <button className="btn btn-primary" onClick={() => createRecord()}> */}
      <button
        type="button"
        className="btn btn-light btn-record"
        data-toggle="modal"
        data-target="#recordMeetingModel"
      >
        <FiVideo /> Record a meeting now
      </button>
      <div
        className="modal fade text-dark"
        id="recordMeetingModel"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="recordMeetingModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title" id="recordMeetingModelLabel">
                Meet AI will join and record the meeting
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
                  <label htmlFor="meetingName">Meeting Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="meetingName"
                    name="meetingName"
                    placeholder="Meeting Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.meetingName}
                  />
                  {errors.meetingName && touched.meetingName ? (
                    <small className="form-text text-danger">
                      {errors.meetingName}
                    </small>
                  ) : null}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="folder">Folder</label>
                  <select
                    className="form-select"
                    id="folder"
                    name="folder"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.folder}
                    aria-label="Default select example"
                  >
                    <option value="">Select Folder</option>
                    {/* <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
                    {folders?.map((folder, key) => {
                      return (
                        <option value={folder._id} key={key}>
                          {folder.folderName}
                        </option>
                      );
                    })}
                  </select>
                  {errors.folder && touched.folder ? (
                    <small className="form-text text-danger">
                      {errors.folder}
                    </small>
                  ) : null}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="meetingUrl" className="gap-2">
                    <span>Meeting URL </span> <Tooltip id="my-tooltip" />
                    <a
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Please enter the URL for your meeting (e.g., Google Meet & Microsoft Teams)"
                    >
                      <FaInfoCircle />
                    </a>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="meetingUrl"
                    name="meetingUrl"
                    placeholder="Meeting URL"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.meetingUrl}
                  />
                  {errors.meetingUrl && touched.meetingUrl ? (
                    <small className="form-text text-danger">
                      {errors.meetingUrl}
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
                  <FiVideo /> Record a meeting now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordMeeting;
