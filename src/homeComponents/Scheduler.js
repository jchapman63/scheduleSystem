import exampleData from "../referenceCode/DBUPDATE";

function Scheduler() {
  return (
    <div className="scheduler">
      <table>
        <thead>
          <tr>
            <th>times</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thurday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>6AM</td>
          </tr>
          <tr>
            <td>7AM</td>
          </tr>
          <tr>
            <td>8AM</td>
          </tr>
          <tr>
            <td>9AM</td>
          </tr>
          <tr>
            <td>10AM</td>
          </tr>
          <tr>
            <td>11AM</td>
          </tr>
          <tr>
            <td>12PM</td>
          </tr>
          <tr>
            <td>1PM</td>
          </tr>
          <tr>
            <td>2PM</td>
          </tr>
          <tr>
            <td>3PM</td>
          </tr>
          <tr>
            <td>4PM</td>
          </tr>
          <tr>
            <td>5PM</td>
          </tr>
          <tr>
            <td>6PM</td>
          </tr>
        </tbody>
      </table>
      <button onClick={exampleData}>generate data</button>
    </div>
  );
}

export default Scheduler;
