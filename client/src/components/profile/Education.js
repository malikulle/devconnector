import React from "react";
import Moment from "react-moment";
const Education = ({ education }) => {
  return (
    <div>
      {education &&
        education.length > 0 &&
        education.map((item, index) => (
          <div key={index}>
            <h3 className="text-dark">{item.school}</h3>
            <p>
              <Moment format="YYYY/MM/DD">{item.from}</Moment> -{" "}
              {!item.to ? "Now" : <Moment format="YYYY/MM/DD">{item.to}</Moment>}
            </p>
            <p>
              <strong>Degree: </strong> {item.degree}
            </p>
            <p>
              <strong>Field Of Study: </strong> {item.fieldofstudy}
            </p>
            <p>
              <strong>Description: </strong>{item.description}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Education;
