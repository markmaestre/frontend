import React from 'react';
import "../../css/hazardous_education/hazardous1.css";
import { useNavigate } from 'react-router-dom'; 


const Hazardous2 = () => {
  const navigate = useNavigate(); // import { useNavigate } from 'react-router-dom';
  return (
    <div className="page-container">
           {/* Navigation */}
           <nav className="navbar">
           <div className="nav-buttons">
          <button className="prev-button" onClick={() => navigate('/hazardous1')}>
            &#8592; {/* Left Arrow */}
          </button>
          <button className="next-button" onClick={() => navigate('/hazardous3')}>
            &#8594; {/* Right Arrow */}
          </button>
        </div>

      </nav>



      {/* Hero Section with Gradient Background */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>E-Waste Crisis</h1>
          <p className="hero-subtitle">
          Why Your Old Gadgets Could Be Poisoning the Planet          </p>
          <div className="tags">
            <span className="tag">HAZARDOUS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
      <div id="first-main-content" className="main-contentt">
  <p className="first-paragraph">
    <span className="first-letter">T</span>he rapid advancement of technology has led to an ever-growing pile of discarded electronic devices, commonly known as electronic waste or e-waste. From outdated smartphones and obsolete laptops to broken televisions and used batteries, the improper disposal of these gadgets poses severe environmental and health risks.
  </p>
  <p> As global e-waste generation reaches record highs, it is crucial to understand its impact and explore sustainable solutions.
  </p>

  

          {/* Image with Contributors */}
          <div className="contributors-image-container">
            <img src="/assets/h2.png" alt="Person working on laptop" className="contributors-image" />
            
          </div>



{/* Second Main Content */}
<div id="second-main-content" className="second-main-content">
  <h2>The Environmental Impact of E-Waste</h2>
  <ol>
    <li>
      <h3>Toxic Chemical Contamination</h3>
      <p>
        Electronic devices contain hazardous substances such as lead, mercury, cadmium, and brominated flame retardants.
      </p>
      <p>
        When improperly discarded in landfills, these chemicals leach into the soil and groundwater, contaminating ecosystems.
      </p>
    </li>

    <li>
      <h3>Air Pollution from Open Burning</h3>
      <p>
        In many developing countries, e-waste is burned to extract valuable metals, releasing toxic fumes into the atmosphere.
      </p>
      <p>
        The burning of plastics and circuit boards emits dioxins and furans, which contribute to respiratory diseases and environmental degradation.
      </p>
    </li>

    <li>
      <h3>Soil and Water Pollution</h3>
      <p>
        Heavy metals from disposed electronics seep into the soil, affecting plant and animal life.
      </p>
      <p>
        Contaminated water sources lead to bioaccumulation of toxins in the food chain, affecting human health and biodiversity.
      </p>
    </li>
  </ol>
</div>





    {/* Video Section */}
<div id="video-section" className="video-containerr">
<video width="100%" height="400" controls>
    <source src="/assets/h2.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>


{/* Fourth Main Content */}
<div id="forth-main-content" className="forth-main-content">
  <h2>Statistics on E-Waste Generation</h2>
  <ol>
    <li>
      <p>
        According to the Global E-Waste Monitor 2023, the world generated <strong>57.4 million metric tons</strong> of e-waste in 2021, and this figure is projected to increase by <strong>2 million metric tons annually</strong>.
      </p>
    </li>

    <li>
      <p>
        Only <strong>17.4%</strong> of e-waste is formally collected and recycled, with the rest ending up in landfills or informal recycling sectors.
      </p>
    </li>

    <li>
      <p>
        The <strong>United States and China</strong> are the largest e-waste producers, collectively generating over <strong>30% of global e-waste</strong>.
      </p>
    </li>

    <li>
      <p>
        The average smartphone has a lifespan of <strong>2-3 years</strong>, contributing significantly to the growing electronic waste problem.
      </p>
    </li>
  </ol>
</div>


{/* Fifth Main Content */}
<div id="fifth-main-content" className="fifth-main-content">
  <h2>Solutions to Mitigate the E-Waste Crisis</h2>
  <ol>
    <li>
      <h3>Enhancing Recycling Programs</h3>
      <p>
        Governments and organizations should strengthen formal e-waste recycling programs to ensure safe and efficient processing of electronic waste.
      </p>
      <p>
        Certified e-waste recyclers use eco-friendly methods to recover valuable materials while minimizing pollution.
      </p>
    </li>

    <li>
      <h3>Extended Producer Responsibility (EPR)</h3>
      <p>
        Electronics manufacturers should be required to take back old products and ensure their proper disposal or refurbishment.
      </p>
      <p>
        Some companies, like Apple and Dell, have already implemented trade-in and recycling initiatives.
      </p>
    </li>

    <li>
      <h3>Consumer Awareness and Responsible Disposal</h3>
      <p>
        Individuals should be educated on the importance of recycling electronics at designated collection centers.
      </p>
      <p>
        Donating or reselling functional devices can extend their lifecycle and reduce waste generation.
      </p>
    </li>

    <li>
      <h3>Investment in Sustainable Tech Design</h3>
      <p>
        Tech companies should design products with modular components, making repairs and upgrades easier instead of encouraging a throwaway culture.
      </p>
      <p>
        Using biodegradable and non-toxic materials in electronics can help minimize environmental harm.
      </p>
    </li>

    <li>
      <h3>Government Policies and Global Collaboration</h3>
      <p>
        Stricter regulations on e-waste exports to developing nations can prevent hazardous informal recycling practices.
      </p>
      <p>
        International agreements, such as the Basel Convention, aim to control the transboundary movement of hazardous waste.
      </p>
    </li>
  </ol>
</div>



          {/* Quote */}
          <div id="quote-section" className="quote">
          The e-waste crisis is a growing environmental and public health challenge that requires urgent attention. By implementing stricter recycling regulations, promoting responsible consumer behavior, and encouraging sustainable product design, we can significantly reduce the negative impact of discarded electronics. Governments, corporations, and individuals all have a role to play in ensuring that our old gadgets do not continue to poison the planet.
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

export default Hazardous2;