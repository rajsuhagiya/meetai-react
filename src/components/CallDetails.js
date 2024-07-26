import React, { useState, useEffect, useContext } from "react";
import RecordDetailsContect from "../context/RecordDetails/RecordDetailsContext";
import { useParams } from "react-router-dom";
import { GrDocumentSound } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import "../css/Timeline.css";

const CallDetails = () => {
  const { id } = useParams();
  const { recordDetails, getRecordDetails } = useContext(RecordDetailsContect);

  useEffect(() => {
    getRecordDetails(id);
  }, []);
  return (
    <>
      <div className="folder-card">
        <div className="row row-cols-2">
          <div className="col-12 col-sm-6 col-md-8">
            {/* <video
              id="videoRef"
              className="w-full h-auto max-w-full call-video"
              width="100%"
              controls
              preload="metadata"
            >
              <source src="/videos/video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            <iframe
              src={`https://player.cloudinary.com/embed/?cloud_name=dbthjxcj7&public_id=${recordDetails.record}`}
              width="640"
              height="360"
              style={{ height: "auto", width: "100%", aspectRatio: "640/360" }}
              allowfullscreen
              frameborder="0"
            ></iframe>
            <button
              type="button"
              className="btn btn-theme d-flex align-items-center mt-3"
              data-toggle="modal"
              data-target="#addUserModel"
            >
              <GrDocumentSound />
              <span className="ps-2">View Transcript</span>
            </button>
            <div
              className="modal fade text-dark"
              id="addUserModel"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="addUserModelLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content border-0">
                  <div className="modal-header d-flex justify-content-between">
                    <h5 className="modal-title" id="addUserModelLabel">
                      Transcript
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
                    <div className="modal-body transcript-model">
                      {recordDetails.transcript}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="card theme-foreground card-calls mt-3">
              <div className="card-header theme-background">
                Metting Summary
              </div>
              <div className="card-body metting-body">
                {recordDetails.summary == null
                  ? recordDetails.summary
                  : "Summary Not Found!"}
              </div>
            </div>
            <form className="mt-3">
              <div className="mb-3">
                <label htmlFor="notes" className="form-label">
                  Notes
                </label>
                <textarea
                  className="form-control"
                  id="notes"
                  rows="3"
                  placeholder="Add Notes"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-theme mb-3">
                Save
              </button>
            </form>
          </div>
          <div className="col-12  col-sm-6 col-md-4">
            <div className="card theme-foreground card-calls">
              <div className="card-header theme-background">
                Metting Details
              </div>
              <div className="card-body metting-body">
                <div className="row">
                  <div className="col-4 head">Name:</div>
                  <div className="col-8">{recordDetails.name}</div>
                </div>
                <div className="row">
                  <div className="col-4 head">Duration:</div>
                  <div className="col-8">{recordDetails.duration}</div>
                </div>
                <div className="row">
                  <div className="col-4 head">Date:</div>
                  <div className="col-8">{recordDetails.date}</div>
                </div>
                <div className="row">
                  <div className="col-4 head">Time:</div>
                  <div className="col-8">{recordDetails.time}</div>
                </div>
                <div className="row">
                  <div className="col-4 head">Folder:</div>
                  <div className="col-8">{recordDetails.folder}</div>
                </div>
                <div className="row">
                  <div className="col-4 head">Type:</div>
                  <div className="col-8">{recordDetails.type}</div>
                </div>
                <div className="row">
                  <div className="col-4 head">Status:</div>
                  <div className="col-8">{recordDetails.status}</div>
                </div>
                <div className="timeline">
                  {recordDetails.recordStatuses &&
                    recordDetails.recordStatuses.map((event, index) => (
                      <div className="timeline-event" key={index}>
                        <div className={`timeline-icon ${event.color}`}></div>
                        <div className="timeline-content">
                          <div className="timeline-date">{event.date}</div>
                          <div className={`timeline-status ${event.color}`}>
                            {event.status}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallDetails;
