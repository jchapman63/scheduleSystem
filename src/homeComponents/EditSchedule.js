import Course from "../JsModules/Course";
import Schedule from "../JsModules/Schedule";
import "./componentStyles/editSchedule.css";

import EditManager from "../JsModules/EditManager";
import { useState, useEffect } from "react";

// what's in props?
// props.app : the app model responsible for creating, updating, and deleting scheduels
// contains:
// currentSchedule: the schedule currently being shown by the UI
// app.updateSchedule(id, schedule)
// updateEditor: gives ability to close display

function EditSchedule(props) {
  // update when new course added
  const [numCourses, setNumCourses] = useState(
    props.currentSchedule.courses.length
  );

  const increaseNumCourses = () => {
    setNumCourses(numCourses + 1);
  };

  const decreaseNumCourses = () => {
    setNumCourses(numCourses - 1);
  };

  let editManager = new EditManager(props.currentSchedule);

  return (
    <div className="editor-container">
      {props.currentSchedule ? (
        <div className="inputs-holder">
          {/* <input
            className="header-input"
            type="text"
            defaultValue={props.currentSchedule.name}
            id="scheduleName"
          /> */}
          <h2>{props.currentSchedule.name}</h2>
          <ul className="schedules-list">
            {props.currentSchedule.courses.map((course, index) => (
              <div className="course-edit-container" key={index}>
                <div className="name-delete-container">
                  <h3>{course.courseName}</h3>
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => {
                      editManager.removeCourse(course.id, props);
                      decreaseNumCourses();
                    }}
                  ></i>
                </div>
                <div className="course-boxes">
                  <div className="box box-1">
                    <label htmlFor="">Course Name</label>
                    <input
                      id="courseName"
                      type="text"
                      defaultValue={course.courseName}
                      onChange={editManager.handleChange}
                      className={course.id}
                    />

                    <label htmlFor="">Course Code</label>
                    <input
                      type="text"
                      defaultValue={course.courseCode}
                      id="courseCode"
                      onChange={editManager.handleChange}
                      className={course.id}
                    />

                    <label htmlFor="">Section Number</label>
                    <input
                      type="text"
                      defaultValue={course.sectionNumber}
                      id="sectionNumber"
                      className={course.id}
                      onChange={editManager.handleChange}
                    />

                    <label htmlFor="">Credit Hours</label>
                    <input
                      type="text"
                      defaultValue={course.creditHours}
                      id="creditHours"
                      onChange={editManager.handleChange}
                      className={course.id}
                    />
                  </div>
                  <div className="box box-2">
                    <label htmlFor="">Meet Days</label>
                    <input
                      type="text"
                      defaultValue={course.meetFrequencies}
                      id="meetFrequencies"
                      onChange={editManager.handleChange}
                      className={course.id}
                    />

                    <label htmlFor="">Meet Time</label>
                    <input
                      type="text"
                      defaultValue={course.meetTime}
                      id="meetTime"
                      className={course.id}
                      onChange={editManager.handleChange}
                    />

                    <label htmlFor="">Meet Room</label>
                    <input
                      type="text"
                      defaultValue={course.meetRoom}
                      id="meetRoom"
                      className={course.id}
                      onChange={editManager.handleChange}
                    />

                    <label htmlFor="">Professor</label>
                    <input
                      type="text"
                      defaultValue={course.professor}
                      id="professor"
                      className={course.id}
                      onChange={editManager.handleChange}
                    />
                  </div>
                </div>
                <span className="divider"></span>
              </div>
            ))}
          </ul>
          <div className="schedule-options">
            <button
              onClick={() => {
                editManager.addCourse();
                increaseNumCourses();
              }}
              className="schedule-edit-btn"
            >
              Add
            </button>
            <button
              onClick={() => {
                editManager.handleSubmit(props);
                props.updateEditor();
              }}
              className="schedule-edit-btn"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <p>No Schedule Found.</p>
      )}
    </div>
  );
}

export default EditSchedule;
