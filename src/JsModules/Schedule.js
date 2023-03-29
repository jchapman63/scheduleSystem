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
    this.courses.push(course);
  }

  removeCourse(course) {
    const index = this.courses.indexOf(course);
    if (index > -1) {
      this.courses.splice(index, 1);
    }
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
