import Course from "./Course";

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

  // update the schedule
  handleSubmit = (props) => {
    console.log(this.edittedCourses);
    if (this.edittedCourses.length > 0) {
      console.log("edits were made");
      this.edittedCourses.forEach((edittedCourse) => {
        this.currentSchedule.courses.forEach((originalCourse) => {
          if (edittedCourse.id === originalCourse.id) {
            for (const key in edittedCourse) {
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

    // close the menu
  };

  handleChange = (e) => {
    // loop through courses, if the course matches with the one being edited, update that
    // grab the name of course being edited

    if (e.target.classList[0]) {
      var originalCourseId = e.target.classList[0];
    } else {
      originalCourseId = "";
    }
    // console.log("course name from classList", originalCourseName);

    const attributeEdited = e.target.id;
    // console.log("target being editted", attributeEdited);

    // grab the new course edit
    const newAttribute = e.target.value;
    // console.log(newAttribute);

    // FIND EDITED COURSE
    this.currentSchedule.courses.forEach((course) => {
      //   console.log("name of course from list", course.courseName);
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
          //   console.log(course.originalCourseName);
          if (course.id === originalCourseId) {
            if (course.hasOwnProperty(attributeEdited)) {
              course[attributeEdited] = newAttribute;
              //   console.log(course.courseName, course[attributeEdited]);
            }
          }
        });
      }
    });
  };
}

export default EditManager;
