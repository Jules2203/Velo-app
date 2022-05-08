import './Counter.css';
import { useState } from 'react';

function Counter(props) {
  // Je kan zo veel states aanmaken als je wil
  const [count, setCount] = useState(0);

  /*
  // Misschien vreemde schrijfwijze met die []? Dit heet 'destructuring', useState returned een array.
  // Wat we hierboven schrijven is hetzelfde als dit, maar dan korter:
  const countState = useState(0); // Returns an array
  const count = countState[0]; // First item in a array
  const setCount = countState[1]; // Second item in a array
  */


  return (
    <div className="Counter">
      {count}
      <button onClick={() => {setCount(count - 1)}}>-</button>
      <button onClick={() => {setCount(count + 1)}}>+</button>
    </div>
  );
}

export default Counter;
