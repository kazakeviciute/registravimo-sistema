import { useEffect, useState } from "react";
import FruitForm from "./FruitForm";

const App = () => {
  const [fruits, setFruits] = useState([]); 
  
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((resp) => resp.json())
      .then((response) => {
      setFruits(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
 
  console.log(fruits); 

  return (
    <div>
      <FruitForm />
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;