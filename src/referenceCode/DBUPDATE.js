import { auth } from "../firebase";
import { database } from "../firebase";
import Schedule from "../JsModules/Schedule";
import Course from "../JsModules/Course";

async function exampleData() {
  // this file shows how to send information to the firebase database.  I will execute it soon and then keep working on the UI.
  // Purpose: Test how to send data to fire base and retreive data from firebase.  The plan is to get all that working and to be able to create the Schedule objects
  // from here on user login and then display the data.
  var course = new Course(
    "Math101",
    "MTH101",
    "01",
    "4.0",
    "M W F",
    "2:00PM",
    "Batelle 101",
    "Dr. Arrey"
  );

  var schedule = new Schedule("Math Department");
  schedule.addCourse(course);

  var scheduleData = schedule.toObject();

  let schedules = [];

  // adding an item to the database
  // database
  //   .collection("schedules")
  //   .add(scheduleData)
  //   .then((docRef) => {
  //     console.log("added a schedule with the ID: ", docRef.id);
  //   })
  //   .catch((error) => {
  //     console.log("Error adding schedule: ", error);
  //   });

  // // retrieving all of the collection
  // await database
  //   .collection("schedules")
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       // print to check doc data with id
  //       // console.log(doc.id, " => ", doc.data);

  //       // grab the schedule data
  //       const scheduleData = doc.data();

  //       // showing the schedule ID
  //       // console.log("The scheduleData", doc.id);

  //       // create new schedule from data
  //       // const schedule = new Schedule(scheduleData.name, scheduleData.courses);
  //       const schedule = new Schedule(scheduleData.name, []);

  //       // check that the object was made
  //       // console.log("making sure the schedule got made", schedule);

  //       // get courses and create them
  //       scheduleData.courses.forEach((courseData) => {
  //         const newCourse = new Course(
  //           courseData.courseName,
  //           courseData.courseCode,
  //           courseData.sectionNumber,
  //           courseData.creditHours,
  //           courseData.meetFrequencies,
  //           courseData.meetTime,
  //           courseData.meetingRoom,
  //           courseData.professor
  //         );
  //         schedule.addCourse(newCourse);
  //         schedules.push(schedule);
  //         // console.log("the created schedule object: ", schedules[0]);
  //       });
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("This error occurred grabbing documents: ", error);
  //   });
}

export default exampleData;

// it is important to note that I can create duplicate courses, so I should be mindful of that.
