import React, { useEffect, useState } from 'react';

import '../../css/nonhazardous_education/nonhazardous2.css';
import { useNavigate } from 'react-router-dom'; // Import navigation hook


const Nonhazardous2 = () => {
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
          <button className="prev-button" onClick={() => navigate('/nonhazardous1')}>
            &#8592; {/* Left Arrow */}
          </button>
          <button className="next-button" onClick={() => navigate('/nonhazardous3')}>
            &#8594; {/* Right Arrow */}
          </button>
        </div>

      </nav>



      {/* Hero Section with Gradient Background */}
      <div className="hero-section">
        <div className="hero-content">
          <h1> Compostable Materials</h1>
          <p className="hero-subtitle">
         Turning Trash into Treasure – The Power of Composting for a Greener Planet
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
    <span className="first-letter">I</span>n a world where waste management is a growing concern, composting has emerged as an effective and sustainable solution for reducing landfill waste and enriching soil health. Composting transforms organic waste into nutrient-rich compost, a natural fertilizer that benefits the environment and supports plant growth.
  </p>
  <p> This article explores compostable materials, the environmental advantages of composting, and practical ways individuals and communities can adopt this eco-friendly practice.
  </p>

  

          {/* Image with Contributors */}
          <div className="contributors-image-container">
            <img src="/assets/nh2.png" alt="Person working on laptop" className="contributors-image" />
            
          </div>



{/* Second Main Content */}
<div id="second-main-content" className="second-main-content">
  <h2>What Are Compostable Materials?</h2>
  <p>
    Compostable materials are organic waste items that break down naturally and turn into nutrient-rich compost. These materials fall into two categories:
  </p>

  <h3>Green Materials (Nitrogen-Rich)</h3>
  <ul>
    <li>Fruit and vegetable scraps</li>
    <li>Coffee grounds and tea leaves</li>
    <li>Grass clippings and plant trimmings</li>
    <li>Eggshells</li>
  </ul>

  <h3>Brown Materials (Carbon-Rich)</h3>
  <ul>
    <li>Dry leaves and twigs</li>
    <li>Shredded newspaper and cardboard</li>
    <li>Sawdust and untreated wood chips</li>
    <li>Straw and hay</li>
  </ul>

  <h3>Materials to Avoid</h3>
  <ul>
    <li>Meat, dairy, and oily food scraps (attract pests and produce odor)</li>
    <li>Treated wood and synthetic materials (contain chemicals that harm compost quality)</li>
    <li>Pet waste and diseased plants (may introduce pathogens)</li>
  </ul>
</div>


{/* Third Main Content */}
<div id="third-main-content" className="third-main-content">
  <h2>Environmental Benefits of Composting</h2>

  <h3>Reduces Landfill Waste</h3>
  <ul>
    <li>Organic waste makes up about 30% of landfill waste in the U.S., according to the EPA.</li>
    <li>Composting diverts this waste from landfills, reducing methane emissions that contribute to climate change.</li>
  </ul>

  <h3>Improves Soil Health</h3>
  <ul>
    <li>Compost enhances soil structure, increasing its ability to retain moisture and nutrients.</li>
    <li>It naturally suppresses plant diseases and pests, reducing the need for chemical fertilizers and pesticides.</li>
  </ul>

  <h3>Lowers Carbon Footprint</h3>
  <ul>
    <li>Composting helps sequester carbon in the soil, preventing excess CO₂ from entering the atmosphere.</li>
    <li>Reduces greenhouse gas emissions from organic waste decomposition in landfills.</li>
  </ul>

  <h3>Conserves Water</h3>
  <ul>
    <li>Soils enriched with compost retain more water, reducing the need for irrigation.</li>
    <li>Prevents soil erosion and enhances drought resistance.</li>
  </ul>
</div>



    {/* Video Section */}
<div id="video-section" className="video-containerr">
<video width="100%" height="400" controls>
    <source src="/assets/nh2.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>



{/* Fourth Main Content */}
<div id="forth-main-content" className="forth-main-content">
  <h2>Practical Tips for Effective Composting</h2>

  <h3>For Individuals:</h3>

  <h4>Start a Backyard Compost Pile</h4>
  <ul>
    <li>Choose a well-ventilated area with good drainage.</li>
    <li>Layer green and brown materials to maintain the right carbon-to-nitrogen ratio.</li>
    <li>Turn the pile regularly to speed up decomposition.</li>
  </ul>

  <h4>Use a Compost Bin</h4>
  <ul>
    <li>Great for small spaces or urban homes.</li>
    <li>Keep it moist but not too wet to avoid foul odors.</li>
  </ul>

  <h4>Try Vermicomposting</h4>
  <ul>
    <li>Uses worms to break down food waste efficiently.</li>
    <li>Ideal for indoor composting in apartments or small homes.</li>
  </ul>

  <h3>For Communities:</h3>

  <h4>Establish Local Composting Programs</h4>
  <ul>
    <li>Cities can create municipal composting sites to process food and yard waste.</li>
    <li>Schools and businesses can implement composting initiatives to reduce waste generation.</li>
  </ul>

  <h4>Promote Education and Awareness</h4>
  <ul>
    <li>Workshops and community events can teach residents the benefits of composting.</li>
    <li>Local governments can offer incentives like free compost bins or tax benefits.</li>
  </ul>

  <h4>Encourage Collaboration with Farmers and Gardeners</h4>
  <ul>
    <li>Partnering with local farms can provide them with quality compost while reducing food waste.</li>
    <li>Community gardens can benefit from shared composting efforts.</li>
  </ul>
</div>


{/* Fifth Main Content */}
<div id="fifth-main-content" className="fifth-main-content">
  <h2>The Impact of Composting: Statistics and Case Studies</h2>

  <h3>San Francisco’s Zero Waste Goal</h3>
  <ul>
    <li>San Francisco has one of the most successful composting programs in the U.S., diverting over 80% of its waste from landfills.</li>
    <li>The city’s composting initiative has significantly reduced landfill methane emissions and enhanced urban green spaces.</li>
  </ul>

  <h3>Composting in Schools</h3>
  <ul>
    <li>Studies show that school composting programs reduce food waste by up to 50% while teaching students about sustainability.</li>
  </ul>

  <h3>Global Composting Efforts</h3>
  <ul>
    <li>In the EU, composting is a key component of waste management, with over 40% of biodegradable waste being composted or anaerobically digested.</li>
  </ul>
</div>

          {/* Quote */}
          <div id="quote-section" className="quote">
          Composting is a simple yet powerful way to reduce waste, improve soil health, and combat climate change. Whether at home, in schools, or on a community-wide scale, adopting composting practices can lead to a greener and more sustainable future. By turning trash into treasure, we not only minimize environmental harm but also contribute to a healthier planet for future generations. It’s time to embrace the power of composting and transform waste into a valuable resource.

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

export default Nonhazardous2;