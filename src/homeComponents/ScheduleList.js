// import { useState, useEffect } from "react";

import { useState } from "react";
import "./componentStyles/scheduleList.css";
import Schedule from "../JsModules/Schedule";

function ScheduleList(props) {
  const [showAdd, setShowAdd] = useState(false);

  const updateAdd = () => {
    setShowAdd(!showAdd);
  };

  const clicked = (id) => {
    props.changeScheduleById(id);
  };

  const createNewSchedule = () => {
    const name = document.getElementById("newSchedule").value;

    const newSchedule = new Schedule(name, []);
    props.addSchedule(newSchedule);
    updateAdd();
  };

  const removeSchedule = (id) => {
    props.removeSchedule(id);
  };

  return (
    <div>
      <div className="title-add-container">
        <h2>Schedules</h2>
        <i onClick={updateAdd} className="fa-solid fa-plus"></i>
      </div>

      {props.schedules && props.schedules.length > 0 ? (
        <ul className="schedules-list">
          {props.schedules.map((schedule, index) => (
            <div className="schedule-name-delete">
              <li
                onClick={() => clicked(schedule.id)}
                className="schedule-item"
                key={index}
              >
                {schedule.name}
              </li>
              <i
                className="fa-regular fa-trash-can"
                onClick={() => {
                  removeSchedule(schedule.id);
                }}
              ></i>
            </div>
          ))}
        </ul>
      ) : (
        <p>No schedules found.</p>
      )}

      {/* hidden add schedule */}
      {showAdd ? (
        <div className="add-menu">
          <h1>New Schedule</h1>
          <div className="input-container">
            <label htmlFor="">Schedule Name</label>
            <br />
            <input id="newSchedule" type="text" />
          </div>

          <div className="schedule-options-container">
            <button onClick={updateAdd}>Cancel</button>
            <button onClick={createNewSchedule}>Create</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ScheduleList;
