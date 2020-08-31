import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getAProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAProfiles();
  }, [getAProfiles]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 children="larget text-primary">Developers</h1>
          <p>
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              <div>
                {profiles.map((item) => (
                  <ProfileItem key={item._id} profile={item} />
                ))}
              </div>
            ) : (
              <h4>No Profiles Find</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAProfiles })(Profiles);
