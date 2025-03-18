import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/styles1.css";

const questions = [
    {
      question: "Which type of waste contains harmful chemicals that can contaminate soil and water?",
      options: ["Organic Waste", "Hazardous Waste", "Recyclable Waste", "E-Waste"],
      correctAnswer: "Hazardous Waste",
    },
    {
      question: "What is the most environmentally friendly way to dispose of electronic waste (E-Waste)?",
      options: ["Burn it in a landfill", "Throw it in a recycling bin", "Take it to an e-waste recycling center", "Bury it underground"],
      correctAnswer: "Take it to an e-waste recycling center",
    },
    {
      question: "Why should you never throw batteries in a regular trash bin?",
      options: [
        "They can cause explosions",
        "They release toxic chemicals into the environment",
        "They are too small to be disposed of",
        "They dissolve in water",
      ],
      correctAnswer: "They release toxic chemicals into the environment",
    },
    {
      question: "Which type of waste takes the **longest** to decompose?",
      options: ["Glass bottle", "Banana peel", "Plastic bag", "Paper"],
      correctAnswer: "Glass bottle",
    },
    {
      question: "Which material **cannot** be recycled?",
      options: ["Glass", "Aluminum foil", "Plastic bags", "Styrofoam"],
      correctAnswer: "Styrofoam",
    },
    {
      question: "Which gas is released when organic waste decomposes in a landfill?",
      options: ["Oxygen", "Methane", "Carbon Dioxide", "Nitrogen"],
      correctAnswer: "Methane",
    },
    {
      question: "What is the primary reason plastic waste is harmful to marine life?",
      options: [
        "It dissolves in water and poisons fish",
        "Marine animals mistake it for food and ingest it",
        "It makes the ocean look dirty",
        "It attracts more predators to the ocean",
      ],
      correctAnswer: "Marine animals mistake it for food and ingest it",
    },
    {
      question: "Which of the following waste management methods is the **least** environmentally friendly?",
      options: ["Recycling", "Composting", "Incineration", "Landfilling"],
      correctAnswer: "Landfilling",
    },
    {
      question: "What is the **best** way to dispose of used cooking oil?",
      options: [
        "Pour it down the sink",
        "Throw it in the trash",
        "Recycle it or take it to a proper disposal facility",
        "Flush it down the toilet",
      ],
      correctAnswer: "Recycle it or take it to a proper disposal facility",
    },
    {
      question: "Which of the following is an **example of biodegradable waste**?",
      options: ["Aluminum can", "Plastic straw", "Banana peel", "Glass jar"],
      correctAnswer: "Banana peel",
    },
    {
      question: "What happens when plastic waste is burned?",
      options: [
        "It turns into biodegradable material",
        "It releases toxic gases like dioxins and furans",
        "It disappears without any pollution",
        "It helps fertilize the soil",
      ],
      correctAnswer: "It releases toxic gases like dioxins and furans",
    },
    {
      question: "How long does it take for a **plastic bottle** to decompose in the environment?",
      options: ["1 year", "50 years", "100 years", "450 years"],
      correctAnswer: "450 years",
    },
    {
      question: "Which waste disposal method **prevents the release of methane gas** into the atmosphere?",
      options: ["Composting", "Landfilling", "Burning waste", "Dumping in rivers"],
      correctAnswer: "Composting",
    },
    {
      question: "What does the **three arrows recycling symbol** (♻️) represent?",
      options: ["Reduce, Reuse, Recycle", "Renew, Rebuild, Reuse", "Recover, Recycle, Reduce", "Recycle, Reclaim, Refurbish"],
      correctAnswer: "Reduce, Reuse, Recycle",
    }
  ];
  
const WasteQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [answerState, setAnswerState] = useState(""); // 'correct' or 'incorrect'
  const navigate = useNavigate();

  const playSound = (filePath) => {
    const sound = new Audio(filePath);
    sound.play().catch((error) => console.error("Audio Playback Error:", error));
  };

  const handleAnswerClick = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
      setAnswerState("correct"); // Apply bounce animation
      playSound("/assets/correct.mp3");
    } else {
      setFeedback(`❌ Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`);
      setAnswerState("incorrect"); // Apply shake animation
      playSound("/assets/incorrect.mp3");
    }

    setTimeout(() => {
      setFeedback("");
      setAnswerState(""); // Reset animation

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  return (
    <div className="quiz-container">
      {/* Background Animation */}
      <div className="background">
        {[...Array(20)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <h2>Advanced Waste Management Quiz</h2>

      {showResult ? (
        <div className="result fade-in">
          <h3>🎉 Quiz Completed!</h3>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={() => navigate("/UserDashboard")} className="dashboard-btn">🔙 Back to Dashboard</button>
          <button onClick={() => { setCurrentQuestionIndex(0); setScore(0); setShowResult(false); }} className="play-again-btn">🔄 Play Again</button>
        </div>
      ) : (
        <div className={`quiz-question ${answerState}`}>
          <p>{questions[currentQuestionIndex].question}</p>
          <div className="quiz-options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)} className="quiz-option">
                {option}
              </button>
            ))}
          </div>
          <p className="feedback fade-in">{feedback}</p>
          <button onClick={() => navigate("/UserDashboard")} className="dashboard-btn">🔙 Back to Dashboard</button>
          <button onClick={() => navigate("/waste-ninja")} className="next-game-btn">🎮 Next Game</button>
        </div>
      )}
    </div>
  );
};

export default WasteQuiz;
