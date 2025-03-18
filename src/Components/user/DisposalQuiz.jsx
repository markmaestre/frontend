import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../css/styles1.css";

const questions = [
  {
    question: "What is the best way to dispose of electronic waste?",
    options: ["Burn it", "Throw it in the trash", "Take it to an e-waste recycling center", "Bury it underground"],
    correctAnswer: "Take it to an e-waste recycling center",
  },
  {
    question: "Which waste disposal method is most harmful to the environment?",
    options: ["Recycling", "Composting", "Incineration", "Landfilling"],
    correctAnswer: "Landfilling",
  },
  {
    question: "What type of waste can be composted?",
    options: ["Plastic waste", "Organic waste", "Glass waste", "E-waste"],
    correctAnswer: "Organic waste",
  },
  {
    question: "Which bin should glass bottles be placed in for proper disposal?",
    options: ["General waste bin", "Recycling bin", "Compost bin", "Hazardous waste bin"],
    correctAnswer: "Recycling bin",
  },
  {
    question: "Why should hazardous waste be disposed of carefully?",
    options: [
      "It takes up too much space in landfills",
      "It can release toxic chemicals into the environment",
      "It is expensive to transport",
      "It can be recycled easily",
    ],
    correctAnswer: "It can release toxic chemicals into the environment",
  },
  {
    question: "Which of the following waste materials takes the longest to decompose?",
    options: ["Banana peel", "Plastic bottle", "Paper", "Cotton cloth"],
    correctAnswer: "Plastic bottle",
  },
  {
    question: "What is the main benefit of recycling?",
    options: [
      "Increases landfill waste",
      "Saves natural resources",
      "Consumes more energy",
      "Creates more waste",
    ],
    correctAnswer: "Saves natural resources",
  },
  {
    question: "Which gas is commonly produced by decomposing waste in landfills?",
    options: ["Oxygen", "Methane", "Carbon monoxide", "Nitrogen"],
    correctAnswer: "Methane",
  },
  {
    question: "What is the primary cause of ocean pollution?",
    options: ["Metal waste", "Plastic waste", "Glass waste", "Food waste"],
    correctAnswer: "Plastic waste",
  },
  {
    question: "Which of these waste materials is biodegradable?",
    options: ["Glass", "Styrofoam", "Banana peel", "Plastic bag"],
    correctAnswer: "Banana peel",
  },
  {
    question: "Why is it important to separate recyclables from regular trash?",
    options: [
      "It makes trash collection faster",
      "It helps keep landfills empty",
      "It allows materials to be reused and reduces waste",
      "It makes waste smell better",
    ],
    correctAnswer: "It allows materials to be reused and reduces waste",
  },
  {
    question: "Which of the following is an example of hazardous waste?",
    options: ["Plastic bottles", "Used batteries", "Banana peels", "Cardboard"],
    correctAnswer: "Used batteries",
  },
  {
    question: "How can individuals help reduce waste?",
    options: [
      "Use single-use plastics",
      "Throw away all leftovers",
      "Practice the 3Rs: Reduce, Reuse, Recycle",
      "Dispose of all waste in the same bin",
    ],
    correctAnswer: "Practice the 3Rs: Reduce, Reuse, Recycle",
  },
  {
    question: "What should be done with expired or unused medicines?",
    options: [
      "Flush them down the toilet",
      "Throw them in the trash",
      "Take them to a pharmacy disposal program",
      "Mix them with food waste",
    ],
    correctAnswer: "Take them to a pharmacy disposal program",
  },
  {
    question: "Which of the following materials is NOT recyclable?",
    options: ["Newspaper", "Glass bottle", "Plastic bag", "Styrofoam"],
    correctAnswer: "Styrofoam",
  },
  {
    question: "What happens when non-recyclable materials are mixed with recyclables?",
    options: [
      "It makes recycling easier",
      "It improves the recycling process",
      "It contaminates recyclables and reduces efficiency",
      "It lowers the cost of recycling",
    ],
    correctAnswer: "It contaminates recyclables and reduces efficiency",
  },
  {
    question: "Which of the following is the best way to dispose of food waste?",
    options: ["Landfilling", "Incineration", "Recycling", "Composting"],
    correctAnswer: "Composting",
  },
  {
    question: "Which of the following is the biggest challenge in global recycling efforts?",
    options: [
      "Not enough recyclable materials",
      "Contamination of recyclables",
      "Too many recycling centers",
      "Overuse of biodegradable products",
    ],
    correctAnswer: "Contamination of recyclables",
  },
  {
    question: "How long does it take for a glass bottle to decompose?",
    options: ["1 year", "10 years", "100 years", "1 million years"],
    correctAnswer: "1 million years",
  },
  {
    question: "What is the best way to dispose of used cooking oil?",
    options: ["Pour it down the sink", "Throw it in the trash", "Recycle it into biofuel", "Mix it with water"],
    correctAnswer: "Recycle it into biofuel",
  },
];

const COLORS = ["#28a745", "#dc3545"]; // Green for correct, Red for incorrect

const WasteDisposalQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();
  const speechSynthesis = window.speechSynthesis;
  const currentUtterance = useRef(null);

  // Initialize text-to-speech when question changes
  useEffect(() => {
    if (!showResult && !isMuted) {
      speakCurrentQuestion();
    }
    
    return () => {
      // Clean up speech when component unmounts or question changes
      if (currentUtterance.current) {
        speechSynthesis.cancel();
      }
    };
  }, [currentQuestionIndex, showResult, isMuted]);

  // Timer for quiz
  useEffect(() => {
    let timer;
    if (!showResult) {
      timer = setInterval(() => {
        setTimeTaken((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [showResult]);

  // Function to speak the current question
  const speakCurrentQuestion = () => {
    if (isMuted) return;
    
    setIsSpeaking(true);
    if (currentUtterance.current) {
      speechSynthesis.cancel();
    }

    // Create utterance for the question
    const currentQuestion = questions[currentQuestionIndex];
    const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
    utterance.rate = 1;
    utterance.pitch = 1;
    
    // When question finishes, speak options
    utterance.onend = () => {
      speakOptions(currentQuestion.options);
    };
    
    currentUtterance.current = utterance;
    speechSynthesis.speak(utterance);
  };

  // Function to speak the options
  const speakOptions = (options) => {
    if (isMuted) return;
    
    // Speak each option with a brief pause between
    let optionText = "Options: ";
    options.forEach((option, index) => {
      optionText += `Option ${index + 1}: ${option}. `;
    });
    
    const utterance = new SpeechSynthesisUtterance(optionText);
    utterance.rate = 1;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    currentUtterance.current = utterance;
    speechSynthesis.speak(utterance);
  };

  // Function to speak feedback
  const speakFeedback = (feedbackText) => {
    if (isMuted) return;
    
    if (currentUtterance.current) {
      speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(feedbackText);
    utterance.rate = 1;
    utterance.pitch = 1;
    
    currentUtterance.current = utterance;
    speechSynthesis.speak(utterance);
  };

  // Toggle mute/unmute function
  const toggleMute = () => {
    if (!isMuted) {
      // Muting
      if (currentUtterance.current) {
        speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    } else {
      // Unmuting - speak current question if not on results page
      if (!showResult) {
        speakCurrentQuestion();
      }
    }
    setIsMuted(!isMuted);
  };

  // Replay current question and options
  const replayQuestion = () => {
    if (currentUtterance.current) {
      speechSynthesis.cancel();
    }
    speakCurrentQuestion();
  };

  const handleAnswerClick = (selectedAnswer) => {
    if (isAnswered) return;
    setIsAnswered(true);
    
    // Stop current speaking
    if (currentUtterance.current) {
      speechSynthesis.cancel();
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Create Audio objects using public paths
    const correctSound = new Audio("/assets/correct.mp3");
    const incorrectSound = new Audio("/assets/incorrect.mp3");

    let feedbackText = "";
    
    if (isCorrect) {
      setScore(score + 1);
      feedbackText = "Correct!";
      setFeedback("✅ Correct!");
      setAnswerState("correct");
      correctSound.play(); // Play correct sound
    } else {
      feedbackText = `Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`;
      setFeedback(`❌ Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`);
      setAnswerState("incorrect");
      incorrectSound.play(); // Play incorrect sound
    }
    
    speakFeedback(feedbackText);
    
    setUserAnswers([...userAnswers, { ...currentQuestion, selectedAnswer, isCorrect }]);
    
    setTimeout(() => {
      setFeedback("");
      setAnswerState("");
      setIsAnswered(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
        if (!isMuted) {
          const finalScore = score + (isCorrect ? 1 : 0);
          const totalQuestions = questions.length;
          const finalScoreText = `Quiz completed! Your score is ${finalScore} out of ${totalQuestions}.`;
          speakFeedback(finalScoreText);
        }
      }
    }, 2000);
  };

  const retryQuiz = () => {
    // Stop any ongoing speech
    if (currentUtterance.current) {
      speechSynthesis.cancel();
    }
    
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback("");
    setShowResult(false);
    setAnswerState("");
    setUserAnswers([]);
    setIsAnswered(false);
    setTimeTaken(0);
    
    // Start speaking first question after a short delay
    setTimeout(() => {
      if (!isMuted) {
        speakCurrentQuestion();
      }
    }, 500);
  };

  const chartData = [
    { name: "Correct", value: score },
    { name: "Incorrect", value: questions.length - score },
  ];

  return (
    <div className="fade-in">
      <div className="quiz-container">
        <div className="background">
          {[...Array(20)].map((_, i) => (
            <span key={i}></span>
          ))}
        </div>
        <h2 className="quiz-title">🗑️ Waste Disposal Quiz</h2>
        
        {/* Audio controls */}
        <div className="audio-controls">
          <button onClick={toggleMute} className="audio-button">
            {isMuted ? "🔇 Unmute" : "🔊 Mute"}
          </button>
          {!showResult && !isMuted && (
            <button 
              onClick={replayQuestion} 
              className="audio-button" 
              disabled={isSpeaking}
            >
              {isSpeaking ? "🔊 Speaking..." : "🔄 Replay Question"}
            </button>
          )}
        </div>
        
        <p className="question-counter">
          Question {currentQuestionIndex + 1} out of {questions.length}
        </p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
        {!showResult && (
          <div className={`quiz-question ${answerState}`}>
            <p>{questions[currentQuestionIndex].question}</p>
            <div className="quiz-options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswerClick(option)} 
                  className={`quiz-option ${isAnswered ? "fade-out" : ""}`}
                  disabled={isAnswered} 
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="feedback fade-in">{feedback}</p>
          </div>
        )}
      </div>
      {showResult && (
        <div className="results-wrapper">
          <div className="chart-container">
            <h3>📊 Quiz Accuracy</h3>
            <PieChart width={300} height={300}>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={90} fill="#8884d8" dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <p><strong>Score:</strong> {score} / {questions.length}</p>
            <p><strong>⏳ Time Taken:</strong> {Math.floor(timeTaken / 60)} min {timeTaken % 60} sec</p>
          </div>
          <div className="answers-summary">
            <h3>📋 Answers Review</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {userAnswers.map((answer, index) => (
                  <tr key={index} className={answer.isCorrect ? "correct-row" : "incorrect-row"}>
                    <td>{index + 1}</td>
                    <td>{answer.question}</td>
                    <td>{answer.selectedAnswer}</td>
                    <td>{answer.correctAnswer}</td>
                    <td>{answer.isCorrect ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showResult && (
        <div className="buttons-container">
          <button onClick={() => navigate("/Game")} className="dashboard-btn">🔙 Back to Dashboard</button>
          <button onClick={retryQuiz} className="retry-btn">🔄 Retry Quiz</button>
          <button onClick={() => navigate("/EnvironmentalImpact")} className="next-game-btn">🎮 Next Game</button>
        </div>
      )}
    </div>
  );
};

export default WasteDisposalQuiz;