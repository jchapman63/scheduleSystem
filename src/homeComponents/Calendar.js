import "./componentStyles/calendar.css";

function Calendar(props) {
  // console.log("courses available", props.currentSchedule);

  const days = {
    M: 1,
    T: 2,
    W: 3,
    Th: 4,
    F: 5,
  };

  const standardFormat = (course) => {
    var meetTime = course.meetTime;
    // console.log("meet time of course", meetTime);

    var startNumber = meetTime.slice(0, 2);
    // console.log("start number grabbed", startNumber);

    var startLetter = meetTime.slice(5, 6);
    // console.log("start letter grabbed", startLetter);

    return startNumber + startLetter;
  };

  const courseDays = (course) => {
    var courseDays = course.meetFrequencies.split(" ");
    // console.log("days as a list:", courseDays);

    for (let i = 0; i < courseDays.length; i++) {
      const key = courseDays[i];
      if (days.hasOwnProperty(key)) {
        courseDays[i] = days[key];
      }
    }

    return courseDays;
  };

  const courseHeight = (course) => {
    const startTime = course.meetTime.slice(0, 5);
    const endTime = course.meetTime.slice(8, 13);
    console.log("start time", startTime);
    console.log("end time", endTime);

    // make ints for startHour
    if (startTime[0] === "0") {
      var startHour = parseInt(startTime[1]);
      console.log("start hour", startHour);
    } else {
      startHour = parseInt(startTime.slice(0, 2));
      console.log("start hour", startHour);
    }

    // make int for startMinutes
    if (startTime[3] === "0") {
      var startMinutes = parseInt(startTime[4]);
      console.log("start minutes", startMinutes);
    } else {
      startMinutes = parseInt(startTime.slice(3, 5));
      console.log("start minutes", startMinutes);
    }

    // make int for endHour
    if (startTime[0] === "0") {
      var endHour = parseInt(endTime[1]);
      console.log("end hour", endHour);
    } else {
      endHour = parseInt(endTime.slice(0, 2));
      console.log("end hour", endHour);
    }

    // make int for endMinutes
    if (endTime[3] === "0") {
      var endMinutes = parseInt(endTime[4]);
      console.log("start minutes", endMinutes);
    } else {
      endMinutes = parseInt(endTime.slice(3, 5));
      console.log("start minutes", endMinutes);
    }
  };
  const createCourseElement = (course) => {
    // create the element
    var newElement = document.createElement("div");

    // add its css class
    newElement.classList.add("course-box");

    // add the course information
    newElement.innerHTML = course.courseName;

    courseHeight(course);

    return newElement;
  };

  if (props.currentSchedule) {
    if (props.currentSchedule.courses) {
      // eslint-disable-next-line array-callback-return
      props.currentSchedule.courses.map((course) => {
        // format the start time of the course
        var formattedStartTime = standardFormat(course);
        console.log("formatted start time:", formattedStartTime);

        // format the days
        var meetDays = courseDays(course);
        console.log("formatted days array", meetDays);

        // grab the parent element, equivalent ID to formattedStartTime
        var parentElem = document.getElementById(formattedStartTime);

        // grab the children
        var children = parentElem.children;

        // create an element for the course
        var courseElem = createCourseElement(course);

        // for each day
        for (let i = 0; i < meetDays.length; i++) {
          // find which day needs to be created
          var day = meetDays[i];

          // find the corresponding element
          var elem = children[day];

          // add the course elment to the table element
          elem.innerHTML = courseElem.outerHTML;
        }
      });
    }
  }

  return (
    <table>
      <thead>
        <tr>
          {props.currentSchedule ? (
            <th>{props.currentSchedule.name}</th>
          ) : (
            <th>Please select a schedule</th>
          )}
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thurday</th>
          <th>Friday</th>
        </tr>
      </thead>
      <tbody>
        <tr id="06A">
          <td>6AM</td>
          <td className="mon"></td>
          <td className="tue"></td>
          <td className="wed"></td>
          <td className="thu"></td>
          <td className="fri"></td>
        </tr>
        <tr id="07A">
          <td>7AM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="08A">
          <td>8AM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="09A">
          <td>9AM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="10A">
          <td>10AM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="11A">
          <td>11AM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="12P">
          <td>12PM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="01P">
          <td>1PM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="02P">
          <td>2PM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="03P">
          <td>3PM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="04P">
          <td>4PM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="05P">
          <td>5PM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="06P">
          <td>6PM</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

export default Calendar;
