import React, { useState } from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { SignupSchema } from "../schemas";

const Signup = () => {
  // const [credentials, setCredentials] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   cpassword: "",
  // });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
  // const onChange = (e) => {
  //   setCredentials({ ...credentials, [e.target.name]: e.target.value });
  // };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignupSchema,
      onSubmit: async (values, action) => {
        const { name, email, password } = values;
        const response = await fetch(`${host}/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
        const json = await response.json();
        if (response.status === 200) {
          //set the auth token and redirect
          localStorage.setItem("token", json.authtoken);
          localStorage.setItem("username", json.result.name);
          localStorage.setItem("email", json.result.email);
          navigate("/");
          toast.success("User Signup Successful");
        } else if (response.status === 400) {
          toast.error(json.error);
        } else {
          toast.error("Internal Server Error");
        }
        action.resetForm();
      },
    });
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { name, email, password } = credentials;
  //   const response = await fetch(`${host}/api/auth/createuser`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       password,
  //     }),
  //   });
  //   const json = await response.json();
  //   if (json.success) {
  //     //set the auth token and redirect
  //     localStorage.setItem("token", json.authtoken);
  //     localStorage.setItem("username", json.result.name);
  //     localStorage.setItem("email", json.result.email);
  //     navigate("/");
  //     toast.success("User Signup Successful");
  //   } else {
  //     toast.error("Internal Server Error");
  //   }
  // };
  return (
    <>
      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center mt-1 mb-5 pb-1 d-flex justify-content-center align-items-center">
                        <img
                          src="/images/meetai.png"
                          alt="meetai logo"
                          width="54px"
                          height="50px"
                        />
                        <h1 className="m-0">Meet AI</h1>
                      </div>

                      <form onSubmit={handleSubmit}>
                        {/* <p>Please login to your account</p> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="name"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.name && touched.name ? (
                            <small className="form-text text-danger">
                              {errors.name}
                            </small>
                          ) : null}
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && touched.email ? (
                            <small className="form-text text-danger">
                              {errors.email}
                            </small>
                          ) : null}
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password && touched.password ? (
                            <small className="form-text text-danger">
                              {errors.password}
                            </small>
                          ) : null}
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="password"
                            name="cpassword"
                            id="cpassword"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={values.cpassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.cpassword && touched.cpassword ? (
                            <small className="form-text text-danger">
                              {errors.cpassword}
                            </small>
                          ) : null}
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-block gradient-custom-2"
                            type="submit"
                          >
                            Sign up
                          </button>
                        </div>

                        {/* <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Already have an account?</p>
                          <Link
                            to="/login"
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-danger"
                          >
                            Log in
                          </Link>
                        </div> */}
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <div className="text-center">
                        <h3 className="mb-4">
                          Welcome to our Bot Creation Platform
                        </h3>
                        <h6 className="mb-4">
                          Start building your intelligent bots for Microsoft
                          Teams, Google Meet, and Zoom.
                        </h6>
                      </div>
                      {/* <p className="small mb-2">
                        Create bots for seamless integration with your favorite
                        video conferencing platforms.
                      </p>
                      <p className="small mb-2">
                        Access call recordings and transcripts effortlessly
                        after each session.
                      </p>
                      <p className="small mb-2">
                        Engage in post-call chat discussions to provide feedback
                        and collaborate..
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
