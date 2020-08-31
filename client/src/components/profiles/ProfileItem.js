import React from "react";
// import {connect} from "react-redux"
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  console.log(profile);
  return (
    <div className="profile bg-light">
      <img src={profile.user.avatar} alt="" className="round-img" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>
          {profile.status}{" "}
          {profile.company && <span> at {profile.company}</span>}
          <p className="my-1">
            {profile.location && <span> {profile.location}</span>}
          </p>
          <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
            View Profile
          </Link>
        </p>
      </div>
      <ul>
        {profile.skills.slice(0, 4).map((item, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
