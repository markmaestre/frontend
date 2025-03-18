import React, { useState } from 'react';
import { Trophy, Award, Leaf, Play, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../css/Game.css';

const Game = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const games = [
    {
      id: 1,
      title: "Recycling Time",
      description: "Test your knowledge about recycling different materials. Learn what goes where and why it matters!",
      icon: <Trophy size={36} />,
      color: "#2e7d32",
      secondaryColor: "#81c784",
      difficulty: "Easy",
      timeEstimate: "5-10 min",
      questions: 20,
      path: "/RecyclingQuiz"
    },
    {
      id: 2,
      title: "Bin the Trash",
      description: "Sort various waste items into the correct bins as quickly as possible. Challenge your waste sorting skills!",
      icon: <Award size={36} />,
      color: "#00bfa6",
      secondaryColor: "#80deea",
      difficulty: "Medium",
      timeEstimate: "10-15 min",
      questions: 20,
      path: "/DisposalQuiz"
    },
    {
      id: 3,
      title: "Nature Lover",
      description: "Explore the environmental impact of waste and learn how proper disposal helps protect our ecosystems.",
      icon: <Leaf size={36} />,
      color: "#7cb342",
      secondaryColor: "#aed581",
      difficulty: "Hard",
      timeEstimate: "15-20 min",
      questions: 20,
      path: "/EnvironmentalImpact"
    }
  ];
  
  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };
  
  const handleMouseLeave = () => {
    setHoveredCard(null);
  };
  
  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Educational Games</h1>
        <p>Learn about waste management while having fun with these interactive games!</p>
      </div>
      
      <div className="games-grid">
        {games.map((game) => (
          <Link 
            to={game.path} 
            key={game.id}
            className={`game-card ${hoveredCard === game.id ? 'hovered' : ''}`}
            style={{ 
              '--primary-color': game.color,
              '--secondary-color': game.secondaryColor,
              textDecoration: 'none',
              color: 'inherit'
            }}
            onMouseEnter={() => handleMouseEnter(game.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-content">
              <div className="game-icon" style={{ backgroundColor: game.color }}>
                {game.icon}
                <div className="icon-pulse"></div>
              </div>
              
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              
              <div className="game-details">
                <div className="detail-item">
                  <span className="detail-label">Difficulty:</span>
                  <span className="detail-value">{game.difficulty}</span>
                </div>
                <div className="detail-item">
                  <Clock size={16} />
                  <span className="detail-value">{game.timeEstimate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Questions:</span>
                  <span className="detail-value">{game.questions}</span>
                </div>
              </div>
              
              <button className="play-button" onClick={(e) => {
                e.preventDefault(); // Prevent the Link from navigating
                window.location.href = game.path; // Navigate programmatically
              }}>
                <Play size={16} />
                <span>Play Now</span>
              </button>
            </div>
            
            <div className="floating-particles">
              {[...Array(8)].map((_, index) => (
                <div 
                  key={index} 
                  className="particle"
                  style={{
                    '--delay': `${index * 0.7}s`,
                    '--size': `${Math.random() * 10 + 5}px`,
                    '--x-pos': `${Math.random() * 100}%`,
                    '--y-pos': `${Math.random() * 100}%`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="card-badge">
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="game-stats">
        <div className="stat-item">
          <h3>Your Progress</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '45%' }}></div>
          </div>
          <p>45% Complete</p>
        </div>
        
        <div className="stat-item">
          <h3>Points Earned</h3>
          <div className="points-display">
            <Trophy size={24} />
            <span>780</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;