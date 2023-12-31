import { useEffect, useState } from "react";
import FruitForm from "./FruitForm";
import { fetchFruits } from "./api/fruits";

const App = () => {
  const [fruits, setFruits] = useState([]); 

  useEffect(() => {
    fetchFruits()
      .then((response) => {
      setFruits(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleAddFruit = (fruit) => {
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

  return (
    <div>
      <FruitForm handleAddFruit={handleAddFruit} />
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.name}>{fruit.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;