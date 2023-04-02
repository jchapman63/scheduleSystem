import AppModel from "../JsModules/AppModel";
import Course from "../JsModules/Course";
import Schedule from "../JsModules/Schedule";

var app = new AppModel();
// works
const testCreateSchedule = () => {
  var schedule = new Schedule("Physics Department");

  // make a course for the schedule
  var course = new Course(
    "Phys202",
    "Phys202",
    "01",
    "4.0",
    "M W F",
    "4:00PM",
    "Batelle 102",
    "Dr. Arrey"
  );

  // add a course to the schedule
  schedule.addCourse(course);

  // add the schedule to the app, and consequently the database
  app.addSchedule(schedule);
};

// works
const testAddCourseToSchedule = () => {
  // test adding to the existing schedule
  const schedID = app.schedules[0].id;

  // check ID exists
  // console.log(schedID);
  var course = new Course(
    "Math202",
    "MTH202",
    "01",
    "4.0",
    "M W F",
    "3:00PM",
    "Batelle 102",
    "Dr. Arrey"
  );
  // var schedule = new Schedule("Math Department");
  // schedule.addCourse(course);

  if (schedID) {
    // check that schedule can be grabbed
    var schedule = app.getScheduleById(schedID);

    // before add
    // console.log("courses from before", schedule.courses.length);22

    // log to check schedule grabbed
    // console.log("grabbed by ID", schedule.name);

    // add the course to the schedule
    schedule.addCourse(course);

    // check that schedule has the new course, also reference the database to see if it is there
    // console.log("Local Schedule should have added course", schedule.courses);

    // send updated schedule to the database
    app.updateSchedule(schedID, schedule);
  }
};

// test remove course from schedule.
// works
const testRemoveCourseFromSchedule = () => {
  const scheduleID = app.schedules[0].id;

  if (scheduleID) {
    var schedule = app.getScheduleById(scheduleID);

    // grab index to remove
    var index = 0;
    for (var i = 0; i < schedule.courses.length; i++) {
      var course = schedule.courses[i];
      if (course.courseCode === "Phys202") {
        schedule.courses.splice(index, 1);
        console.log("removed successfully");
      }
      index++;
    }

    // update schedule
    app.updateSchedule(scheduleID, schedule);
  }
};
