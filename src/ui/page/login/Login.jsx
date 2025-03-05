import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login, register, verifyUser } from "../../redux/thunk/auth/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { resetlogin } from "../../redux/slice/auth/login";
import { Button } from "../../component/button/common/Button";
import { resetregister } from "../../redux/slice/auth/register";
import useToast from "../../hooks/toastHook";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToast();
  // const [authanticate, setAuthanticate] = useState();
  const loginSliceStatus = useSelector((state) => state?.loginSlice?.status);
  const registerSliceStatus = useSelector(
    (state) => state?.registerSlice?.status
  );
  console.log("registerSliceStatus: ", registerSliceStatus);
  const { token, login: verifyLogin } = useSelector(
    (state) => state?.verification
  );
  const [isLogin, setIsLogin] = useState(true);

  const registrationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (loginSliceStatus === "succeeded") {
      showToast("login successfuly", "success")
      dispatch(resetlogin());
      navigate("/profile");
    } else if (registerSliceStatus === "succeeded") {
      showToast("regist successfuly", "success")
      dispatch(resetregister());
      window.location.reload();
    }
    else if (loginSliceStatus === "failed"||registerSliceStatus === "failed") {
      showToast("error!!", "error")
    }
  }, [loginSliceStatus, registerSliceStatus]);

  useEffect(() => {
    dispatch(verifyUser());
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    if (!isLogin) {
      dispatch(register(values));
      if (registerSliceStatus === "succeeded") {        
        setIsLogin(true);
      }
    } else {
      dispatch(login(values));
    }
    resetForm();
  };

  return (
    <div className="container">
      {token && verifyLogin && (
        <Button
          text={"🡐"}
          className={"back-arrow"}
          action={() => {
            navigate("/profile");
          }}
        />
      )}
      <div className="form-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={isLogin ? loginSchema : registrationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="form">
              {!isLogin && (
                <div className="input-group">
                  <label>Name</label>
                  <Field type="text" name="name" className="input-field" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
              )}

              <div className="input-group">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  className="input-field"
                  onChange={(e) => {
                    setFieldValue("email", e.target.value.toLowerCase());
                  }}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="input-group">
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  className="input-field"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              {!isLogin && (
                <div className="input-group">
                  <label>Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="input-field"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>
              )}

              <button type="submit" className="submit-btn">
                {isLogin ? "Login" : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};
