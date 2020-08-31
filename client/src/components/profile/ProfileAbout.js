import React from "react";

const ProfileAbout = ({ profile }) => {
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{profile.user.name}</h2>
      {profile.bio && <p>{profile.bio}</p>}

      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {profile.skills.length > 0 &&
          profile.skills.map((item,index) => (
            <div className="p-1" key={index}>
              <i className="fa fa-check"></i> {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
