import React, { useContext, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import userContext from "../context/Users/UserContext";
import { useFormik } from "formik";
import { AddUserSchema } from "../schemas";
import { TbEdit } from "react-icons/tb";

const EditUser = ({ data }) => {
  const { addUser, getIndividualUser } = useContext(userContext);
  const refClose = useRef(null);
  const [editData, setEditData] = useState(data);

  useEffect(() => {
    setEditData(data);
  }, [data]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: editData,
      validationSchema: AddUserSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const req = await addUser({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        if (req.status === 200) {
          refClose.current.click();
          action.resetForm();
        }
        getIndividualUser();
      },
    });

  return (
    <>
      <TbEdit
        className="font-size-20 text-theme btn-action-items"
        data-toggle="modal"
        data-target="#editUserModel"
        alt="model"
      />
      <div
        className="modal fade text-dark"
        id="editUserModel"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editUserModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title" id="addUserModelLabel">
                Edit User
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
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name ? (
                    <small className="form-text text-danger">
                      {errors.name}
                    </small>
                  ) : null}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <small className="form-text text-danger">
                      {errors.email}
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
                  onClick={handleSubmit}
                  className="btn btn-theme"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
