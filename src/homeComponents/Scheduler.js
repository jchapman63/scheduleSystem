// css
import "./componentStyles/scheduler.css";

// models
import AppModel from "../JsModules/AppModel";
// import Schedule from "../JsModules/Schedule";
// import Course from "../JsModules/Course";

// components
import Calendar from "./Calendar";
import ScheduleList from "./ScheduleList";
import EditSchedule from "./EditSchedule";

// react modules
import { useState, useEffect } from "react";

function Scheduler() {
  // to be set in useEffect on component mount
  const [app, setApp] = useState(null);

  // to be set from ScheduleList
  const [currentSchedule, setCurrentSchedule] = useState(null);

  // updated after model is created
  const [isLoading, setIsLoading] = useState(true);

  // show Schedule editing menu
  const [showEditor, setShowEditor] = useState(false);

  // used to update UI on new schedule creation
  const [scheduleCount, setScheduleCount] = useState(0);

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

      // loading is done
      setIsLoading(false);

      // number of schedule in model
      setScheduleCount(model.schedules.count);
    };

    loadData();
  }, [scheduleCount]);

  // toggle the value (might set explicitly with a parameter)
  const updateEditor = () => {
    setShowEditor(!showEditor);
  };

  // grab a schedule id to change state
  const changeScheduleById = (id) => {
    var newSchedule = app.getScheduleById(id);
    setCurrentSchedule(newSchedule);
  };

  // add a schedule to AppModel
  const newSchedule = (schedule) => {
    app.addSchedule(schedule);
    setScheduleCount(scheduleCount + 1);
  };

  const removeSchedule = (id) => {
    app.removeSchedule(id);
    setScheduleCount(scheduleCount - 1);
    setCurrentSchedule(null);
  };

  return (
    <div className="scheduler-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="scheduler-splitter">
          <Calendar
            currentSchedule={currentSchedule}
            updateEditor={updateEditor}
          />
          <ScheduleList
            schedules={app.schedules}
            changeScheduleById={changeScheduleById}
            addSchedule={newSchedule}
            removeSchedule={removeSchedule}
          />
          <button onClick={app.logScheduleData}>generate data</button>
        </div>
      )}

      {showEditor ? (
        <EditSchedule
          currentSchedule={currentSchedule}
          updateEditor={updateEditor}
          updateSchedule={app.updateSchedule}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Scheduler;
