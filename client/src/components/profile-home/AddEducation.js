import React, { useState } from "react";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profileActions";
import { useHistory } from "react-router-dom";

const AddEducation = ({ addEducation }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousState) => ({ ...previousState, [name]: value }));
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or bootcamp"
            name="school"
            required
            onChange={handleOnChange}
            value={school}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree"
            name="degree"
            required
            onChange={handleOnChange}
            value={degree}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            onChange={handleOnChange}
            value={fieldofstudy}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            onChange={handleOnChange}
            value={from}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              onChange={(e) => {
                handleOnChange(e);
                setFormData((previousState) => ({ ...previousState, to: "" }));
                toggleDisabled(!toDateDisabled);
              }}
              value={current}
            />
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            onChange={handleOnChange}
            value={to}
            disabled={toDateDisabled}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={handleOnChange}
            value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </section>
  );
};

export default connect(null, { addEducation })(AddEducation);
