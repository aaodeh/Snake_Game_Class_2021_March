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

  const randomFood = () => {
    return [25, 25];
  };

  const [direction, setDirection] = useState("DOWN");

  const [food, setFood] = useState(randomFood());

  useEffect(() => {
    let interval = setInterval(() => {
      moveSnake();
      document.onkeydown = determineDirection;
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

    if (direction == "UP") {
      head = [head[0], head[1] - 2];
    } else if (direction == "DOWN") {
      head = [head[0], head[1] + 2];
    } else if (direction == "LEFT") {
      head = [head[0] - 2, head[1]];
    } else if (direction == "RIGHT") {
      head = [head[0] + 2, head[1]];
    }

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
      <h2>Snake Size: {snake.length}</h2>
    </div>
  );
}
