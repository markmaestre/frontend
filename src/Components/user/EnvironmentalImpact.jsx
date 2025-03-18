import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../css/EnvironmentalImpact.css";

const questions = [
    {
      question: "What is the primary cause of global warming?",
      options: ["Deforestation", "Burning fossil fuels", "Overfishing", "Plastic pollution"],
      correctAnswer: "Burning fossil fuels",
    },
    {
      question: "Which gas is the biggest contributor to the greenhouse effect?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Methane"],
      correctAnswer: "Carbon dioxide",
    },
    {
      question: "What is the main cause of deforestation?",
      options: ["Mining", "Agriculture expansion", "Urbanization", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "Which of the following is an effect of air pollution?",
      options: ["Acid rain", "Soil erosion", "Increased biodiversity", "Earthquakes"],
      correctAnswer: "Acid rain",
    },
    {
      question: "What is the main reason for ocean acidification?",
      options: ["Oil spills", "Increase in carbon dioxide", "Deforestation", "Nuclear waste dumping"],
      correctAnswer: "Increase in carbon dioxide",
    },
    {
      question: "Which of the following is a renewable source of energy?",
      options: ["Coal", "Natural gas", "Wind", "Petroleum"],
      correctAnswer: "Wind",
    },
    {
      question: "What is the biggest threat to biodiversity?",
      options: ["Climate change", "Overfishing", "Deforestation", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the primary cause of coral bleaching?",
      options: ["Overfishing", "Oil spills", "Rising ocean temperatures", "Plastic pollution"],
      correctAnswer: "Rising ocean temperatures",
    },
    {
      question: "Which of the following is a major contributor to plastic waste in the ocean?",
      options: ["Fishing nets", "Plastic bottles", "Single-use plastic bags", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "How does deforestation affect the atmosphere?",
      options: [
        "Increases oxygen levels",
        "Reduces carbon dioxide levels",
        "Increases greenhouse gas emissions",
        "Has no effect",
      ],
      correctAnswer: "Increases greenhouse gas emissions",
    },
    {
      question: "Which of the following is a negative effect of industrial pollution?",
      options: ["Cleaner air", "Water contamination", "More green spaces", "Increased biodiversity"],
      correctAnswer: "Water contamination",
    },
    {
      question: "Why are bees important for the environment?",
      options: [
        "They pollinate plants",
        "They produce honey",
        "They control insect populations",
        "They clean the air",
      ],
      correctAnswer: "They pollinate plants",
    },
    {
      question: "Which human activity contributes the most to soil erosion?",
      options: ["Fishing", "Agriculture", "Recycling", "Planting trees"],
      correctAnswer: "Agriculture",
    },
    {
      question: "Which of the following is an effect of rising global temperatures?",
      options: ["Longer winters", "More frequent extreme weather events", "Increased snowfall", "Stable sea levels"],
      correctAnswer: "More frequent extreme weather events",
    },
    {
      question: "What is the biggest environmental concern with plastic waste?",
      options: [
        "It releases toxic fumes",
        "It takes hundreds of years to decompose",
        "It is too expensive to produce",
        "It improves soil fertility",
      ],
      correctAnswer: "It takes hundreds of years to decompose",
    },
    {
      question: "Which of the following is NOT a greenhouse gas?",
      options: ["Methane", "Carbon dioxide", "Oxygen", "Nitrous oxide"],
      correctAnswer: "Oxygen",
    },
    {
      question: "What is the main cause of rising sea levels?",
      options: ["Melting glaciers", "Earthquakes", "Deforestation", "Air pollution"],
      correctAnswer: "Melting glaciers",
    },
    {
      question: "How does excessive use of fertilizers affect the environment?",
      options: [
        "Improves air quality",
        "Causes water pollution and dead zones",
        "Reduces soil erosion",
        "Has no impact on nature",
      ],
      correctAnswer: "Causes water pollution and dead zones",
    },
    {
      question: "Which of the following actions can help reduce environmental impact?",
      options: [
        "Using reusable bags",
        "Driving more often",
        "Throwing plastic into the ocean",
        "Burning trash",
      ],
      correctAnswer: "Using reusable bags",
    },
    {
      question: "What is the best way to conserve water at home?",
      options: [
        "Leave the tap running while brushing",
        "Take shorter showers",
        "Wash clothes every day",
        "Water plants excessively",
      ],
      correctAnswer: "Take shorter showers",
    },
  ];
  
const COLORS = ["#28a745", "#dc3545"]; // Green for correct, Red for incorrect

const EnvironmentalImpactQuiz = () => {
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

  // Initialize text-to-speech
  useEffect(() => {
    // Speech synthesis setup
    if (!showResult && !isMuted) {
      speakCurrentQuestion();
    }
    
    return () => {
      // Clean up speech when component unmounts
      if (currentUtterance.current) {
        speechSynthesis.cancel();
      }
    };
  }, [currentQuestionIndex, showResult, isMuted]);

  // Timer
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

  const replayQuestion = () => {
    if (currentUtterance.current) {
      speechSynthesis.cancel();
    }
    speakCurrentQuestion();
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
        <h2 className="quiz-title">🌲 Environmental Impact Quiz</h2>
        
        {/* Audio controls */}
        <div className="audio-controls">
          <button onClick={toggleMute} className="audio-button">
            {isMuted ? "🔇 Unmute" : "🔊 Mute"}
          </button>
          {!showResult && !isMuted && (
            <button onClick={replayQuestion} className="audio-button" disabled={isSpeaking}>
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
          <button onClick={() => navigate("/RecyclingQuiz")} className="next-game-btn">🎮 Next Game</button>
        </div>
      )}
    </div>
  );
};

export default EnvironmentalImpactQuiz;