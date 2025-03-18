import React, { useEffect, useState } from 'react';

import '../../css/nonhazardous_education/nonhazardous4.css';
import { useNavigate } from 'react-router-dom'; // Import navigation hook


const Nonhazardous4 = () => {
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
          <button className="prev-button" onClick={() => navigate('/nonhazardous3')}>
            &#8592; {/* Left Arrow */}
          </button>
          <button className="next-button" onClick={() => navigate('/nonhazardous5')}>
            &#8594; {/* Right Arrow */}
          </button>
        </div>

      </nav>



      {/* Hero Section with Gradient Background */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Scrap to Sustainability</h1>
          <p className="hero-subtitle">
          The Environmental and Economic Benefits of Metal Recycling
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
    <span className="first-letter">M</span>etal recycling plays a crucial role in environmental conservation and economic growth. Unlike many materials, metals can be recycled indefinitely without losing their properties, making them a sustainable resource. This process significantly reduces landfill waste, conserves natural resources, and lowers greenhouse gas emissions. 
  </p>
  <p> Additionally, the metal recycling industry generates economic benefits such as job creation, cost savings for manufacturers, and increased revenue from reclaimed materials. Understanding the full scope of these benefits can help drive more efficient recycling efforts worldwide.
  </p>

  

          {/* Image with Contributors */}
          <div className="contributors-image-container">
            <img src="/assets/nh4.png" alt="Person working on laptop" className="contributors-image" />
            
          </div>



{/* Second Main Content */}
<div id="second-main-content" className="second-main-content">
  <h2>Environmental Benefits of Metal Recycling</h2>

  <ol>
    <li>
      <h3>Reducing Landfill Waste</h3>
      <p>
        Millions of tons of scrap metal end up in landfills each year, occupying valuable space and contributing to environmental pollution.
      </p>
      <p>
        Recycling metal keeps these materials out of landfills, reducing soil and water contamination from rusting and corroding metals.
      </p>
    </li>

    <li>
      <h3>Conserving Natural Resources</h3>
      <p>
        Extracting raw metals from ores requires extensive mining, which leads to deforestation, soil erosion, and habitat destruction.
      </p>
      <p>
        Recycling one ton of steel conserves approximately 2,500 pounds of iron ore, 1,400 pounds of coal, and 120 pounds of limestone.
      </p>
      <p>
        Aluminum recycling saves 95% of the energy required to produce new aluminum from bauxite ore.
      </p>
    </li>

    <li>
      <h3>Lowering Greenhouse Gas Emissions</h3>
      <p>
        Mining and refining metals produce high levels of carbon dioxide (CO₂) and other greenhouse gases.
      </p>
      <p>
        The U.S. Environmental Protection Agency (EPA) estimates that recycling steel can cut CO₂ emissions by 58% compared to new steel production.
      </p>
      <p>
        Copper recycling reduces energy use by 85%, and lead recycling cuts emissions by 99%.
      </p>
    </li>
  </ol>
</div>


{/* Third Main Content */}
<div id="third-main-content" className="third-main-content">
  <h2>Economic Benefits of Metal Recycling</h2>

  <ol>
    <li>
      <h3>Job Creation in the Recycling Industry</h3>
      <p>
        The metal recycling industry employs thousands of workers in collection, processing, and manufacturing.
      </p>
      <p>
        According to the Institute of Scrap Recycling Industries (ISRI), metal recycling supports over 500,000 jobs in the U.S. alone.
      </p>
      <p>
        Recycling facilities provide stable employment and contribute to local economies.
      </p>
    </li>

    <li>
      <h3>Cost Savings for Manufacturers</h3>
      <p>
        Producing new metal from raw ore is expensive and energy-intensive.
      </p>
      <p>
        Using recycled metals allows manufacturers to lower production costs, which can lead to reduced prices for consumers.
      </p>
      <p>
        Industries such as automotive, construction, and electronics benefit from affordable, high-quality recycled metals.
      </p>
    </li>

    <li>
      <h3>Revenue from Recycled Materials</h3>
      <p>
        Scrap metal is a valuable commodity, with global markets buying and selling recycled steel, aluminum, copper, and other metals.
      </p>
      <p>
        In 2022, the global scrap metal recycling market was valued at over $60 billion and is expected to grow steadily.
      </p>
      <p>
        Many individuals and businesses earn additional income by selling scrap metal to recycling centers.
      </p>
    </li>
  </ol>
</div>


    {/* Video Section */}
<div id="video-section" className="video-containerr">
<video width="100%" height="400" controls>
    <source src="/assets/nh4.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>


{/* Fourth Main Content */}
<div id="forth-main-content" className="forth-main-content">
  <h2>Case Studies and Statistics</h2>

  <div className="case-study">
    <h3>Case Study: Sweden’s Circular Economy Model</h3>
    <p>
      Sweden recycles nearly 100% of its scrap metal, integrating recycling into its economy and reducing reliance on imported raw materials.
    </p>
  </div>

  <div className="statistic">
    <h3>Statistic: Energy Savings</h3>
    <p>
      Recycling one ton of aluminum saves 14,000 kWh of electricity, enough to power an average home for 13 years.
    </p>
  </div>

  <div className="example">
    <h3>Example: U.S. Steel Industry</h3>
    <p>
      More than 60% of new steel in the U.S. is made from recycled materials, showcasing the efficiency of the recycling process.
    </p>
  </div>
</div>

{/* Fifth Main Content */}
<div id="fifth-main-content" className="fifth-main-content">
  <h2>How Individuals and Businesses Can Support Metal Recycling</h2>

  <div className="recycling-tip">
    <h3>1. Proper Sorting and Disposal</h3>
    <p>
      Separate ferrous (iron-based) and non-ferrous metals for easier processing.
      Avoid contaminating scrap metal with non-recyclable materials such as plastic coatings or excessive rust.
    </p>
  </div>

  <div className="recycling-tip">
    <h3>2. Utilizing Scrap Yards and Recycling Centers</h3>
    <p>
      Locate nearby metal recycling facilities to drop off scrap metal responsibly.
      Businesses should establish recycling programs to ensure metal waste is collected and processed efficiently.
    </p>
  </div>

  <div className="recycling-tip">
    <h3>3. Advocating for Sustainable Practices</h3>
    <p>
      Support policies that promote recycling incentives and stricter regulations on metal waste disposal.
      Educate communities about the benefits of recycling and encourage participation in local programs.
    </p>
  </div>
</div>



          {/* Quote */}
          <div id="quote-section" className="quote">
          Metal recycling is a key component of sustainable development, offering both environmental and economic advantages. By reducing landfill waste, conserving resources, and lowering emissions, recycling metals helps combat climate change and environmental degradation. Additionally, the economic impact of metal recycling—including job creation, cost savings, and market growth—makes it a vital industry for long-term sustainability. Through individual efforts, corporate responsibility, and supportive policies, metal recycling can continue to drive a cleaner, more efficient circular economy for future generations.

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

export default Nonhazardous4;