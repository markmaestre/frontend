import React, { useEffect, useState } from 'react';

import "../../css/hazardous_education/hazardous1.css";
import { useNavigate } from 'react-router-dom'; // Import navigation hook


const Hazardous1 = () => {
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
          <button className="prev-button" onClick={() => navigate('/education')}>
            &#8592; {/* Left Arrow */}
          </button>
          <button className="next-button" onClick={() => navigate('/hazardous2')}>
            &#8594; {/* Right Arrow */}
          </button>
        </div>

      </nav>



      {/* Hero Section with Gradient Background */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Beyond the Bin</h1>
          <p className="hero-subtitle">
          The Critical Role of Proper Medical Waste Disposal in Public Health
          </p>
          <div className="tags">
            <span className="tag">HAZARDOUS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
      <div id="first-main-content" className="main-contentt">
  <p className="first-paragraph">
    <span className="first-letter">M</span>edical waste disposal is a crucial yet often overlooked aspect of healthcare management. Hospitals, clinics, laboratories, and pharmaceutical facilities generate vast amounts of waste daily, some of which pose serious risks to public health and the environment if not handled properly. From contaminated syringes to expired medications, improper disposal can lead to disease outbreaks, environmental degradation, and legal consequences.
  </p>
  <p> This article explores the importance of proper medical waste disposal, its impact on public health and the environment, regulatory frameworks, best practices, and case studies highlighting the significance of effective waste management.
  </p>

  

          {/* Image with Contributors */}
          <div className="contributors-image-container">
            <img src="/assets/h1.png" alt="Person working on laptop" className="contributors-image" />
            
          </div>



{/* Second Main Content */}
<div id="second-main-content" className="second-main-content">
  <h2>The Impact of Improper Medical Waste Disposal on Public Health</h2>
  <ol>
    <li>
      <h3>Infectious Disease Transmission</h3>
      <p>
        Improperly disposed of medical waste, such as used needles and blood-soaked materials, can spread diseases like HIV, hepatitis B, and tuberculosis.
      </p>
      <p>
        Scavengers and waste pickers in low-income countries often come into contact with hazardous materials, increasing their risk of infection.
      </p>
    </li>

    <li>
      <h3>Antimicrobial Resistance (AMR)</h3>
      <p>
        Uncontrolled disposal of antibiotics and pharmaceutical waste contributes to the rise of antimicrobial resistance, making bacterial infections harder to treat.
      </p>
      <p>
        A 2021 WHO report found that 700,000 deaths occur annually due to drug-resistant infections, and improper medical waste management exacerbates the problem.
      </p>
    </li>

    <li>
      <h3>Harm to Healthcare Workers</h3>
      <p>
        Inadequate waste disposal practices expose healthcare workers to biohazards, increasing the risk of occupational infections.
      </p>
      <p>
        The WHO estimates that 2 million needlestick injuries occur among healthcare workers each year, largely due to improper sharps disposal.
      </p>
    </li>
  </ol>
</div>



    {/* Video Section */}
<div id="video-section" className="video-containerr">
<video width="100%" height="400" controls>
    <source src="/assets/h1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

{/* Third Main Content */}
<div id="third-main-content" className="third-main-content">
  <h2>Environmental Consequences of Poor Medical Waste Management</h2>
  <ol>
    <li>
      <h3>Soil and Water Contamination</h3>
      <p>
        Dumping untreated medical waste in landfills allows hazardous chemicals and pathogens to seep into groundwater, contaminating drinking water sources.
      </p>
      <p>
        Heavy metals from disposed medical equipment, such as mercury from thermometers, can accumulate in the food chain.
      </p>
    </li>

    <li>
      <h3>Air Pollution from Incineration</h3>
      <p>
        While incineration is a common disposal method, burning medical waste improperly releases harmful dioxins and furans, known carcinogens that contribute to respiratory diseases.
      </p>
      <p>
        Countries without strict emission controls face increased air pollution and public health risks.
      </p>
    </li>

    <li>
      <h3>Harm to Wildlife</h3>
      <p>
        Animals that come into contact with medical waste may suffer poisoning, infections, or entanglement in hazardous materials.
      </p>
      <p>
        Studies have found traces of pharmaceutical drugs in aquatic ecosystems, affecting fish reproduction and biodiversity.
      </p>
    </li>
  </ol>
</div>

{/* Fourth Main Content */}
<div id="forth-main-content" className="forth-main-content">
  <h2>The Importance of Adhering to Regulations</h2>
  <ol>
    <li>
      <h3>International Guidelines</h3>
      <p>
        The World Health Organization (WHO) and the United Nations Environment Programme (UNEP) provide global recommendations on safe medical waste disposal.
      </p>
      <p>
        The Basel Convention regulates transboundary movement of hazardous waste to prevent illegal dumping.
      </p>
    </li>

    <li>
      <h3>National Regulations</h3>
      <p>
        The U.S. Environmental Protection Agency (EPA) and the Occupational Safety and Health Administration (OSHA) mandate strict guidelines for medical waste disposal in healthcare settings.
      </p>
      <p>
        The European Union’s Waste Framework Directive requires proper segregation and treatment of medical waste to minimize environmental impact.
      </p>
    </li>

    <li>
      <h3>Legal and Financial Repercussions</h3>
      <p>
        Healthcare facilities failing to comply with medical waste regulations may face hefty fines and reputational damage.
      </p>
      <p>
        In 2018, a hospital in India was fined $10,000 for illegal dumping of biohazardous waste, causing public outrage and legal action.
      </p>
    </li>
  </ol>
</div>

{/* Fifth Main Content */}
<div id="fifth-main-content" className="fifth-main-content">
  <h2>Best Practices for Medical Waste Management</h2>
  <ol>
    <li>
      <h3>Proper Segregation at the Source</h3>
      <p>Use color-coded bins for different types of waste:</p>
      <ul>
        <li><strong>Red:</strong> Infectious waste (e.g., used gloves, bandages)</li>
        <li><strong>Yellow:</strong> Sharps (e.g., needles, scalpels)</li>
        <li><strong>Blue:</strong> Pharmaceutical waste (e.g., expired drugs)</li>
        <li><strong>Black:</strong> General waste (e.g., packaging, paper)</li>
      </ul>
    </li>

    <li>
      <h3>Safe Storage and Transportation</h3>
      <p>Store hazardous waste in leak-proof, puncture-resistant containers before transport.</p>
      <p>Train personnel to follow safe handling protocols to minimize exposure risks.</p>
    </li>

    <li>
      <h3>Sustainable Disposal Methods</h3>
      <ul>
        <li><strong>Autoclaving:</strong> Uses steam sterilization to neutralize pathogens in infectious waste.</li>
        <li><strong>Chemical Disinfection:</strong> Treats liquid waste and used medical instruments to prevent contamination.</li>
        <li><strong>Plasma Gasification:</strong> An emerging technology that converts medical waste into usable energy with minimal emissions.</li>
      </ul>
    </li>

    <li>
      <h3>Staff Training and Public Awareness</h3>
      <p>Conduct regular training sessions for healthcare workers on proper waste handling techniques.</p>
      <p>Educate communities on the dangers of scavenging medical waste and promote safe disposal initiatives.</p>
    </li>
  </ol>
</div>



          {/* Quote */}
          <div id="quote-section" className="quote">
          Proper medical waste disposal is not just a regulatory obligation but a public health imperative. Poor waste management contributes to disease outbreaks, environmental pollution, and legal challenges. By adopting best practices such as proper segregation, sustainable disposal methods, and strict regulatory compliance, healthcare facilities can mitigate risks and protect both human health and the environment. Governments, healthcare providers, and communities must collaborate to implement safer and more sustainable waste management strategies. The future of public health depends on what happens beyond the bin.

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

export default Hazardous1;