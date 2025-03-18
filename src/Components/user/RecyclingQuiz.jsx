import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../css/RecyclingQuiz.css";

// English questions
const englishQuestions = [
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
    options: ["They can cause explosions", "They release toxic chemicals into the environment", "They are too small to be disposed of", "They dissolve in water"],
    correctAnswer: "They release toxic chemicals into the environment",
  },
  {
    question: "Which of the following materials is NOT recyclable?",
    options: ["Glass", "Plastic", "Styrofoam", "Paper"],
    correctAnswer: "Styrofoam",
  },
  {
    question: "What does the three-arrow recycling symbol represent?",
    options: ["Reduce, Reuse, Recycle", "Recycle, Recreate, Reuse", "Reuse, Recycle, Reduce", "Reduce, Recycle, Restore"],
    correctAnswer: "Reduce, Reuse, Recycle",
  },
  {
    question: "Which bin should aluminum cans be placed in for proper recycling?",
    options: ["Compost bin", "General waste bin", "Recycling bin", "Hazardous waste bin"],
    correctAnswer: "Recycling bin",
  },
  {
    question: "What type of waste can be turned into compost?",
    options: ["Glass and metal", "Plastic and rubber", "Organic waste", "Electronic waste"],
    correctAnswer: "Organic waste",
  },
  {
    question: "Which of these is a benefit of recycling?",
    options: ["Increases landfill waste", "Saves natural resources", "Consumes more energy", "Pollutes the environment"],
    correctAnswer: "Saves natural resources",
  },
  {
    question: "What should you do before recycling a plastic bottle?",
    options: ["Crush it and throw it away", "Rinse it and remove the cap", "Burn it", "Bury it in the ground"],
    correctAnswer: "Rinse it and remove the cap",
  },
  {
    question: "Which of the following items can be recycled into new paper products?",
    options: ["Glass bottles", "Old newspapers", "Plastic bags", "Aluminum cans"],
    correctAnswer: "Old newspapers",
  },
  {
    question: "Which recycling process involves breaking down materials into their raw form before remanufacturing?",
    options: ["Downcycling", "Mechanical recycling", "Chemical recycling", "Upcycling"],
    correctAnswer: "Chemical recycling",
  },
  {
    question: "Which gas is commonly produced by decomposing waste in landfills?",
    options: ["Carbon dioxide", "Oxygen", "Methane", "Nitrogen"],
    correctAnswer: "Methane",
  },
  {
    question: "What is the primary environmental issue caused by improper disposal of plastic waste?",
    options: ["Air pollution", "Deforestation", "Soil erosion", "Microplastic contamination"],
    correctAnswer: "Microplastic contamination",
  },
  {
    question: "Which type of plastic is most difficult to recycle?",
    options: ["PET (Polyethylene Terephthalate)", "HDPE (High-Density Polyethylene)", "PVC (Polyvinyl Chloride)", "PP (Polypropylene)"],
    correctAnswer: "PVC (Polyvinyl Chloride)",
  },
  {
    question: "Which method is the most sustainable for handling food waste?",
    options: ["Incineration", "Landfilling", "Composting", "Dumping in water bodies"],
    correctAnswer: "Composting",
  },
  {
    question: "Which of the following factors most affects the recyclability of plastic materials?",
    options: ["Shape", "Size", "Color", "Chemical composition"],
    correctAnswer: "Chemical composition",
  },
  {
    question: "What happens when non-recyclable materials are mixed with recyclables?",
    options: ["It improves the recycling process", "It slows down the process and increases costs", "It has no impact", "It makes recycling more profitable"],
    correctAnswer: "It slows down the process and increases costs",
  },
  {
    question: "Which of the following is an example of upcycling?",
    options: ["Turning old glass bottles into new ones", "Shredding plastic into small pellets", "Transforming old jeans into a handbag", "Melting aluminum cans for reuse"],
    correctAnswer: "Transforming old jeans into a handbag",
  },
  {
    question: "What is the main reason why biodegradable plastics are not a perfect solution?",
    options: ["They are non-renewable", "They do not decompose in landfills easily", "They are more toxic", "They cannot be composted"],
    correctAnswer: "They do not decompose in landfills easily",
  },
  {
    question: "Which of the following is the biggest challenge in global recycling efforts?",
    options: ["Lack of recyclable materials", "Contamination of recyclables", "Too many recycling centers", "Overuse of biodegradable products"],
    correctAnswer: "Contamination of recyclables",
  },
];

// Filipino questions (translated versions of the English questions)
const filipinoQuestions = [
  {
    question: "Anong uri ng basura ang naglalaman ng nakasasamang kemikal na maaaring makontamina ang lupa at tubig?",
    options: ["Organikong Basura", "Mapanganib na Basura", "Nare-recycle na Basura", "E-Waste"],
    correctAnswer: "Mapanganib na Basura",
  },
  {
    question: "Ano ang pinakamabuting paraan sa kapaligiran para itapon ang electronic waste (E-Waste)?",
    options: ["Sunugin ito sa landfill", "Itapon ito sa recycling bin", "Dalhin ito sa e-waste recycling center", "Ilibing ito sa ilalim ng lupa"],
    correctAnswer: "Dalhin ito sa e-waste recycling center",
  },
  {
    question: "Bakit hindi dapat itapon ang mga baterya sa ordinaryong basurahan?",
    options: ["Maaari silang magdulot ng pagsabog", "Naglalabas sila ng nakalalasong kemikal sa kapaligiran", "Masyadong maliit para itapon", "Natutunaw sila sa tubig"],
    correctAnswer: "Naglalabas sila ng nakalalasong kemikal sa kapaligiran",
  },
  {
    question: "Alin sa mga sumusunod na materyales ang HINDI nare-recycle?",
    options: ["Salamin", "Plastik", "Styrofoam", "Papel"],
    correctAnswer: "Styrofoam",
  },
  {
    question: "Ano ang kinakatawan ng tatlong-arrow na recycling symbol?",
    options: ["Reduce, Reuse, Recycle", "Recycle, Recreate, Reuse", "Reuse, Recycle, Reduce", "Reduce, Recycle, Restore"],
    correctAnswer: "Reduce, Reuse, Recycle",
  },
  {
    question: "Sa aling basurahan dapat ilagay ang mga aluminum cans para sa wastong pag-recycle?",
    options: ["Compost bin", "General waste bin", "Recycling bin", "Hazardous waste bin"],
    correctAnswer: "Recycling bin",
  },
  {
    question: "Anong uri ng basura ang maaaring gawing compost?",
    options: ["Salamin at metal", "Plastik at goma", "Organikong basura", "Electronic waste"],
    correctAnswer: "Organikong basura",
  },
  {
    question: "Alin sa mga ito ang benepisyo ng pag-recycle?",
    options: ["Nagpapataas ng basura sa landfill", "Nakakapagtipid ng natural na resources", "Kumokonsume ng mas maraming enerhiya", "Nakakapagdumi ng kapaligiran"],
    correctAnswer: "Nakakapagtipid ng natural na resources",
  },
  {
    question: "Ano ang dapat gawin bago i-recycle ang plastik na bote?",
    options: ["Durugin ito at itapon", "Hugasan ito at alisin ang takip", "Sunugin ito", "Ilibing ito sa lupa"],
    correctAnswer: "Hugasan ito at alisin ang takip",
  },
  {
    question: "Alin sa mga sumusunod na item ang maaaring i-recycle bilang bagong produktong papel?",
    options: ["Botelyang salamin", "Lumang dyaryo", "Plastik na supot", "Aluminum cans"],
    correctAnswer: "Lumang dyaryo",
  },
  {
    question: "Anong recycling process ang nagsasangkot ng pagbabago ng mga materyales sa kanilang raw form bago muling gawing produkto?",
    options: ["Downcycling", "Mechanical recycling", "Chemical recycling", "Upcycling"],
    correctAnswer: "Chemical recycling",
  },
  {
    question: "Anong gas ang karaniwang nililikha ng nabubulok na basura sa mga landfill?",
    options: ["Carbon dioxide", "Oxygen", "Methane", "Nitrogen"],
    correctAnswer: "Methane",
  },
  {
    question: "Ano ang pangunahing environmental issue na dulot ng maling pagtatapon ng plastik na basura?",
    options: ["Polusyon sa hangin", "Pagkawala ng mga kagubatan", "Soil erosion", "Microplastic contamination"],
    correctAnswer: "Microplastic contamination",
  },
  {
    question: "Anong uri ng plastik ang pinakamahirap i-recycle?",
    options: ["PET (Polyethylene Terephthalate)", "HDPE (High-Density Polyethylene)", "PVC (Polyvinyl Chloride)", "PP (Polypropylene)"],
    correctAnswer: "PVC (Polyvinyl Chloride)",
  },
  {
    question: "Anong paraan ang pinakanapapanatili para sa pangangasiwa ng food waste?",
    options: ["Incineration", "Landfilling", "Composting", "Pagtatapon sa mga anyong tubig"],
    correctAnswer: "Composting",
  },
  {
    question: "Alin sa mga sumusunod na salik ang pinaka-nakakaapekto sa recyclability ng mga plastik na materyales?",
    options: ["Hugis", "Laki", "Kulay", "Chemical composition"],
    correctAnswer: "Chemical composition",
  },
  {
    question: "Ano ang nangyayari kapag ang mga hindi nare-recycle na materyales ay nahalo sa mga nare-recycle?",
    options: ["Pinapabuti nito ang recycling process", "Pinabagal nito ang proseso at pinatataas ang gastos", "Walang epekto ito", "Ginagawa nitong mas kumikita ang recycling"],
    correctAnswer: "Pinabagal nito ang proseso at pinatataas ang gastos",
  },
  {
    question: "Alin sa mga sumusunod ang halimbawa ng upcycling?",
    options: ["Paggawa ng lumang glass bottles bilang mga bago", "Pagdurog ng plastik sa maliit na pellets", "Pagtransform ng lumang jeans sa bag", "Pagtunaaw ng aluminum cans para sa muling paggamit"],
    correctAnswer: "Pagtransform ng lumang jeans sa bag",
  },
  {
    question: "Ano ang pangunahing dahilan kung bakit ang biodegradable plastics ay hindi perpektong solusyon?",
    options: ["Hindi sila nare-renew", "Hindi sila madaling mabulok sa mga landfill", "Mas nakakalason sila", "Hindi sila pwedeng i-compost"],
    correctAnswer: "Hindi sila madaling mabulok sa mga landfill",
  },
  {
    question: "Alin sa mga sumusunod ang pinakamalaking hamon sa global recycling efforts?",
    options: ["Kakulangan ng nare-recycle na materyales", "Kontaminasyon ng mga recyclables", "Masyadong maraming recycling centers", "Labis na paggamit ng biodegradable products"],
    correctAnswer: "Kontaminasyon ng mga recyclables",
  },
];

const COLORS = ["#28a745", "#dc3545"]; 


const ELEVENLABS_VOICES = {
  english: "D38z5RcWu1voky8WS1ja", 
  filipino: "oWAxZDx7w5VEj9dCyTzz"  
};


const ELEVENLABS_API_KEY = "sk_0e5a4841930eb8d682ba8165dbab2b606b9e64dff83a0f42";

const RecyclingQuiz = () => {
  const [language, setLanguage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const navigate = useNavigate();
  
  // Create an audio player ref
  const audioRef = useRef(new Audio());

  useEffect(() => {
    let timer;
    if (!showResult && !showLanguageSelection) {
      timer = setInterval(() => {
        setTimeTaken((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [showResult, showLanguageSelection]);

  // Read question aloud when question changes or when voice is enabled
  useEffect(() => {
    // Only read if voice is enabled, we have questions, and we're not showing results
    if (voiceEnabled && questions.length > 0 && !showResult && !showLanguageSelection) {
      readQuestionAloud();
    }
    
    // Cleanup function to stop audio when component unmounts or question changes
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [currentQuestionIndex, questions, voiceEnabled, showResult, showLanguageSelection]);

  // Method to generate text to be spoken
  const getTextToSpeak = () => {
    if (questions.length === 0) return "";
    
    const currentQuestion = questions[currentQuestionIndex];
    // Option prefix based on language
    const optionPrefix = language === "english" ? " " : " ";
    
    // Combine question and options with pauses
    let textToSpeak = currentQuestion.question + " ";
    
   // Add options
const optionLetters = ['A', 'B', 'C', 'D'];
currentQuestion.options.forEach((option, index) => {
  textToSpeak += `${optionLetters[index]}: ${option}. `;
});
    
    return textToSpeak;
  };

  // Method to get the appropriate voice ID based on language
  const getVoiceId = () => {
    return language === "english" ? ELEVENLABS_VOICES.english : ELEVENLABS_VOICES.filipino;
  };

  // Method to call ElevenLabs API
  const generateSpeech = async (text) => {
    setIsSpeaking(true);
    
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${getVoiceId()}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Stop any current audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      
      // Play the new audio
      audioRef.current.src = audioUrl;
      audioRef.current.onended = () => {
        setIsSpeaking(false);
      };
      audioRef.current.play();
      
    } catch (error) {
      console.error("Error generating speech:", error);
      setIsSpeaking(false);
    }
  };

  const readQuestionAloud = () => {
    if (!voiceEnabled || questions.length === 0) return;
    
    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Generate text to speak and call ElevenLabs API
    const textToSpeak = getTextToSpeak();
    generateSpeech(textToSpeak);
  };

  const toggleVoice = () => {
    // If turning off voice, stop any ongoing speech
    if (voiceEnabled && audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
    } else {
      // If turning on voice, read the current question
      readQuestionAloud();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const repeatQuestion = () => {
    readQuestionAloud();
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setQuestions(lang === "english" ? englishQuestions : filipinoQuestions);
    setShowLanguageSelection(false);
  };

  const handleAnswerClick = (selectedAnswer) => {
    // Stop any ongoing speech when an answer is selected
    if (audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
    }
    
    if (isAnswered) return;
    setIsAnswered(true);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    // Create Audio objects using public paths
    const correctSound = new Audio("/assets/correct.mp3");
    const incorrectSound = new Audio("/assets/incorrect.mp3");

    if (isCorrect) {
      setScore(score + 1);
      setFeedback(language === "english" ? "✅ Correct!" : "✅ Tama!");
      setAnswerState("correct");
      correctSound.play(); // Play correct sound
    } else {
      setFeedback(
        language === "english" 
          ? `❌ Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`
          : `❌ Mali! Ang tamang sagot ay: ${currentQuestion.correctAnswer}`
      );
      setAnswerState("incorrect");
      incorrectSound.play(); // Play incorrect sound
    }

    setUserAnswers([...userAnswers, { ...currentQuestion, selectedAnswer, isCorrect }]);

    setTimeout(() => {
      setFeedback("");
      setAnswerState("");
      setIsAnswered(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const retryQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback("");
    setShowResult(false);
    setAnswerState("");
    setUserAnswers([]);
    setIsAnswered(false);
    setTimeTaken(0);
  };

  const changeLanguage = () => {
    // Stop any ongoing speech
    if (audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
    }
    
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback("");
    setShowResult(false);
    setAnswerState("");
    setUserAnswers([]);
    setIsAnswered(false);
    setTimeTaken(0);
    setShowLanguageSelection(true);
  };

  const chartData = [
    { 
      name: language === "english" ? "Correct" : "Tama", 
      value: score 
    },
    { 
      name: language === "english" ? "Incorrect" : "Mali", 
      value: questions.length - score 
    },
  ];

  return (
    <div className="fade-in">
      <div className="quiz-container">
        <div className="background">
          {[...Array(20)].map((_, i) => (
            <span key={i}></span>
          ))}
        </div>

        {showLanguageSelection ? (
          <div className="language-selection">
            <h2 className="quiz-title">♻️ Recycling Quiz</h2>
            <h3>{language === "english" ? "Select Language" : "Pumili ng Wika"}</h3>
            <div className="language-options">
              <button onClick={() => selectLanguage("english")} className="language-btn">
                🇺🇸 English
              </button>
              <button onClick={() => selectLanguage("filipino")} className="language-btn">
                🇵🇭 Filipino
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="quiz-title">♻️ {language === "english" ? "Recycling Quiz" : "Pag-recycle Quiz"}</h2>
            <div className="quiz-controls">
              <button onClick={changeLanguage} className="change-language-btn">
                {language === "english" ? "🇵🇭 Switch to Filipino" : "🇺🇸 Switch to English"}
              </button>
              <button onClick={toggleVoice} className="voice-btn">
                {voiceEnabled ? "🔇 " : "🔊 "}
                {language === "english" ? 
                  (voiceEnabled ? "Disable Voice" : "Enable Voice") : 
                  (voiceEnabled ? "I-disable ang Boses" : "I-enable ang Boses")}
              </button>
              {voiceEnabled && (
                <button onClick={repeatQuestion} className="repeat-btn" disabled={isSpeaking}>
                  🔄 {language === "english" ? "Repeat Question" : "Ulitin ang Tanong"}
                </button>
              )}
            </div>
            <p className="question-counter">
              {language === "english" 
                ? `Question ${currentQuestionIndex + 1} out of ${questions.length}`
                : `Tanong ${currentQuestionIndex + 1} mula sa ${questions.length}`}
            </p>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
            {!showResult && (
              <div className={`quiz-question ${answerState}`}>
                {isSpeaking && (
                  <div className="speaking-indicator">
                    🎙️ {language === "english" ? "Speaking..." : "Nagsasalita..."}
                  </div>
                )}
              <p>{questions[currentQuestionIndex].question}</p>
<div className="quiz-options">
  {questions[currentQuestionIndex].options.map((option, index) => (
    <button 
      key={index} 
      onClick={() => handleAnswerClick(option)} 
      className={`quiz-option ${isAnswered ? "fade-out" : ""}`}
      disabled={isAnswered} 
    >
      {String.fromCharCode(65 + index)}. {option}
    </button>
  ))}
</div>

                <p className="feedback fade-in">{feedback}</p>
              </div>
            )}
          </>
        )}
      </div>

      {showResult && (
        <div className="results-wrapper">
          <div className="chart-container">
            <h3>{language === "english" ? "📊 Quiz Accuracy" : "📊 Katumpakan ng Quiz"}</h3>
            <PieChart width={300} height={300}>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={90} fill="#8884d8" dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <p>
              <strong>{language === "english" ? "Score:" : "Iskor:"}</strong> {score} / {questions.length}
            </p>
            <p>
              <strong>⏳ {language === "english" ? "Time Taken:" : "Oras na Ginugol:"}</strong> {Math.floor(timeTaken / 60)} {language === "english" ? "min" : "minuto"} {timeTaken % 60} {language === "english" ? "sec" : "segundo"}
            </p>
          </div>
          <div className="answers-summary">
            <h3>{language === "english" ? "📋 Answers Review" : "📋 Pagsusuri ng mga Sagot"}</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{language === "english" ? "Question" : "Tanong"}</th>
                  <th>{language === "english" ? "Your Answer" : "Ang Iyong Sagot"}</th>
                  <th>{language === "english" ? "Correct Answer" : "Tamang Sagot"}</th>
                  <th>{language === "english" ? "Result" : "Resulta"}</th>
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
          <button onClick={() => navigate("/Game")} className="dashboard-btn">
            🔙 {language === "english" ? "Back to Dashboard" : "Bumalik sa Dashboard"}
          </button>
          <button onClick={retryQuiz} className="retry-btn">
            🔄 {language === "english" ? "Retry Quiz" : "Subukan Muli ang Quiz"}
          </button>
          <button onClick={() => navigate("/DisposalQuiz")} className="next-game-btn">
            🎮 {language === "english" ? "Next Game" : "Susunod na Laro"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecyclingQuiz;