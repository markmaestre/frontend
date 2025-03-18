import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/styles1.css";

const wasteItems = [
  { id: 1, name: "Battery", img: "/assets/battery.png", type: "hazardous" },
  { id: 2, name: "Plastic Bottle", img: "/assets/plastic-bottle.png", type: "nonhazardous" },
  { id: 3, name: "Broken Glass", img: "/assets/broken-glass.png", type: "hazardous" },
  { id: 4, name: "Paper", img: "/assets/paper.png", type: "nonhazardous" }
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const WasteSorting = () => {
  const [score, setScore] = useState(0);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackClass, setFeedbackClass] = useState(""); // New state for animation class
  const navigate = useNavigate();

  useEffect(() => {
    setShuffledItems(shuffleArray([...wasteItems]));
  }, []);

  const handleDrop = (event, binType) => {
    event.preventDefault();
    const itemType = shuffledItems[currentItemIndex]?.type;

    if (itemType === binType) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
      setFeedbackClass("correct-answer");
      setTimeout(() => {
        setFeedback("");
        setFeedbackClass("");
        if (currentItemIndex < shuffledItems.length - 1) {
          setCurrentItemIndex(currentItemIndex + 1);
        } else {
          setFeedback(`🎉 Game Over! Final Score: ${score + 1}`);
        }
      }, 1000);
    } else {
      setFeedback(`❌ Incorrect! Place it in the ${itemType === "hazardous" ? "Hazardous" : "Non-Hazardous"} bin.`);
      setFeedbackClass("incorrect-answer");
    }
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("wasteType", shuffledItems[currentItemIndex]?.type);
  };

  return (
    <div className="waste-sorting-container">
         {/* Background Animation */}
         <div className="background">
        {[...Array(20)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
      <h2>Waste Sorting Game</h2>
      <p>Drag the item to the correct waste bin!</p>

      <div className="waste-items">
        {shuffledItems.length > 0 && currentItemIndex < shuffledItems.length && (
          <img
            key={shuffledItems[currentItemIndex].id}
            src={shuffledItems[currentItemIndex].img}
            alt={shuffledItems[currentItemIndex].name}
            draggable
            onDragStart={handleDragStart}
            className={`waste-item ${feedbackClass}`}
          />
        )}
      </div>

      <div className="waste-bins">
        <div
          className="waste-bin hazardous"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, "hazardous")}
        >
          <img src="/assets/hazardous-bin.png" alt="Hazardous Bin" />
          <p>Hazardous Waste</p>
        </div>
        
        <div
          className="waste-bin nonhazardous"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, "nonhazardous")}
        >
          <img src="/assets/nonhazardous-bin.png" alt="Non-Hazardous Bin" />
          <p>Non-Hazardous Waste</p>
        </div>
      </div>

      <p className={`feedback ${feedbackClass}`}>{feedback}</p>
      <p className="score">Score: {score}</p>
      <div className="button-container">
        <button onClick={() => navigate("/UserDashboard")} className="dashboard-btn">
          🔙 Back to Dashboard
        </button>
        <button onClick={() => navigate("/waste-quiz")} className="next-game-btn">
          🎮 Next Game
        </button>
      </div>
    </div>
  );
};

export default WasteSorting;
