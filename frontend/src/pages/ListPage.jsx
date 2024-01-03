import { useEffect } from "react";
import AttendeeForm from "./AttendeeForm";
import { fetchAttendees } from "../api/attendees";

const ListPage = () => {
  useEffect(() => {
    fetchAttendees().then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleAddAttendee = (attendee) => {
   // setFruits(prevFruits => [...prevFruits, fruit])
  }

  return (
    <div>
      <AttendeeForm handleAddAttendee={handleAddAttendee} />
    </div>
  );
};

export default ListPage;