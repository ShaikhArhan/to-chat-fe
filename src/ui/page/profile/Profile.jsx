import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../redux/thunk/profile/profile";
import { Button } from "../../component/button/common/Button";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { profileFetchSlice } = useSelector(
    (profileFetchSlice) => profileFetchSlice
  );
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user && Object.keys(user).length === 0) {
      dispatch(fetch());
    }
    setUser(profileFetchSlice.profileData);
  }, [profileFetchSlice]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> {user?.name || "-------"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "-------"}
        </p>
        <p className="password">
          <strong>Password:</strong>
          <input
            disabled
            type={user?.password ? "password" : "text"}
            value={user?.password || "NaNa"}
            className="password-input"
          />
        </p>
      </div>

      {["login", "logout"].map((data, index) => (
        <Button
          key={index}
          className="profile-login-button"
          text={data}
          //action
          action={() => {
            data !== "logout" ? navigate(`/${data}`) : logout();
          }}
        />
      ))}
    </div>
  );
};
