import React, { useState, useEffect, useContext } from "react";
import RecordDetailsContect from "../context/RecordDetails/RecordDetailsContext";
import { useParams } from "react-router-dom";

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
            <div className="card theme-foreground card-calls mt-3">
              <div className="card-header theme-background">
                Metting Summary
              </div>
              <div className="card-body metting-body">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
                dolorem ab eaque aut, quaerat totam culpa fugit sit ad aperiam
                expedita. Debitis, maxime? Dignissimos, labore! Iure sapiente,
                eaque repellat dolor exercitationem dolore quisquam? Qui,
                tempora. Et nemo quia repudiandae soluta nobis praesentium?
                Maxime, harum, obcaecati magnam nesciunt repellendus provident
                expedita quis architecto asperiores numquam reiciendis omnis
                amet eius accusamus eveniet iure! Quos autem, temporibus placeat
                sit quia culpa aut, ipsam doloremque beatae iste inventore quo!
                Eius temporibus exercitationem pariatur dolorem rerum quo
                dolores molestias iste cum unde quibusdam vel tenetur repellat
                sequi maiores adipisci reprehenderit dicta, porro laboriosam,
                magni rem!
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
                  <div className="col-8">{recordDetails.meetingName}</div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallDetails;
