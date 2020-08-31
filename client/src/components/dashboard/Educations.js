import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((item) => (
    <tr key={item._id}>
      <td>{item.school}</td>
      <td className="hide-sm">{item.degree}</td>
      <td className="hide-sm">{item.fieldofstudy}</td>
      <td>
        <Moment format="YYYY/MM/DD">{item.from}</Moment> -{" "}
        {item.to === null ? (
          "Noew"
        ) : (
          <Moment format="YYYY/MM/DD">{item.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(item._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Field Of Study</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  education: state.profile.profile.education || [],
});

export default connect(mapStateToProps, { deleteEducation })(Education);
