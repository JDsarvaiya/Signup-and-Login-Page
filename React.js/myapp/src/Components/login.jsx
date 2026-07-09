import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .lowercase()
      .email("Enter a valid email address")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Enter a valid email format"
      )
      .max(50, "Email must not exceed 50 characters")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Must contain one lowercase letter")
      .matches(/[A-Z]/, "Must contain one uppercase letter")
      .matches(/[0-9]/, "Must contain one number")
      .matches(
        /[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]/,
        "Must contain one special character"
      ),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        values
      );

      console.log(response.data);
      alert("Login Successfully!");
    } catch (error) {
      console.error(error);
      alert("Login Failed!");
    }
  };

  return (
    <div className="form-box">
      <h2>Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={errors.email && touched.email ? "input-error" : ""}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error"
            />

            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={
                errors.password && touched.password ? "input-error" : ""
              }
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error"
            />

            <button type="submit">Login</button>

            <p>
              New user?{" "}
              <span onClick={() => navigate("/signup")}>
                Signup
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;