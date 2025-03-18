import React, { useEffect, useState } from 'react';

import '../../css/nonhazardous_education/nonhazardous3.css';
import { useNavigate } from 'react-router-dom'; // Import navigation hook


const Nonhazardous3 = () => {
  const navigate = useNavigate(); // import { useNavigate } from 'react-router-dom';
  const [ setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="page-container">
           {/* Navigation */}
           <nav className="navbar">
           <div className="nav-buttons">
          <button className="prev-button" onClick={() => navigate('/nonhazardous2')}>
            &#8592; {/* Left Arrow */}
          </button>
          <button className="next-button" onClick={() => navigate('/nonhazardous4')}>
            &#8594; {/* Right Arrow */}
          </button>
        </div>

      </nav>



      {/* Hero Section with Gradient Background */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Paper Waste Revolution</h1>
          <p className="hero-subtitle">
          How Recycling Can Save Forests and Cut Pollution
          </p>
          <div className="tags">
            <span className="tag">NON-HAZARDOUS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
      <div id="first-main-content" className="main-contentt">
  <p className="first-paragraph">
    <span className="first-letter">P</span>aper is an essential part of daily life, from newspapers and office documents to packaging and books. However, the production and disposal of paper contribute significantly to deforestation, pollution, and waste accumulation. With increasing awareness of environmental conservation, recycling has emerged as a crucial solution to reduce the ecological footprint of paper use.
  </p>
  <p> This article explores the current state of paper waste, its environmental impact, and the role of recycling in preserving forests and cutting pollution.
  </p>

  

          {/* Image with Contributors */}
          <div className="contributors-image-container">
            <img src="/assets/nh3.png" alt="Person working on laptop" className="contributors-image" />
            
          </div>



{/* Second Main Content */}
<div id="second-main-content" className="second-main-content">
  <h2>The Current State of Paper Waste</h2>

  <h3>Global Paper Consumption</h3>
  <ul>
    <li>The world produces approximately 400 million tons of paper annually.</li>
    <li>The United States alone accounts for 67 million tons of paper consumption each year.</li>
  </ul>

  <h3>Paper Waste Generation</h3>
  <ul>
    <li>Paper and cardboard constitute about 26% of landfill waste globally.</li>
    <li>Over 1 billion trees are cut down annually for paper production, exacerbating deforestation.</li>
  </ul>

  <h3>Recycling Rates and Challenges</h3>
  <ul>
    <li>Roughly 68% of paper is recycled in the U.S., but significant amounts still end up in landfills.</li>
    <li>Contamination, lack of proper disposal infrastructure, and consumer awareness are barriers to higher recycling rates.</li>
  </ul>
</div>


{/* Third Main Content */}
<div id="third-main-content" className="third-main-content">
  <h2>Environmental Impact of Paper Production and Disposal</h2>

  <h3>Deforestation and Habitat Destruction</h3>
  <ul>
    <li>Logging for paper production leads to forest loss, affecting biodiversity and carbon sequestration.</li>
    <li>Forest ecosystems, home to 80% of terrestrial species, suffer from habitat destruction.</li>
  </ul>

  <h3>Water and Energy Consumption</h3>
  <ul>
    <li>Paper production is highly water-intensive, requiring 10 liters of water per A4 sheet.</li>
    <li>Manufacturing new paper consumes 70% more energy compared to recycling used paper.</li>
  </ul>

  <h3>Pollution from Pulp and Paper Mills</h3>
  <ul>
    <li>Paper manufacturing is one of the largest industrial polluters, releasing dioxins, chlorine, and heavy metals into water bodies.</li>
    <li>The process emits over 200 million tons of CO₂ annually, contributing to climate change.</li>
  </ul>

  <h3>Landfill and Incineration Issues</h3>
  <ul>
    <li>Paper in landfills generates methane, a greenhouse gas 25 times more potent than CO₂.</li>
    <li>Incineration of paper waste releases toxins that degrade air quality and human health.</li>
  </ul>
</div>


    {/* Video Section */}
<div id="video-section" className="video-containerr">
<video width="100%" height="400" controls>
    <source src="/assets/nh3.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

{/* Fourth Main Content */}
<div id="forth-main-content" className="forth-main-content">
  <h2>How Recycling Saves Forests and Reduces Pollution</h2>

  <h3>Preserving Natural Forests</h3>
  <ul>
    <li>Recycling one ton of paper saves 17 trees, reducing the need for virgin wood pulp.</li>
    <li>Sustainable forestry practices combined with recycling can significantly lower deforestation rates.</li>
  </ul>

  <h3>Reducing Energy and Water Usage</h3>
  <ul>
    <li>Producing recycled paper uses 40% less energy and requires far less water than making virgin paper.</li>
    <li>Recycled paper reduces the demand for tree harvesting and the carbon footprint of transportation.</li>
  </ul>

  <h3>Lowering Greenhouse Gas Emissions</h3>
  <ul>
    <li>Recycling paper decreases carbon emissions by 50% compared to landfill disposal.</li>
    <li>It prevents methane generation from decomposing paper waste.</li>
  </ul>
</div>

{/* Fifth Main Content */}
<div id="fifth-main-content" className="fifth-main-content">
  <h2>Practical Steps for Individuals and Businesses</h2>

  <h3>Individuals</h3>
  <ul>
    <li>Separate paper waste from general trash and recycle it properly.</li>
    <li>Use digital alternatives to reduce unnecessary printing.</li>
    <li>Purchase recycled paper products to support the industry.</li>
  </ul>

  <h3>Businesses and Institutions</h3>
  <ul>
    <li>Implement paperless policies and encourage electronic documentation.</li>
    <li>Partner with certified recycling programs to ensure responsible disposal.</li>
    <li>Promote employee engagement in sustainability efforts.</li>
  </ul>
</div>


          {/* Quote */}
          <div id="quote-section" className="quote">
          Recycling paper is one of the most effective ways to reduce deforestation, conserve energy, and minimize pollution. While significant progress has been made, there is still room for improvement in global recycling rates. By making conscious choices, individuals, businesses, and governments can drive a paper waste revolution that safeguards the environment for future generations. The next time you discard a piece of paper, remember that recycling it can help save trees, reduce pollution, and create a greener planet.

          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
        <div className="sidebar-section">
    <a href="#first-main-content" className="nav-link">First Main Content</a>
  </div>
  <div className="sidebar-section">
    <a href="#second-main-content" className="nav-link">Second Main Content</a>
  </div>
  <div className="sidebar-section">
    <a href="#video-section" className="nav-link">Video Section</a>
  </div>
  <div className="sidebar-section">
    <a href="#quote-section" className="nav-link">Conclusion</a>
  </div>
          
          <div className="sidebar-written">
            <h3>Written by</h3>
            <div className="author-info">
              <img src="/assets/about-icon.png" alt="Author" className="author-image" />
              <div>
                <p className="author-name">HazWaste Admin</p>
                <p className="author-role">Developer</p>
              </div>
            </div>
          </div>

          <div className="sidebar-contributors">
            <h3>Contributors</h3>
            <div className="contributor-info">
              <img src="/assets/about-icon.png" alt="Contributor" className="contributor-image" />
              <div>
                <p className="contributor-name">Jaylord Franz Baribar</p>
                <p className="contributor-role">Frontend Developer/Documentation Head</p>
              </div>
            </div>
            <div className="contributor-info">
              <img src="/assets/about-icon.png" alt="Contributor" className="contributor-image" />
              <div>
                <p className="contributor-name">Kristel Kaye Cabalbag</p>
                <p className="contributor-role">UI Designer/Assistant Documentation </p>
              </div>
            </div>
           
            <div className="contributor-info">
              <img src="/assets/about-icon.png" alt="Contributor" className="contributor-image" />
              <div>
                <p className="contributor-name">Mark Ranier Maestre</p>
                <p className="contributor-role">Full Stack Developer</p>
              </div>
            </div>
            <div className="contributor-info">
              <img src="/assets/about-icon.png" alt="Contributor" className="contributor-image" />
              <div>
                <p className="contributor-name">Theodore Palma</p>
                <p className="contributor-role">UI Designer/Assistant Documentation </p>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
};

export default Nonhazardous3;