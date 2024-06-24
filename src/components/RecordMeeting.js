import React, { useContext, useState } from "react";
import recordContext from "../context/Records/RecordContext";
import { FiVideo } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
const RecordMeeting = () => {
  const context = useContext(recordContext);
  const { createRecord } = context;
  const [bot, setBot] = useState({
    botName: "",
    meetingUrl: "",
  });
  const onChange = (e) => {
    setBot({ ...bot, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createRecord(bot.botName, bot.meetingUrl);
  };
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
              >
                <IoClose className="font-size-20" />
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label htmlFor="botName">Meeting Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="botName"
                    name="botName"
                    placeholder="Meeting Name"
                    onChange={onChange}
                    value={bot.botName}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="folder">Folder</label>
                  <select
                    className="form-select"
                    id="folder"
                    name="folder"
                    aria-label="Default select example"
                  >
                    <option>Select Folder</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="meetingUrl">Meeting URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="meetingUrl"
                    name="meetingUrl"
                    placeholder="Meeting URL"
                    onChange={onChange}
                    value={bot.meetingUrl}
                  />
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
