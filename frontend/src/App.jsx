import { useEffect, useState } from "react";
//import FruitForm from "./FruitForm";
import AttendeeForm from "./AttendeeForm";
//import { fetchFruits } from "./api/fruits";
import { fetchAttendees } from "./api/attendees";

const App = () => {
  const [fruits, setFruits] = useState([]); 
/*
  useEffect(() => {
    fetchFruits()
      .then((response) => {
      setFruits(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
*/
  useEffect(() => {
    fetchAttendees().then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
/*
  const handleAddFruit = (fruit) => {
    setFruits(prevFruits => [...prevFruits, fruit])
  }
*/
  const handleAddAttendee = (fruit) => {
    setFruits(prevFruits => [...prevFruits, fruit])
  }

  /*
  useEffect(() => {
    fetch("http://localhost:3000/fruits")
      .then((resp) => resp.json())
      .then((response) => {
      setFruits(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
  */

  console.log(fruits); 
 //<FruitForm handleAddFruit={handleAddFruit} />
 //<ul>
 //       {fruits.map((fruit) => (
 //         <li key={fruit.name}>{fruit.name}</li>
 //       ))}
 //     </ul>
  return (
    <div>
      <AttendeeForm handleAddAttendee={handleAddAttendee} />
    </div>
  );
};

export default App;