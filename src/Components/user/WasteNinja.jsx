import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/styles1.css";

const wasteItems = [
  { id: 1, name: "Battery", img: "/assets/battery.png", type: "hazardous" },
  { id: 2, name: "Plastic Bottle", img: "/assets/plastic-bottle.png", type: "nonhazardous" },
  { id: 3, name: "Broken Glass", img: "/assets/broken-glass.png", type: "hazardous" },
  { id: 4, name: "Paper", img: "/assets/paper.png", type: "nonhazardous" }
];

const WasteNinja = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [fallingItems, setFallingItems] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();
  const gameInterval = useRef(null);
  const fallInterval = useRef(null);

  // Play audio function
  const playSound = (filePath) => {
    const sound = new Audio(filePath);
    sound.play().catch((error) => console.error("Audio Playback Error:", error));
  };

  // Start game loop
  useEffect(() => {
    if (!gameOver) {
      spawnNewItem();
      gameInterval.current = setInterval(spawnNewItem, 2000);
      fallInterval.current = setInterval(updateFallingItems, 500);
    }

    return () => {
      clearInterval(gameInterval.current);
      clearInterval(fallInterval.current);
    };
  }, [gameOver]);

  // Spawn a new waste item at a random position
  const spawnNewItem = () => {
    if (lives > 0) {
      const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)];
      const randomX = Math.random() * 80 + 10; // Random X position
      setFallingItems((prev) => [
        ...prev,
        { ...randomItem, id: Date.now(), x: randomX, y: 0 }
      ]);
    }
  };

  // Update falling items position
  const updateFallingItems = () => {
    setFallingItems((prev) => {
      return prev
        .map((item) => ({ ...item, y: item.y + 5 }))
        .filter((item) => {
          if (item.y >= 100) {
            if (item.type === "hazardous") {
              setLives((prevLives) => {
                if (prevLives - 1 <= 0) {
                  endGame();
                }
                return prevLives - 1;
              });
              playSound("/assets/incorrect.mp3");
            }
            return false; // Remove fallen item
          }
          return true;
        });
    });
  };

  // Handle slicing an item
  const handleSlice = (id, type) => {
    setFallingItems((prev) => prev.filter((item) => item.id !== id));

    if (type === "hazardous") {
      setScore((prev) => prev + 1);
      playSound("/assets/correct.mp3");
    } else {
      setLives((prev) => {
        if (prev - 1 <= 0) {
          endGame();
        }
        return prev - 1;
      });
      playSound("/assets/incorrect.mp3");
    }
  };

  // End game
  const endGame = () => {
    clearInterval(gameInterval.current);
    clearInterval(fallInterval.current);
    setGameOver(true);
  };

  return (
    <div className="waste-ninja-container">
         {/* Background animation */}
      <div className="background">
        {[...Array(20)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
      <h2>Waste Ninja</h2>
      <p>Slice hazardous waste! Let non-hazardous fall.</p>
      <p className="score">Score: {score} | Lives: {lives}</p>

      {!gameOver ? (
        <div className="game-area">
          {fallingItems.map((item) => (
            <div
              key={item.id}
              className="falling-item"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => handleSlice(item.id, item.type)}
            >
              <img src={item.img} alt={item.name} />
            </div>
          ))}
        </div>
      ) : (
        <div className="game-over-container">
          <p className="game-over">Game Over! Final Score: {score}</p>
          <button onClick={() => window.location.reload()}>🔄 Restart</button>
          <button onClick={() => navigate("/UserDashboard")}>🔙 Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default WasteNinja;
