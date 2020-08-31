import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profileActions";
import { useParams, Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import Experience from "./Experience";
import Education from "./Education";

const Profile = ({ getProfileById, profile, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [id, getProfileById]);
  return (
    <div>
      {profile.profile === null ? (
        <Spinner />
      ) : (
        <div>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            profile.profile &&
            auth.user._id.toString() ===
              profile.profile.user._id.toString() && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile.profile} />
            <ProfileAbout profile={profile.profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              <Experience experience={profile.profile.experience} />
            </div>
            {profile.profile.education.length > 0 && (
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                <Education education={profile.profile.education} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
