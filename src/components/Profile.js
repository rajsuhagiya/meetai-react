import React, { useState, useContext, useEffect } from "react";
import userContext from "../context/Users/UserContext";
import { useFormik } from "formik";
import { ProfileSchema } from "../schemas";

const Profile = () => {
  const { user, getUser, editUser } = useContext(userContext);
  const [userData, setUserData] = useState({
    id: "",
    ename: "",
    eemail: "",
    emobileNumber: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      await getUser();
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setUserData({
        id: user._id,
        ename: user.name || "",
        eemail: user.email || "",
        emobileNumber: user.mobileNumber || "",
        type: user.type || "",
      });
    }
  }, [user]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: userData,
      validationSchema: ProfileSchema,
      onSubmit: async (values, action) => {
        await editUser(
          values.id,
          values.ename,
          values.eemail,
          values.emobileNumber
        );
        await getUser();
        action.resetForm();
      },
    });

  return (
    <div className="mt-3 card theme-foreground card-settings">
      <div className="card-body">
        <div className="tab-content" id="pills-tabContent">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="ename" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="ename"
                name="ename"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ename}
                placeholder="Name"
              />
              {errors.ename && touched.ename ? (
                <small className="form-text text-danger">{errors.ename}</small>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="eemail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="eemail"
                name="eemail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.eemail}
                placeholder="Email Address"
              />
              {errors.eemail && touched.eemail ? (
                <small className="form-text text-danger">{errors.eemail}</small>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="emobileNumber" className="form-label">
                Mobile No
              </label>
              <input
                type="text"
                className="form-control"
                id="emobileNumber"
                name="emobileNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emobileNumber}
                placeholder="Mobile Number"
              />
              {errors.emobileNumber && touched.emobileNumber ? (
                <small className="form-text text-danger">
                  {errors.emobileNumber}
                </small>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Type
              </label>
              <input
                type="text"
                className="form-control"
                id="type"
                disabled
                name="type"
                value={values.type}
              />
            </div>
            <button type="submit" className="btn btn-theme">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
