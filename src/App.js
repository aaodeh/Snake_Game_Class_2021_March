import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [direction, setDirection] = useState("DOWN");
  const [speed, setSpeed] = useState(300);
  const [snake, setSnake] = useState([
    [0, 0],
    [2, 0],
    [4, 0],
    [6, 0],
    [8, 0]
  ]);

  const randomFood = () => {
    let locaton = [
      Math.floor(Math.random() * 49) * 2,
      Math.floor(Math.random() * 49) * 2
    ];

    return locaton;
  };

  const [food, setFood] = useState(randomFood());

  useEffect(() => {
    let interval = setInterval(() => {
      moveSnake();
      document.onkeydown = determineDirection;
    }, speed);

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

    if (head[0] === food[0] && head[1] === food[1]) {
      newSnake.push([]);

      setFood(randomFood());

      setSpeed((prev) => (prev > 10 ? prev - 10 : 10));
    }

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

        <div
          className="food-cell"
          style={{ top: `${food[1]}%`, left: `${food[0]}%` }}
        ></div>
      </div>
      <h2>Snake Size: {snake.length}</h2>
      <h2>Snake Speed: {(300 - speed) / 10 + 1}</h2>
    </div>
  );
}
