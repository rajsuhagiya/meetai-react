import React, { useState, useEffect, useContext } from "react";
import RecordDetailsContect from "../context/RecordDetails/RecordDetailsContext";
import { useParams } from "react-router-dom";
import { GrDocumentSound } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import { AddNotesSchema } from "../schemas";
import "../css/Timeline.css";

const CallDetails = () => {
  const { id } = useParams();
  const { recordDetails, getRecordDetails, notes, addNotes } =
    useContext(RecordDetailsContect);
  const [initialValues, setInitialValues] = useState({
    notes: "",
    accessType: "public",
  });
  useEffect(() => {
    getRecordDetails(id);
    setInitialValues({
      notes: "",
      accessType: "public",
    });
  }, []);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AddNotesSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        addNotes(recordDetails.id, values.notes, values.accessType);
        console.log(recordDetails.id, values.notes, values.accessType);
        action.resetForm();
      },
    });
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
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
                {errors.notes && touched.notes ? (
                  <small className="form-text text-danger">
                    {errors.notes}
                  </small>
                ) : null}
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="accessType"
                      id="public"
                      value="public"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.accessType === "public"}
                    />
                    <label class="form-check-label" for="public">
                      Public
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="accessType"
                      id="private"
                      value="private"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.accessType === "private"}
                    />
                    <label class="form-check-label" for="private">
                      Private
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-theme mb-3"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
            <div className="scroll">
              {notes &&
                notes.map((note, index) => (
                  <div className="note-card" key={index}>
                    <div className="note-header">
                      <div className="note-author">
                        <img src="/images/avatar.jpeg" alt="user" />
                        <div>
                          <div className="d-flex gap-2 align-items-center">
                            <div>{note.name}</div>
                            <div style={{ fontSize: "10px" }}>{note.date}</div>
                          </div>
                          <div className="note-content">{note.notes}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
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
