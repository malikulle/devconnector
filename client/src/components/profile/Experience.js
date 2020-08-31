import React from "react";
import Moment from "react-moment";
const Experience = ({ experience }) => {
  return (
    <div>
      {experience &&
        experience.length > 0 &&
        experience.map((item, index) => (
          <div key={index}>
            <h3 className="text-dark">{item.company}</h3>
            <p>
              <Moment format="YYYY/MM/DD">{item.from}</Moment> -{" "}
              {!item.to ? "Now" : <Moment format="YYYY/MM/DD">{item.to}</Moment>}
            </p>
            <p>
              <strong>Position: </strong> {item.title}
            </p>
            <p>
              <strong>Description: </strong>{item.description}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Experience;
