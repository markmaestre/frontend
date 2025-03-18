import React, { useEffect, useState } from 'react';

import '../../css/nonhazardous_education/nonhazardous5.css';
import { useNavigate } from 'react-router-dom'; // Import navigation hook


const Nonhazardous5 = () => {
  const navigate = useNavigate(); // import { useNavigate } from 'react-router-dom';
  const [scrolled, setScrolled] = useState(false);

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
          <button className="prev-button" onClick={() => navigate('/nonhazardous4')}>
            &#8592; {/* Left Arrow */}
          </button>
          <button className="next-button" onClick={() => navigate('/hazardous1')}>
            &#8594; {/* Right Arrow */}
          </button>
        </div>

      </nav>



      {/* Hero Section with Gradient Background */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>The Plastic Predicament</h1>
          <p className="hero-subtitle">
          Myths, Facts, and Best Practices for Effective Recycling
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
    <span className="first-letter">P</span>lastic waste is one of the most pressing environmental challenges of our time. While recycling is often presented as a solution, confusion and misinformation abound, leading to inefficiencies in the process. Many people believe that all plastics are recyclable or that recycling alone can solve the plastic crisis. 
  </p>
  <p> This article aims to debunk common myths, present key facts, and outline best practices for effective plastic recycling.
  </p>

  

          {/* Image with Contributors */}
          <div className="contributors-image-container">
            <img src="/assets/nh5.png" alt="Person working on laptop" className="contributors-image" />
            
          </div>



{/* Second Main Content */}
<div id="second-main-content" className="second-main-content">
  <h2>Common Myths and Facts About Plastic Recycling</h2>

  <div className="myth-fact">
    <h3>Myth: All plastics are recyclable</h3>
    <p>
      <strong>Fact:</strong> Not all plastics can be recycled. Plastics are categorized into seven types, 
      and many municipal recycling programs only accept types 1 (PET) and 2 (HDPE). Types 3-7, including 
      PVC and polystyrene, are more challenging to recycle and often end up in landfills.
    </p>
  </div>

  <div className="myth-fact">
    <h3>Myth: Throwing plastic in the recycling bin guarantees it gets recycled</h3>
    <p>
      <strong>Fact:</strong> A large portion of plastic waste is not actually recycled. According to the OECD, 
      only 9% of global plastic waste is successfully recycled, while 19% is incinerated and the rest is landfilled 
      or leaked into the environment.
    </p>
  </div>

  <div className="myth-fact">
    <h3>Myth: Biodegradable plastics are the perfect solution</h3>
    <p>
      <strong>Fact:</strong> Biodegradable plastics require specific conditions to break down and often do not 
      degrade properly in landfills or oceans. Some produce microplastics, contributing to pollution.
    </p>
  </div>

  <div className="myth-fact">
    <h3>Myth: Recycling plastic uses more energy than producing new plastic</h3>
    <p>
      <strong>Fact:</strong> Recycling plastic requires up to 88% less energy than producing virgin plastic. 
      It also reduces the demand for fossil fuel extraction, lowering carbon emissions.
    </p>
  </div>

  <div className="myth-fact">
    <h3>Myth: Single-use plastics can always be recycled</h3>
    <p>
      <strong>Fact:</strong> Many single-use plastics, like plastic straws, utensils, and wrappers, are too small 
      or contaminated to be processed by standard recycling facilities, making them difficult to recycle effectively.
    </p>
  </div>
</div>


{/* Third Main Content */}
<div id="third-main-content" className="third-main-content">
  <h2>The Environmental Impact of Plastic Waste</h2>

  <div className="impact">
    <h3>Marine Pollution</h3>
    <p>
      Over 8 million tons of plastic enter the ocean each year, harming marine life and ecosystems.
    </p>
  </div>

  <div className="impact">
    <h3>Microplastic Contamination</h3>
    <p>
      Studies show that microplastics are present in human blood, drinking water, and food, posing unknown health risks.
    </p>
  </div>

  <div className="impact">
    <h3>Carbon Footprint</h3>
    <p>
      Plastic production contributes to 3.4% of global greenhouse gas emissions, exacerbating climate change.
    </p>
  </div>
</div>


    {/* Video Section */}
<div id="video-section" className="video-containerr">
<video width="100%" height="400" controls>
    <source src="/assets/nh5.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

{/* Fourth Main Content */}
<div id="forth-main-content" className="forth-main-content">
  <h2>Best Practices for Effective Plastic Recycling</h2>

  <div className="practice">
    <h3>Know Your Plastics</h3>
    <p>Check the recycling codes (1-7) on plastic items and sort them accordingly.</p>
    <p>Avoid non-recyclable plastics like polystyrene (Styrofoam) and PVC.</p>
  </div>

  <div className="practice">
    <h3>Clean and Dry Your Plastics</h3>
    <p>Contaminated plastics (e.g., food-stained containers) are often rejected.</p>
    <p>Rinse and dry items before placing them in the recycling bin.</p>
  </div>

  <div className="practice">
    <h3>Avoid Wishcycling</h3>
    <p>
      Placing non-recyclable items in the bin disrupts the recycling process and increases costs for facilities.
    </p>
    <p>Only recycle items that your local program accepts.</p>
  </div>

  <div className="practice">
    <h3>Reduce and Reuse First</h3>
    <p>
      Recycling should be the last resort. Reduce plastic use by opting for reusable alternatives like metal straws, cloth bags, and glass containers.
    </p>
  </div>

  <div className="practice">
    <h3>Support Innovative Recycling Programs</h3>
    <p>Companies like Terracycle and Loop offer solutions for difficult-to-recycle plastics.</p>
    <p>Some brands now use chemical recycling to break down plastics into reusable materials.</p>
  </div>
</div>

{/* Fifth Main Content */}
<div id="fifth-main-content" className="fifth-main-content">
  <h2>The Future of Plastic Recycling</h2>

  <div className="future-trend">
    <h3>Advanced Technologies</h3>
    <p>AI and robotics are being integrated into sorting facilities to improve efficiency.</p>
  </div>

  <div className="future-trend">
    <h3>Legislation</h3>
    <p>Countries like Canada and the EU are enforcing bans on single-use plastics and promoting Extended Producer Responsibility (EPR) programs.</p>
  </div>

  <div className="future-trend">
    <h3>Consumer Action</h3>
    <p>Public awareness campaigns are encouraging responsible plastic consumption and disposal.</p>
  </div>
</div>



          {/* Quote */}
          <div id="quote-section" className="quote">
          While plastic recycling is crucial, it is not a standalone solution to plastic pollution. Understanding myths, following best practices, and supporting sustainable innovations can help reduce plastic waste’s environmental impact. By taking proactive steps, individuals and businesses can contribute to a more effective and sustainable recycling system.

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

export default Nonhazardous5;