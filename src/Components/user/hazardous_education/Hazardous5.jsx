import React from 'react';
import "../../css/hazardous_education/hazardous1.css";
import { useNavigate } from 'react-router-dom'; // Import navigation hook


const Hazardous5 = () => {
  const navigate = useNavigate(); // import { useNavigate } from 'react-router-dom';
  return (
    <div className="page-container">
           {/* Navigation */}
           <nav className="navbar">
           <div className="nav-buttons">
          <button className="prev-button" onClick={() => navigate('/hazardous4')}>
            &#8592; {/* Left Arrow */}
          </button>
          <button className="next-button" onClick={() => navigate('/nonhazardous1')}>
            &#8594; {/* Right Arrow */}
          </button>
        </div>

      </nav>



      {/* Hero Section with Gradient Background */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Toxic Trails</h1>
          <p className="hero-subtitle">
         The Environmental Impact of Automotive Fluids and How to Handle Them Safely          </p>
          <div className="tags">
            <span className="tag">HAZARDOUS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
      <div id="first-main-content" className="main-contentt">
  <p className="first-paragraph">
    <span className="first-letter">A</span>utomobiles play a crucial role in modern transportation, but their maintenance comes with environmental costs. Automotive fluids, including motor oil, coolant, brake fluid, and transmission fluid, contain hazardous substances that can severely impact ecosystems if not disposed of properly. Improper disposal leads to soil contamination, water pollution, and harm to wildlife.
  </p>
  <p> This article explores the environmental dangers of automotive fluids, best practices for their safe handling and disposal, and relevant regulations designed to mitigate their impact.
  </p>

  

          {/* Image with Contributors */}
          <div className="contributors-image-container">
            <img src="/assets/h5.png" alt="Person working on laptop" className="contributors-image" />
            
          </div>


{/* Second Main Content */}
<div id="second-main-content" className="second-main-content">
  <h2>Environmental Issues Associated with Automotive Fluids</h2>
  <ol>
    <li>
      <h3>Motor Oil Contamination</h3>
      <p>
        Used motor oil contains heavy metals and toxic chemicals such as lead, arsenic, and benzene.
      </p>
      <p>
        Just one gallon of used oil can contaminate one million gallons of water if improperly disposed of.
      </p>
      <p>
        Oil spills create a surface film on water bodies, blocking oxygen exchange and harming aquatic life.
      </p>
    </li>

    <li>
      <h3>Coolant (Antifreeze) Pollution</h3>
      <p>
        Coolant, often composed of ethylene glycol or propylene glycol, is highly toxic to animals and marine life.
      </p>
      <p>
        Spilled coolant attracts pets and wildlife due to its sweet taste, leading to fatal poisoning.
      </p>
      <p>
        Ingesting even two tablespoons of ethylene glycol can be lethal to small animals.
      </p>
    </li>

    <li>
      <h3>Brake Fluid and Transmission Fluid Contamination</h3>
      <p>
        Brake and transmission fluids contain hydrocarbons and toxic additives that persist in the environment.
      </p>
      <p>
        When leaked onto roads, these fluids are washed into storm drains, leading to water pollution.
      </p>
      <p>
        Exposure to contaminated water can cause organ damage in wildlife and disrupt aquatic ecosystems.
      </p>
    </li>

    <li>
      <h3>Windshield Washer Fluid Hazards</h3>
      <p>
        Many windshield washer fluids contain methanol, a highly toxic alcohol that can contaminate groundwater.
      </p>
      <p>
        Ingesting methanol is harmful to both humans and animals, leading to blindness and neurological damage.
      </p>
    </li>
  </ol>
</div>


{/* Third Main Content */}
<div id="third-main-content" className="third-main-content">
  <h2>The Effects of Improper Disposal on Ecosystems</h2>
  <ol>
    <li>
      <h3>Soil Contamination</h3>
      <p>
        Automotive fluids seep into the ground, degrading soil quality and killing essential microorganisms.
      </p>
      <p>
        Contaminated soil affects plant growth, reducing agricultural productivity.
      </p>
    </li>

    <li>
      <h3>Waterway Pollution</h3>
      <p>
        Runoff from roads and illegal dumping introduce hazardous chemicals into rivers, lakes, and oceans.
      </p>
      <p>
        Oil slicks and chemical pollutants reduce oxygen levels, leading to fish kills and ecosystem collapse.
      </p>
    </li>

    <li>
      <h3>Threats to Human Health</h3>
      <p>
        Contaminated groundwater affects drinking water supplies, leading to severe health issues such as cancer, liver damage, and neurological disorders.
      </p>
      <p>
        Workers handling automotive waste without proper precautions risk exposure to toxic fumes and skin absorption of hazardous chemicals.
      </p>
    </li>
  </ol>
</div>





    {/* Video Section */}
<div id="video-section" className="video-containerr">
<video width="100%" height="400" controls>
    <source src="/assets/h5.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>



{/* Fourth Main Content */}
<div id="forth-main-content" className="forth-main-content">
  <h2>Best Practices for Safe Handling and Disposal of Automotive Fluids</h2>
  
  <ol>
    <li>
      <h3>Proper Collection and Storage</h3>
      <p>Use designated spill-proof containers to collect used fluids.</p>
      <p>Store automotive fluids in a cool, dry place away from heat sources to prevent fire hazards.</p>
      <p>Never mix different fluids, as this can create hazardous chemical reactions.</p>
    </li>

    <li>
      <h3>Recycling and Reuse</h3>
      <p><strong>Used motor oil recycling:</strong> Many auto shops and recycling centers accept used motor oil for refining and reuse.</p>
      <p><strong>Coolant recycling:</strong> Some facilities offer antifreeze recycling, reducing the need for new chemical production.</p>
      <p><strong>Brake and transmission fluid disposal:</strong> Specialized waste management companies process these fluids safely.</p>
    </li>

    <li>
      <h3>Spill Prevention and Cleanup</h3>
      <p>Use absorbent materials like cat litter or sawdust to clean spills immediately.</p>
      <p>Dispose of contaminated absorbents in hazardous waste facilities.</p>
      <p>Maintain vehicles regularly to prevent leaks and fluid losses.</p>
    </li>

    <li>
      <h3>Designated Disposal Sites</h3>
      <p>Many local governments and auto parts stores provide drop-off points for hazardous automotive waste.</p>
      <p>Contact local waste management authorities to locate certified disposal centers.</p>
    </li>
  </ol>
</div>



{/* Fifth Main Content */}
<div id="fifth-main-content" className="fifth-main-content">
  <h2>Regulations and Guidelines for Automotive Fluid Disposal</h2>

  <ol>
    <li>
      <h3>United States Environmental Protection Agency (EPA) Regulations</h3>
      <p>
        The <strong>Resource Conservation and Recovery Act (RCRA)</strong> classifies used motor oil and other automotive fluids as hazardous waste.
      </p>
      <p>
        The <strong>Clean Water Act</strong> prohibits dumping automotive fluids into water sources.
      </p>
    </li>

    <li>
      <h3>European Union (EU) Waste Management Directives</h3>
      <p>
        The <strong>Waste Framework Directive (2008/98/EC)</strong> mandates proper disposal and recycling of hazardous automotive waste.
      </p>
      <p>
        The <strong>End-of-Life Vehicles (ELV) Directive</strong> encourages vehicle manufacturers to design for recyclability.
      </p>
    </li>

    <li>
      <h3>Local and State Regulations</h3>
      <p>
        Many states and municipalities have additional restrictions on the disposal of automotive fluids.
      </p>
      <p>
        In California, the <strong>Department of Toxic Substances Control (DTSC)</strong> enforces strict regulations on hazardous waste disposal.
      </p>
    </li>
  </ol>
</div>


          {/* Quote */}
          <div id="quote-section" className="quote">
          Automotive fluids, if not managed properly, pose significant environmental and health risks. Motor oil, coolant, brake fluid, and other substances contribute to soil degradation, water pollution, and harm to wildlife. By following best practices such as proper collection, recycling, and compliance with regulations, individuals and businesses can mitigate the negative impact of automotive waste. Governments and communities must work together to promote responsible disposal practices, ensuring a cleaner and safer environment for future generations.
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

export default Hazardous5;