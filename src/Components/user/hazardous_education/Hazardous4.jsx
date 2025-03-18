import React from 'react';
import "../../css/hazardous_education/hazardous1.css";
import { useNavigate } from 'react-router-dom'; // Import navigation hook


const Hazardous4 = () => {
  const navigate = useNavigate(); // import { useNavigate } from 'react-router-dom';
  return (
    <div className="page-container">
           {/* Navigation */}
           <nav className="navbar">
           <div className="nav-buttons">
          <button className="prev-button" onClick={() => navigate('/hazardous3')}>
            &#8592; {/* Left Arrow */}
          </button>
          <button className="next-button" onClick={() => navigate('/hazardous5')}>
            &#8594; {/* Right Arrow */}
          </button>
        </div>

      </nav>



      {/* Hero Section with Gradient Background */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>More Than Just a Mess</h1>
          <p className="hero-subtitle">
        The Right Way to Dispose of Paint and Protect Our Waterways          </p>
          <div className="tags">
            <span className="tag">HAZARDOUS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
      <div id="first-main-content" className="main-contentt">
  <p className="first-paragraph">
    <span className="first-letter">P</span>aint is an essential component of home improvement, construction, and artistic projects, but improper disposal can have devastating effects on the environment, particularly our waterways. Many types of paint contain harmful chemicals that, when disposed of incorrectly, contaminate soil, rivers, lakes, and even drinking water sources. Understanding the right disposal methods for different types of paint is crucial to protecting ecosystems and public health.
  </p>
  <p>  This article explores the environmental impact of improper paint disposal, best practices for responsible disposal, and relevant regulations that individuals and businesses should follow.
  </p>

  

          {/* Image with Contributors */}
          <div className="contributors-image-container">
            <img src="/assets/h4.png" alt="Person working on laptop" className="contributors-image" />
            
          </div>


{/* Second Main Content */}
<div id="second-main-content" className="second-main-content">
  <h2>The Environmental Impact of Improper Paint Disposal</h2>
  <ol>
    <li>
      <h3>Water Contamination</h3>
      <p>
        Paint contains heavy metals, volatile organic compounds (VOCs), and toxic additives that can seep into groundwater or be washed into storm drains.
      </p>
      <p>
        Even small amounts of paint can disrupt aquatic ecosystems, affecting fish, amphibians, and other marine life.
      </p>
    </li>

    <li>
      <h3>Soil Pollution</h3>
      <p>
        Disposing of paint by pouring it onto the ground or into landfills can lead to soil contamination.
      </p>
      <p>
        Toxic chemicals in paint can degrade soil quality, making it uninhabitable for plant and microbial life.
      </p>
    </li>

    <li>
      <h3>Air Pollution</h3>
      <p>
        Oil-based paints release VOCs into the atmosphere, contributing to air pollution and respiratory issues in humans.
      </p>
      <p>
        Improperly stored or disposed paint can release hazardous fumes, impacting air quality.
      </p>
    </li>

    <li>
      <h3>Impact on Wildlife and Public Health</h3>
      <p>
        Animals that come into contact with improperly disposed paint may suffer from poisoning and health complications.
      </p>
      <p>
        Humans exposed to contaminated water sources can experience skin irritation, respiratory problems, and long-term health issues due to heavy metal accumulation.
      </p>
    </li>
  </ol>
</div>

{/* Third Main Content */}
<div id="third-main-content" className="third-main-content">
  <h2>Best Practices for Disposing of Different Types of Paint</h2>
  <ol>
    <li>
      <h3>Water-Based (Latex) Paint Disposal</h3>
      <p>
        <strong>Dry It Out:</strong> Small amounts of leftover latex paint can be dried out by leaving the lid off in a well-ventilated area or mixing it with absorbents like cat litter or sawdust.
      </p>
      <p>
        <strong>Curbside Collection:</strong> Some municipalities allow dried-out paint cans to be placed with regular household waste, but it's essential to check local regulations.
      </p>
      <p>
        <strong>Recycling:</strong> Many communities have paint recycling programs that accept latex paint for repurposing and reuse.
      </p>
    </li>

    <li>
      <h3>Oil-Based Paint Disposal</h3>
      <p>
        <strong>Hazardous Waste Facilities:</strong> Oil-based paints contain solvents and flammable substances, making them hazardous waste that must be taken to a certified disposal facility.
      </p>
      <p>
        <strong>Never Pour Down the Drain:</strong> Even small amounts of oil-based paint can contaminate water sources and harm plumbing systems.
      </p>
      <p>
        <strong>Donation Programs:</strong> Some organizations accept unused oil-based paint for reuse in community projects.
      </p>
    </li>

    <li>
      <h3>Spray Paint Disposal</h3>
      <p>
        <strong>Empty Cans Properly:</strong> Completely empty aerosol cans can sometimes be recycled, depending on local waste management policies.
      </p>
      <p>
        <strong>Hazardous Waste Collection:</strong> Partially full cans should be taken to hazardous waste facilities to prevent the release of harmful chemicals into the environment.
      </p>
    </li>

    <li>
      <h3>Paint Thinners and Solvents</h3>
      <p>
        <strong>Reuse When Possible:</strong> Paint thinners can often be strained and reused for future projects.
      </p>
      <p>
        <strong>Hazardous Waste Disposal:</strong> Leftover or contaminated solvents should be taken to designated hazardous waste collection sites.
      </p>
      <p>
        <strong>Avoid Evaporation:</strong> Never leave paint thinners open to evaporate, as they release harmful VOCs into the air.
      </p>
    </li>
  </ol>
</div>


{/* Forth Main Content */}
<div id="forth-main-content" className="forth-main-content">
  <h2>The Importance of Protecting Our Waterways</h2>
  <ol>
    <li>
      <h3>Ecosystem Preservation</h3>
      <p>
        Water pollution from improperly disposed paint disrupts the balance of aquatic life.
      </p>
      <p>
        Fish and marine organisms are particularly sensitive to toxins found in paint, leading to population declines and ecosystem instability.
      </p>
    </li>

    <li>
      <h3>Safe Drinking Water</h3>
      <p>
        Contaminated water sources can introduce heavy metals and harmful chemicals into public drinking water supplies.
      </p>
      <p>
        Preventing pollution ensures cleaner water for both human consumption and agricultural use.
      </p>
    </li>

    <li>
      <h3>Community and Public Health Benefits</h3>
      <p>
        Proper disposal of paint reduces environmental toxins that contribute to respiratory illnesses, skin conditions, and long-term health risks.
      </p>
      <p>
        Cleaner waterways benefit recreational activities like swimming, fishing, and boating.
      </p>
    </li>
  </ol>
</div>


{/* Fifth Main Content */}
<div id="fifth-main-content" className="fifth-main-content">
  <h2>Case Studies: The Impact of Improper Paint Disposal</h2>
  <ol>
    <li>
      <h3>Urban Water Contamination in the U.S.</h3>
      <p>
        In several U.S. cities, illegal dumping of paint into storm drains has led to costly clean-up efforts and fines for businesses violating environmental laws.
      </p>
      <p>
        Public awareness campaigns have since reduced incidents by educating residents on proper disposal methods.
      </p>
    </li>

    <li>
      <h3>River Pollution in Europe</h3>
      <p>
        A study in Germany found that improper disposal of household chemicals, including paint, contributed significantly to heavy metal contamination in urban rivers.
      </p>
      <p>
        Strengthened regulations and recycling programs have improved water quality and reduced hazardous waste in landfills.
      </p>
    </li>

    <li>
      <h3>Community-Led Paint Recycling Initiatives</h3>
      <p>
        In Canada, a government-supported paint recycling program has successfully diverted millions of gallons of leftover paint from landfills.
      </p>
      <p>
        Collected paint is either reprocessed into new products or safely disposed of, reducing environmental harm.
      </p>
    </li>
  </ol>
</div>




    {/* Video Section */}
<div id="video-section" className="video-containerr">
<video width="100%" height="400" controls>
    <source src="/assets/h4.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

          {/* Quote */}
          <div id="quote-section" className="quote">
          Paint disposal may seem like a minor issue, but its environmental impact is significant. Proper disposal practices help protect waterways, preserve ecosystems, and maintain public health. Whether drying out latex paint for curbside disposal, taking oil-based paints to hazardous waste facilities, or participating in paint recycling programs, individuals and businesses have a responsibility to follow best practices and regulations. By making informed choices, we can collectively prevent pollution, conserve resources, and ensure cleaner, safer communities for future generations.

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

export default Hazardous4;