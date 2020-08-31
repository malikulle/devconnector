import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

const Expriences = ({ experience ,deleteExperience}) => {
  const experiences = experience.map((item) => (
    <tr key={item._id}>
      <td>{item.company}</td>
      <td className="hide-sm">{item.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{item.from}</Moment> -{" "}
        {item.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{item.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(item._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  experience: state.profile.profile.experience || [],
});

export default connect(mapStateToProps, {deleteExperience})(Expriences);
