import React from 'react';
import "../../css/hazardous_education/hazardous1.css";
import { useNavigate } from 'react-router-dom'; // Import navigation hook


const Hazardous3 = () => {
  const navigate = useNavigate(); // import { useNavigate } from 'react-router-dom';
  return (
    <div className="page-container">
           {/* Navigation */}
           <nav className="navbar">
           <div className="nav-buttons">
          <button className="prev-button" onClick={() => navigate('/hazardous2')}>
            &#8592; {/* Left Arrow */}
          </button>
          <button className="next-button" onClick={() => navigate('/hazardous4')}>
            &#8594; {/* Right Arrow */}
          </button>
        </div>

      </nav>



      {/* Hero Section with Gradient Background */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>  Hidden Dangers </h1>
          <p className="hero-subtitle">
        How to Safely Dispose of Household Chemicals Without Harming the Environment          </p>
          <div className="tags">
            <span className="tag">HAZARDOUS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
      <div id="first-main-content" className="main-contentt">
  <p className="first-paragraph">
    <span className="first-letter">H</span>ousehold chemicals are an essential part of daily life, from cleaning products to automotive fluids. However, improper disposal of these substances can pose serious risks to human health, wildlife, and the environment. Understanding how to safely dispose of household chemicals is crucial in preventing pollution and protecting natural resources.
  </p>
  <p> This article explores the types of hazardous household chemicals, proper disposal methods, the consequences of improper disposal, and available regulations and resources.
  </p>

  

          {/* Image with Contributors */}
          <div className="contributors-image-container">
            <img src="/assets/h3.png" alt="Person working on laptop" className="contributors-image" />
            
          </div>



{/* Second Main Content */}
<div id="second-main-content" className="second-main-content">
  <h2>Types of Household Chemicals That Pose Environmental Risks</h2>
  <ol>
    <li>
      <h3>Cleaning Products</h3>
      <p>
        Contain ammonia, bleach, and phosphates that can contaminate waterways.
      </p>
      <p>
        Many are corrosive or reactive, causing chemical burns or toxic fumes.
      </p>
    </li>

    <li>
      <h3>Pesticides and Herbicides</h3>
      <p>
        Toxic to humans, pets, and beneficial insects like bees.
      </p>
      <p>
        Can leach into soil and groundwater, causing long-term ecological damage.
      </p>
    </li>

    <li>
      <h3>Paints, Solvents, and Thinners</h3>
      <p>
        Contain volatile organic compounds (VOCs) that contribute to air pollution.
      </p>
      <p>
        Improper disposal can lead to soil and water contamination.
      </p>
    </li>

    <li>
      <h3>Batteries</h3>
      <p>
        Lead-acid, lithium-ion, and alkaline batteries can release toxic metals.
      </p>
      <p>
        Battery acid can corrode infrastructure and harm wildlife.
      </p>
    </li>

    <li>
      <h3>Automotive Fluids (Oil, Antifreeze, Brake Fluid)</h3>
      <p>
        Oil spills harm aquatic ecosystems by creating an impenetrable layer over water surfaces.
      </p>
      <p>
        Antifreeze is highly toxic to animals and humans.
      </p>
    </li>

    <li>
      <h3>Pharmaceuticals and Personal Care Products</h3>
      <p>
        Flushing medications introduces endocrine-disrupting chemicals into water supplies.
      </p>
      <p>
        Overuse of antibacterial soaps can contribute to antibiotic resistance.
      </p>
    </li>
  </ol>
</div>

{/* Third Main Content */}
<div id="third-main-content" className="third-main-content">
  <h2>Recommended Disposal Methods</h2>
  <ol>
    <li>
      <h3>Use Hazardous Waste Collection Sites</h3>
      <p>
        Many municipalities have drop-off locations for hazardous waste.
      </p>
      <p>
        Local environmental agencies provide information on collection schedules.
      </p>
    </li>

    <li>
      <h3>Recycle or Reuse When Possible</h3>
      <p>
        Paint donation programs accept unused paints.
      </p>
      <p>
        Used motor oil and batteries can be taken to automotive stores for recycling.
      </p>
    </li>

    <li>
      <h3>Neutralization and Safe Storage</h3>
      <p>
        Mixing certain chemicals with absorbents like kitty litter can make them safer for disposal.
      </p>
      <p>
        Always store chemicals in original containers with clear labels.
      </p>
    </li>

    <li>
      <h3>Follow Manufacturer Guidelines</h3>
      <p>
        Many product labels include disposal instructions.
      </p>
      <p>
        Contact manufacturers for eco-friendly disposal options.
      </p>
    </li>

    <li>
      <h3>Avoid Flushing or Dumping into Drains</h3>
      <p>
        Wastewater treatment plants are not equipped to filter hazardous chemicals.
      </p>
      <p>
        Some states impose fines for illegal chemical disposal.
      </p>
    </li>
  </ol>
</div>


{/* Fourth Main Content */}
<div id="forth-main-content" className="forth-main-content">
  <h2>Consequences of Improper Disposal</h2>
  <ol>
    <li>
      <h3>Environmental Damage</h3>
      <p>
        Groundwater contamination affects drinking water supplies.
      </p>
      <p>
        Chemicals can accumulate in ecosystems, leading to bioaccumulation and toxicity in wildlife.
      </p>
    </li>

    <li>
      <h3>Human Health Risks</h3>
      <p>
        Exposure to toxic fumes and contaminated water can cause respiratory illnesses, skin irritation, and poisoning.
      </p>
      <p>
        Long-term exposure to certain chemicals has been linked to cancer and neurological disorders.
      </p>
    </li>

    <li>
      <h3>Legal and Financial Repercussions</h3>
      <p>
        Violations of environmental laws can result in heavy fines or legal action.
      </p>
      <p>
        Cleanup costs for contaminated sites can be extensive.
      </p>
    </li>
  </ol>
</div>

{/* Fifth Main Content */}
<div id="fifth-main-content" className="fifth-main-content">
  <h2>Relevant Statistics and Case Studies</h2>
  <ol>
    <li>
      <p>
        According to the U.S. Environmental Protection Agency (EPA), household hazardous waste contributes to approximately 1.6 million tons of waste annually.
      </p>
    </li>

    <li>
      <p>
        A 2014 case study in Michigan found that improper pesticide disposal led to contamination of a local river, resulting in mass fish deaths and a costly cleanup effort.
      </p>
    </li>

    <li>
      <p>
        The World Health Organization (WHO) estimates that exposure to hazardous chemicals is responsible for 1.6 million deaths worldwide each year.
      </p>
    </li>
  </ol>
</div>



    {/* Video Section */}
<div id="video-section" className="video-containerr">
<video width="100%" height="400" controls>
    <source src="/assets/h3.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

          {/* Quote */}
          <div id="quote-section" className="quote">
          Proper disposal of household chemicals is vital for environmental sustainability and public health. By utilizing local hazardous waste programs, recycling, and following safe disposal guidelines, individuals can significantly reduce pollution and hazardous exposure. Governments and organizations continue to provide resources, but community awareness and responsible consumer behavior play a crucial role in minimizing environmental hazards. By making informed choices, we can collectively contribute to a cleaner and safer planet.
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

export default Hazardous3;