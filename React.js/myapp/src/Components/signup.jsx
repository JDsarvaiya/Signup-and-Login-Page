import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
      .min(2, "Minimum 2 characters")
      .max(30, "Maximum 30 characters")
      .required("Name is required"),

    lastname: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
      .min(2, "Minimum 2 characters")
      .max(30, "Maximum 30 characters")
      .required("Last Name is required"),

    email: Yup.string()
      .trim()
      .lowercase()
      .email("Enter a valid email address")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Enter a valid email format",
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
        "Must contain one special character",
      ),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/signup", values);

      console.log(response.data);
      alert("Signup Successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Signup Failed!");
    }
  };

  return (
    <div className="form-box">
      <h2>Signup</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className={errors.name && touched.name ? "input-error" : ""}
            />
            <ErrorMessage name="name" component="div" className="error" />
            <Field
              type="text"
              name="lastname"
              placeholder="Last Name"
              className={
                errors.lastname && touched.lastname ? "input-error" : ""
              }
            />
            <ErrorMessage name="lastname" component="div" className="error" />

            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={errors.email && touched.email ? "input-error" : ""}
            />
            <ErrorMessage name="email" component="div" className="error" />

            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={
                errors.password && touched.password ? "input-error" : ""
              }
            />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit">Signup</button>

            <p>
              Already have an account?{" "}
              <span onClick={() => navigate("/")}>Login</span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
