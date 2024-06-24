import React, { useContext } from "react";
import userContext from "../context/Users/UserContext";
import { useFormik } from "formik";
import { changePasswordSchema } from "../schemas";

const ChangePassword = () => {
  const { chnagePassword } = useContext(userContext);
  const initialValues = {
    password: "",
    npassword: "",
    cpassword: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: changePasswordSchema,
      onSubmit: (values, action) => {
        chnagePassword(values.password, values.npassword, values.cpassword);
        action.resetForm();
      },
    });

  return (
    <>
      <div className="mt-3 card   theme-foreground card-settings">
        <div className="card-body">
          <div className="tab-content" id="pills-tabContent">
            <form>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Current Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Current Password"
                />
                {errors.password && touched.password ? (
                  <small className="form-text text-danger">
                    {errors.password}
                  </small>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="npassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="npassword"
                  name="npassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.npassword}
                  placeholder="New Password"
                />
                {errors.npassword && touched.npassword ? (
                  <small className="form-text text-danger">
                    {errors.npassword}
                  </small>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  name="cpassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cpassword}
                  placeholder="Confirm Password"
                />
                {errors.cpassword && touched.cpassword ? (
                  <small className="form-text text-danger">
                    {errors.cpassword}
                  </small>
                ) : null}
              </div>
              <button
                type="submit"
                className="btn btn-theme"
                onClick={handleSubmit}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
