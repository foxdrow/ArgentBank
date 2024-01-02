import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../../layouts/MainContainer/MainContainer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setUserName } from "../../features/user/userSlice";
import axios from "axios";

import Account from "../../components/Account/Account";

const Profile = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { firstName, lastName, userName } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.token || sessionStorage.token) {
      setAuth(true);
    } else {
      navigate("/sign-in");
    }
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (e.target.userName.value === "") {
      return;
    }
    const userName = e.target.userName.value;
    console.log(userName);
    const token = localStorage.token || sessionStorage.token;
    try {
      await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        {
          userName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUserName(userName));
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <MainContainer className="profile">
      {auth && (
        <main className="main bg-dark">
          {!editMode && (
            <div className="header">
              <h1>
                Welcome back
                <br />
                {firstName} {userName}!
              </h1>
              <button className="edit-button" onClick={() => setEditMode(true)}>
                Edit Name
              </button>
            </div>
          )}
          {editMode && (
            <div className="edit-panel">
              <p className="edit-title">Edit User Info</p>
              <form className="edit-form" onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="edit-label" htmlFor="userName">
                    User name:
                  </label>
                  <input
                    className="edit-input"
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder={userName}
                  />
                </div>
                <div className="form-group">
                  <label className="edit-label" htmlFor="firstName">
                    First name:
                  </label>
                  <input
                    className="edit-input disabled"
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder={firstName}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label className="edit-label" htmlFor="lastName">
                    Last name:
                  </label>
                  <input
                    className="edit-input disabled"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder={lastName}
                    disabled
                  />
                </div>
                <div className="btn-group">
                  <button className="edit-button" type="submit">
                    Save
                  </button>
                  <button
                    className="edit-button"
                    type="button"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {(error && (
                <p className="error-message">An error has occurred</p>
              )) ||
                (success && (
                  <p className="success-message">
                    User name changed successfully
                  </p>
                ))}
            </div>
          )}
          <h2 className="sr-only">Accounts</h2>
          <Account
            accountName="Argent Bank Checking (x8349)"
            accountAmount="$2,082.79"
            accountAmountDescription="Available Balance"
          />
          <Account
            accountName="Argent Bank Savings (x6712)"
            accountAmount="$10,928.42"
            accountAmountDescription="Available Balance"
          />
          <Account
            accountName="Argent Bank Credit Card (x8349)"
            accountAmount="$184.30"
            accountAmountDescription="Current Balance"
          />
        </main>
      )}
    </MainContainer>
  );
};
export default Profile;
