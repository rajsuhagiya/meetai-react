import React from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { LoginSchema } from "../schemas";

const Login = () => {
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values, action) => {
        const response = await fetch(`${host}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        const json = await response.json();
        if (response.status === 200) {
          //set the auth token and redirect
          localStorage.setItem("token", json.authtoken);
          localStorage.setItem("username", json.result.name);
          localStorage.setItem("email", json.result.email);
          toast.success("User Login Successful");
          navigate("/");
        } else {
          toast.error(json.error);
        }
        action.resetForm();
      },
    });
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch(`${host}/api/auth/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: credentials.email,
  //       password: credentials.password,
  //     }),
  //   });
  //   const json = await response.json();
  //   if (json.success) {
  //     //set the auth token and redirect
  //     localStorage.setItem("token", json.authtoken);
  //     localStorage.setItem("username", json.result.name);
  //     localStorage.setItem("email", json.result.email);
  //     toast.success("User Login Successful");
  //     navigate("/");
  //   } else {
  //     toast.error("Invalid Credentials");
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
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={values.email}
                            placeholder="Email"
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
                            value={values.password}
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password && touched.password ? (
                            <small className="form-text text-danger">
                              {errors.password}
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
                            Log in
                          </button>
                        </div>

                        {/* <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link
                            to="/signup"
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </Link>
                        </div> */}
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <div className="text-center">
                        <h3 className="mb-4">Welcome Back!</h3>
                        <h6 className="mb-4">
                          Log in to access your Bot Creation Platform account.
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

export default Login;
