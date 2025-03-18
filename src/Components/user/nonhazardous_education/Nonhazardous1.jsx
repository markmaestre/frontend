import React, { useEffect, useState } from 'react';

import '../../css/nonhazardous_education/nonhazardous1.css';
import { useNavigate } from 'react-router-dom'; // Import navigation hook


const Nonhazardous1 = () => {
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
          <button className="prev-button" onClick={() => navigate('/hazardous5')}>
            &#8592; {/* Left Arrow */}
          </button>
          <button className="next-button" onClick={() => navigate('/nonhazardous2')}>
            &#8594; {/* Right Arrow */}
          </button>
        </div>

      </nav>



      {/* Hero Section with Gradient Background */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Beyond the Curb</h1>
          <p className="hero-subtitle">
         What Really Happens to Your Recycled Glass and How You Can Help
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
    <span className="first-letter">G</span>lass is one of the most sustainable materials available, capable of being recycled indefinitely without losing quality. However, the process of glass recycling is often misunderstood. Many people assume that placing glass in the recycling bin guarantees it will be reused, but the reality is more complex.
  </p>
  <p> Understanding the journey of recycled glass and the challenges it faces can help individuals make informed decisions that improve recycling outcomes.
  </p>

  

          {/* Image with Contributors */}
          <div className="contributors-image-container">
            <img src="/assets/nh1.png" alt="Person working on laptop" className="contributors-image" />
            
          </div>


{/* Second Main Content */}
<div id="second-main-content" className="second-main-content">
  <h2>The Glass Recycling Process: From Collection to Reuse</h2>

  <ol>
    <li>
      <h3>Collection and Sorting</h3>
      <p>Recycled glass is collected from curbside bins, drop-off centers, and commercial sources.</p>
      <p>Contamination is a major issue; glass mixed with non-recyclables (e.g., ceramics, food residue) can be rejected or downgraded in quality.</p>
    </li>

    <li>
      <h3>Transportation to a Recycling Facility</h3>
      <p>Once collected, the glass is transported to a Materials Recovery Facility (MRF) where it is sorted by color (clear, green, brown) and quality.</p>
      <p>Some facilities use optical sorting technology to automate the process and improve efficiency.</p>
    </li>

    <li>
      <h3>Crushing and Cleaning</h3>
      <p>The sorted glass is crushed into small pieces called "cullet."</p>
      <p>It is then cleaned to remove labels, metals, and other impurities.</p>
      <p>Cullet is a highly valuable raw material as it requires less energy to melt compared to virgin glass.</p>
    </li>

    <li>
      <h3>Melting and Remanufacturing</h3>
      <p>The cullet is melted in a furnace at temperatures over 2,600°F (1,400°C).</p>
      <p>Once melted, it is molded into new glass products such as bottles, jars, and fiberglass insulation.</p>
      <p>Using cullet in glass production reduces energy consumption by 30% and cuts carbon emissions significantly.</p>
    </li>
  </ol>
</div>

{/* Third Main Content */}
<div id="third-main-content" className="third-main-content">
  <h2>The Environmental Benefits of Glass Recycling</h2>

  <ul>
    <li>
      <strong>Reduces Landfill Waste:</strong> Glass takes over one million years to decompose in landfills.
    </li>
    <li>
      <strong>Saves Energy:</strong> Recycling one ton of glass saves 42 kWh of energy, enough to power a home for a day.
    </li>
    <li>
      <strong>Cuts CO<sub>2</sub> Emissions:</strong> For every six tons of recycled glass used, one ton of CO<sub>2</sub> is saved.
    </li>
    <li>
      <strong>Conserves Natural Resources:</strong> Using cullet reduces the need for virgin materials like sand, soda ash, and limestone, protecting ecosystems from excessive mining.
    </li>
  </ul>
</div>



    {/* Video Section */}
<div id="video-section" className="video-containerr">
<video width="100%" height="400" controls>
    <source src="/assets/nh1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>


{/* Fourth Main Content */}
<div id="forth-main-content" className="forth-main-content">
  <h2>Common Misconceptions About Glass Recycling</h2>

  <ul>
    <li>
      <strong>"All Glass is Recyclable Everywhere"</strong>
      <p>
        While glass is infinitely recyclable, some municipalities do not accept it due to high transportation costs and contamination issues.
      </p>
    </li>
    <li>
      <strong>"Broken Glass Can’t Be Recycled"</strong>
      <p>
        Broken glass can be recycled if it is clean and sorted properly, but some recycling programs reject it due to safety concerns.
      </p>
    </li>
    <li>
      <strong>"Recycled Glass is Lower Quality"</strong>
      <p>
        Recycled glass maintains the same quality as new glass and can be used repeatedly in manufacturing.
      </p>
    </li>
  </ul>
</div>


{/* Fifth Main Content */}
<div id="fifth-main-content" className="fifth-main-content">
  <h2>How Individuals Can Improve Glass Recycling</h2>

  <ul>
    <li>
      <strong>Follow Local Recycling Guidelines</strong>
      <p>
        Check with your local waste management service to see what types of glass are accepted. Some areas require glass to be separated from other recyclables.
      </p>
    </li>
    <li>
      <strong>Reduce Contamination</strong>
      <p>
        Rinse glass containers before recycling to remove food residue. Remove non-glass components like metal lids and plastic labels.
      </p>
    </li>
    <li>
      <strong>Support Glass Recycling Programs</strong>
      <p>
        Advocate for improved glass recycling infrastructure in your community. Encourage local businesses to participate in bottle return programs.
      </p>
    </li>
    <li>
      <strong>Repurpose and Reuse</strong>
      <p>
        Use glass jars and bottles for storage, DIY projects, or garden decorations instead of discarding them.
      </p>
    </li>
  </ul>
</div>


          {/* Quote */}
          <div id="quote-section" className="quote">
          Recycling glass is an essential part of sustainable waste management, but it requires proper sorting, processing, and consumer participation to be truly effective. By understanding what happens beyond the curb and adopting responsible recycling habits, individuals and communities can contribute to a more efficient and environmentally friendly glass recycling system. Whether by reducing contamination, advocating for better programs, or finding creative ways to reuse glass, everyone can play a role in ensuring this valuable material remains part of a circular economy.

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

export default Nonhazardous1;