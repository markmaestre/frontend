import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/Maps.css";

// Custom Icons
const userIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [1, -34],
});

const recycleIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2933/2933821.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [1, -34],
});

// Function to calculate distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};

// Function to fetch recycling centers
const fetchRecyclingCenters = async (lat, lon, radius = 5000) => {
  try {
    const query = `
      [out:json];
      (
        node["recycling_type"](around:${radius}, ${lat}, ${lon});
      );
      out;
    `;
    const response = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.elements.map((place) => ({
      lat: place.lat,
      lon: place.lon,
      name: place.tags.name || "Recycling Center",
      type: place.tags.recycling_type || "Unknown",
      materials: place.tags.recycling_material || "Various",
      id: place.id
    }));
  } catch (error) {
    console.error("Error fetching recycling centers:", error);
    return [];
  }
};

// Component to move the map when a location is selected
const ChangeMapCenter = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

const RecyclingCenters = () => {
  const [location, setLocation] = useState(null);
  const [centers, setCenters] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [searchRadius, setSearchRadius] = useState(5000);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [availableTypes, setAvailableTypes] = useState([]);
  
  const updateCenters = async (lat, lon, radius) => {
    setIsLoading(true);
    const data = await fetchRecyclingCenters(lat, lon, radius);
    
    const centersWithDistance = data.map((center) => ({
      ...center,
      distance: calculateDistance(lat, lon, center.lat, center.lon),
    }));
    
    // Extract all unique recycling types for filtering
    const types = [...new Set(centersWithDistance.map(center => center.type))];
    setAvailableTypes(types);
    
    setCenters(centersWithDistance);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        updateCenters(latitude, longitude, searchRadius);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError("Unable to retrieve location. Please enable GPS.");
      }
    );
  }, []);

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedCenters = [...centers].sort((a, b) =>
      order === "asc" ? a.distance - b.distance : b.distance - a.distance
    );
    setCenters(sortedCenters);
  };

  const handleRadiusChange = async (newRadius) => {
    setSearchRadius(newRadius);
    if (location) {
      await updateCenters(location.latitude, location.longitude, newRadius);
    }
  };

  const handleCenterSelect = (center) => {
    setSelectedCenter(center);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const filteredCenters = filterType === "all" 
    ? centers 
    : centers.filter(center => center.type === filterType);

  return (
    <div className="container">
      <h1 className="title">Nearby Recycling Centers</h1>
      {error ? (
        <p className="error-text">{error}</p>
      ) : location ? (
        <>
          <div className="controls-container">
            <div className="control-group">
              <label>Search Radius:</label>
              <select 
                onChange={(e) => handleRadiusChange(Number(e.target.value))} 
                value={searchRadius}
                disabled={isLoading}
              >
                <option value="1000">1 km</option>
                <option value="3000">3 km</option>
                <option value="5000">5 km</option>
                <option value="10000">10 km</option>
                <option value="20000">20 km</option>
              </select>
            </div>

            <div className="control-group">
              <label>Sort by Distance:</label>
              <select onChange={(e) => handleSortChange(e.target.value)} value={sortOrder}>
                <option value="asc">Nearest First</option>
                <option value="desc">Farthest First</option>
              </select>
            </div>
            
            <div className="control-group">
              <label>Filter by Type:</label>
              <select onChange={(e) => handleFilterChange(e.target.value)} value={filterType}>
                <option value="all">All Types</option>
                {availableTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="list-map-container">
            {/* List of Recycling Centers */}
            <div className="center-list">
              <h2>Recycling Centers List</h2>
              {isLoading ? (
                <p>Loading centers...</p>
              ) : filteredCenters.length > 0 ? (
                <ul>
                  {filteredCenters.map((center) => (
                    <li 
                      key={center.id} 
                      className={selectedCenter && selectedCenter.id === center.id ? "selected-center" : ""}
                      onClick={() => handleCenterSelect(center)}
                    >
                      <strong>{center.name}</strong> - {center.distance} km
                      <div className="center-details">
                        <span>Type: {center.type}</span>
                        <span>Materials: {center.materials}</span>
                      </div>
                      <div className="center-actions">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lon}`, '_blank');
                          }} 
                          className="goto-maps-button"
                        >
                          Directions
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCenterSelect(center);
                          }} 
                          className="view-on-map-button"
                        >
                          Show on Map
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recycling centers found in this area{filterType !== "all" ? " with the selected filter" : ""}.</p>
              )}
            </div>

            {/* Map Display */}
            <div className="map-container">
              <MapContainer center={[location.latitude, location.longitude]} zoom={14} className="map">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {/* User Location Marker */}
                <Marker position={[location.latitude, location.longitude]} icon={userIcon}>
                  <Popup>You are here</Popup>
                </Marker>

                {/* Search Radius Circle */}
                <Circle 
                  center={[location.latitude, location.longitude]} 
                  radius={searchRadius} 
                  pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.05 }}
                />

                {/* Recycling Centers Markers */}
                {filteredCenters.map((center) => (
                  <Marker 
                    key={center.id} 
                    position={[center.lat, center.lon]} 
                    icon={recycleIcon}
                    eventHandlers={{
                      click: () => {
                        handleCenterSelect(center);
                      }
                    }}
                  >
                    <Popup>
                      <div>
                        <h3>{center.name}</h3>
                        <p>Distance: {center.distance} km</p>
                        <p>Type: {center.type}</p>
                        <p>Materials: {center.materials}</p>
                        <button 
                          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lon}`, '_blank')}
                          className="popup-button"
                        >
                          Get Directions
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Move map when clicking a center */}
                {selectedCenter && (
                  <ChangeMapCenter 
                    center={[selectedCenter.lat, selectedCenter.lon]} 
                    zoom={16} 
                  />
                )}

                {/* Draw a line from user to selected center */}
                {selectedCenter && (
                  <Polyline
                    positions={[
                      [location.latitude, location.longitude],
                      [selectedCenter.lat, selectedCenter.lon],
                    ]}
                    pathOptions={{ color: 'blue', weight: 3, dashArray: '5, 5' }}
                  />
                )}
              </MapContainer>
            </div>
          </div>
        </>
      ) : (
        <div className="loading-container">
          <p className="loading-text">Fetching your location...</p>
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default RecyclingCenters;