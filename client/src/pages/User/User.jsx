import "./User.scss";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../../layouts/MainContainer/MainContainer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setUserName } from "../../features/user/userSlice";
import axios from "axios";

const User = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const { firstName, lastName, userName } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.token || sessionStorage.token) {
      setAuth(true);
    } else {
      navigate("/sign-in");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (e.target.userName.value === "") {
      return;
    }
    const userName = e.target.userName.value;
    console.log(userName);
    dispatch(setUserName(userName));
    const token = localStorage.token || sessionStorage.token;
    try {
      const response = await axios.put(
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainContainer className="user">
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
          </div>
        )}
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </MainContainer>
  );
};
export default User;
