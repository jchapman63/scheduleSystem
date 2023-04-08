class Schedule {
  constructor(name, courses) {
    this.name = name;
    if (courses) {
      this.courses = courses;
    } else {
      this.courses = [];
    }
  }

  addCourse(course) {
    let doesExist = false;
    for (var i = 0; i < this.courses.length; i++) {
      if (this.courses[i].id === course.id) {
        doesExist = true;
        break;
      }
    }
    if (doesExist) {
      console.log("course exists");
    } else {
      this.courses.push(course);
    }
  }

  removeCourse(course) {
    let i = 0;
    this.courses.forEach((schedCourse) => {
      if (schedCourse.id === course.id) {
        this.courses.splice(i, 1);
      }
      i++;
    });
  }

  // leaving out of "toObject" for now.  My hunch is that  I won't need it there.
  createID(id) {
    this.id = id;
  }

  toObject() {
    return {
      name: this.name,
      courses: this.courses.map((course) => course.toObject()),
    };
  }
  // define methods for modifying the schedule object as needed
}

export default Schedule;
