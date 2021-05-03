import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [snake, setSnake] = useState([
    [0, 0],
    [2, 0],
    [4, 0],
    [6, 0],
    [8, 0]
  ]);

  const [direction, setDirection] = useState("DOWN");

  useEffect(() => {
    let interval = setInterval(() => {
      moveSnake();
    }, 300);

    return () => clearInterval(interval);
  });

  const determineDirection = (e) => {
    if (e.keyCode == 38) {
      setDirection("UP");
    } else if (e.keyCode == 40) {
      setDirection("DOWN");
    } else if (e.keyCode == 37) {
      setDirection("LEFT");
    } else if (e.keyCode == 39) {
      setDirection("RIGHT");
    }
  };

  const moveSnake = () => {
    let newSnake = snake.map((x) => x);
    let head = newSnake[newSnake.length - 1];

    head = [head[0], head[1] + 2];

    newSnake.push(head);
    newSnake.shift();

    setSnake(newSnake);
  };

  return (
    <div className="App">
      <div className="game-area">
        {snake.map((s) => (
          <div
            className="snake-cell"
            style={{ top: `${s[1]}%`, left: `${s[0]}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
