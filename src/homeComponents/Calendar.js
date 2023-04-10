import "./componentStyles/calendar.css";
import CourseFormatter from "../JsModules/CourseFormatter";
import { useEffect } from "react";

/// try putting all of this functionality in a useEffect loop that is dependent of props.currentSchedule

function Calendar(props) {
  // useEffect, fires on props.currentSchedule updates
  useEffect(() => {
    // track cells used on current mount
    let usedCells = [];
    // make sure a schedule is passed
    if (props.currentSchedule) {
      if (props.currentSchedule.courses) {
        // eslint-disable-next-line array-callback-return
        props.currentSchedule.courses.map((course) => {
          // console.log("current course", course.courseName);
          // initialize formatter object
          const courseFormatter = new CourseFormatter(course);

          // format the start time of the course
          var courseStartFormatted = courseFormatter.standardFormat();
          // console.log("formatted start time", courseStartFormatted);
          // format the days
          var formattedMeetDays = courseFormatter.courseDays();
          // console.log("formatted days array", formattedMeetDays);

          // grab the parent element, equivalent ID to formattedStartTime
          var parentElem = document.getElementById(courseStartFormatted);
          // console.log("corresponding table element (parent)", parentElem);

          // grab the children
          var children = parentElem.children;

          // create an element for the course
          var formattedCourseElement = courseFormatter.createCourseElement();

          // for each day
          for (let i = 0; i < formattedMeetDays.length; i++) {
            // find which day needs to be created
            var day = formattedMeetDays[i];

            // find the corresponding element
            var elem = children[day];
            usedCells.push(elem);

            // add the course elment to the table element
            elem.innerHTML = formattedCourseElement.outerHTML;
          }
        });
      }
    }

    // allow for proper updating on schedule edits
    return () => {
      usedCells.forEach((element) => {
        element.innerHTML = "";
      });
    };
  });

  return (
    <div>
      <div className="">
        {props.currentSchedule ? (
          <div className="flexer">
            <h2>{props.currentSchedule.name}</h2>
            <i
              className="fa-solid fa-pencil pencil"
              onClick={props.updateEditor}
            ></i>
          </div>
        ) : (
          <h2>Please select a schedule</h2>
        )}
      </div>
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
    </div>
  );
}

export default Calendar;
