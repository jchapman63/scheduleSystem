function ScheduleList(props) {
  let schedules = props.schedules;

  const scheduleNames = schedules.map((schedule, index) => {
    return <li key={index}>{schedule.name}</li>;
  });

  return (
    <div>
      <ul>{scheduleNames}</ul>
    </div>
  );
}

export default ScheduleList;
