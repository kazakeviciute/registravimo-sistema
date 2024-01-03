import { useEffect } from "react";
import AttendeeForm from "../components/AttendeeForm";
import { fetchAttendees } from "../api/attendees";
import styles from "./ListPage.module.scss";

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
    <div className={styles.container}>
      <h1>Registravimo Sistema</h1>
      <AttendeeForm handleAddAttendee={handleAddAttendee} />
      <div className={styles.footer}>© 2024</div>
    </div>
  );
};

export default ListPage;