import React, { useContext, useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { IoLockClosedOutline } from "react-icons/io5";
import { TbLock } from "react-icons/tb";
import { TbLockOpenOff } from "react-icons/tb";
import { BsPeople } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import folderContext from "../context/Folders/FolderContext";
import { useFormik } from "formik";
import { FolderSchema } from "../schemas";

const Folders = () => {
  const refClose = useRef(null);
  const { folders, getFolder, createFolder } = useContext(folderContext);
  // const [folder, setFolder] = useState({
  //   folderName: "",
  //   accessType: "private",
  // });
  const initialValues = {
    folderName: "",
    accessType: "private",
  };
  useEffect(() => {
    getFolder();
  });
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await createFolder(folder.folderName, folder.accessType);
  //   if (response.status === 200) {
  //     refClose.current.click();
  //     getFolder();
  //   }
  //   setFolder({ folderName: "", accessType: "private" });
  // };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: FolderSchema,
      onSubmit: async (values, action) => {
        const response = await createFolder(
          values.folderName,
          values.accessType
        );
        if (response.status === 200) {
          refClose.current.click();
          getFolder();
        }
        action.resetForm();
      },
    });
  return (
    <>
      <div className="folder-card">
        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-6">
          <div className="col">
            <div className="folder-collection">
              <img
                src="/images/add-folder.svg"
                className="btn-add-folder  mt-1"
                data-toggle="modal"
                data-target="#addFolderModel"
                alt="model"
              />
              <FaPlus className="font-size-30 folder-add" />
              <span className="folder-new">Add New Folder</span>
            </div>
            <div
              className="modal fade text-dark"
              id="addFolderModel"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="addFolderModelLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content border-0">
                  <div className="modal-header d-flex justify-content-between">
                    <h5 className="modal-title" id="addFolderModelLabel">
                      Add Folder
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
                        <label htmlFor="folderName">Folder Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="folderName"
                          name="folderName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.folderName}
                          placeholder="Folder Name"
                        />
                        {errors.folderName && touched.folderName ? (
                          <small className="form-text text-danger">
                            {errors.folderName}
                          </small>
                        ) : null}
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="meetingUrl">Folder Access</label>
                        <div className="form-check p-0">
                          <input
                            type="radio"
                            className="btn-check"
                            name="accessType"
                            id="folderAccess1"
                            checked={values.accessType === "private"}
                            value="private"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // value={
                            //   folder.accessType == "private" ? "private" : ""
                            // }
                            autoComplete="off"
                          />
                          <label
                            className="btn w-100 text-start d-flex align-items-center folder-access gap-2"
                            htmlFor="folderAccess1"
                          >
                            <IoLockClosedOutline className="font-size-30" />
                            <div>
                              <div>Private Access</div>
                              <div className="folder-des">
                                Restrict visibility to admins only, hiding it
                                from team members.
                              </div>
                            </div>
                          </label>
                        </div>
                        <div className="form-check p-0 ">
                          <input
                            type="radio"
                            className="btn-check"
                            name="accessType"
                            value="public"
                            id="folderAccess2"
                            checked={values.accessType === "public"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="off"
                          />
                          <label
                            className="btn w-100 text-start d-flex align-items-center folder-access gap-2"
                            htmlFor="folderAccess2"
                          >
                            <GoPeople className="font-size-30" />
                            <div>
                              <div>Public Access</div>
                              <div className="folder-des">
                                Grant team members access, making the folder
                                visible to all.
                              </div>
                            </div>
                          </label>
                        </div>
                        {errors.accessType && touched.accessType ? (
                          <small className="form-text text-danger">
                            {errors.accessType}
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
                        Add Folder
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {folders?.map((folder, key) => {
            return (
              <div className="col folder-collection" key={key}>
                <div className="single-folder">
                  <img src="/images/folder.svg" alt="folder" />
                  {folder.accessType === "private" ? (
                    <TbLock className="font-size-25 folder-lock" />
                  ) : (
                    <BsPeople className="font-size-25 folder-lock" />
                  )}
                  <TbEdit className="font-size-25 folder-edit" />
                </div>
                <div className="folder-info-content">
                  <p className="folder-heading">{folder.folderName}</p>
                  <p className="folder-sub-heading">
                    <span>Meeting:</span>
                    <span className="meeting-count ms-1">0</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Folders;
