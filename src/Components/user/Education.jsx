import React, { useState, useEffect } from 'react';
import { Grid, List, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../css/Education.css';

const Education = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  
  // Sample education content with hazardous and non-hazardous waste categories
  const educationItems = [
    {
      id: 1,
      title: "Household Chemicals",
      description: "Common household chemicals like bleach, ammonia, and pesticides are considered hazardous waste and require special disposal.",
      image: "/assets/edu1.png",
      category: "hazardous",
      path: "/hazardous1"
    },
    {
      id: 2,
      title: "Electronic Waste",
      description: "Old computers, phones, and batteries contain toxic materials that can harm the environment if not properly recycled.",
      image: "/assets/edu2.png",
      category: "hazardous",
      path: "/hazardous2"
    },
    {
      id: 3,
      title: "Medical Waste",
      description: "Expired medications, sharps, and other medical waste require specialized disposal methods to prevent environmental contamination.",
      image: "/assets/edu3.png",
      category: "hazardous",
      path: "/hazardous3"
    },
    {
      id: 4,
      title: "Automotive Fluids",
      description: "Used motor oil, antifreeze, and brake fluid are hazardous materials that should never be poured down drains or thrown in regular trash.",
      image: "/assets/edu4.png",
      category: "hazardous",
      path: "/education/automotive-fluids"
    },
    {
      id: 5,
      title: "Paint Products",
      description: "Oil-based paints, thinners, and strippers contain chemicals that can contaminate soil and water sources if improperly disposed.",
      image: "/assets/edu5.png",
      category: "hazardous",
      path: "/education/paint-products"
    },
    {
      id: 6,
      title: "Compostable Materials",
      description: "Food scraps, yard waste, and other organic materials can be composted to create nutrient-rich soil instead of sending to landfills.",
      image: "/assets/edu6.png",
      category: "non-hazardous",
      path: "/education/compostable-materials"
    },
    {
      id: 7,
      title: "Recyclable Paper",
      description: "Paper products like newspapers, cardboard, and office paper can be recycled multiple times to reduce waste and save resources.",
      image: "/assets/edu7.png",
      category: "non-hazardous",
      path: "/education/recyclable-paper"
    },
    {
      id: 8,
      title: "Plastic Recycling",
      description: "Different types of plastics require different recycling processes. Learn how to identify and sort plastic waste correctly.",
      image: "/assets/edu8.png",
      category: "non-hazardous",
      path: "/education/plastic-recycling"
    },
    {
      id: 9,
      title: "Glass Disposal",
      description: "Glass containers can be recycled indefinitely without loss of quality, making them an excellent candidate for recycling programs.",
      image: "/assets/edu9.png",
      category: "non-hazardous",
      path: "/education/glass-disposal"
    },
    {
      id: 10,
      title: "Metal Recycling",
      description: "Aluminum cans, steel containers, and other metal items can be recycled to conserve energy and reduce mining of raw materials.",
      image: "/assets/edu10.png",
      category: "non-hazardous",
      path: "/education/metal-recycling"
    }
  ];
  
  // Filter items based on search query and category
  useEffect(() => {
    let filtered = educationItems;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, activeCategory]);
  
  // Initialize filtered items on component mount
  useEffect(() => {
    setFilteredItems(educationItems);
  }, []);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Toggle between grid and list view
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };
  
  // Handle category filter
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  // Navigate to specific education page
  const navigateToEducation = (path) => {
    navigate(path);
  };
  
  return (
    <div className="education-container">
      <div className="education-header">
        <h1>Waste Education Center</h1>
        <p>Learn about different types of waste and proper disposal methods</p>
      </div>
      
      <div className="education-controls">
        <div className="search-box">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search by title..." 
            value={searchQuery} 
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="view-toggles">
          <button 
            className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`} 
            onClick={() => toggleViewMode('grid')}
          >
            <Grid size={20} />
          </button>
          <button 
            className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`} 
            onClick={() => toggleViewMode('list')}
          >
            <List size={20} />
          </button>
        </div>
      </div>
      
      <div className="category-tabs">
        <button 
          className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          All
        </button>
        <button 
          className={`category-tab ${activeCategory === 'hazardous' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('hazardous')}
        >
          Hazardous
        </button>
        <button 
          className={`category-tab ${activeCategory === 'non-hazardous' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('non-hazardous')}
        >
          Non-Hazardous
        </button>
      </div>
      
      <div className={`education-items ${viewMode}`}>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className={`education-card ${item.category}`}>
              <div className="card-image">
                <img src={item.image} alt={item.title} />
                <div className="category-badge">{item.category}</div>
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button 
                  className="learn-more-btn"
                  onClick={() => navigateToEducation(item.path)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No matching items found</h3>
            <p>Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;