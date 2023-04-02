// import { useState, useEffect } from "react";

import "./componentStyles/scheduleList.css";
function ScheduleList(props) {
  const clicked = (id) => {
    props.changeScheduleById(id);
  };
  return (
    <div>
      <h2>Schedules</h2>
      {props.schedules && props.schedules.length > 0 ? (
        <ul className="schedules-list">
          {props.schedules.map((schedule, index) => (
            <li
              onClick={() => clicked(schedule.id)}
              className="schedule-item"
              key={index}
            >
              {schedule.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No schedules found.</p>
      )}
    </div>
  );
}

export default ScheduleList;
