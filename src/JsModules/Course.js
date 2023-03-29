class Course {
  constructor(
    courseName,
    courseCode,
    sectionNumber,
    creditHours,
    meetFrequencies,
    meetTime,
    meetingRoom,
    professor
  ) {
    this.courseName = courseName;
    this.courseCode = courseCode;
    this.sectionNumber = sectionNumber;
    this.creditHours = creditHours;
    this.meetFrequencies = meetFrequencies;
    this.meetTime = meetTime;
    this.meetingRoom = meetingRoom;
    this.professor = professor;
  }

  updateCourseName(name) {
    this.courseName = name;
  }

  updateCourseCode(code) {
    this.courseCode = code;
  }

  updateSectionNumber(number) {
    this.sectionNumber = number;
  }

  updateCreditHours(credits) {
    this.creditHours = credits;
  }

  updateMeetFrequencies(frequency) {
    this.meetFrequencies = frequency;
  }

  updateMeetTime(time) {
    this.meetTime = time;
  }

  updateMeetingRoom(room) {
    this.meetingRoom = room;
  }

  updateProfessor(professor) {
    this.professor = professor;
  }

  toObject() {
    return {
      courseName: this.courseName,
      courseCode: this.courseCode,
      sectionNumber: this.sectionNumber,
      creditHours: this.creditHours,
      meetFrequencies: this.meetFrequencies,
      meetTime: this.meetTime,
      meetRoom: this.meetingRoom,
      professor: this.professor,
    };
  }
}
export default Course;

// this is a reference type, so only one copy exists, according to the internet so we will check out the behavior with some console logging