import MainContainer from "../../layouts/MainContainer/MainContainer";
import "./SignIn.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signIn } from "./signInSlice";
import {
  signInPending,
  signInSuccess,
  signInFailure,
  signInRemember,
} from "./signInSlice";
import axios from "axios";

const SignIn = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const { loading, auth, error } = useSelector((state) => state.signIn);

  const handelChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInPending());
    console.log(credentials);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        credentials
      );

      if (remember) {
        localStorage.setItem("token", response.data.body.token);
        dispatch(signInRemember());
      } else {
        localStorage.removeItem("token");
      }
      dispatch(signInSuccess());
    } catch (err) {
      dispatch(signInFailure(err.message || err));
    }
  };

  return (
    <MainContainer className="sign-in">
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handelSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="email"
                onChange={handelChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handelChange}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                defaultChecked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </MainContainer>
  );
};

export default SignIn;
