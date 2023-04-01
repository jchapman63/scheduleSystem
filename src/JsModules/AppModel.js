// This file will contain two functions getSchedule and setSchedule
// I will update Schedule to contain an ID.
// Maybe I should just make a full app model here, it will be able to query into the database with getSchedule, createSchedule, and setSchedule methods
// Okay so they have an ID, but I only can access the ID from the querySnapShot in _generateSchedules, so I could just add their ID to the class.
import Course from "./Course";
import Schedule from "./Schedule";
import { database } from "../firebase";

// NOTE: All methods must follow arrow syntax to bind this.  This is determined at run time when handling events.
// The manager of the Database and The UI
class AppModel {
  constructor() {
    this.schedules = [];
    this._generateSchedules();
  }

  // helper function for instantiating the AppModel
  async _generateSchedules() {
    // retrieving all of the collection
    await database
      .collection("schedules")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // print to check doc data with id
          // console.log(doc.id, " => ", doc.data);

          // grab the schedule data
          const scheduleData = doc.data();

          // checking courses exist
          // console.log("The scheduleData", doc.data());

          // create new schedule from data
          // const schedule = new Schedule(scheduleData.name, scheduleData.courses);
          const schedule = new Schedule(scheduleData.name, []);
          console.log(scheduleData.courses);
          schedule.createID(doc.id);
          // check that the object was made
          // console.log("making sure the schedule got made", schedule);

          // get courses and create them
          scheduleData.courses.forEach((courseData) => {
            const newCourse = new Course(
              courseData.courseName,
              courseData.courseCode,
              courseData.sectionNumber,
              courseData.creditHours,
              courseData.meetFrequencies,
              courseData.meetTime,
              courseData.meetRoom,
              courseData.professor
            );

            // add each course to the schedule
            schedule.addCourse(newCourse);
          });
          // add schedule to the AppModel
          this.schedules.push(schedule);
        });
      })
      .catch((error) => {
        console.log("This error occurred grabbing documents: ", error);
      });
  }

  // return a schedule from the list by querying for its ID
  getScheduleById = (id) => {
    for (var i = 0; i < this.schedules.length; i++) {
      var schedule = this.schedules[i];
      if (schedule.id === id) {
        return schedule;
      }
    }
  };

  // query with id, replace with new schedule, if successful, update in AppModel
  updateSchedule = (id, schedule) => {
    console.log(schedule.toObject());
    console.log(id);
    const scheduleRef = database.collection("schedules").doc(id);

    scheduleRef
      .set(schedule.toObject())
      .then(() => {
        console.log("successfully updated schedule");

        // update AppModel
        for (var i = 0; i < this.schedules.length; i++) {
          var fromList = this.schedules[i];
          if (fromList.id === schedule.id) {
            this.schedules[i] = schedule;
          }
        }
      })
      .catch((error) => {
        console.error("Error replacing schedule in Firestore: ", error);
      });
  };

  // add a schedule to the database, and to this instance if successful.
  addSchedule = (schedule) => {
    var scheduleData = schedule.toObject();

    // check if schedule exists already locally since the local array has the whole DB
    let doesExist = false;
    for (var i = 0; i < this.schedules.length; i++) {
      if (this.schedules[i].name === schedule.name) {
        doesExist = true;
        break;
      }
    }

    if (doesExist === true) {
      console.log("A schedule with that name already exists");
    } else {
      database
        .collection("schedules")
        .add(scheduleData)
        .then((docRef) => {
          console.log("added a schedule with the ID: ", docRef.id);
          // add the DB id to the schedule
          schedule.createID(docRef.id);

          // add to AppModel
          this.schedules.push(schedule);
        })
        .catch((error) => {
          console.log("Error adding schedule: ", error);
        });
    }
  };

  // remove from database, if successful, remove from AppModel.
  removeSchedule = (id) => {
    // still need to code
    database
      .collection("schdules")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Schedule deleted successfully!");
      })
      .catch((error) => {
        console.log("Error deleting schedule: ", error);
      });
  };

  // for testing purposes
  logScheduleData = () => {
    for (var i = 0; i < this.schedules.length; i++) {
      const schedule = this.schedules[i];
      console.log("current schedule: ", schedule.name);
      console.log("its courses: ", schedule.courses);
    }
  };
}

export default AppModel;
