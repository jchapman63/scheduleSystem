// css
import "./componentStyles/scheduler.css";

// models
import AppModel from "../JsModules/AppModel";
// import Schedule from "../JsModules/Schedule";
// import Course from "../JsModules/Course";

// components
import Calendar from "./Calendar";
import ScheduleList from "./ScheduleList";

// react modules
import { useState, useEffect } from "react";

function Scheduler() {
  // to be set in useEffect on component mount
  const [app, setApp] = useState(null);

  // to be set from ScheduleList
  const [currentSchedule, setCurrentSchedule] = useState(null);

  // updated after model is created
  const [isLoading, setIsLoading] = useState(true);

  // generate the model data on load
  useEffect(() => {
    // asynchronous data collection from AppModel
    const loadData = async () => {
      // new Model
      const model = new AppModel();

      // call helper here, not in AppModel constructor
      await model._generateSchedules();

      // update state
      setApp(model);

      // should probably change this later
      // setCurrentSchedule(model.schedules[0]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // grab a schedule id to change state
  const changeScheduleById = (id) => {
    var newSchedule = app.getScheduleById(id);
    setCurrentSchedule(newSchedule);
  };

  return (
    <div className="scheduler-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="scheduler-splitter">
          <Calendar currentSchedule={currentSchedule} />
          <ScheduleList
            schedules={app.schedules}
            changeScheduleById={changeScheduleById}
          />
          <button onClick={app.logScheduleData}>generate data</button>
        </div>
      )}
    </div>
  );
}

export default Scheduler;
