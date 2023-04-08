// this module formats the data of course so that
// it can be displayed in the UI with proper proportioning
// it will take a course as an argument and create an
// html element for it

// using this module I can:
// format the course time to a corresponding cell ID: this.standardFormat
// get a list of which child elements of the row get the course: this.courseDays
// create a properly sized html element for the course: this.createCourseElement

class CourseFormatter {
  constructor(course) {
    this.course = course;
    // used for mapping meetFrequencies to a cell
    this.days = {
      M: 1,
      T: 2,
      W: 3,
      Th: 4,
      F: 5,
    };
  }

  // format the string to match table IDs
  standardFormat = () => {
    var meetTime = this.course.meetTime;
    // console.log("meet time of course", meetTime);

    var startNumber = meetTime.slice(0, 2);
    // console.log("start number grabbed", startNumber);

    var startLetter = meetTime.slice(5, 6);
    // console.log("start letter grabbed", startLetter);

    return startNumber + startLetter;
  };

  courseDays = () => {
    var courseDays = this.course.meetFrequencies.split(" ");
    // console.log("days as a list:", courseDays);

    for (let i = 0; i < courseDays.length; i++) {
      const key = courseDays[i];
      if (this.days.hasOwnProperty(key)) {
        courseDays[i] = this.days[key];
      }
    }

    return courseDays;
  };

  // determin the height of course in schedule table cell
  _courseHeight = () => {
    const startTime = this.course.meetTime.slice(0, 5);
    const endTime = this.course.meetTime.slice(8, 13);
    // console.log("start time", startTime);
    // console.log("end time", endTime);

    // make ints for startHour
    if (startTime[0] === "0") {
      var startHour = parseInt(startTime[1]);
      // console.log("start hour", startHour);
    } else {
      startHour = parseInt(startTime.slice(0, 2));
      // console.log("start hour", startHour);
    }

    // make int for startMinutes
    if (startTime[3] === "0") {
      var startMinutes = parseInt(startTime[4]);
      // console.log("start minutes", startMinutes);
    } else {
      startMinutes = parseInt(startTime.slice(3, 5));
      // console.log("start minutes", startMinutes);
    }

    // make int for endHour
    if (startTime[0] === "0") {
      var endHour = parseInt(endTime[1]);
      // console.log("end hour", endHour);
    } else {
      endHour = parseInt(endTime.slice(0, 2));
      // console.log("end hour", endHour);
    }

    // make int for endMinutes
    if (endTime[3] === "0") {
      var endMinutes = parseInt(endTime[4]);
      // console.log("start minutes", endMinutes);
    } else {
      endMinutes = parseInt(endTime.slice(3, 5));
      // console.log("start minutes", endMinutes);
    }

    // calculate height %

    // convert to 24 hour time
    if (this.course.meetTime.slice(5, 6) === "P") {
      startHour += 12;
    }
    // console.log(course.meetTime.slice(13, 14));
    if (this.course.meetTime.slice(13, 14) === "P") {
      endHour += 12;
    }

    // calculate differences
    var hourDifference = endHour - startHour;

    // console.log("endHour", endHour);
    // console.log("startHour", startHour);
    // console.log("hour difference", hourDifference);

    var minuteDifference = endMinutes - startMinutes;
    if (minuteDifference < 0) {
      minuteDifference += 60;
    }
    minuteDifference /= 60;

    // console.log("endMinutes", endMinutes);
    // console.log("startMinutes", startMinutes);
    // console.log("minute difference", minuteDifference);

    const sizePercentage = (hourDifference + minuteDifference) * 100;

    // console.log("new size", sizePercentage);

    return sizePercentage;
  };

  // create the actual course element
  createCourseElement = () => {
    // create the element
    var newElement = document.createElement("div");

    // add its css class
    newElement.classList.add("course-box");

    // add the course information
    newElement.innerHTML = this.course.courseName;

    const size = this._courseHeight(this.course);

    newElement.style.setProperty("--height", size);

    return newElement;
  };
}

export default CourseFormatter;
