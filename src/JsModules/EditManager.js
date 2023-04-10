import Course from "./Course";
import CourseFormatter from "./CourseFormatter";

// handles edits done to courses in a schedule
class EditManager {
  constructor(currentSchedule) {
    this.currentSchedule = currentSchedule;

    // store edits until submit
    this.edittedCourses = [];

    // temporary course outline
    this.temporaryCourse = {
      originalCourseName: "",
      courseName: "",
      courseCode: "",
      sectionNumber: "",
      creditHours: "",
      meetFrequencies: "",
      meetTime: "",
      meetRoom: "",
      professor: "",
      id: "",
    };
  }

  removeCourse = (id, props) => {
    // decrement count (done from EditSchedule)
    // remove from this.currentSchedule
    this.currentSchedule.courses.forEach((course) => {
      if (course.id === id) {
        this.currentSchedule.removeCourse(course);
      }
    });

    // update schedule
    props.updateSchedule(this.currentSchedule.id, this.currentSchedule);
  };

  addCourse = () => {
    var newCourse = new Course("", "", "", "", "", "", "", "");
    this.currentSchedule.addCourse(newCourse);
  };

  // helper function to determine if a this.temporaryCourse object exists for some course in props
  hasBeenEdited = (id) => {
    this.edittedCourses.forEach((course) => {
      if (course.id === id) {
        return true;
      }
    });
    return false;
  };

  checkMeetFrequencies = (id) => {
    // meetFrequencies ex = [M, W, F]
    // implement, there must be a space between and one of M, T, W, Th, F
    function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const getInputsForId = document.getElementsByClassName(id);
    let daysValue;
    for (var i = 0; i < getInputsForId.length; i++) {
      var element = getInputsForId[i];
      if (element.id === "meetFrequencies") {
        daysValue = element.value;
      }
    }

    const validDays = ["M", "T", "W", "Th", "F"];
    var meetFrequencies = daysValue.split(" ");
    for (i = 0; i < meetFrequencies.length; i++) {
      let capLetter = capitalize(meetFrequencies[i]);

      if (validDays.includes(capLetter) === false) {
        return false;
      }
    }
    return true;
  };

  checkMeetTime = (id) => {
    // implement, no time less than 6AM or greater than 6PM.  Start time cannot be smaller than end time
    const getInputsForId = document.getElementsByClassName(id);

    let timeString;
    for (var i = 0; i < getInputsForId.length; i++) {
      var element = getInputsForId[i];
      if (element.id === "meetTime") {
        timeString = element.value;
      }
    }

    const startTime = timeString.slice(0, 5);
    const endTime = timeString.slice(8, 13);

    // make ints for startHour
    if (startTime[0] === "0") {
      var startHour = parseInt(startTime[1]);
    } else {
      startHour = parseInt(startTime.slice(0, 2));
    }

    // make ints for endHour
    if (startTime[0] === "0") {
      var endHour = parseInt(endTime[1]);
    } else {
      endHour = parseInt(endTime.slice(0, 2));
    }

    // convert
    // convert to 24 hour time
    if (timeString.slice(5, 6) === "P") {
      startHour += 12;
    }

    if (timeString.slice(13, 14) === "P") {
      endHour += 12;
    }

    // calculate differences
    var hourDifference = endHour - startHour;

    if (hourDifference < 0) {
      return false;
    }

    return true;
  };

  checkEmpty = (id) => {
    const getInputsForId = document.getElementsByClassName(id);
    for (var i = 0; i < getInputsForId.length; i++) {
      var element = getInputsForId[i];
      if (
        element.value === "" ||
        element.value === undefined ||
        element.value === null
      ) {
        return true;
      }
    }
    return;
  };

  // determine if a course has all valid inputs
  checkInputs = () => {
    for (var i = 0; i < this.currentSchedule.courses.length; i++) {
      for (const key in this.currentSchedule.courses[i]) {
        if (key === "meetFrequencies") {
          if (
            this.checkMeetFrequencies(this.currentSchedule.courses[i].id) ===
            false
          ) {
            return false;
          }
        } else if (key === "meetTime") {
          if (
            this.checkMeetTime(this.currentSchedule.courses[i].id) === false
          ) {
            return false;
          }
        } else {
          if (this.checkEmpty(this.currentSchedule.courses[i].id) === true) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // update the schedule
  handleSubmit = (props) => {
    // only perform updates if edits were made
    if (this.edittedCourses.length > 0) {
      // loop each edit
      this.edittedCourses.forEach((edittedCourse) => {
        // loop original courses
        this.currentSchedule.courses.forEach((originalCourse) => {
          // edits applied to matching ids
          if (edittedCourse.id === originalCourse.id) {
            // apply edits via keys in edittedCourses
            for (const key in edittedCourse) {
              // key must have been editted and exist in original course
              if (
                edittedCourse[key] !== "" &&
                originalCourse.hasOwnProperty(key)
              ) {
                // update the course
                originalCourse[key] = edittedCourse[key];
              }
            }
          }
        });
      });
      props.updateSchedule(this.currentSchedule.id, this.currentSchedule);
    } else {
      console.log("no edits were made");
    }
  };

  handleChange = (e) => {
    // loop through courses, if the course matches with the one being edited, update that
    // grab the name of course being edited

    if (e.target.classList[0]) {
      var originalCourseId = e.target.classList[0];
    } else {
      originalCourseId = "";
    }

    const attributeEdited = e.target.id;

    // grab the new course edit
    const newAttribute = e.target.value;

    // FIND EDITED COURSE
    this.currentSchedule.courses.forEach((course) => {
      // grab the course being edited
      if (course.id === originalCourseId) {
        // create and push a new this.temporaryCourse if not yet edited
        if (!this.hasBeenEdited(originalCourseId)) {
          var newTempCourse = this.temporaryCourse;
          newTempCourse.id = originalCourseId;
          this.edittedCourses.push(newTempCourse);
        }

        // apply edits
        this.edittedCourses.forEach((course) => {
          if (course.id === originalCourseId) {
            if (course.hasOwnProperty(attributeEdited)) {
              course[attributeEdited] = newAttribute;
            }
          }
        });
      }
    });
  };
}

export default EditManager;
